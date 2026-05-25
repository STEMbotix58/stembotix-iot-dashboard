import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { UsePaginationOptions, PaginationState } from "./pagination.types";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 25;

export const usePagination = (options?: UsePaginationOptions) => {
  const {
    initialPage = DEFAULT_PAGE,
    initialPageSize = DEFAULT_PAGE_SIZE,
    paramPageKey = "page",
    paramSizeKey = "page_size",
  } = options || {};

  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = Number(searchParams.get(paramPageKey) || initialPage);
  const urlSize = Number(searchParams.get(paramSizeKey) || initialPageSize);

  const [page, setPage] = useState<number>(urlPage || initialPage);
  const [pageSize, setPageSize] = useState<number>(urlSize || initialPageSize);
  const [total, setTotal] = useState<number>(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize || 1)),
    [total, pageSize],
  );

  const setUrlParams = useCallback(
    (p: number, size: number) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set(paramPageKey, String(p));
      next.set(paramSizeKey, String(size));
      setSearchParams(next, { replace: true });
    },
    [paramPageKey, paramSizeKey, searchParams, setSearchParams],
  );

  // sync state -> url
  useEffect(() => {
    setUrlParams(page, pageSize);
  }, [page, pageSize, setUrlParams]);

  // sync url -> state when search params change externally
  useEffect(() => {
    const p = Number(searchParams.get(paramPageKey) || initialPage);
    const s = Number(searchParams.get(paramSizeKey) || initialPageSize);

    if (!Number.isNaN(p) && p !== page) setPage(p);
    if (!Number.isNaN(s) && s !== pageSize) setPageSize(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  // helper controls
  const goTo = useCallback(
    (p: number) => setPage(Math.max(1, Math.min(totalPages, p))),
    [totalPages],
  );
  const next = useCallback(
    () => setPage((v) => Math.min(totalPages, v + 1)),
    [totalPages],
  );
  const prev = useCallback(() => setPage((v) => Math.max(1, v - 1)), []);

  const setTotalFromResponse = useCallback(
    (totalCount: number) => setTotal(totalCount),
    [],
  );

  // reset when dependencies change (consumer should call reset manually when filters change)
  const reset = useCallback(() => setPage(1), []);

  return {
    pagination: useMemo<PaginationState>(
      () => ({ page, pageSize, total, totalPages }),
      [page, pageSize, total, totalPages],
    ),
    setPage: goTo,
    setPageSize,
    next,
    prev,
    reset,
    setTotalFromResponse,
  };
};

export default usePagination;
