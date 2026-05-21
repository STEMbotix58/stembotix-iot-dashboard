import DeviceWidgetRenderer from "@/features/controls/components/DeviceWidgetRenderer";

type Props = {
  device: any;
};

const DeviceRuntimeRenderer = ({ device }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      {/* Runtime Header */}
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{device.name}</h3>

            <p className="mt-1 text-sm text-slate-500">{device.type}</p>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              device.status === "Online"
                ? "bg-green-100 text-green-700"
                : device.status === "Offline"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {device.status}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Last Telemetry
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {device.lastSeen}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Current Value
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {device.value}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Widget Runtime */}
      <div className="bg-slate-50 p-5">
        <DeviceWidgetRenderer device={device} />
      </div>
    </div>
  );
};

export default DeviceRuntimeRenderer;
