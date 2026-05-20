import type { DeviceCommandInput } from "../schemas/control.schema";
import type { DeviceCommandPayload } from "../api/controls.api";

export const transformCommandPayload = (
  payload: DeviceCommandInput,
): DeviceCommandPayload => {
  return {
    deviceId: payload.deviceId,
    command: payload.command,
    value: payload.value,
    timestamp: new Date().toISOString(),
  };
};

export default transformCommandPayload;
