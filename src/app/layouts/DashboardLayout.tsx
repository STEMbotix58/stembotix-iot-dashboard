import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Content */}
      <main className="flex-1 overflow-x-hidden p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
