import { useMemo } from "react";
import useTelemetry from "./useTelemetry";

const useDeviceMetrics = (deviceId: string) => {
  const { telemetry } = useTelemetry(deviceId);
  const latest = telemetry.at(-1);

  const metrics = useMemo(() => {
    if (!latest) {
      return {};
    }

    return latest.metrics.reduce(
      (acc, metric) => {
        acc[metric.key] = metric.value;

        return acc;
      },
      {} as Record<string, number>,
    );
  }, [latest]);

  return {
    metrics,
  };
};

export default useDeviceMetrics;
