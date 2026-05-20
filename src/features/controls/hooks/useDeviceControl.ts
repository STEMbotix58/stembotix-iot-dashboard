import { useState } from "react";

import deviceCommandService from "../services/device-command.service";

import notificationService from "@/core/services/notification.service";

type CommandPayload = {
  deviceId: string;
  command: string;
  value?: unknown;
};

const useDeviceControl = () => {
  const [loading, setLoading] = useState(false);

  const executeCommand = async (payload: CommandPayload) => {
    try {
      setLoading(true);

      await deviceCommandService.execute(payload);

      notificationService.success("Command executed successfully");
    } catch (error) {
      notificationService.error("Failed to execute command");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    executeCommand,
  };
};

export default useDeviceControl;
