import axiosClient from "@/core/api/axios-client";
import API_ENDPOINTS from "@/core/api/api-endpoints";
import type { PaginatedDRFResponse } from "@/core/pagination/pagination.types";
import type { Device } from "@/entities/device/device.types";

export const devicesService = {
  getDevices: async (params?: {
    page?: number;
    page_size?: number;
    search?: string;
    ordering?: string;
  }) => {
    const response = await axiosClient.get<PaginatedDRFResponse<Device>>(
      API_ENDPOINTS.DEVICES.LIST,
      { params },
    );

    return response.data;
  },
};
