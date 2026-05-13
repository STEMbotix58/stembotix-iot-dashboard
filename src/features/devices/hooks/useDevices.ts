import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { devicesService } from "../services/devices.service";

import { setDevices, setLoading } from "../store/devices.slice";

import { selectDevices, selectDevicesLoading } from "../store/devices.selector";

export const useDevices = () => {
  const dispatch = useDispatch();

  const devices = useSelector(selectDevices);
  const loading = useSelector(selectDevicesLoading);

  const fetchDevices = async () => {
    dispatch(setLoading(true));

    try {
      const data = await devicesService.getDevices();

      dispatch(setDevices(data));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return {
    devices,
    loading,
    reload: fetchDevices,
  };
};
