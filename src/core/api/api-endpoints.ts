const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },

  DEVICES: {
    LIST: "/devices",
    DETAILS: (id: string) => `/devices/${id}`,
    COMMAND: (id: string) => `/devices/${id}/command`,
  },

  TELEMETRY: {
    LIST: "/telemetry",
    DEVICE: (deviceId: string) => `/telemetry/${deviceId}`,
  },

  ALERTS: {
    LIST: "/alerts",
  },

  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    OVERVIEW: "/analytics/overview",
  },

  SETTINGS: {
    GET: "/settings",
    UPDATE: "/settings",
  },
};

export default API_ENDPOINTS;
