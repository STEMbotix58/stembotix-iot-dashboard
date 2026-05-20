export type DeviceMonitoringPayload = {
  deviceId: string;
  online: boolean;
  temperature?: number;
  humidity?: number;
  voltage?: number;
};
