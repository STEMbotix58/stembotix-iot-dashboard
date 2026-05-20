import type { Telemetry } from "@/entities/telemetry/telemetry.types";

type MQTTMessage = {
  id: string;
  device_id: string;
  timestamp: string;
  metrics: {
    key: string;
    label: string;
    unit: string;
    value: number;
  }[];
};

export const mqttTelemetryAdapter = (payload: MQTTMessage): Telemetry => {
  return {
    id: payload.id,
    deviceId: payload.device_id,
    timestamp: payload.timestamp,
    metrics: payload.metrics,
  };
};

export default mqttTelemetryAdapter;
