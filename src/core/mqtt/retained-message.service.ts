import type { MqttClient } from "mqtt";

class RetainedMessageService {
  publish(client: MqttClient, topic: string, payload: unknown) {
    client.publish(topic, JSON.stringify(payload), {
      retain: true,
    });
  }

  clear(client: MqttClient, topic: string) {
    client.publish(topic, "", {
      retain: true,
    });
  }
}

export default new RetainedMessageService();
