import { useCallback, useEffect } from "react";
import { useState } from "react";
import alertsService from "../services/alerts.service";
import usePagination from "@/core/pagination/usePagination";
import type { Alert } from "../api/alerts.api";

const useAlertsPaginated = () => {
  const { pagination, setPage, setPageSize, setTotalFromResponse } =
    usePagination({ initialPage: 1, initialPageSize: 25 });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await alertsService.fetchAlertsPaginated({
        page: pagination.page,
        page_size: pagination.pageSize,
      });
      setAlerts(res.results);
      setTotalFromResponse(res.count);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, setTotalFromResponse]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { alerts, loading, pagination, setPage, setPageSize, reload: fetch };
};

export default useAlertsPaginated;
