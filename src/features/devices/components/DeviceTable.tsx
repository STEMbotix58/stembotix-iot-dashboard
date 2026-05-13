import { useNavigate } from "react-router-dom";

import { useDevices } from "../hooks/useDevices";
import { useDeviceSelection } from "../hooks/useDeviceSelection";

import DeviceStatus from "./DeviceStatus";

const DeviceTable = () => {
  const navigate = useNavigate();

  const { devices } = useDevices();

  const { selectDevice } = useDeviceSelection();

  const handleDeviceClick = (device: any) => {
    selectDevice(device);

    navigate(`/dashboard/devices/${device.id}`);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Device
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Type
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Value
            </th>
          </tr>
        </thead>

        <tbody>
          {devices.map((device) => (
            <tr
              key={device.id}
              onClick={() => handleDeviceClick(device)}
              className="cursor-pointer border-t border-slate-100 hover:bg-slate-50"
            >
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-slate-900">{device.name}</p>

                  <p className="text-sm text-slate-500">{device.location}</p>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-slate-600">
                {device.type}
              </td>

              <td className="px-6 py-4">
                <DeviceStatus status={device.status} />
              </td>

              <td className="px-6 py-4 font-semibold text-slate-900">
                {device.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
