import DeviceRuntimeRoom from "./DeviceRuntimeRoom";

type Props = {
  site: {
    siteId: string;
    siteName: string;

    rooms: {
      room: string;

      devices: any[];
    }[];
  };
};

const DeviceRuntimeSite = ({ site }: Props) => {
  return (
    <div className="space-y-6">
      {/* Site Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{site.siteName}</h2>

            <p className="mt-1 text-sm text-slate-400">
              Realtime device orchestration runtime
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Rooms
            </p>

            <h3 className="mt-1 text-2xl font-bold">{site.rooms.length}</h3>
          </div>
        </div>
      </div>

      {/* Rooms */}
      <div className="space-y-8">
        {site.rooms.map((room) => (
          <DeviceRuntimeRoom key={`${site.siteId}-${room.room}`} room={room} />
        ))}
      </div>
    </div>
  );
};

export default DeviceRuntimeSite;
