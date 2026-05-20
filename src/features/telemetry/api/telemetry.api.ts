import axiosClient from "@/core/api/axios-client";
import API_ENDPOINTS from "@/core/api/api-endpoints";
import type { ApiResponse } from "@/core/types/api.types";
import type { Telemetry } from "@/entities/telemetry/telemetry.types";

type TelemetryResponse = ApiResponse<Telemetry[]>;

export const telemetryApi = {
  getDeviceTelemetry: async (deviceId: string): Promise<TelemetryResponse> => {
    const response = await axiosClient.get<TelemetryResponse>(
      API_ENDPOINTS.TELEMETRY.DEVICE(deviceId),
    );

    return response.data;
  },
};
