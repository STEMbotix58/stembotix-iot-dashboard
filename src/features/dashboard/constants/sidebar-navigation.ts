import { LayoutDashboard, Cpu, Activity, Bell, Settings } from "lucide-react";

export const sidebarNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Devices",
    path: "/dashboard/devices",
    icon: Cpu,
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: Activity,
  },
  {
    label: "Alerts",
    path: "/dashboard/alerts",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];
