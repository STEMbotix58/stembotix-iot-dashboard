import type { RootState } from "@/app/store";

export const selectTelemetry = (state: RootState) => state.telemetry.telemetry;

export const selectTelemetryLoading = (state: RootState) =>
  state.telemetry.loading;

export const selectTelemetryError = (state: RootState) => state.telemetry.error;

export const selectDeviceTelemetry = (deviceId: string) => (state: RootState) =>
  state.telemetry.telemetry.filter((item) => item.deviceId === deviceId);
