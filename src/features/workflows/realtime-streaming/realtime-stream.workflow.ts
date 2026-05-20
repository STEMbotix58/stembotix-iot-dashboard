import telemetryStreamService from "@/features/telemetry/services/telemetry-stream.service";
import loggerService from "@/core/services/logger.service";
import monitorDeviceWorkflow from "../device-monitoring/monitor-device.workflow";

class RealtimeStreamWorkflow {
  initialize() {
    telemetryStreamService.subscribe(async (telemetry) => {
      loggerService.info("Realtime telemetry received", telemetry);
      const temperature = telemetry.metrics.find(
        (metric) => metric.key === "temperature",
      );
      await monitorDeviceWorkflow.execute({
        deviceId: telemetry.deviceId,
        online: true,
        temperature: temperature?.value,
      });
    });
  }
}

export default new RealtimeStreamWorkflow();
