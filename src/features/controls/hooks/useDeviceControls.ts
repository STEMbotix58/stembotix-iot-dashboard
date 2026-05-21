import { useCallback } from "react";

import useDeviceControl from "./useDeviceControl";
import type { DeviceControlActions } from "@/features/controls/types/widget.types";

const useDeviceControls = (deviceId: string): DeviceControlActions => {
  const { executeCommand: executeRaw, loading } = useDeviceControl();

  const executeCommand = useCallback(
    async (command: string, value?: string | number | boolean) => {
      await executeRaw({
        deviceId,
        command,
        value,
      });
    },
    [deviceId, executeRaw],
  );

  return {
    executeCommand,
    loading,
  };
};

export default useDeviceControls;
