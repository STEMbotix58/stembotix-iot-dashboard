import type { DeviceMonitoringPayload } from "./monitor-device.types";
import loggerService from "@/core/services/logger.service";

class MonitorDeviceWorkflow {
  async execute(payload: DeviceMonitoringPayload) {
    loggerService.info("Monitoring device", payload);

    // Device offline
    if (!payload.online) {
      loggerService.warn("Device offline", payload.deviceId);

      return;
    }

    // High temperature
    if (payload.temperature && payload.temperature > 40) {
      loggerService.warn("High temperature detected", payload);

      // future:
      // create alert
      // trigger notification
    }

    // Voltage anomaly
    if (payload.voltage && payload.voltage > 240) {
      loggerService.warn("Voltage anomaly detected", payload);
    }
  }
}

export default new MonitorDeviceWorkflow();
