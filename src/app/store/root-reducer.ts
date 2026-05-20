import { combineReducers } from "@reduxjs/toolkit";

// features
import dashboardReducer from "@/features/dashboard/store/dashboard.slice";
import authReducer from "@/features/authentication/store/auth.slice";
import devicesReducer from "@/features/devices/store/devices.slice";
import controlsReducer from "@/features/controls/store/controls.slice";
import telemetryReducer from "@/features/telemetry/store/telemetry.slice";
import analyticsReducer from "@/features/analytics/store/analytics.slice";
import alertsReducer from "@/features/alerts/store/alerts.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  devices: devicesReducer,
  controls: controlsReducer,
  telemetry: telemetryReducer,
  analytics: analyticsReducer,
  alerts: alertsReducer,
});

export default rootReducer;
