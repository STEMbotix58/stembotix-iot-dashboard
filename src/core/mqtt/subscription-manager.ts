import type { MqttClient } from "mqtt";
import { topicMatches } from "@/core/mqtt/topic-matcher";

class SubscriptionManager {
  private subscriptions = new Map<string, Set<(payload: unknown) => void>>();

  private clientRouters = new WeakMap<
    MqttClient,
    (incomingTopic: string, message: Buffer) => void
  >();

  subscribe(
    client: MqttClient,
    topic: string,
    callback: (payload: unknown) => void,
  ) {
    this.attachRouter(client);
    client.subscribe(topic);

    const handlers = this.subscriptions.get(topic) ?? new Set();

    handlers.add(callback);

    this.subscriptions.set(topic, handlers);

    return () => this.unsubscribe(client, topic, callback);
  }

  unsubscribe(
    client: MqttClient,
    topic: string,
    callback?: (payload: unknown) => void,
  ) {
    const handlers = this.subscriptions.get(topic);

    if (callback) {
      handlers?.delete(callback);
    } else {
      handlers?.clear();
    }

    if (!handlers?.size) {
      client.unsubscribe(topic);
      this.subscriptions.delete(topic);
    }
  }

  private attachRouter(client: MqttClient) {
    if (this.clientRouters.has(client)) return;

    const router = (incomingTopic: string, message: Buffer) => {
      this.subscriptions.forEach((handlers, filter) => {
        if (!topicMatches(filter, incomingTopic)) return;

        handlers.forEach((callback) => {
          try {
            const parsed = JSON.parse(message.toString());

            callback(parsed);
          } catch {
            callback(message.toString());
          }
        });
      });
    };

    client.on("message", router);
    this.clientRouters.set(client, router);
  }
}

export default new SubscriptionManager();
