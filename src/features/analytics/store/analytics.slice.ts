import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AnalyticsState = {
  averageTemperature: number;
  averageHumidity: number;
  peakEnergy: number;
  onlineDevices: number;
  loading: boolean;
  error: string | null;
};

const initialState: AnalyticsState = {
  averageTemperature: 0,
  averageHumidity: 0,
  peakEnergy: 0,
  onlineDevices: 0,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    analyticsLoading(state) {
      state.loading = true;
    },

    analyticsLoaded(
      state,
      action: PayloadAction<Omit<AnalyticsState, "loading" | "error">>,
    ) {
      state.loading = false;
      Object.assign(state, action.payload);
    },

    analyticsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { analyticsLoading, analyticsLoaded, analyticsFailed } =
  analyticsSlice.actions;

export default analyticsSlice.reducer;
