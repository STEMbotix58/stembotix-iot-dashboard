import { useMemo } from "react";
import { telemetryToChartData } from "@/entities/telemetry/telemetry.transformer";
import useTelemetry from "./useTelemetry";

const useTelemetryCharts = (deviceId: string, metricKey: string) => {
  const { telemetry } = useTelemetry(deviceId);

  const chartData = useMemo(() => {
    return telemetryToChartData(telemetry, metricKey);
  }, [telemetry, metricKey]);

  return {
    chartData,
  };
};

export default useTelemetryCharts;
