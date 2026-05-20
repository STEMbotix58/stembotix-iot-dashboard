import type { Telemetry } from "./telemetry.types";

type TelemetryDTO = {
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

export const telemetryMapper = (dto: TelemetryDTO): Telemetry => {
  return {
    id: dto.id,
    deviceId: dto.device_id,
    timestamp: dto.timestamp,
    metrics: dto.metrics,
  };
};
