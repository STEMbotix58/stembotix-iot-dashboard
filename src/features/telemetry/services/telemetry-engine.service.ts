import { store } from "@/app/store";
import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import loggerService from "@/core/services/logger.service";
import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import { telemetryReceived } from "@/features/telemetry/store/telemetry.slice";
import telemetryStreamService from "@/features/telemetry/services/telemetry-stream.service";
import telemetryValidationService from "./telemetry-validation.service";
import deviceRuntimeManager from "@/features/devices/runtime/device-runtime.manager";

class TelemetryEngine {
  private buffer: Telemetry[] = [];

  private initialized = false;

  private processedTelemetry = new Map<string, number>();

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    runtimeSubscriptionManager.register(
      "telemetry-engine:normalized",
      eventBus.on<Telemetry>(RUNTIME_EVENTS.TELEMETRY_NORMALIZED, (telemetry) =>
        this.process(telemetry),
      ),
    );
  }

  destroy() {
    runtimeSubscriptionManager.dispose("telemetry-engine:normalized");
    this.initialized = false;
  }

  process(telemetry: Telemetry) {
    const validation = telemetryValidationService.validate(telemetry);

    if (!validation.valid) {
      loggerService.warn("Telemetry dropped by validation layer", {
        errors: validation.errors,
        telemetry,
      });
      return;
    }

    if (this.hasProcessed(telemetry.id)) {
      eventBus.emit(RUNTIME_EVENTS.TELEMETRY_DUPLICATE, telemetry);
      return;
    }

    this.markProcessed(telemetry.id);
    this.buffer.push(telemetry);

    if (this.buffer.length > 250) {
      this.buffer.shift();
    }

    store.dispatch(telemetryReceived(telemetry));
    this.syncShadow(telemetry);
    telemetryStreamService.emit(telemetry);
    eventBus.emit(RUNTIME_EVENTS.TELEMETRY_PROCESSED, telemetry);
  }

  getBuffer() {
    return [...this.buffer];
  }

  getRollingAverage(deviceId: string, metricKey: string, window = 5) {
    const metrics = this.buffer
      .filter((item) => item.deviceId === deviceId)
      .flatMap((item) => item.metrics)
      .filter((metric) => metric.key === metricKey)
      .slice(-window)
      .map((metric) => metric.value);

    if (!metrics.length) return null;

    return metrics.reduce((sum, value) => sum + value, 0) / metrics.length;
  }

  private syncShadow(telemetry: Telemetry) {
    const reportedState: Record<string, unknown> = {};

    telemetry.metrics.forEach((metric) => {
      if (
        [
          "power",
          "brightness",
          "temperature",
          "fan_speed",
          "locked",
          "doorState",
          "color",
        ].includes(metric.key)
      ) {
        reportedState[metric.key] = metric.value;
      }
    });

    if (Object.keys(reportedState).length) {
      deviceRuntimeManager.updateReportedState(telemetry.deviceId, reportedState);
      deviceRuntimeManager.setOnline(telemetry.deviceId);
    }
  }

  private hasProcessed(telemetryId: string) {
    this.pruneProcessed();

    return this.processedTelemetry.has(telemetryId);
  }

  private markProcessed(telemetryId: string) {
    this.processedTelemetry.set(telemetryId, Date.now());
    this.pruneProcessed();
  }

  private pruneProcessed() {
    const now = Date.now();
    const ttlMs = 2 * 60 * 1000;

    this.processedTelemetry.forEach((createdAt, telemetryId) => {
      if (now - createdAt > ttlMs) {
        this.processedTelemetry.delete(telemetryId);
      }
    });

    while (this.processedTelemetry.size > 500) {
      const oldest = this.processedTelemetry.keys().next().value;

      if (!oldest) return;

      this.processedTelemetry.delete(oldest);
    }
  }
}

export default new TelemetryEngine();
