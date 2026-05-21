import { useSelector } from "react-redux";
import { selectTelemetry } from "../store/telemetry.selector";

const useRealtimeTelemetry = () => {
  const telemetry = useSelector(selectTelemetry);

  return {
    telemetry,
  };
};

export default useRealtimeTelemetry;
