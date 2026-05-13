const devices = [
  {
    id: "DEV-001",
    name: "Temperature Sensor",
    status: "Online",
    value: "24°C",
  },
  {
    id: "DEV-002",
    name: "Humidity Sensor",
    status: "Offline",
    value: "68%",
  },
  {
    id: "DEV-003",
    name: "Power Meter",
    status: "Online",
    value: "220V",
  },
  {
    id: "DEV-004",
    name: "GPS Tracker",
    status: "Online",
    value: "Tracking",
  },
];

const DeviceStatusTable = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Devices</h2>

        <p className="text-sm text-slate-500">Current device status overview</p>
      </div>

      <div className="space-y-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="rounded-xl border border-slate-100 p-4 transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-slate-900">{device.name}</h3>

                <p className="mt-1 text-xs text-slate-400">{device.id}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  device.status === "Online"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {device.status}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-slate-500">Current Value</p>

              <h4 className="mt-1 text-lg font-semibold text-slate-900">
                {device.value}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceStatusTable;
