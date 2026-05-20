import type { Telemetry } from "./telemetry.types";

export const telemetryToChartData = (
  telemetry: Telemetry[],
  metricKey: string,
) => {
  return telemetry.map((entry) => {
    const metric = entry.metrics.find((item) => item.key === metricKey);

    return {
      timestamp: entry.timestamp,
      value: metric?.value ?? 0,
    };
  });
};

export const latestMetricValue = (
  telemetry: Telemetry[],
  metricKey: string,
) => {
  const latest = telemetry.at(-1);

  if (!latest) {
    return null;
  }

  return (
    latest.metrics.find((metric) => metric.key === metricKey)?.value ?? null
  );
};
