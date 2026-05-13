import type { Device } from "../store/devices.types";

export const devicesApi = {
  getDevices: async (): Promise<Device[]> => {
    return [
      {
        id: "DEV-001",
        name: "Temperature Sensor",
        type: "Temperature",
        location: "Factory A",
        status: "Online",
        value: "24°C",
        lastSeen: "2 sec ago",
      },

      {
        id: "DEV-002",
        name: "Humidity Sensor",
        type: "Humidity",
        location: "Warehouse",
        status: "Offline",
        value: "65%",
        lastSeen: "5 min ago",
      },

      {
        id: "DEV-003",
        name: "Power Meter",
        type: "Energy",
        location: "Grid Station",
        status: "Maintenance",
        value: "220V",
        lastSeen: "10 sec ago",
      },
    ];
  },
};
