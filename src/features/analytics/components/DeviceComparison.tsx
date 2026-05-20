type DeviceData = {
  name: string;
  temperature: number;
  humidity: number;
  energy: number;
};

type Props = {
  devices: DeviceData[];
};

const DeviceComparison = ({ devices }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Device Comparison
        </h2>
        <p className="text-sm text-slate-500">
          Compare realtime device metrics
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Device
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Temperature
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Humidity
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                Energy
              </th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.name} className="border-b border-slate-100">
                <td className="px-4 py-4 font-medium text-slate-900">
                  {device.name}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {device.temperature}
                  °C
                </td>
                <td className="px-4 py-4 text-slate-600">{device.humidity}%</td>
                <td className="px-4 py-4 text-slate-600">
                  {device.energy}
                  kWh
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceComparison;
