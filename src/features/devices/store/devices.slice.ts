import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Device, DevicesState } from "./devices.types";

const initialState: DevicesState = {
  devices: [],
  selectedDevice: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 25,
  totalCount: 0,
};

const devicesSlice = createSlice({
  name: "devices",

  initialState,

  reducers: {
    setDevices(state, action: PayloadAction<Device[]>) {
      state.devices = action.payload;
    },

    setPagination(
      state,
      action: PayloadAction<{
        page: number;
        pageSize: number;
        totalCount: number;
      }>,
    ) {
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.totalCount = action.payload.totalCount;
    },

    setSelectedDevice(state, action: PayloadAction<Device>) {
      state.selectedDevice = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setDevices,
  setSelectedDevice,
  setLoading,
  setError,
  setPagination,
} = devicesSlice.actions;

export default devicesSlice.reducer;
