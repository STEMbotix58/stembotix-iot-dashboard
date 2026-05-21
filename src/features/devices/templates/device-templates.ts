import type {
  Device,
  DeviceTemplate,
} from "../../../entities/device/device.types";

export const DEVICE_TEMPLATE_IDS = {
  TEMPERATURE_SENSOR: "temperature-sensor-template",
  SMART_LIGHT: "smart-light-template",
  SMART_FAN: "smart-fan-template",
  DOOR_LOCK: "door-lock-template",
  THERMOSTAT: "thermostat-template",
} as const;

export const deviceTemplates: DeviceTemplate[] = [
  {
    id: DEVICE_TEMPLATE_IDS.TEMPERATURE_SENSOR,
    name: "Temperature Sensor",
    type: "Temperature",
    capabilities: ["temperature", "battery", "signal_quality"],
    supportedWidgets: ["ThermostatWidget"],
    telemetrySchema: [
      { key: "temperature", label: "Temperature", unit: "°C", type: "number" },
      { key: "battery", label: "Battery", unit: "%", type: "number" },
      {
        key: "signal_quality",
        label: "Signal Quality",
        unit: "%",
        type: "number",
      },
    ],
    controlSchema: [
      {
        key: "temperature",
        label: "Temperature Setpoint",
        type: "slider",
        min: 16,
        max: 35,
      },
    ],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [
      {
        id: "temp-high-alert",
        name: "High Temperature Alert",
        trigger: "temperature",
        condition: {
          operator: "gte",
          threshold: 45,
        },
        action: {
          type: "alert",
          message: "Temperature exceeded safe operational limits.",
        },
        enabled: true,
      },
    ],
    shadow: {
      desired: { temperature: 22 },
      reported: { temperature: 24 },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 96,
      signalQuality: 92,
      uptime: "6 days 14h",
      latencyMs: 22,
      lastSeen: "2 sec ago",
    },
  },
  {
    id: DEVICE_TEMPLATE_IDS.SMART_LIGHT,
    name: "Smart Light",
    type: "Sensor",
    capabilities: ["switch", "brightness", "rgb", "energy"],
    supportedWidgets: [
      "ToggleSwitchWidget",
      "LightControlWidget",
      "RGBLightWidget",
    ],
    telemetrySchema: [
      { key: "power", label: "Power", unit: "state", type: "boolean" },
      { key: "brightness", label: "Brightness", unit: "%", type: "number" },
      { key: "energy", label: "Energy", unit: "W", type: "number" },
      { key: "color", label: "Color", unit: "hex", type: "string" },
    ],
    controlSchema: [
      { key: "power", label: "Power", type: "switch" },
      {
        key: "brightness",
        label: "Brightness",
        type: "slider",
        min: 0,
        max: 100,
      },
      { key: "color", label: "Light Color", type: "color" },
    ],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [
      {
        id: "light-eco-schedule",
        name: "Evening Light Economy",
        trigger: "schedule",
        condition: {
          operator: "time-window",
          threshold: 20,
        },
        action: {
          type: "command",
          command: "SET_BRIGHTNESS",
          value: 30,
        },
        enabled: true,
      },
    ],
    shadow: {
      desired: { power: true, brightness: 60, color: "#7c3aed" },
      reported: { power: true, brightness: 60, color: "#7c3aed" },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 100,
      signalQuality: 98,
      uptime: "3 days 4h",
      latencyMs: 18,
      lastSeen: "1 sec ago",
    },
  },
  {
    id: DEVICE_TEMPLATE_IDS.SMART_FAN,
    name: "Smart Fan",
    type: "Sensor",
    capabilities: ["switch", "fan_speed", "motion"],
    supportedWidgets: [
      "ToggleSwitchWidget",
      "FanSpeedSliderWidget",
      "MotionControlWidget",
    ],
    telemetrySchema: [
      { key: "power", label: "Power", unit: "state", type: "boolean" },
      { key: "fan_speed", label: "Fan Speed", unit: "level", type: "number" },
      { key: "motion", label: "Motion", unit: "state", type: "boolean" },
    ],
    controlSchema: [
      { key: "power", label: "Power", type: "switch" },
      { key: "fan_speed", label: "Fan Speed", type: "slider", min: 0, max: 5 },
    ],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [],
    shadow: {
      desired: { power: true, fanSpeed: 3 },
      reported: { power: true, fanSpeed: 3 },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 100,
      signalQuality: 90,
      uptime: "8 days 12h",
      latencyMs: 32,
      lastSeen: "3 sec ago",
    },
  },
];

export const getDeviceTemplate = (
  templateId: string,
): DeviceTemplate | undefined =>
  deviceTemplates.find((template) => template.id === templateId);

export type DeviceTemplateSource = Omit<
  Device,
  | "capabilities"
  | "supportedWidgets"
  | "telemetrySchema"
  | "controlSchema"
  | "mqttTopics"
  | "websocketChannels"
  | "automationRules"
  | "shadow"
  | "health"
> & {
  templateId: string;
};

export const applyDeviceTemplate = (
  device: DeviceTemplateSource,
  templateId: string,
): Device => {
  const template = getDeviceTemplate(templateId);
  if (!template) return device as unknown as Device;

  return {
    ...device,
    capabilities: template.capabilities,
    supportedWidgets: template.supportedWidgets,
    telemetrySchema: template.telemetrySchema,
    controlSchema: template.controlSchema,
    mqttTopics: template.mqttTopics,
    websocketChannels: template.websocketChannels,
    automationRules: template.automationRules,
    shadow: template.shadow,
    health: template.health,
  };
};
