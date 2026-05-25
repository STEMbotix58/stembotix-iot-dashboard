import { memo } from "react";
import { buildPageList } from "./pagination.utils";
import type { PaginationState } from "./pagination.types";

type Props = {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  loading?: boolean;
  pageSizeOptions?: number[];
  siblingCount?: number;
};

const Pagination = ({
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false,
  pageSizeOptions = [10, 25, 50, 100],
  siblingCount = 1,
}: Props) => {
  const { page, totalPages, pageSize, total } = pagination;
  const pages = buildPageList(page, totalPages, siblingCount);

  const startItem = Math.min((page - 1) * pageSize + 1, total || 0);
  const endItem = Math.min(page * pageSize, total || 0);

  return (
    <div
      className={`flex flex-col items-center justify-between gap-4 py-4 px-5 text-sm text-zinc-500 sm:flex-row transition-opacity duration-300 ${
        loading ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Left side: Information */}
      <div>
        Showing <span className="font-medium text-zinc-900">{startItem}</span>{" "}
        to <span className="font-medium text-zinc-900">{endItem}</span> of{" "}
        <span className="font-medium text-zinc-900">{total || 0}</span> results
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center gap-6">
        {/* Page Size Select */}
        {onPageSizeChange && (
          <div className="hidden sm:flex items-center gap-2">
            <span>Rows per page</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                disabled={loading}
                className="h-8 appearance-none bg-transparent pl-2 pr-6 font-medium text-zinc-900 outline-none transition-colors hover:bg-zinc-100 focus:bg-zinc-100 rounded-md cursor-pointer disabled:cursor-not-allowed"
              >
                {pageSizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Pagination Navigation */}
        <nav className="flex items-center gap-1" aria-label="Pagination">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || loading}
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {pages.map((p, i) =>
            p === "..." ? (
              <span
                key={`dot-${i}`}
                className="flex h-8 w-8 items-center justify-center text-zinc-400"
              >
                •••
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(Number(p))}
                disabled={loading}
                aria-current={p === page ? "page" : undefined}
                className={`flex h-8 min-w-[2rem] items-center justify-center rounded-md px-1 font-medium transition-all active:scale-95 ${
                  p === page
                    ? "bg-zinc-900 text-white shadow-sm hover:bg-zinc-800"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                {p}
              </button>
            ),
          )}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || loading}
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default memo(Pagination);
