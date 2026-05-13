import { devicesApi } from "../api/devices.api";

export const devicesService = {
  getDevices: async () => {
    return await devicesApi.getDevices();
  },
};
