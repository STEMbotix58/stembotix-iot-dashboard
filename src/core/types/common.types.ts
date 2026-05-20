export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ID = string | number;

export type Timestamp = string | Date;

export type Status = "online" | "offline" | "maintenance";

export type ThemeMode = "light" | "dark";

export type SelectOption = {
  label: string;
  value: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};
