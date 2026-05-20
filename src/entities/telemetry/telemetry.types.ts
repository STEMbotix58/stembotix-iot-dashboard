export type TelemetryMetric = {
  key: string;
  label: string;
  unit: string;
  value: number;
};

export type Telemetry = {
  id: string;
  deviceId: string;
  timestamp: string;
  metrics: TelemetryMetric[];
};

export type TemperatureTelemetry = TelemetryMetric & {
  key: "temperature";
};

export type HumidityTelemetry = TelemetryMetric & {
  key: "humidity";
};

export type VoltageTelemetry = TelemetryMetric & {
  key: "voltage";
};
