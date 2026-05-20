export const TELEMETRY_KEYS = {
  TEMPERATURE: "temperature",
  HUMIDITY: "humidity",
  VOLTAGE: "voltage",
  CURRENT: "current",
  ENERGY: "energy",
} as const;

export const TELEMETRY_UNITS = {
  TEMPERATURE: "°C",
  HUMIDITY: "%",
  VOLTAGE: "V",
  CURRENT: "A",
  ENERGY: "kWh",
} as const;
