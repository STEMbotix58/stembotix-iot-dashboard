export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  TELEMETRY_UPDATE: "telemetry:update",
  DEVICE_STATUS: "device:status",
  DEVICE_COMMAND: "device:command",
  ALERT_CREATED: "alert:created",
  SYSTEM_HEALTH: "system:health",
} as const;

export default SOCKET_EVENTS;
