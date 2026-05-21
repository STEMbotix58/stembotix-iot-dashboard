import type { Device } from "@/entities/device/device.types";
import type { DeviceTemplateSource } from "@/features/devices/templates/device-templates";
import type { RuntimeDevice } from "./device-runtime.types";
import { devicesApi } from "@/features/devices/api/devices.api";
import { applyDeviceTemplate } from "@/features/devices/templates/device-templates";
import deviceRegistry from "./device-registry";
import deviceLifecycleManager from "./device-lifecycle.manager";
import { deviceMetadataEngine } from "./device-metadata.engine";
import deviceShadowService from "@/features/devices/services/device-shadow.service";
import { deviceCapabilityEngine } from "./device-capability.engine";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";

class DeviceRuntimeManager {
  private initialized = false;
  private initializePromise: Promise<void> | null = null;
  async initialize() {
    if (this.initialized) {
      return;
    }

    if (this.initializePromise) {
      return this.initializePromise;
    }

    this.initializePromise = this.loadDevices()
      .then((devices) => {
        devices.forEach((device) => {
          this.registerRuntimeDevice(device);
        });
        this.initialized = true;
        eventBus.emit(RUNTIME_EVENTS.DEVICE_RUNTIME_READY, this.listDevices());
      })
      .finally(() => {
        this.initializePromise = null;
      });

    return this.initializePromise;
  }

  async loadDevices() {
    const response = await devicesApi.getDevices();
    return response.data.map((device) => this.buildRuntimeDevice(device));
  }

  buildRuntimeDevice(device: Device): RuntimeDevice {
    const runtimeProfile = {
      lifecycle:
        device.status === "Online" ? ("online" as const) : ("offline" as const),
      registeredAt: new Date().toISOString(),
      lastKnownState: device.value,
      lastSeenAt: device.lastSeen,
      widgetBindings: deviceMetadataEngine.resolveWidgetBindings(device),
      capabilityMap: deviceCapabilityEngine.buildCapabilityMap(device),
    };

    const topics = deviceMetadataEngine.resolveMQTTTopics(device);
    const websocketChannels =
      deviceMetadataEngine.resolveWebsocketChannels(device);
    const shadow = deviceMetadataEngine.resolveShadowState(device);

    return {
      ...device,
      mqttTopics: topics,
      websocketChannels,
      shadow,
      runtime: runtimeProfile,
    };
  }

  getDevice(deviceId: string) {
    return deviceRegistry.get(deviceId);
  }

  listDevices() {
    return deviceRegistry.list();
  }

  registerDeviceSource(device: DeviceTemplateSource) {
    const templatedDevice = applyDeviceTemplate(device, device.templateId);
    const deviceWithTemplate = this.buildRuntimeDevice(templatedDevice);
    this.registerRuntimeDevice(deviceWithTemplate);
    return deviceWithTemplate;
  }

  updateReportedState(deviceId: string, reported: Record<string, unknown>) {
    const runtimeDevice = this.getDevice(deviceId);
    if (!runtimeDevice) {
      return null;
    }

    // Reconcile shadow state
    deviceShadowService.reconcile(deviceId, reported);
    const nextShadow = deviceShadowService.getShadow(deviceId);
    // IMMUTABLE UPDATE
    const updatedRuntimeDevice = {
      ...runtimeDevice,
      shadow: {
        ...(nextShadow ?? {}),
      },
      runtime: {
        ...(runtimeDevice.runtime ?? {}),
        lastKnownState: JSON.stringify(reported),
        lastSeenAt: new Date().toISOString(),
      },
    };

    // Replace in registry
    deviceRegistry.register(updatedRuntimeDevice);
    eventBus.emit(RUNTIME_EVENTS.DEVICE_UPDATED, updatedRuntimeDevice);
    return updatedRuntimeDevice;
  }

  updateDesiredState(deviceId: string, desired: Record<string, unknown>) {
    const runtimeDevice = this.getDevice(deviceId);
    if (!runtimeDevice) {
      return null;
    }
    deviceShadowService.updateDesired(deviceId, desired);
    const nextShadow = deviceShadowService.getShadow(deviceId);
    // IMMUTABLE UPDATE
    const updatedRuntimeDevice = {
      ...runtimeDevice,
      shadow: {
        ...(nextShadow ?? {}),
      },
      runtime: {
        ...(runtimeDevice.runtime ?? {}),
        lastKnownState: JSON.stringify(desired),
      },
    };

    deviceRegistry.register(updatedRuntimeDevice);
    eventBus.emit(RUNTIME_EVENTS.DEVICE_UPDATED, updatedRuntimeDevice);
    return updatedRuntimeDevice;
  }

  setOnline(deviceId: string) {
    deviceLifecycleManager.setOnline(deviceId);
    const runtimeDevice = this.getDevice(deviceId);
    if (!runtimeDevice) {
      return;
    }

    const updatedRuntimeDevice = {
      ...runtimeDevice,
      status: "Online" as const,
      runtime: {
        ...runtimeDevice.runtime,
        lifecycle: "online" as const,
        lastSeenAt: new Date().toISOString(),
      },
    };

    deviceRegistry.register(updatedRuntimeDevice);
    eventBus.emit(RUNTIME_EVENTS.DEVICE_UPDATED, updatedRuntimeDevice);
  }

  setOffline(deviceId: string) {
    deviceLifecycleManager.setOffline(deviceId);
    const runtimeDevice = this.getDevice(deviceId);
    if (!runtimeDevice) {
      return;
    }

    const updatedRuntimeDevice = {
      ...runtimeDevice,
      status: "Offline" as const,
      runtime: {
        ...runtimeDevice.runtime,
        lifecycle: "offline" as const,
      },
    };

    deviceRegistry.register(updatedRuntimeDevice);
    eventBus.emit(RUNTIME_EVENTS.DEVICE_UPDATED, updatedRuntimeDevice);
  }

  getLifecycle(deviceId: string) {
    return deviceLifecycleManager.getState(deviceId);
  }

  isInitialized() {
    return this.initialized;
  }

  private registerRuntimeDevice(device: RuntimeDevice) {
    const registeredDevice = deviceRegistry.register(device);
    deviceLifecycleManager.initialize(device.id);
    const updatedRuntimeDevice = {
      ...registeredDevice,
      runtime: {
        ...registeredDevice.runtime,
        lifecycle:
          device.status === "Online" ? ("online" as const) : ("offline" as const),
      },
    };

    if (device.status === "Online") {
      deviceLifecycleManager.setOnline(device.id);
    } else {
      deviceLifecycleManager.setOffline(device.id);
    }

    deviceRegistry.register(updatedRuntimeDevice);
    eventBus.emit(RUNTIME_EVENTS.DEVICE_UPDATED, updatedRuntimeDevice);
    return updatedRuntimeDevice;
  }
}
export default new DeviceRuntimeManager();
