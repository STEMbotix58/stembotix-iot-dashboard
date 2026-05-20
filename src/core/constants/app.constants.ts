export const APP_CONSTANTS = {
  NAME: "STEMbotix IoT Dashboard",

  VERSION: "1.0.0",

  STORAGE_KEYS: {
    AUTH: "auth",
    THEME: "theme",
    SETTINGS: "settings",
  },

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 25,
  },

  DEVICE_STATUS: {
    ONLINE: "Online",
    OFFLINE: "Offline",
    MAINTENANCE: "Maintenance",
  },

  TELEMETRY: {
    MAX_POINTS: 50,
  },
} as const;
