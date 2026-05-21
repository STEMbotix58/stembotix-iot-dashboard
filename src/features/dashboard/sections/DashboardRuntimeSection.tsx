import DeviceRuntimeGrid from "@/features/devices/runtime/DeviceRuntimeGrid";

const DashboardRuntimeSection = () => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Device Runtime</h2>

        <p className="mt-1 text-sm text-slate-500">
          Dynamic device runtime generated from capabilities.
        </p>
      </div>

      <DeviceRuntimeGrid />
    </section>
  );
};

export default DashboardRuntimeSection;
