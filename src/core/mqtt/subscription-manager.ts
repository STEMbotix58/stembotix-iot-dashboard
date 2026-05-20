import mqtt from "mqtt";

class SubscriptionManager {
  private subscriptions = new Map<string, Function[]>();

  subscribe(
    client: mqtt.MqttClient,
    topic: string,
    callback: (payload: unknown) => void,
  ) {
    client.subscribe(topic);

    const handlers = this.subscriptions.get(topic) || [];

    handlers.push(callback);

    this.subscriptions.set(topic, handlers);

    client.on("message", (incomingTopic, message) => {
      if (incomingTopic !== topic) return;

      try {
        const parsed = JSON.parse(message.toString());

        callback(parsed);
      } catch {
        callback(message.toString());
      }
    });
  }

  unsubscribe(client: mqtt.MqttClient, topic: string) {
    client.unsubscribe(topic);

    this.subscriptions.delete(topic);
  }
}

export default new SubscriptionManager();
