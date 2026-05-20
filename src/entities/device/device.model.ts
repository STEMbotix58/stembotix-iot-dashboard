import type { Device, DeviceStatus } from "./device.types";

export class DeviceModel implements Device {
  id: string;
  name: string;
  type: Device["type"];
  status: DeviceStatus;
  value: string;
  location?: string;
  firmwareVersion?: string;
  lastSeen?: string;
  createdAt?: string;

  constructor(device: Device) {
    this.id = device.id;
    this.name = device.name;
    this.type = device.type;
    this.status = device.status;
    this.value = device.value;
    this.location = device.location;
    this.firmwareVersion = device.firmwareVersion;
    this.lastSeen = device.lastSeen;
    this.createdAt = device.createdAt;
  }

  isOnline() {
    return this.status === "online";
  }

  isOffline() {
    return this.status === "offline";
  }
}
