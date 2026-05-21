import type {
  Device,
  DeviceMQTTTopics,
  DeviceShadowState,
} from "@/entities/device/device.types";
import { deviceCapabilityEngine } from "./device-capability.engine";

const defaultMQTTTopics = {
  telemetry: "site/{siteId}/device/{deviceId}/telemetry",
  command: "site/{siteId}/device/{deviceId}/command",
  state: "site/{siteId}/device/{deviceId}/state",
};

const interpolateTopic = (template: string, device: Device) =>
  template.replace("{siteId}", device.siteId).replace("{deviceId}", device.id);

const buildShadowState = (device: Device): DeviceShadowState => ({
  desired: device.shadow?.desired ?? {},
  reported: device.shadow?.reported ?? {},
  lastUpdated: device.shadow?.lastUpdated ?? new Date().toISOString(),
  conflict: device.shadow?.conflict ?? false,
});

export const deviceMetadataEngine = {
  resolveTelemetrySchema(device: Device) {
    return device.telemetrySchema;
  },

  resolveControlSchema(device: Device) {
    return device.controlSchema;
  },

  resolveMQTTTopics(device: Device): DeviceMQTTTopics {
    const topics = device.mqttTopics ?? defaultMQTTTopics;
    return {
      telemetry: interpolateTopic(topics.telemetry, device),
      command: interpolateTopic(topics.command, device),
      state: interpolateTopic(topics.state, device),
    };
  },

  resolveWebsocketChannels(device: Device) {
    return device.websocketChannels?.length
      ? device.websocketChannels
      : ["telemetry", "state"];
  },

  resolveWidgetBindings(device: Device) {
    return deviceCapabilityEngine.resolveCapabilityBindings(device);
  },

  resolveShadowState(device: Device) {
    return buildShadowState(device);
  },
};
