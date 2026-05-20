import type { Telemetry } from "@/entities/telemetry/telemetry.types";

class TelemetryStreamService {
  private listeners: Array<(telemetry: Telemetry) => void> = [];

  subscribe(callback: (telemetry: Telemetry) => void) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback,
      );
    };
  }

  emit(telemetry: Telemetry) {
    this.listeners.forEach((listener) => {
      listener(telemetry);
    });
  }
}

export default new TelemetryStreamService();
