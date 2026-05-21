import DeviceRuntimeRenderer from "./DeviceRuntimeRenderer";

type Props = {
  room: {
    room: string;

    devices: any[];
  };
};

const DeviceRuntimeRoom = ({ room }: Props) => {
  return (
    <div className="space-y-5">
      {/* Room Header */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Room
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-900">{room.room}</h3>
        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-2">
          <p className="text-sm font-semibold text-slate-700">
            {room.devices.length} Devices
          </p>
        </div>
      </div>

      {/* Devices */}
      <div className="grid gap-6 2xl:grid-cols-2">
        {room.devices.map((device) => (
          <DeviceRuntimeRenderer key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
};

export default DeviceRuntimeRoom;
