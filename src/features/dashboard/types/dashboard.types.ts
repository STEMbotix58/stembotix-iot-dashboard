export interface DeviceSummary {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  alerts: number;
}

export interface DeviceStatus {
  id: string;
  name: string;
  status: "Online" | "Offline" | "Maintenance";
  value: string;
  lastSeen: string;
}

export interface DashboardState {
  summary: DeviceSummary;
  selectedDeviceId: string | null;
  devices: DeviceStatus[];
  loading: boolean;
  error: string | null;
}
