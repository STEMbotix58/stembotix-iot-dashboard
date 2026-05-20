export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  DEVICES: "devices",
  DEVICE_DETAILS: "devices/:deviceId",
  ANALYTICS: "analytics",
  ALERTS: "alerts",
  SETTINGS: "settings",
} as const;

export const ROUTE_BUILDERS = {
  DEVICE_DETAILS: (deviceId: string) => `/dashboard/devices/${deviceId}`,
} as const;

export default ROUTES;
