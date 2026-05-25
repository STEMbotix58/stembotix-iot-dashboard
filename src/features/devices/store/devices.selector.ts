import type { RootState } from "@/app/store";

export const selectDevices = (state: RootState) => state.devices.devices;

export const selectSelectedDevice = (state: RootState) =>
  state.devices.selectedDevice;

export const selectDevicesLoading = (state: RootState) => state.devices.loading;

export const selectDevicesPagination = (state: RootState) => ({
  page: state.devices.currentPage ?? 1,
  pageSize: state.devices.pageSize ?? 25,
  totalCount: state.devices.totalCount ?? 0,
});
