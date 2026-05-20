import type { ApiResponse } from "@/core/types/api.types";

import type { Device } from "@/entities/device/device.types";

type DevicesResponse = ApiResponse<Device[]>;

export const devicesApi = {
  getDevices: async (): Promise<DevicesResponse> => {
    return {
      success: true,

      message: "Devices fetched successfully",

      data: [
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
          type: "Sensor",
          location: "Warehouse",
          status: "Offline",
          value: "65%",
          lastSeen: "5 min ago",
        },
        {
          id: "DEV-003",
          name: "Power Meter",
          type: "Meter",
          location: "Grid Station",
          status: "Maintenance",
          value: "220V",
          lastSeen: "10 sec ago",
        },
      ],
    };
  },
};
