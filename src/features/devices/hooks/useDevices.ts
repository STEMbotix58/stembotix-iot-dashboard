import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { devicesService } from "../services/devices.service";

import { setDevices, setLoading, setPagination } from "../store/devices.slice";

import {
  selectDevices,
  selectDevicesLoading,
  selectDevicesPagination,
} from "../store/devices.selector";
import usePagination from "@/core/pagination/usePagination";

export const useDevices = () => {
  const dispatch = useDispatch();

  const devices = useSelector(selectDevices);
  const loading = useSelector(selectDevicesLoading);
  const paginationFromStore = useSelector(selectDevicesPagination);

  const { pagination, setPage, setPageSize, setTotalFromResponse } =
    usePagination({
      initialPage: paginationFromStore.page,
      initialPageSize: paginationFromStore.pageSize,
    });

  const fetchDevices = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const res = await devicesService.getDevices({
        page: pagination.page,
        page_size: pagination.pageSize,
      });

      // DRF paginated response: { count, next, previous, results }
      dispatch(setDevices(res.results));
      setTotalFromResponse(res.count);

      dispatch(
        setPagination({
          page: pagination.page,
          pageSize: pagination.pageSize,
          totalCount: res.count,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, pagination.page, pagination.pageSize, setTotalFromResponse]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return {
    devices,
    loading,
    pagination,
    setPage,
    setPageSize,
    reload: fetchDevices,
  };
};
