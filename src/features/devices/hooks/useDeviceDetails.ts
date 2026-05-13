import { useSelector } from "react-redux";

import { selectSelectedDevice } from "../store/devices.selector";

export const useDeviceDetails = () => {
  const device = useSelector(selectSelectedDevice);

  return {
    device,
  };
};
