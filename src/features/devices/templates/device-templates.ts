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

  SMART_AC: "smart-ac-template",
  SMART_PLUG: "smart-plug-template",
  WATER_LEAK_SENSOR: "water-leak-sensor-template",
  SMART_CAMERA: "smart-camera-template",
  MOTION_SENSOR: "motion-sensor-template",
  GAS_SENSOR: "gas-sensor-template",
  SMOKE_DETECTOR: "smoke-detector-template",
  SMART_CURTAIN: "smart-curtain-template",
  AIR_QUALITY_SENSOR: "air-quality-sensor-template",
  SMART_SPEAKER: "smart-speaker-template",
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
  {
    id: DEVICE_TEMPLATE_IDS.DOOR_LOCK,
    name: "Smart Door Lock",
    type: "Sensor",
    capabilities: ["lock", "battery", "switch"],
    supportedWidgets: ["LockControlWidget", "BatteryStatusWidget"],
    telemetrySchema: [
      { key: "locked", label: "Locked", unit: "state", type: "boolean" },
      { key: "battery", label: "Battery", unit: "%", type: "number" },
      { key: "tamper", label: "Tamper", unit: "state", type: "boolean" },
    ],
    controlSchema: [{ key: "locked", label: "Door Lock", type: "switch" }],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [
      {
        id: "door-lock-alert",
        name: "Door Tamper Alert",
        trigger: "tamper",
        condition: {
          operator: "eq",
          threshold: 4,
        },
        action: {
          type: "alert",
          message: "Door tampering detected.",
        },
        enabled: true,
      },
    ],
    shadow: {
      desired: { locked: true },
      reported: { locked: true },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 82,
      signalQuality: 91,
      uptime: "12 days 3h",
      latencyMs: 20,
      lastSeen: "1 sec ago",
    },
  },
  {
    id: DEVICE_TEMPLATE_IDS.SMART_AC,
    name: "Smart AC",
    type: "Sensor",
    capabilities: ["switch", "temperature", "fan_speed", "signal_quality"],
    supportedWidgets: ["ThermostatWidget", "FanSpeedSliderWidget"],
    telemetrySchema: [
      { key: "power", label: "Power", unit: "state", type: "boolean" },
      { key: "temperature", label: "Temperature", unit: "°C", type: "number" },
      { key: "fan_speed", label: "Fan Speed", unit: "level", type: "number" },
      { key: "mode", label: "Mode", unit: "state", type: "string" },
    ],
    controlSchema: [
      { key: "power", label: "Power", type: "switch" },
      {
        key: "temperature",
        label: "Temperature",
        type: "slider",
        min: 16,
        max: 30,
      },
      {
        key: "fan_speed",
        label: "Fan Speed",
        type: "slider",
        min: 1,
        max: 5,
      },
    ],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [],
    shadow: {
      desired: {
        power: true,
        temperature: 24,
        fan_speed: 3,
      },
      reported: {
        power: true,
        temperature: 25,
        fan_speed: 3,
      },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 100,
      signalQuality: 94,
      uptime: "17 days 9h",
      latencyMs: 16,
      lastSeen: "1 sec ago",
    },
  },
  {
    id: DEVICE_TEMPLATE_IDS.SMART_PLUG,
    name: "Smart Plug",
    type: "Sensor",
    capabilities: ["switch", "energy", "door_state"],
    supportedWidgets: ["ToggleSwitchWidget", "EnergyMonitorWidget"],
    telemetrySchema: [
      { key: "power", label: "Power", unit: "state", type: "boolean" },
      { key: "energy", label: "Energy", unit: "W", type: "number" },
      { key: "voltage", label: "Voltage", unit: "V", type: "number" },
    ],
    controlSchema: [{ key: "power", label: "Power", type: "switch" }],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [],
    shadow: {
      desired: { power: true },
      reported: { power: true },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 100,
      signalQuality: 89,
      uptime: "9 days 5h",
      latencyMs: 18,
      lastSeen: "2 sec ago",
    },
  },
  {
    id: DEVICE_TEMPLATE_IDS.WATER_LEAK_SENSOR,
    name: "Water Leak Sensor",
    type: "Sensor",
    capabilities: ["battery", "temperature", "signal_quality"],
    supportedWidgets: ["WaterLeakWidget", "AlarmWidget"],
    telemetrySchema: [
      {
        key: "water_detected",
        label: "Water Detected",
        unit: "state",
        type: "boolean",
      },
      { key: "battery", label: "Battery", unit: "%", type: "number" },
    ],
    controlSchema: [{ key: "alarm", label: "Alarm", type: "switch" }],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state"],
    automationRules: [
      {
        id: "water-alert",
        name: "Water Leak Alert",
        trigger: "water_detected",
        condition: {
          operator: "eq",
          threshold: 1,
        },
        action: {
          type: "alert",
          message: "Water leakage detected.",
        },
        enabled: true,
      },
    ],
    shadow: {
      desired: { alarm: true },
      reported: { alarm: false },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 76,
      signalQuality: 87,
      uptime: "21 days 7h",
      latencyMs: 25,
      lastSeen: "4 sec ago",
    },
  },
  {
    id: DEVICE_TEMPLATE_IDS.SMART_CAMERA,
    name: "Smart Camera",
    type: "Sensor",
    capabilities: ["motion", "battery", "brightness"],
    supportedWidgets: ["CameraFeedWidget", "MotionDetectionWidget"],
    telemetrySchema: [
      { key: "motion", label: "Motion", unit: "state", type: "boolean" },
      {
        key: "recording",
        label: "Recording",
        unit: "state",
        type: "boolean",
      },
      { key: "storage", label: "Storage", unit: "%", type: "number" },
    ],
    controlSchema: [{ key: "recording", label: "Recording", type: "switch" }],
    mqttTopics: {
      telemetry: "site/{siteId}/device/{deviceId}/telemetry",
      command: "site/{siteId}/device/{deviceId}/command",
      state: "site/{siteId}/device/{deviceId}/state",
    },
    websocketChannels: ["telemetry", "state", "video"],
    automationRules: [],
    shadow: {
      desired: { recording: true },
      reported: { recording: true },
      lastUpdated: new Date().toISOString(),
      conflict: false,
    },
    health: {
      battery: 100,
      signalQuality: 93,
      uptime: "30 days 14h",
      latencyMs: 33,
      lastSeen: "1 sec ago",
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
