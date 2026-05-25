import { NavLink } from "react-router-dom";
import ROUTES from "@/core/constants/routes.constants";
import Logo from "@/shared/assets/logo.svg";
const navigation = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
  },

  {
    label: "Devices",
    path: ROUTES.DEVICES,
  },

  {
    label: "Analytics",
    path: ROUTES.ANALYTICS,
  },

  {
    label: "Alerts",
    path: ROUTES.ALERTS,
  },

  {
    label: "Settings",
    path: ROUTES.SETTINGS,
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <img src={Logo} alt="STEMbotix Logo" />
        {/* <h1 className="text-2xl font-bold text-slate-900">IoT Dashboard</h1> */}

        <h3 className="text-lg text-center font-bold text-slate-900">
          Device Monitoring Platform
        </h3>
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
                    ? "bg-[#2c2872] text-white!"
                    : "text-[#2c2872]/50 hover:bg-slate-100"
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
