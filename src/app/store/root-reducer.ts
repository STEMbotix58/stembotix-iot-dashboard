import { combineReducers } from "@reduxjs/toolkit";

// features
import dashboardReducer from "@/features/dashboard/store/dashboard.slice";
import authReducer from "@/features/authentication/store/auth.slice";
import devicesReducer from "@/features/devices/store/devices.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  devices: devicesReducer,
});

export default rootReducer;
