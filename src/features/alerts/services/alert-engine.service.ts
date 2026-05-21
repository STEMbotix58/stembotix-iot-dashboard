import { store } from "@/app/store";
import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";
import eventBus from "@/core/events/event-bus";
import RUNTIME_EVENTS from "@/core/events/runtime-events";
import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import { appendAlert } from "@/features/alerts/store/alerts.slice";

type AlertPayload = {
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
};

class AlertEngine {
  private initialized = false;

  private alertCooldown = new Map<string, number>();

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    runtimeSubscriptionManager.register(
      "alert-engine:telemetry",
      eventBus.on<Telemetry>(RUNTIME_EVENTS.TELEMETRY_PROCESSED, (telemetry) =>
        this.evaluate(telemetry),
      ),
    );
  }

  destroy() {
    runtimeSubscriptionManager.dispose("alert-engine:telemetry");
    this.initialized = false;
  }

  evaluate(telemetry: Telemetry | null | undefined) {
    if (
      !telemetry ||
      typeof telemetry.deviceId !== "string" ||
      !Array.isArray(telemetry.metrics)
    ) {
      return;
    }

    telemetry.metrics.forEach((metric) => {
      if (
        !metric ||
        typeof metric.key !== "string" ||
        !Number.isFinite(metric.value)
      ) {
        return;
      }

      if (metric.key === "temperature" && metric.value >= 45) {
        this.emitAlert(
          telemetry.deviceId,
          {
            title: "High temperature detected",
            description: `Device ${telemetry.deviceId} is reporting ${metric.value} C.`,
            severity: "critical",
          },
          metric.key,
        );
      }

      if (metric.key === "voltage" && metric.value >= 240) {
        this.emitAlert(
          telemetry.deviceId,
          {
            title: "Voltage anomaly",
            description: `Device ${telemetry.deviceId} reported ${metric.value}V.`,
            severity: "warning",
          },
          metric.key,
        );
      }

      if (metric.key === "battery" && metric.value <= 20) {
        this.emitAlert(
          telemetry.deviceId,
          {
            title: "Low battery",
            description: `Device ${telemetry.deviceId} battery is ${metric.value}%.`,
            severity: "warning",
          },
          metric.key,
        );
      }
    });
  }

  private emitAlert(deviceId: string, payload: AlertPayload, metricKey: string) {
    if (this.isCoolingDown(deviceId, metricKey, payload.severity)) {
      return;
    }

    const alert = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      deviceId,
      ...payload,
    };

    store.dispatch(appendAlert(alert));
    eventBus.emit(RUNTIME_EVENTS.ALERT_CREATED, alert);
  }

  private isCoolingDown(
    deviceId: string,
    metricKey: string,
    severity: AlertPayload["severity"],
  ) {
    const key = `${deviceId}:${metricKey}:${severity}`;
    const now = Date.now();
    const cooldownMs = 60_000;
    const previous = this.alertCooldown.get(key);

    if (previous && now - previous < cooldownMs) {
      return true;
    }

    this.alertCooldown.set(key, now);
    return false;
  }
}

export default new AlertEngine();
