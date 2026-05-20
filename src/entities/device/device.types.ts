export type DeviceStatus = "Online" | "Offline" | "Maintenance";

export type DeviceType =
  | "Sensor"
  | "Camera"
  | "Gateway"
  | "Tracker"
  | "Meter"
  | "Temperature";

export type Device = {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  value: string;
  location: string;
  firmwareVersion?: string;
  lastSeen?: string;
  createdAt?: string;
};

export type DevicePayload = {
  device_id: string;
  device_name: string;
  device_type: DeviceType;
  device_status: DeviceStatus;
  device_value: string;
  location: string;
  firmware_version?: string;
  last_seen?: string;
  created_at?: string;
};
