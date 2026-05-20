import type { Telemetry, TelemetryMetric } from "./telemetry.types";

export class TelemetryModel implements Telemetry {
  id: string;
  deviceId: string;
  timestamp: string;
  metrics: TelemetryMetric[];

  constructor(telemetry: Telemetry) {
    this.id = telemetry.id;
    this.deviceId = telemetry.deviceId;
    this.timestamp = telemetry.timestamp;
    this.metrics = telemetry.metrics;
  }

  getMetric(key: string) {
    return this.metrics.find((metric) => metric.key === key);
  }

  getMetricValue(key: string) {
    return this.getMetric(key)?.value ?? null;
  }
}
