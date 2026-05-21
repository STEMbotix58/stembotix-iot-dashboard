const MQTT_TOPICS = {
  DEVICE: {
    STATUS: (siteId: string, deviceId: string) =>
      `site/${siteId}/device/${deviceId}/status`,
    TELEMETRY: (siteId: string, deviceId: string) =>
      `site/${siteId}/device/${deviceId}/telemetry`,
    COMMAND: (siteId: string, deviceId: string) =>
      `site/${siteId}/device/${deviceId}/command`,
    STATE: (siteId: string, deviceId: string) =>
      `site/${siteId}/device/${deviceId}/state`,
  },

  ALERTS: {
    GLOBAL: "site/global/alerts",
  },

  SYSTEM: {
    HEALTH: "site/global/system/health",
  },
};

export default MQTT_TOPICS;
