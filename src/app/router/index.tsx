import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "@/features/authentication/pages/LoginPage";
import DashboardLayout from "@/features/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";
import DevicesPage from "@/features/devices/pages/DevicesPage";
import DeviceDetailsPage from "@/features/devices/pages/DeviceDetailsPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <LoginPage />
      </PublicRoutes>
    ),
  },
  {
    path: "/dashboard",
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
        path: "devices",
        element: <DevicesPage />,
      },
      {
        path: "devices/:deviceId",
        element: <DeviceDetailsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
