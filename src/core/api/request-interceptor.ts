import { type InternalAxiosRequestConfig } from "axios";

import tokenManager from "@/core/auth/token-manager";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = tokenManager.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export default requestInterceptor;
