import type { RuntimeDevice } from "./device-runtime.types";

class DeviceRegistry {
  private devices = new Map<string, RuntimeDevice>();

  register(device: RuntimeDevice) {
    this.devices.set(device.id, device);
    return device;
  }

  unregister(deviceId: string) {
    this.devices.delete(deviceId);
  }

  get(deviceId: string) {
    return this.devices.get(deviceId);
  }

  list() {
    return Array.from(this.devices.values());
  }

  has(deviceId: string) {
    return this.devices.has(deviceId);
  }
}

export default new DeviceRegistry();
