import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Device, DevicesState } from "./devices.types";

const initialState: DevicesState = {
  devices: [],
  selectedDevice: null,
  loading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: "devices",

  initialState,

  reducers: {
    setDevices(state, action: PayloadAction<Device[]>) {
      state.devices = action.payload;
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

export const { setDevices, setSelectedDevice, setLoading, setError } =
  devicesSlice.actions;

export default devicesSlice.reducer;
