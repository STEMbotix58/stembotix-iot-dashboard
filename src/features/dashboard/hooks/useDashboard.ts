import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dashboardService } from "../services/dashboard.service";
import { setDevices, setLoading, setSummary } from "../store/dashboard.slice";

import { type RootState } from "@/app/store";

export const useDashboard = () => {
  const dispatch = useDispatch();

  const { summary, devices, loading } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const loadDashboard = async () => {
    dispatch(setLoading(true));

    try {
      const [summaryData, deviceData] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getDevices(),
      ]);

      dispatch(setSummary(summaryData));
      dispatch(setDevices(deviceData));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    summary,
    devices,
    loading,
    reload: loadDashboard,
  };
};
