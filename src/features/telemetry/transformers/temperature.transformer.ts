import type { Telemetry } from "@/entities/telemetry/telemetry.types";

export const transformTemperatureTelemetry = (telemetry: Telemetry[]) => {
  return telemetry.map((item) => {
    const metric = item.metrics.find((metric) => metric.key === "temperature");

    return {
      timestamp: item.timestamp,
      value: metric?.value ?? 0,
      unit: metric?.unit ?? "°C",
    };
  });
};

export default transformTemperatureTelemetry;
