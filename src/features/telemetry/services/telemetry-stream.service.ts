import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import loggerService from "@/core/services/logger.service";

class TelemetryStreamService {
  private listeners = new Set<(telemetry: Telemetry) => void>();

  subscribe(callback: (telemetry: Telemetry) => void) {
    this.listeners.add(callback);

    return () => {
      this.listeners.delete(callback);
    };
  }

  emit(telemetry: Telemetry) {
    this.listeners.forEach((listener) => {
      try {
        listener(telemetry);
      } catch (error) {
        loggerService.error("Telemetry stream listener failed", error);
      }
    });
  }

  listenerCount() {
    return this.listeners.size;
  }
}

export default new TelemetryStreamService();
