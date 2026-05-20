import axiosClient from "@/core/api/axios-client";
import API_ENDPOINTS from "@/core/api/api-endpoints";

import type { ApiResponse } from "@/core/types/api.types";

type AnalyticsOverview = {
  averageTemperature: number;
  averageHumidity: number;
  peakEnergy: number;
  onlineDevices: number;
};

type AnalyticsResponse = ApiResponse<AnalyticsOverview>;

export const analyticsApi = {
  getOverview: async (): Promise<AnalyticsResponse> => {
    const response = await axiosClient.get<AnalyticsResponse>(
      API_ENDPOINTS.ANALYTICS.OVERVIEW,
    );

    return response.data;
  },
};
