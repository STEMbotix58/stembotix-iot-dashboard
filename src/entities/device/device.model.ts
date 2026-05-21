import type { Device, DeviceStatus } from "./device.types";

export class DeviceModel implements Device {
  id: string;
  name: string;
  type: Device["type"];
  status: DeviceStatus;
  value: string;
  location: string;
  siteId: string;
  room?: string;
  capabilities: Device["capabilities"];
  supportedWidgets: Device["supportedWidgets"];
  telemetrySchema: Device["telemetrySchema"];
  controlSchema: Device["controlSchema"];
  mqttTopics: Device["mqttTopics"];
  websocketChannels: Device["websocketChannels"];
  automationRules: Device["automationRules"];
  shadow: Device["shadow"];
  health: Device["health"];
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
    this.siteId = device.siteId;
    this.room = device.room;
    this.capabilities = device.capabilities;
    this.supportedWidgets = device.supportedWidgets;
    this.telemetrySchema = device.telemetrySchema;
    this.controlSchema = device.controlSchema;
    this.mqttTopics = device.mqttTopics;
    this.websocketChannels = device.websocketChannels;
    this.automationRules = device.automationRules;
    this.shadow = device.shadow;
    this.health = device.health;
    this.firmwareVersion = device.firmwareVersion;
    this.lastSeen = device.lastSeen;
    this.createdAt = device.createdAt;
  }

  isOnline() {
    return this.status === "Online";
  }

  isOffline() {
    return this.status === "Offline";
  }
}
