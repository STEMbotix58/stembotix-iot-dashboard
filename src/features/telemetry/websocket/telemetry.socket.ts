import websocketClient from "@/core/api/websocket-client";
import telemetryService from "../services/telemetry.service";
import loggerService from "@/core/services/logger.service";
import runtimeSubscriptionManager from "@/app/runtime/runtime-subscription.manager";

type WebSocketEnvelope = {
  type?: string;
  event?: string;
  channel?: string;
  deviceId?: string;
  device_id?: string;
  timestamp?: string;
  payload?: unknown;
  data?: unknown;
  metrics?: unknown;
  values?: unknown;
  readings?: unknown;
};

type PlainRecord = Record<string, unknown>;

const TELEMETRY_EVENT_TYPES = new Set([
  "telemetry",
  "telemetry:update",
  "telemetry.received",
  "telemetry:received",
  "device.telemetry",
  "device:telemetry",
]);

class TelemetrySocket {
  initialize() {
    if (
      this.unsubscribe ||
      runtimeSubscriptionManager.has("telemetry-websocket:messages")
    ) {
      return;
    }

    this.unsubscribe = websocketClient.subscribe((event) => {
      try {
        if (typeof event.data !== "string") {
          return;
        }

        const envelope = this.parseEnvelope(event.data);

        if (!this.isTelemetryEnvelope(envelope)) {
          return;
        }

        telemetryService.processIncoming(envelope, {
          source: "websocket",
          receivedAt: new Date().toISOString(),
        });
      } catch (error) {
        loggerService.error("Telemetry socket error", error);
      }
    });

    runtimeSubscriptionManager.register("telemetry-websocket:messages", () => {
      this.unsubscribe?.();
      this.unsubscribe = undefined;
    });
  }

  destroy() {
    runtimeSubscriptionManager.dispose("telemetry-websocket:messages");
  }

  private unsubscribe?: () => void;

  private parseEnvelope(raw: string): WebSocketEnvelope | null {
    try {
      return JSON.parse(raw) as WebSocketEnvelope;
    } catch {
      return null;
    }
  }

  private isTelemetryEnvelope(envelope: WebSocketEnvelope | null) {
    if (!envelope) return false;

    const eventType = this.normalizeEventType(
      envelope.type ?? envelope.event ?? envelope.channel,
    );

    if (eventType) {
      return TELEMETRY_EVENT_TYPES.has(eventType);
    }

    return this.hasTelemetryShape(envelope);
  }

  private hasTelemetryShape(envelope: WebSocketEnvelope) {
    const payload =
      this.asRecord(envelope.payload) ?? this.asRecord(envelope.data);

    return Boolean(
      envelope.deviceId ||
        envelope.device_id ||
        envelope.metrics ||
        envelope.values ||
        envelope.readings ||
        payload?.deviceId ||
        payload?.device_id ||
        payload?.metrics ||
        payload?.values ||
        payload?.readings,
    );
  }

  private normalizeEventType(value: unknown) {
    if (typeof value !== "string") return undefined;

    return value.trim().toLowerCase();
  }

  private asRecord(value: unknown): PlainRecord | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }

    return value as PlainRecord;
  }
}

export default new TelemetrySocket();
