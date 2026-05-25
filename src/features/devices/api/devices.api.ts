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
      {
        id: "DEV-004",
        name: "Door Lock D1",
        type: "Sensor",
        location: "Head Office",
        status: "Online",
        value: "Locked",
        lastSeen: "1 sec ago",
        siteId: "site-003",
        room: "Main Entrance",
        templateId: deviceTemplates[3].id,
      },
      {
        id: "DEV-005",
        name: "Smart AC AC-12",
        type: "Sensor",
        location: "Corporate Office",
        status: "Online",
        value: "22°C Cooling",
        lastSeen: "3 sec ago",
        siteId: "site-001",
        room: "Conference Room",
        templateId: deviceTemplates[4].id,
      },
      {
        id: "DEV-006",
        name: "Smart Plug P9",
        type: "Sensor",
        location: "Warehouse",
        status: "Offline",
        value: "Off",
        lastSeen: "4 min ago",
        siteId: "site-002",
        room: "Charging Station",
        templateId: deviceTemplates[5].id,
      },
      {
        id: "DEV-007",
        name: "Water Leak Sensor W2",
        type: "Sensor",
        location: "Factory B",
        status: "Online",
        value: "No Leak",
        lastSeen: "5 sec ago",
        siteId: "site-004",
        room: "Basement",
        templateId: deviceTemplates[6].id,
      },
      {
        id: "DEV-008",
        name: "Smart Camera C5",
        type: "Sensor",
        location: "Factory Gate",
        status: "Online",
        value: "Recording",
        lastSeen: "1 sec ago",
        siteId: "site-002",
        room: "Security Room",
        templateId: deviceTemplates[7].id,
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
