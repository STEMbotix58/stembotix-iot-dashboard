import type { DeviceCapability } from "./device.capabilities";

export type DeviceStatus = "Online" | "Offline" | "Maintenance";

export type DeviceType =
  | "Sensor"
  | "Camera"
  | "Gateway"
  | "Tracker"
  | "Meter"
  | "Temperature";

export type TelemetryFieldSchema = {
  key: string;
  label: string;
  unit: string;
  type: "number" | "string" | "boolean";
  min?: number;
  max?: number;
  options?: string[];
};

export type ControlFieldSchema = {
  key: string;
  label: string;
  type: "switch" | "slider" | "color" | "select" | "button";
  min?: number;
  max?: number;
  options?: string[];
};

export type DeviceMQTTTopics = {
  telemetry: string;
  command: string;
  state: string;
};

export type AutomationCondition = {
  operator: "gte" | "lte" | "eq" | "neq" | "time-window";
  threshold: number;
};

export type AutomationAction =
  | {
      type: "command";
      command: string;
      value?: string | number | boolean;
    }
  | {
      type: "alert";
      message: string;
    };

export type DeviceAutomationRule = {
  id: string;
  name: string;
  trigger: string;
  condition: AutomationCondition;
  action: AutomationAction;
  enabled: boolean;
};

export type DeviceShadowState = {
  desired: Record<string, unknown>;
  reported: Record<string, unknown>;
  lastUpdated: string;
  conflict: boolean;
};

export type DeviceHealth = {
  battery?: number;
  signalQuality?: number;
  uptime?: string;
  latencyMs?: number;
  lastSeen?: string;
};

export type Device = {
  id: string;
  name: string;
  siteId: string;
  room?: string;
  type: DeviceType;
  status: DeviceStatus;
  value: string;
  location: string;
  capabilities: DeviceCapability[];
  supportedWidgets: string[];
  telemetrySchema: TelemetryFieldSchema[];
  controlSchema: ControlFieldSchema[];
  mqttTopics: DeviceMQTTTopics;
  websocketChannels: string[];
  automationRules: DeviceAutomationRule[];
  shadow?: DeviceShadowState;
  health?: DeviceHealth;
  firmwareVersion?: string;
  lastSeen?: string;
  createdAt?: string;
};

export type DeviceTemplate = {
  id: string;
  name: string;
  type: DeviceType;
  capabilities: DeviceCapability[];
  supportedWidgets: string[];
  telemetrySchema: TelemetryFieldSchema[];
  controlSchema: ControlFieldSchema[];
  mqttTopics: DeviceMQTTTopics;
  websocketChannels: string[];
  automationRules: DeviceAutomationRule[];
  shadow: DeviceShadowState;
  health: DeviceHealth;
};

export type DevicePayload = {
  device_id: string;
  device_name: string;
  device_type: DeviceType;
  device_status: DeviceStatus;
  device_value: string;
  location: string;
  firmware_version?: string;
  last_seen?: string;
  created_at?: string;
  site_id?: string;
  room?: string;
  capabilities?: DeviceCapability[];
  supported_widgets?: string[];
  telemetry_schema?: TelemetryFieldSchema[];
  control_schema?: ControlFieldSchema[];
  mqtt_topics?: DeviceMQTTTopics;
  websocket_channels?: string[];
  automation_rules?: DeviceAutomationRule[];
  shadow?: DeviceShadowState;
  health?: DeviceHealth;
};
