import type { ApiResponse } from "@/core/types/api.types";

import type { Device } from "@/entities/device/device.types";
import type { DeviceTemplateSource } from "@/features/devices/templates/device-templates";
import {
  deviceTemplates,
  applyDeviceTemplate,
} from "@/features/devices/templates/device-templates";

type DevicesResponse = ApiResponse<Device[]>;

export const devicesApi = {
  getDevices: async (): Promise<DevicesResponse> => {
    const rawDevices: DeviceTemplateSource[] = [
      {
        id: "DEV-001",
        name: "Temperature Sensor A1",
        type: "Temperature",
        location: "Factory A",
        status: "Online",
        value: "24°C",
        lastSeen: "2 sec ago",
        siteId: "site-001",
        room: "Production",
        templateId: deviceTemplates[0].id,
      },
      {
        id: "DEV-002",
        name: "Smart Light L4",
        type: "Sensor",
        location: "Factory A",
        status: "Online",
        value: "On",
        lastSeen: "6 sec ago",
        siteId: "site-001",
        room: "Assembly",
        templateId: deviceTemplates[1].id,
      },
      {
        id: "DEV-003",
        name: "Smart Fan F3",
        type: "Sensor",
        location: "Warehouse",
        status: "Online",
        value: "Level 3",
        lastSeen: "10 sec ago",
        siteId: "site-002",
        room: "Storage",
        templateId: deviceTemplates[2].id,
      },
    ];

    const devices = rawDevices.map((device) =>
      applyDeviceTemplate(device, device.templateId),
    );

    return {
      success: true,
      message: "Devices fetched successfully",
      data: devices,
    };
  },
};
