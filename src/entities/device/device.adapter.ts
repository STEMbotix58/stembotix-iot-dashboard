import type { Device, DevicePayload } from "./device.types";

export const adaptDeviceToApi = (device: Device): DevicePayload => {
  return {
    device_id: device.id,
    device_name: device.name,
    device_type: device.type,
    device_status: device.status,
    device_value: device.value,
    location: device.location,
    firmware_version: device.firmwareVersion,
    last_seen: device.lastSeen,
    created_at: device.createdAt,
  };
};
