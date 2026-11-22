"use client";

import { useEffect, useState } from "react";

// Live age in years with 9 decimal places, updated every animation frame.
const MS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;

export default function AgeCounter({ birthDate }: { birthDate: string }) {
  const [age, setAge] = useState<string | null>(null);

  useEffect(() => {
    const start = new Date(birthDate).getTime();
    let frame = 0;
    const tick = () => {
      setAge(((Date.now() - start) / MS_PER_YEAR).toFixed(9));
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [birthDate]);

  // Render nothing on the server to avoid a hydration mismatch.
  return (
    <span className="font-mono tabular-nums text-accent" aria-label="Age in years">
      {age ?? "18.000000000"}
    </span>
  );
}
