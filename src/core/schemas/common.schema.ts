import { z } from "zod";

export const idSchema = z.union([z.string(), z.number()]);

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),

  limit: z.number().min(1).max(100).default(10),
});

export const selectOptionSchema = z.object({
  label: z.string(),

  value: z.string(),
});

export const timestampSchema = z.union([z.string(), z.date()]);

export type PaginationSchema = z.infer<typeof paginationSchema>;
