import mqtt from "mqtt";

class RetainedMessageService {
  publish(client: mqtt.MqttClient, topic: string, payload: unknown) {
    client.publish(topic, JSON.stringify(payload), {
      retain: true,
    });
  }

  clear(client: mqtt.MqttClient, topic: string) {
    client.publish(topic, "", {
      retain: true,
    });
  }
}

export default new RetainedMessageService();
