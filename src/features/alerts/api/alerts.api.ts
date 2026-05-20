import axiosClient from "@/core/api/axios-client";
import API_ENDPOINTS from "@/core/api/api-endpoints";
import type { ApiResponse } from "@/core/types/api.types";

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  deviceId: string;
  timestamp: string;
};

type AlertsResponse = ApiResponse<Alert[]>;

export const alertsApi = {
  getAlerts: async (): Promise<AlertsResponse> => {
    const response = await axiosClient.get<AlertsResponse>(
      API_ENDPOINTS.ALERTS.LIST,
    );

    return response.data;
  },
};
