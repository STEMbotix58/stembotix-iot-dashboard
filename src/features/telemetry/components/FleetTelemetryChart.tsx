import type { Device } from "@/entities/device/device.types";
import { useDevices } from "@/features/devices/hooks/useDevices";
import LineChart from "@/shared/charts/LineChart";
import { useMemo } from "react";

const sanitizeValue = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
};

const FleetTelemetryChart = () => {
  const { devices = [] } = useDevices();

  const telemetrySeries = useMemo(() => {
    return [
      {
        name: "Device Trend",
        data: devices.map((device: Device) => sanitizeValue(device.value)),
      },
    ];
  }, [devices]);

  const categories = useMemo(
    () => devices.map((device: Device) => device.name),
    [devices],
  );

  return (
    <div>
      <LineChart
        title="Fleet Telemetry Overview"
        series={telemetrySeries}
        categories={categories.length ? categories : ["Device A", "Device B"]}
      />
    </div>
  );
};

export default FleetTelemetryChart;
