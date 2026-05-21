import deviceRuntimeManager from "@/features/devices/runtime/device-runtime.manager";

export const devicesService = {
  getDevices: async () => {
    return {
      success: true,
      message: "Devices loaded from device runtime manager",
      data: deviceRuntimeManager.listDevices(),
    };
  },
};
