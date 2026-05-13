import type { RootState } from "@/app/store";

export const selectDevices = (state: RootState) => state.devices.devices;

export const selectSelectedDevice = (state: RootState) =>
  state.devices.selectedDevice;

export const selectDevicesLoading = (state: RootState) => state.devices.loading;
