import axiosClient from "@/core/api/axios-client";
import API_ENDPOINTS from "@/core/api/api-endpoints";
import type { ApiResponse } from "@/core/types/api.types";
import type { PaginatedDRFResponse } from "@/core/pagination/pagination.types";

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
  getAlertsPaginated: async (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
  }) => {
    const response = await axiosClient.get<PaginatedDRFResponse<Alert>>(
      API_ENDPOINTS.ALERTS.LIST,
      { params },
    );

    return response.data;
  },
};
