import useDeviceControl from "./useDeviceControl";

import { DEVICE_COMMANDS } from "@/entities/command/command.constants";

const useDeviceActions = (deviceId: string) => {
  const { executeCommand, loading } = useDeviceControl();

  const turnOn = () =>
    executeCommand({
      deviceId,
      command: DEVICE_COMMANDS.TURN_ON,
    });

  const turnOff = () =>
    executeCommand({
      deviceId,
      command: DEVICE_COMMANDS.TURN_OFF,
    });

  const setBrightness = (brightness: number) =>
    executeCommand({
      deviceId,
      command: DEVICE_COMMANDS.SET_BRIGHTNESS,
      value: brightness,
    });

  const setTemperature = (temperature: number) =>
    executeCommand({
      deviceId,
      command: DEVICE_COMMANDS.SET_TEMPERATURE,
      value: temperature,
    });

  return {
    loading,
    turnOn,
    turnOff,
    setBrightness,
    setTemperature,
  };
};

export default useDeviceActions;
