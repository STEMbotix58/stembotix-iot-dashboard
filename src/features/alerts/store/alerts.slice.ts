import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Alert } from "../api/alerts.api";

type AlertsState = {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
};

const initialState: AlertsState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    alertsLoading(state) {
      state.loading = true;
    },

    alertsLoaded(state, action: PayloadAction<Alert[]>) {
      state.loading = false;
      state.alerts = action.payload;
    },

    alertsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { alertsLoading, alertsLoaded, alertsFailed } =
  alertsSlice.actions;

export default alertsSlice.reducer;
