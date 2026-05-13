import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  DashboardState,
  DeviceStatus,
  DeviceSummary,
} from "../types/dashboard.types";

const initialState: DashboardState = {
  summary: {
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    alerts: 0,
  },
  selectedDeviceId: null,
  devices: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSummary(state, action: PayloadAction<DeviceSummary>) {
      state.summary = action.payload;
    },

    setDevices(state, action: PayloadAction<DeviceStatus[]>) {
      state.devices = action.payload;
    },

    selectDevice(state, action: PayloadAction<string>) {
      state.selectedDeviceId = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setSummary, setDevices, selectDevice, setLoading, setError } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
