import type { Device, DevicePayload } from "./device.types";

export const mapDevice = (payload: DevicePayload): Device => {
  return {
    id: payload.device_id,
    name: payload.device_name,
    type: payload.device_type,
    status: payload.device_status,
    value: payload.device_value,
    location: payload.location,
    firmwareVersion: payload.firmware_version,
    lastSeen: payload.last_seen,
    createdAt: payload.created_at,
  };
};

export const mapDevices = (payloads: DevicePayload[]): Device[] => {
  return payloads.map(mapDevice);
};
