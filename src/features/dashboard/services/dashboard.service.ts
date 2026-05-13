import type { DeviceStatus, DeviceSummary } from "../types/dashboard.types";

// Mock service (replace with real API later)
export const dashboardService = {
  getSummary: async (): Promise<DeviceSummary> => {
    return {
      totalDevices: 128,
      onlineDevices: 104,
      offlineDevices: 24,
      alerts: 7,
    };
  },

  getDevices: async (): Promise<DeviceStatus[]> => {
    return [
      {
        id: "DEV-001",
        name: "Temperature Sensor",
        status: "Online",
        value: "24°C",
        lastSeen: "2 sec ago",
      },
      {
        id: "DEV-002",
        name: "Humidity Sensor",
        status: "Offline",
        value: "68%",
        lastSeen: "5 min ago",
      },
      {
        id: "DEV-003",
        name: "Power Meter",
        status: "Online",
        value: "220V",
        lastSeen: "1 sec ago",
      },
    ];
  },
};
