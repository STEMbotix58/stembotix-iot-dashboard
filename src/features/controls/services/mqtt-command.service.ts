import mqttManager from "@/core/mqtt/mqtt-manager";
import MQTT_TOPICS from "@/core/mqtt/mqtt-topics";

import loggerService from "@/core/services/logger.service";

type CommandPayload = {
  deviceId: string;
  siteId?: string;
  command: string;
  value?: unknown;
};

class MQTTCommandService {
  publish(payload: CommandPayload) {
    const siteId = payload.siteId ?? "default-site";
    const topic = MQTT_TOPICS.DEVICE.COMMAND(siteId, payload.deviceId);

    mqttManager.publish(topic, JSON.stringify(payload));

    loggerService.info("MQTT command published", {
      topic,
      payload,
    });
  }
}

export default new MQTTCommandService();
