import DeviceTable from "../components/DeviceTable";

const DevicesPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Devices</h1>

        <p className="mt-1 text-slate-500">
          Monitor and manage connected devices
        </p>
      </div>

      <DeviceTable />
    </div>
  );
};

export default DevicesPage;
