import axiosClient from "@/core/api/axios-client";

import API_ENDPOINTS from "@/core/api/api-endpoints";
import { DEVICE_COMMANDS } from "@/entities/command/command.constants";
import type { ApiResponse } from "@/core/types/api.types";

export type DeviceCommandPayload = {
  deviceId: string;
  command: string;
  value?: unknown;
  timestamp: string;
};

type DeviceCommandResponse = {
  success: boolean;
  commandId: string;
  status: string;
};

export const controlsApi = {
  sendCommand: async (
    payload: DeviceCommandPayload,
  ): Promise<ApiResponse<DeviceCommandResponse>> => {
    const response = await axiosClient.post<ApiResponse<DeviceCommandResponse>>(
      API_ENDPOINTS.DEVICES.COMMAND(payload.deviceId),
      payload,
    );

    return response.data;
  },

  toggleDevice: async (deviceId: string, enabled: boolean) => {
    return controlsApi.sendCommand({
      deviceId,
      command: enabled ? DEVICE_COMMANDS.TURN_ON : DEVICE_COMMANDS.TURN_OFF,
      timestamp: new Date().toISOString(),
    });
  },

  setBrightness: async (deviceId: string, brightness: number) => {
    return controlsApi.sendCommand({
      deviceId,
      command: DEVICE_COMMANDS.TURN_ON,
      value: brightness,
      timestamp: new Date().toISOString(),
    });
  },

  setTemperature: async (deviceId: string, temperature: number) => {
    return controlsApi.sendCommand({
      deviceId,
      command: DEVICE_COMMANDS.SET_TEMPERATURE,
      value: temperature,
      timestamp: new Date().toISOString(),
    });
  },
};
