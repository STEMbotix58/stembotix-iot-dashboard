import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout
import DashboardLayout from "@/app/layouts/DashboardLayout";
import AuthLayout from "@/app/layouts/AuthLayout";
import DeviceLayout from "@/app/layouts/DeviceLayout";

// Pages
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import LoginPage from "@/features/authentication/pages/LoginPage";
import DevicesPage from "@/features/devices/pages/DevicesPage";
import DeviceDetailsPage from "@/features/devices/pages/DeviceDetailsPage";
import AnalyticsPage from "@/features/analytics/pages/AnalyticsPage";
import AlertsPage from "@/features/alerts/pages/AlertsPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";

// Routes
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";
import ROUTES from "@/core/constants/routes.constants";

const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoutes>
        <AuthLayout />
      </PublicRoutes>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.DEVICES,
        element: <DevicesPage />,
      },
      {
        path: ROUTES.DEVICE_DETAILS,
        element: <DeviceLayout />,
        children: [
          {
            index: true,
            element: <DeviceDetailsPage />,
          },
        ],
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "alerts",
        element: <AlertsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);

export default router;
