import { authApi } from "../api/auth.api";
import type { LoginPayload, LoginResponse } from "../store/auth.types";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await authApi.login(payload);

    this.saveAuth(response);

    return response;
  },

  saveAuth(data: LoginResponse) {
    localStorage.setItem("auth", JSON.stringify(data));
  },

  clearAuth() {
    localStorage.removeItem("auth");
  },

  getAuth(): LoginResponse | null {
    const auth = localStorage.getItem("auth");

    return auth ? JSON.parse(auth) : null;
  },
};
