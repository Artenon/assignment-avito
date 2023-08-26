export const formatDate = (date_str: string): string => {
  return new Date(date_str).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
