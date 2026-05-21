import type { Device } from "@/entities/device/device.types";

export type { Device };

export type DevicesState = {
  devices: Device[];
  selectedDevice: Device | null;
  loading: boolean;
  error: string | null;
};
