const MQTT_TOPICS = {
  DEVICE: {
    STATUS: (deviceId: string) => `devices/${deviceId}/status`,

    TELEMETRY: (deviceId: string) => `devices/${deviceId}/telemetry`,

    COMMAND: (deviceId: string) => `devices/${deviceId}/command`,
  },

  ALERTS: {
    GLOBAL: "alerts/global",
  },

  SYSTEM: {
    HEALTH: "system/health",
  },
};

export default MQTT_TOPICS;
