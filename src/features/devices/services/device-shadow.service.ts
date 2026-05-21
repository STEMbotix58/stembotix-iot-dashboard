import type { DeviceShadowState } from "@/entities/device/device.types";

class DeviceShadowService {
  private shadows = new Map<string, DeviceShadowState>();

  getShadow(deviceId: string): DeviceShadowState {
    if (!this.shadows.has(deviceId)) {
      this.shadows.set(deviceId, {
        desired: {},
        reported: {},
        lastUpdated: new Date().toISOString(),
        conflict: false,
      });
    }

    return this.shadows.get(deviceId)!;
  }

  updateDesired(deviceId: string, desired: Record<string, unknown>) {
    const current = this.getShadow(deviceId);
    const merged = {
      ...current.desired,
      ...desired,
    };

    const conflict = Object.keys(merged).some(
      (key) =>
        current.reported[key] !== undefined &&
        current.reported[key] !== merged[key],
    );

    this.shadows.set(deviceId, {
      ...current,
      desired: merged,
      lastUpdated: new Date().toISOString(),
      conflict,
    });
  }

  updateReported(deviceId: string, reported: Record<string, unknown>) {
    const current = this.getShadow(deviceId);
    const merged = {
      ...current.reported,
      ...reported,
    };
    const conflict = Object.keys(current.desired).some(
      (key) =>
        current.desired[key] !== undefined &&
        current.desired[key] !== merged[key],
    );

    this.shadows.set(deviceId, {
      ...current,
      reported: merged,
      lastUpdated: new Date().toISOString(),
      conflict,
    });
  }

  reconcile(deviceId: string, reported: Record<string, unknown>) {
    this.updateReported(deviceId, reported);
    const current = this.getShadow(deviceId);
    if (current.conflict) {
      this.shadows.set(deviceId, {
        ...current,
        conflict: false,
        lastUpdated: new Date().toISOString(),
      });
    }
  }
}

export default new DeviceShadowService();
