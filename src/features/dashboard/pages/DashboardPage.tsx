import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import OverviewCards from "@/features/dashboard/components/OverviewCards";
import DeviceStatusTable from "@/features/dashboard/components/DeviceStatusTable";
import LineChart from "@/shared/charts/LineChart";

const DashboardPage = () => {
  const data = [
    {
      name: "Temperature",
      data: [22, 24, 25, 21, 28, 30],
    },
  ];
  return (
    <>
      <DashboardHeader />
      <div className="mt-6">
        <OverviewCards />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <LineChart
            title="Temperature Analytics"
            series={data}
            categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          />
        </div>

        <div>
          <DeviceStatusTable />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
