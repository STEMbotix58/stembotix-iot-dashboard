import axios from "axios";

import requestInterceptor from "./request-interceptor";
import { responseSuccess, responseError } from "./response-interceptor";
import env from "@/core/config/env.config";

const axiosClient = axios.create({
  baseURL: env.API_URL,

  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(requestInterceptor);

axiosClient.interceptors.response.use(responseSuccess, responseError);

export default axiosClient;
