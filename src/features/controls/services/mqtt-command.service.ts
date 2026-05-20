import mqttClient from "@/core/mqtt/mqtt-client";

import MQTT_TOPICS from "@/core/mqtt/mqtt-topics";

import loggerService from "@/core/services/logger.service";

type CommandPayload = {
  deviceId: string;

  command: string;

  value?: unknown;
};

class MQTTCommandService {
  publish(payload: CommandPayload) {
    const topic = MQTT_TOPICS.DEVICE.COMMAND(payload.deviceId);

    mqttClient.publish(topic, JSON.stringify(payload));

    loggerService.info("MQTT command published", {
      topic,
      payload,
    });
  }
}

export default new MQTTCommandService();
