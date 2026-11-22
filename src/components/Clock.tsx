"use client";

import { useEffect, useState } from "react";

// Current time in London, ticking every second.
const fmt = () =>
  new Date().toLocaleString("en-GB", { timeZone: "Europe/London", hour: "numeric", minute: "2-digit", hour12: true, weekday: "long" }).toLowerCase();

export default function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    setNow(fmt());
    const t = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  // "sunday 6:42 pm" → "6:42 pm · sunday"
  const parts = now?.split(" ");
  return <span suppressHydrationWarning>{parts ? `${parts.slice(1).join(" ")} · ${parts[0].replace(",", "")}` : "—"}</span>;
}
