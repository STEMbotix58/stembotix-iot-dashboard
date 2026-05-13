import type { Device } from "../store/devices.types";

import DeviceStatus from "./DeviceStatus";

interface Props {
  device: Device;
}

const DeviceCard = ({ device }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{device.name}</h3>

          <p className="mt-1 text-sm text-slate-500">{device.location}</p>
        </div>

        <DeviceStatus status={device.status} />
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500">Current Value</p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          {device.value}
        </h2>
      </div>
    </div>
  );
};

export default DeviceCard;
