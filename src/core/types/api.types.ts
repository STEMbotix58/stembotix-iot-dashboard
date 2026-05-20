export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type PaginatedResponse<T> = {
  success: boolean;
  message: string;

  data: T[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiError = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type RequestStatus = "idle" | "loading" | "success" | "error";
