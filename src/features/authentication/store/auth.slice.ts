import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, LoginResponse } from "./auth.types";

import tokenManager from "@/core/auth/token-manager";
import sessionManager from "@/core/auth/session-manager";

const initialState: AuthState = {
  user: null,
  token: tokenManager.getToken(),
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

      sessionManager.start(action.payload.token);
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;

      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;

      sessionManager.destroy();
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } =
  authSlice.actions;

export default authSlice.reducer;
