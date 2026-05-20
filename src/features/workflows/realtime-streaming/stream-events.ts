export const STREAM_EVENTS = {
  STREAM_CONNECTED: "stream:connected",
  STREAM_DISCONNECTED: "stream:disconnected",
  TELEMETRY_RECEIVED: "telemetry:received",
  DEVICE_UPDATED: "device:updated",
} as const;

export default STREAM_EVENTS;
