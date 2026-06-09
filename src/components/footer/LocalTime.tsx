"use client";

import { useEffect, useState } from "react";

/**
 * Live local clock for the developer's timezone — a small human detail in
 * the footer. Renders nothing until mounted to avoid hydration mismatch.
 */
export function LocalTime({ timeZone = "Europe/Berlin" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000 * 30);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums">
      {time ? `${time} local` : "—"}
    </span>
  );
}
