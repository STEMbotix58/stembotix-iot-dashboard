export type DeviceStatusType = "Online" | "Offline" | "Maintenance";

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: DeviceStatusType;
  value: string;
  lastSeen: string;
}

export interface DevicesState {
  devices: Device[];
  selectedDevice: Device | null;
  loading: boolean;
  error: string | null;
}
