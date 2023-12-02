import { useEffect, useState } from "react";

export const FormattedDate = ({ dateString }: { dateString: string }) => {
  const [date, setDate] = useState<string>(dateString);

  useEffect(() => {
    const locallyFormattedDate = new Date(dateString).toLocaleDateString(
      "en-us",
      {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    );
    setDate(locallyFormattedDate);
  }, []);

  return <>{date}</>;
};
