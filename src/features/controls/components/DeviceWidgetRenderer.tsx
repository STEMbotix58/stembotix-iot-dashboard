import { useMemo } from "react";
import { useSelector } from "react-redux";

import type { Device } from "@/entities/device/device.types";
import { selectDeviceTelemetry } from "@/features/telemetry/store/telemetry.selector";
import useDeviceControls from "../hooks/useDeviceControls";
import { getWidgetsForDevice } from "../registry/widget-registry";
import DeviceStatusTag from "../../devices/components/DeviceStatusTag";
import deviceShadowService from "../../devices/services/device-shadow.service";
import type { TelemetryMetric } from "@/entities/telemetry/telemetry.types";

type Props = {
  device: Device;
};

const DeviceWidgetRenderer = ({ device }: Props) => {
  const telemetry = useSelector(selectDeviceTelemetry(device.id));
  const latestMetrics = useMemo(
    () => telemetry[telemetry.length - 1]?.metrics ?? ([] as TelemetryMetric[]),
    [telemetry],
  );

  const deviceShadow = deviceShadowService.getShadow(device.id);
  const actions = useDeviceControls(device.id);
  const widgets = useMemo(
    () => getWidgetsForDevice(device, latestMetrics, actions),
    [device, latestMetrics, actions],
  );

  const lastSeen = device.health?.lastSeen ?? device.lastSeen ?? "Unknown";
  const heartbeatLag = device.health?.latencyMs
    ? `${device.health.latencyMs} ms`
    : "TBD";

  return (
    <div className="rounded-3xl bg-slate-950/95 p-6 shadow-lg shadow-slate-900/10 ring-1 ring-slate-800">
      <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/95 p-4 text-slate-200 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{device.name}</h3>
            <p className="text-sm text-slate-400">
              {device.location} • {device.type}
            </p>
          </div>
          <DeviceStatusTag status={device.status} />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <StatusChip label="Last Seen" value={lastSeen} />
          <StatusChip label="Heartbeat" value={heartbeatLag} />
          <StatusChip
            label="Shadow"
            value={deviceShadow?.conflict ? "Conflict" : "Synced"}
          />
        </div>
      </div>

      {widgets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {widgets.map((widget) => {
            const Component = widget.component;
            return <Component key={widget.key} {...widget.props} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/80 p-8 text-center text-sm text-slate-400">
          Device capabilities are available, but no mapped widget is configured
          yet.
        </div>
      )}
    </div>
  );
};

const StatusChip = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-slate-950/80 px-3 py-2 text-left text-xs uppercase tracking-[0.16em] text-slate-400">
    <p className="text-slate-500">{label}</p>
    <p className="font-semibold text-white">{value}</p>
  </div>
);

export default DeviceWidgetRenderer;
