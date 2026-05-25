export type PaginatedDRFResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PaginationState = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type UsePaginationOptions = {
  initialPage?: number;
  initialPageSize?: number;
  paramPageKey?: string;
  paramSizeKey?: string;
};
