import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import mqttManager from "@/core/mqtt/mqtt-manager";
import MQTT_TOPICS from "@/core/mqtt/mqtt-topics";
import loggerService from "@/core/services/logger.service";
import telemetryService from "@/features/telemetry/services/telemetry.service";

class TelemetryMQTTRuntime {
  private readonly telemetryTopicFilter = MQTT_TOPICS.DEVICE.TELEMETRY(
    "+",
    "+",
  );

  initialize() {
    if (runtimeSubscriptionManager.has("telemetry-mqtt:telemetry")) {
      return;
    }

    const unsubscribe = mqttManager.subscribe(
      this.telemetryTopicFilter,
      (topic, payload) => {
        try {
          telemetryService.processIncoming(payload, {
            source: "mqtt",
            topic,
            receivedAt: new Date().toISOString(),
          });
        } catch (error) {
          loggerService.error("MQTT telemetry ingestion failed", error);
        }
      },
    );

    runtimeSubscriptionManager.register("telemetry-mqtt:telemetry", unsubscribe);
  }

  destroy() {
    runtimeSubscriptionManager.dispose("telemetry-mqtt:telemetry");
  }
}

export default new TelemetryMQTTRuntime();
