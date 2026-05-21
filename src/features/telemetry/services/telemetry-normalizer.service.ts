import type { Telemetry } from "@/entities/telemetry/telemetry.types";
import telemetryValidationService from "./telemetry-validation.service";

export type TelemetrySource = "websocket" | "mqtt" | "http" | "runtime";

export type TelemetryNormalizationContext = {
  source: TelemetrySource;
  topic?: string;
  receivedAt?: string;
  fallbackDeviceId?: string;
};

export type TelemetryNormalizationResult =
  | {
      ok: true;
      telemetry: Telemetry;
      source: TelemetrySource;
      topic?: string;
    }
  | {
      ok: false;
      errors: string[];
      source: TelemetrySource;
      topic?: string;
      raw: unknown;
    };

type PlainRecord = Record<string, unknown>;

const METADATA_KEYS = new Set([
  "id",
  "telemetryId",
  "telemetry_id",
  "messageId",
  "message_id",
  "deviceId",
  "device_id",
  "deviceID",
  "timestamp",
  "createdAt",
  "created_at",
  "time",
  "ts",
  "type",
  "event",
  "payload",
  "data",
  "metrics",
  "device",
  "siteId",
  "site_id",
  "values",
  "readings",
  "sensors",
]);

class TelemetryNormalizerService {
  normalize(
    raw: unknown,
    context: TelemetryNormalizationContext,
  ): TelemetryNormalizationResult {
    const decoded = this.decode(raw);

    if (!decoded.ok) {
      return {
        ok: false,
        errors: [decoded.error],
        source: context.source,
        topic: context.topic,
        raw,
      };
    }

    const envelope = this.asRecord(decoded.value);
    const payload = this.unwrapPayload(decoded.value);

    if (!payload) {
      return {
        ok: false,
        errors: ["Telemetry payload is not an object"],
        source: context.source,
        topic: context.topic,
        raw: decoded.value,
      };
    }

    const merged = {
      ...(envelope ?? {}),
      ...payload,
    };

    const deviceId =
      this.readString(merged.deviceId) ??
      this.readString(merged.device_id) ??
      this.readString(merged.deviceID) ??
      this.readString(this.asRecord(merged.device)?.id) ??
      this.inferDeviceIdFromTopic(context.topic) ??
      context.fallbackDeviceId;

    const metrics = this.normalizeMetrics(merged);
    const timestamp = this.normalizeTimestamp(
      merged.timestamp ?? merged.createdAt ?? merged.created_at ?? merged.ts,
      context.receivedAt,
    );

    if (!deviceId) {
      return {
        ok: false,
        errors: ["Telemetry deviceId is missing"],
        source: context.source,
        topic: context.topic,
        raw: decoded.value,
      };
    }

    const telemetry: Telemetry = {
      id:
        this.readString(merged.telemetryId) ??
        this.readString(merged.telemetry_id) ??
        this.readString(merged.messageId) ??
        this.readString(merged.message_id) ??
        this.readString(merged.id) ??
        this.buildTelemetryId(deviceId, timestamp, metrics),
      deviceId,
      timestamp,
      metrics,
    };

    const validation = telemetryValidationService.validate(telemetry);

    if (!validation.valid) {
      return {
        ok: false,
        errors: validation.errors,
        source: context.source,
        topic: context.topic,
        raw: decoded.value,
      };
    }

    return {
      ok: true,
      telemetry,
      source: context.source,
      topic: context.topic,
    };
  }

  private decode(raw: unknown):
    | {
        ok: true;
        value: unknown;
      }
    | {
        ok: false;
        error: string;
      } {
    if (typeof raw !== "string") {
      return {
        ok: true,
        value: raw,
      };
    }

    try {
      return {
        ok: true,
        value: JSON.parse(raw),
      };
    } catch {
      return {
        ok: false,
        error: "Telemetry payload is not valid JSON",
      };
    }
  }

  private unwrapPayload(value: unknown): PlainRecord | null {
    const record = this.asRecord(value);

    if (!record) return null;

    const nested =
      record.payload ??
      record.data ??
      record.telemetry ??
      record.values ??
      record.readings ??
      record.sensors;
    const decodedNested = this.decodeNestedRecord(nested);
    const nestedRecord = this.asRecord(decodedNested);

    if (!nestedRecord) {
      return record;
    }

    return nestedRecord;
  }

  private normalizeMetrics(payload: PlainRecord) {
    const rawMetrics =
      payload.metrics ?? payload.values ?? payload.readings ?? payload.sensors;
    const metricRecord = this.asRecord(rawMetrics);
    const metrics = Array.isArray(rawMetrics)
      ? rawMetrics.flatMap((metric) => this.metricFromArrayItem(metric))
      : metricRecord
        ? this.metricsFromRecord(metricRecord)
        : this.metricsFromRecord(payload);

    const uniqueMetrics = new Map<
      string,
      { key: string; value: number; unit?: string }
    >();

    metrics.forEach((metric) => {
      uniqueMetrics.set(metric.key, metric);
    });

    return Array.from(uniqueMetrics.values());
  }

  private metricFromArrayItem(metric: unknown) {
    const record = this.asRecord(metric);

    if (!record) return [];

    const key =
      this.readString(record.key) ??
      this.readString(record.name) ??
      this.readString(record.id);
    const value = this.normalizeValue(record.value ?? record.v);

    if (!key || value === null) {
      return [];
    }

    const normalizedMetric: { key: string; value: number; unit?: string } = {
      key,
      value,
    };
    const unit = this.readString(record.unit);

    if (unit) {
      normalizedMetric.unit = unit;
    }

    return [normalizedMetric];
  }

  private metricsFromRecord(record: PlainRecord) {
    return Object.entries(record).flatMap(([key, value]) => {
      if (METADATA_KEYS.has(key)) return [];

      const normalizedValue = this.normalizeValue(value);

      if (normalizedValue === null) return [];

      return [
        {
          key,
          value: normalizedValue,
        },
      ];
    });
  }

  private normalizeValue(value: unknown) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }

    if (typeof value !== "string") {
      return null;
    }

    const normalized = value.trim().toLowerCase();

    if (["true", "on", "online", "open", "locked"].includes(normalized)) {
      return 1;
    }

    if (["false", "off", "offline", "closed", "unlocked"].includes(normalized)) {
      return 0;
    }

    const numeric = Number(normalized);

    if (Number.isFinite(numeric)) {
      return numeric;
    }

    const numericWithUnit = normalized.match(/-?\d+(?:\.\d+)?/);

    if (!numericWithUnit) {
      return null;
    }

    const parsed = Number(numericWithUnit[0]);

    return Number.isFinite(parsed) ? parsed : null;
  }

  private normalizeTimestamp(value: unknown, fallback?: string) {
    const timestampValue =
      typeof value === "number" ? new Date(value).toISOString() : value;

    if (
      typeof timestampValue === "string" &&
      !Number.isNaN(Date.parse(timestampValue))
    ) {
      return new Date(timestampValue).toISOString();
    }

    if (fallback && !Number.isNaN(Date.parse(fallback))) {
      return new Date(fallback).toISOString();
    }

    return new Date().toISOString();
  }

  private inferDeviceIdFromTopic(topic?: string) {
    if (!topic) return undefined;

    const match = topic.match(/(?:^|\/)device\/([^/]+)(?:\/|$)/);

    return match?.[1];
  }

  private buildTelemetryId(
    deviceId: string,
    timestamp: string,
    metrics: Array<{ key: string; value: number }>,
  ) {
    const fingerprint = `${deviceId}:${timestamp}:${metrics
      .map((metric) => `${metric.key}=${metric.value}`)
      .sort()
      .join("|")}`;

    return `telemetry-${this.hash(fingerprint)}`;
  }

  private hash(value: string) {
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(index);
      hash |= 0;
    }

    return Math.abs(hash).toString(16);
  }

  private readString(value: unknown) {
    if (typeof value !== "string" && typeof value !== "number") {
      return undefined;
    }

    const normalized = String(value).trim();

    return normalized.length ? normalized : undefined;
  }

  private asRecord(value: unknown): PlainRecord | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }

    return value as PlainRecord;
  }

  private decodeNestedRecord(value: unknown) {
    if (typeof value !== "string") {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
}

export default new TelemetryNormalizerService();
