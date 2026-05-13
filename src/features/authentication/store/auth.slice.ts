import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginResponse } from "./auth.types";
import { authService } from "../services/auth.service";

const persistedAuth = authService.getAuth();

const initialState: AuthState = {
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } =
  authSlice.actions;

export default authSlice.reducer;
