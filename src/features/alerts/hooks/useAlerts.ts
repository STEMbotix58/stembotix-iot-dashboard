import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import alertsService from "../services/alerts.service";

import {
  alertsLoading,
  alertsLoaded,
  alertsFailed,
} from "../store/alerts.slice";

import type { RootState } from "@/app/store";

const useAlerts = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        dispatch(alertsLoading());
        const data = await alertsService.fetchAlerts();
        dispatch(alertsLoaded(data));
      } catch {
        dispatch(alertsFailed("Failed to load alerts"));
      }
    };

    fetchAlerts();
  }, [dispatch]);

  return alerts;
};

export default useAlerts;
