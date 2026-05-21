import type { Device } from "@/entities/device/device.types";
import type { DeviceTemplateSource } from "@/features/devices/templates/device-templates";
import type { DeviceCapability } from "@/entities/device/device.capabilities";

export type DeviceLifecycleState =
  | "registered"
  | "initialized"
  | "online"
  | "offline"
  | "decommissioned";

export type DeviceRuntimeProfile = {
  lifecycle: DeviceLifecycleState;
  registeredAt: string;
  lastKnownState?: string;
  lastSeenAt?: string;
  widgetBindings: string[];
  capabilityMap: Record<DeviceCapability, boolean>;
};

export type RuntimeDevice = Device & {
  runtime: DeviceRuntimeProfile;
};

export type DeviceDefinitionSource = DeviceTemplateSource;
