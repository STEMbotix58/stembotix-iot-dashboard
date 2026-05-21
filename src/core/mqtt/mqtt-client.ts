import mqtt, {
  type MqttClient,
  type IClientOptions,
  type IClientPublishOptions,
  type IClientSubscribeOptions,
} from "mqtt";

import mqttConfig from "@/core/config/mqtt.config";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import loggerService from "@/core/services/logger.service";

type MQTTStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

type MQTTEventHandler = (...args: any[]) => void;

class MQTTClient {
  private client: MqttClient | null = null;

  private status: MQTTStatus = "idle";

  private eventListeners = new Map<string, Set<MQTTEventHandler>>();

  private requestedSubscriptions = new Map<
    string,
    IClientSubscribeOptions | undefined
  >();

  connect() {
    if (this.client && !this.client.disconnected) {
      return this.client;
    }

    if (!mqttConfig.brokerUrl) {
      loggerService.warn("MQTT broker URL is not configured");
      return null;
    }

    this.status = "connecting";
    this.client = mqtt.connect(
      mqttConfig.brokerUrl,
      mqttConfig.options as IClientOptions,
    );

    this.client.on("connect", () => {
      this.status = "connected";
      loggerService.info("MQTT connected");
      this.resubscribeRequestedTopics();
      eventBus.emit(RUNTIME_EVENTS.MQTT_CONNECTED, {
        url: mqttConfig.brokerUrl,
        timestamp: new Date().toISOString(),
      });
    });

    this.client.on("reconnect", () => {
      this.status = "reconnecting";
      loggerService.warn("MQTT reconnecting");
      eventBus.emit(RUNTIME_EVENTS.MQTT_RECONNECTING, {
        timestamp: new Date().toISOString(),
      });
    });

    this.client.on("close", () => {
      this.status = "disconnected";
      loggerService.warn("MQTT disconnected");
      eventBus.emit(RUNTIME_EVENTS.MQTT_DISCONNECTED, {
        timestamp: new Date().toISOString(),
      });
    });

    this.client.on("error", (error) => {
      loggerService.error("MQTT error", error);
      eventBus.emit(RUNTIME_EVENTS.MQTT_ERROR, error);
    });

    this.attachExternalListeners();

    return this.client;
  }

  getClient() {
    return this.client;
  }

  publish(topic: string, payload: string, options?: IClientPublishOptions) {
    if (!this.client?.connected) {
      return false;
    }

    this.client.publish(topic, payload, options);
    return true;
  }

  subscribe(
    topic: string,
    callback?: (topic: string, payload: Buffer) => void,
    options?: IClientSubscribeOptions,
  ) {
    this.requestedSubscriptions.set(topic, options);

    this.client?.subscribe(topic, options, (error) => {
      if (error) {
        loggerService.error(`MQTT subscribe failed for ${topic}`, error);
      }
    });

    if (callback) {
      const messageHandler = (incomingTopic: string, message: Buffer) => {
        if (incomingTopic === topic) {
          callback(incomingTopic, message);
        }
      };

      this.on("message", messageHandler);

      return () => {
        this.off("message", messageHandler);
      };
    }

    return () => this.unsubscribe(topic);
  }

  unsubscribe(topic: string) {
    this.requestedSubscriptions.delete(topic);
    this.client?.unsubscribe(topic);
  }

  on(event: string, callback: (...args: any[]) => void) {
    const listeners = this.eventListeners.get(event) ?? new Set();

    listeners.add(callback);
    this.eventListeners.set(event, listeners);
    this.client?.on(event as any, callback);

    return () => this.off(event, callback);
  }

  off(event: string, callback: (...args: any[]) => void) {
    const listeners = this.eventListeners.get(event);

    listeners?.delete(callback);

    if (!listeners?.size) {
      this.eventListeners.delete(event);
    }

    this.client?.off(event as any, callback);
  }

  disconnect(force = false) {
    this.status = "disconnected";
    this.client?.end(force);
    this.client = null;
  }

  get connected() {
    return this.client?.connected ?? false;
  }

  getStatus() {
    return this.status;
  }

  private attachExternalListeners() {
    this.eventListeners.forEach((listeners, event) => {
      listeners.forEach((listener) => {
        this.client?.on(event as any, listener);
      });
    });
  }

  private resubscribeRequestedTopics() {
    this.requestedSubscriptions.forEach((options, topic) => {
      this.client?.subscribe(topic, options, (error) => {
        if (error) {
          loggerService.error(`MQTT resubscribe failed for ${topic}`, error);
        }
      });
    });
  }
}

const mqttClient = new MQTTClient();

export default mqttClient;
