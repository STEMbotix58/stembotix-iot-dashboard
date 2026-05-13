import { useDispatch, useSelector } from "react-redux";

import { selectSelectedDevice } from "../store/devices.selector";

import { setSelectedDevice } from "../store/devices.slice";

import type { Device } from "../store/devices.types";

export const useDeviceSelection = () => {
  const dispatch = useDispatch();

  const selectedDevice = useSelector(selectSelectedDevice);

  const selectDevice = (device: Device) => {
    dispatch(setSelectedDevice(device));
  };

  return {
    selectedDevice,
    selectDevice,
  };
};
