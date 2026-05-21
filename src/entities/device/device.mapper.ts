import type { Device, DevicePayload } from "./device.types";

export const mapDevice = (payload: DevicePayload): Device => {
  const siteId = payload.site_id ?? "default-site";

  return {
    id: payload.device_id,
    name: payload.device_name,
    siteId,
    type: payload.device_type,
    status: payload.device_status,
    value: payload.device_value,
    location: payload.location,
    room: payload.room,
    capabilities: payload.capabilities ?? [],
    supportedWidgets: payload.supported_widgets ?? [],
    telemetrySchema: payload.telemetry_schema ?? [],
    controlSchema: payload.control_schema ?? [],
    mqttTopics: payload.mqtt_topics ?? {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: payload.websocket_channels ?? ["telemetry", "state"],
    automationRules: payload.automation_rules ?? [],
    shadow: payload.shadow,
    health: payload.health,
    firmwareVersion: payload.firmware_version,
    lastSeen: payload.last_seen,
    createdAt: payload.created_at,
  };
};

export const mapDevices = (payloads: DevicePayload[]): Device[] => {
  return payloads.map(mapDevice);
};
