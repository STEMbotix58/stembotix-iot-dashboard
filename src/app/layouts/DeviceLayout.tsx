import { Outlet, useParams } from "react-router-dom";

const DeviceLayout = () => {
  const { deviceId } = useParams();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Device Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitoring device: {deviceId}
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Online
          </span>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default DeviceLayout;
