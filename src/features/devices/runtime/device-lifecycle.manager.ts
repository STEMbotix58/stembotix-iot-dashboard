import type { DeviceLifecycleState } from "./device-runtime.types";

class DeviceLifecycleManager {
  private lifecycle = new Map<string, DeviceLifecycleState>();

  initialize(deviceId: string) {
    if (this.lifecycle.has(deviceId)) {
      return;
    }

    this.lifecycle.set(deviceId, "initialized");
  }

  setOnline(deviceId: string) {
    this.lifecycle.set(deviceId, "online");
  }

  setOffline(deviceId: string) {
    this.lifecycle.set(deviceId, "offline");
  }

  decommission(deviceId: string) {
    this.lifecycle.set(deviceId, "decommissioned");
  }

  getState(deviceId: string): DeviceLifecycleState {
    return this.lifecycle.get(deviceId) ?? "registered";
  }
}

export default new DeviceLifecycleManager();
