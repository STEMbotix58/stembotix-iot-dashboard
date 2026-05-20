import axiosClient from "@/core/api/axios-client";
import API_ENDPOINTS from "@/core/api/api-endpoints";
import type { ApiResponse } from "@/core/types/api.types";

export type SettingsPayload = {
  darkMode: boolean;
  notifications: boolean;
  autoRefresh: boolean;
  timezone: string;
};

type SettingsResponse = ApiResponse<SettingsPayload>;

export const settingsApi = {
  getSettings: async (): Promise<SettingsResponse> => {
    const response = await axiosClient.get<SettingsResponse>(
      API_ENDPOINTS.SETTINGS.GET,
    );

    return response.data;
  },

  updateSettings: async (
    payload: SettingsPayload,
  ): Promise<SettingsResponse> => {
    const response = await axiosClient.put<SettingsResponse>(
      API_ENDPOINTS.SETTINGS.UPDATE,
      payload,
    );

    return response.data;
  },
};
