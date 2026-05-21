import type { Device } from "@/entities/device/device.types";

export type DeviceGroup = {
  siteId: string;
  siteName: string;
  rooms: Array<{
    room: string;
    devices: Device[];
  }>;
};

export const dashboardLayoutService = {
  groupBySiteAndRoom(devices: Device[]): DeviceGroup[] {
    const siteMap = new Map<string, DeviceGroup>();

    devices.forEach((device) => {
      const siteId = device.siteId || "default-site";
      const siteName = device.siteId
        ? `Site ${device.siteId}`
        : "Unassigned Site";
      const roomName = device.room ?? "General";

      if (!siteMap.has(siteId)) {
        siteMap.set(siteId, {
          siteId,
          siteName,
          rooms: [],
        });
      }

      const group = siteMap.get(siteId)!;
      let room = group.rooms.find((item) => item.room === roomName);
      if (!room) {
        room = { room: roomName, devices: [] };
        group.rooms.push(room);
      }
      room.devices.push(device);
    });

    return Array.from(siteMap.values());
  },
};
