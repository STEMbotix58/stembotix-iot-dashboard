export const RUNTIME_EVENTS = {
  MQTT_CONNECTED: "transport.mqtt.connected",
  MQTT_RECONNECTING: "transport.mqtt.reconnecting",
  MQTT_DISCONNECTED: "transport.mqtt.disconnected",
  MQTT_ERROR: "transport.mqtt.error",

  WEBSOCKET_CONNECTED: "transport.websocket.connected",
  WEBSOCKET_DISCONNECTED: "transport.websocket.disconnected",
  WEBSOCKET_ERROR: "transport.websocket.error",
  WEBSOCKET_MESSAGE: "transport.websocket.message",

  NETWORK_ONLINE: "network.online",
  NETWORK_OFFLINE: "network.offline",

  TELEMETRY_RAW: "telemetry.raw",
  TELEMETRY_NORMALIZED: "telemetry.normalized",
  TELEMETRY_INVALID: "telemetry.invalid",
  TELEMETRY_PROCESSED: "telemetry.processed",
  TELEMETRY_DUPLICATE: "telemetry.duplicate",

  ALERT_CREATED: "alert.created",

  DEVICE_RUNTIME_READY: "device.runtime.ready",
  DEVICE_UPDATED: "device.updated",

  RUNTIME_HEALTH_CHANGED: "runtime.health.changed",
} as const;

export default RUNTIME_EVENTS;
