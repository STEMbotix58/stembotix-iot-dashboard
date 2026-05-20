import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import analyticsService from "../services/analytics.service";
import {
  analyticsLoading,
  analyticsLoaded,
  analyticsFailed,
} from "../store/analytics.slice";

import type { RootState } from "@/app/store";

const useAnalytics = () => {
  const dispatch = useDispatch();
  const analytics = useSelector((state: RootState) => state.analytics);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        dispatch(analyticsLoading());
        const data = await analyticsService.getDashboardAnalytics();

        dispatch(analyticsLoaded(data));
      } catch {
        dispatch(analyticsFailed("Failed to load analytics"));
      }
    };

    fetchAnalytics();
  }, [dispatch]);

  return analytics;
};

export default useAnalytics;
