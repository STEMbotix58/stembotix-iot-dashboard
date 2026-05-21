import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Telemetry } from "@/entities/telemetry/telemetry.types";

type TelemetryState = {
  telemetry: Telemetry[];
  loading: boolean;
  error: string | null;
};

const initialState: TelemetryState = {
  telemetry: [],
  loading: false,
  error: null,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    telemetryLoading(state) {
      state.loading = true;
    },

    telemetryReceived(state, action: PayloadAction<Telemetry>) {
      state.loading = false;

      const existingIndex = state.telemetry.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (existingIndex >= 0) {
        state.telemetry[existingIndex] = action.payload;
        return;
      }

      state.telemetry.push(action.payload);

      // Prevent infinite growth
      if (state.telemetry.length > 100) {
        state.telemetry.shift();
      }
    },

    telemetryFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    clearTelemetry(state) {
      state.telemetry = [];
    },
  },
});

export const {
  telemetryLoading,
  telemetryReceived,
  telemetryFailed,
  clearTelemetry,
} = telemetrySlice.actions;

export default telemetrySlice.reducer;
