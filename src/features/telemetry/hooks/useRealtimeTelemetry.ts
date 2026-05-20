import { useEffect } from "react";
import { useDispatch } from "react-redux";
import telemetryStreamService from "../services/telemetry-stream.service";
import { telemetryReceived } from "../store/telemetry.slice";

const useRealtimeTelemetry = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = telemetryStreamService.subscribe((telemetry) => {
      dispatch(telemetryReceived(telemetry));
    });

    return unsubscribe;
  }, [dispatch]);
};

export default useRealtimeTelemetry;
