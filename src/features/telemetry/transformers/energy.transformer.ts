import type { Telemetry } from "@/entities/telemetry/telemetry.types";

export const transformEnergyTelemetry = (telemetry: Telemetry[]) => {
  return telemetry.map((item) => {
    const metric = item.metrics.find((metric) => metric.key === "energy");

    return {
      timestamp: item.timestamp,
      value: metric?.value ?? 0,
      formatted: `${metric?.value ?? 0} kWh`,
    };
  });
};

export default transformEnergyTelemetry;
