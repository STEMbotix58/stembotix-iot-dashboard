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
      <DashboardAnalyticsSection />
      <DashboardDevicesSection />
      <DashboardRuntimeSection />
    </div>
  );
};

export default DashboardPage;
