import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Devices",
    path: "/dashboard/devices",
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
  },
  {
    label: "Alerts",
    path: "/dashboard/alerts",
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">IoT Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Device Monitoring Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm font-medium text-slate-900">
            Connected Devices
          </p>

          <h2 className="mt-2 text-3xl font-bold text-black">128</h2>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
