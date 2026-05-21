import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import loggerService from "@/core/services/logger.service";
import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import monitorDeviceWorkflow from "../device-monitoring/monitor-device.workflow";

class RealtimeStreamWorkflow {
  private initialized = false;

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    runtimeSubscriptionManager.register(
      "realtime-stream-workflow:telemetry",
      eventBus.on<Telemetry>(
        RUNTIME_EVENTS.TELEMETRY_PROCESSED,
        async (telemetry) => {
          loggerService.info("Realtime telemetry received", telemetry);
          const temperature = telemetry.metrics.find(
            (metric) => metric.key === "temperature",
          );

          await monitorDeviceWorkflow.execute({
            deviceId: telemetry.deviceId,
            online: true,
            temperature: temperature?.value,
          });
        },
      ),
    );
  }

  destroy() {
    runtimeSubscriptionManager.dispose("realtime-stream-workflow:telemetry");
    this.initialized = false;
  }
}

export default new RealtimeStreamWorkflow();
