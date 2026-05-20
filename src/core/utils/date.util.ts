export const formatDate = (value: Date | string, locale = "en-IN") => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
};

export const formatDateTime = (value: Date | string, locale = "en-IN") => {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

export const isToday = (value: Date | string) => {
  const date = new Date(value);

  const today = new Date();

  return date.toDateString() === today.toDateString();
};
