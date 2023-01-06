export const formattedDate = (d: string) =>
  new Date(d).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
