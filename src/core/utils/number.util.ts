export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const round = (value: number, decimals = 2) => {
  return Number(value.toFixed(decimals));
};

export const percentage = (value: number, total: number) => {
  if (!total) {
    return 0;
  }

  return (value / total) * 100;
};
