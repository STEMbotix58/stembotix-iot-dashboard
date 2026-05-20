import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemetryApi } from "../api/telemetry.api";
import {
  telemetryLoading,
  telemetryReceived,
  telemetryFailed,
} from "../store/telemetry.slice";
import { selectTelemetry } from "../store/telemetry.selector";

const useTelemetry = (deviceId: string) => {
  const dispatch = useDispatch();
  const telemetry = useSelector(selectTelemetry);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        dispatch(telemetryLoading());
        const response = await telemetryApi.getDeviceTelemetry(deviceId);
        response.data.forEach((item) => {
          dispatch(telemetryReceived(item));
        });
      } catch {
        dispatch(telemetryFailed("Failed to fetch telemetry"));
      }
    };

    fetchTelemetry();
  }, [deviceId, dispatch]);
  return {
    telemetry,
  };
};

export default useTelemetry;
