import type { Device } from "@/entities/device/device.types";
import type { DeviceCapability } from "@/entities/device/device.capabilities";
import { DEVICE_CAPABILITIES } from "@/entities/device/device.capabilities";

type CapabilityDefinition = {
  id: DeviceCapability;
  label: string;
  widgetType: string;
  description: string;
};

export const capabilityDefinitions: CapabilityDefinition[] = [
  {
    id: "switch",
    label: "Switch",
    widgetType: "ToggleWidget",
    description: "Binary on/off control.",
  },
  {
    id: "brightness",
    label: "Brightness",
    widgetType: "SliderWidget",
    description: "Brightness control for lights.",
  },
  {
    id: "rgb",
    label: "RGB Color",
    widgetType: "RGBWidget",
    description: "Color control for RGB lighting.",
  },
  {
    id: "temperature",
    label: "Temperature",
    widgetType: "GaugeWidget",
    description: "Temperature telemetry feed.",
  },
  {
    id: "fan_speed",
    label: "Fan Speed",
    widgetType: "FanSpeedWidget",
    description: "Fan speed control.",
  },
  {
    id: "lock",
    label: "Lock",
    widgetType: "LockWidget",
    description: "Door lock state control.",
  },
  {
    id: "power",
    label: "Power",
    widgetType: "PowerWidget",
    description: "Power consumption and state.",
  },
  {
    id: "smart_plug",
    label: "Smart Plug",
    widgetType: "PlugWidget",
    description: "Smart plug control.",
  },
  {
    id: "motion",
    label: "Motion",
    widgetType: "MotionWidget",
    description: "Motion presence telemetry.",
  },
  {
    id: "energy",
    label: "Energy",
    widgetType: "EnergyWidget",
    description: "Energy telemetry and graphing.",
  },
  {
    id: "air_quality",
    label: "Air Quality",
    widgetType: "AirQualityWidget",
    description: "Air quality telemetry.",
  },
  {
    id: "door_state",
    label: "Door State",
    widgetType: "DoorStateWidget",
    description: "Door open/closed telemetry.",
  },
  {
    id: "battery",
    label: "Battery",
    widgetType: "BatteryWidget",
    description: "Battery level telemetry.",
  },
  {
    id: "signal_quality",
    label: "Signal Quality",
    widgetType: "SignalQualityWidget",
    description: "Device signal quality metrics.",
  },
];

export const deviceCapabilityEngine = {
  getDefinition(capability: DeviceCapability) {
    return capabilityDefinitions.find((entry) => entry.id === capability);
  },

  resolveCapabilityBindings(device: Device) {
    return device.capabilities
      .map((capability) => this.getDefinition(capability)?.widgetType)
      .filter(Boolean) as string[];
  },

  buildCapabilityMap(device: Device) {
    return DEVICE_CAPABILITIES.reduce<Record<DeviceCapability, boolean>>(
      (map, capability) => ({
        ...map,
        [capability]: device.capabilities.includes(capability),
      }),
      {} as Record<DeviceCapability, boolean>,
    );
  },

  hasCapability(device: Device, capability: DeviceCapability) {
    return device.capabilities.includes(capability);
  },
};
