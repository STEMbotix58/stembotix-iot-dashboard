import type { Telemetry } from "@/entities/telemetry/telemetry.types";

type WebSocketTelemetryPayload = {
  telemetryId: string;
  deviceId: string;
  createdAt: string;
  metrics: {
    key: string;
    label: string;
    unit: string;
    value: number;
  }[];
};

export const websocketTelemetryAdapter = (
  payload: WebSocketTelemetryPayload,
): Telemetry => {
  return {
    id: payload.telemetryId,
    deviceId: payload.deviceId,
    timestamp: payload.createdAt,
    metrics: payload.metrics,
  };
};

export default websocketTelemetryAdapter;
