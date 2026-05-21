import type { IClientPublishOptions } from "mqtt";

import reconnectHandler from "@/core/offline/reconnect-handler";
import offlineQueue from "@/core/offline/offline-queue";
import { qosManager } from "@/core/mqtt/qos-manager";
import mqttClient from "@/core/mqtt/mqtt-client";
import { topicMatches } from "@/core/mqtt/topic-matcher";
import loggerService from "@/core/services/logger.service";

export type MQTTSubscribeHandler = (topic: string, payload: string) => void;

type OfflineMQTTPayload = {
  topic: string;
  payload: string;
  options: IClientPublishOptions;
};

class MQTTManager {
  private subscriptions = new Map<string, Set<MQTTSubscribeHandler>>();

  private initialized = false;

  private cleanupHandlers: Array<() => void> = [];

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    this.cleanupHandlers = [
      reconnectHandler.onReconnect(() => {
        mqttClient.connect();
        this.flushOffline();
      }),
      mqttClient.on("connect", () => this.flushOffline()),
      mqttClient.on("message", this.handleMessage),
    ];
  }

  publish(
    topic: string,
    payload: string,
    qos = qosManager.command,
    retain = false,
  ) {
    if (mqttClient.connected) {
      const published = mqttClient.publish(topic, payload, {
        qos,
        retain,
      });

      if (published) return;
    }

    offlineQueue.add<OfflineMQTTPayload>({
      topic,
      payload,
      options: {
        qos,
        retain,
      },
    });
  }

  subscribe(topic: string, handler: MQTTSubscribeHandler) {
    const handlers = this.subscriptions.get(topic) ?? new Set();
    const firstHandler = handlers.size === 0;

    handlers.add(handler);
    this.subscriptions.set(topic, handlers);

    if (firstHandler) {
      mqttClient.subscribe(topic);
    }

    return () => this.unsubscribe(topic, handler);
  }

  unsubscribe(topic: string, handler?: MQTTSubscribeHandler) {
    const handlers = this.subscriptions.get(topic);

    if (!handlers) return;

    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }

    if (!handlers.size) {
      this.subscriptions.delete(topic);
      mqttClient.unsubscribe(topic);
    }
  }

  resubscribeAll() {
    this.subscriptions.forEach((_handlers, topic) => {
      mqttClient.subscribe(topic);
    });
  }

  flushOffline() {
    if (!mqttClient.connected || offlineQueue.isEmpty()) return;

    offlineQueue.getAll<OfflineMQTTPayload>().forEach((item) => {
      const published = mqttClient.publish(
        item.payload.topic,
        item.payload.payload,
        item.payload.options,
      );

      if (published) {
        offlineQueue.remove(item.id);
      }
    });
  }

  destroy() {
    this.cleanupHandlers.forEach((cleanup) => cleanup());
    this.cleanupHandlers = [];
    this.subscriptions.clear();
    this.initialized = false;
  }

  private handleMessage = (topic: string, payload: Buffer) => {
    const message = payload.toString();

    this.subscriptions.forEach((handlers, filter) => {
      if (!topicMatches(filter, topic)) return;

      handlers.forEach((handler) => {
        try {
          handler(topic, message);
        } catch (error) {
          loggerService.error(
            `MQTT subscription handler failed for ${filter}`,
            error,
          );
        }
      });
    });
  };
}

const mqttManager = new MQTTManager();

export default mqttManager;
