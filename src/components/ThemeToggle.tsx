"use client";

import { useEffect, useState } from "react";

// Plain-text light/dark switch, remembered between visits.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const flip = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button onClick={flip} className="font-mono text-xs text-soft hover:text-ink" aria-label="Switch colour theme">
      {dark ? "lights on" : "lights off"}
    </button>
  );
}
