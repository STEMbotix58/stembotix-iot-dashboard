import DashboardHeader from "../components/DashboardHeader";

import DashboardOverviewSection from "../sections/DashboardOverviewSection";
import DashboardAnalyticsSection from "../sections/DashboardAnalyticsSection";
import DashboardDevicesSection from "../sections/DashboardDevicesSection";
import DashboardRuntimeSection from "../sections/DashboardRuntimeSection";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardOverviewSection />
      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardAnalyticsSection />
        <DashboardDevicesSection />
      </div>
      <DashboardRuntimeSection />
    </div>
  );
};

export default DashboardPage;
