export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

// Build a compact page list with neighbors and first/last
export const buildPageList = (current: number, total: number, siblings = 1) => {
  if (total <= 1) return [1];

  const pages: (number | "...")[] = [];

  const left = Math.max(1, current - siblings);
  const right = Math.min(total, current + siblings);

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("...");
  }

  for (const p of range(left, right)) pages.push(p);

  if (right < total) {
    if (right < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  wait = 250,
) => {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};
