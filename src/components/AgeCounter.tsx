"use client";

import { useEffect, useState } from "react";

// Live age in years with 9 decimal places, updated every animation frame.
const MS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;

export default function AgeCounter({ birthDate }: { birthDate: string }) {
  const start = new Date(birthDate).getTime();
  const [age, setAge] = useState(() => ((Date.now() - start) / MS_PER_YEAR).toFixed(9));

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      setAge(((Date.now() - start) / MS_PER_YEAR).toFixed(9));
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [start]);

  return <span className="tabular-nums" suppressHydrationWarning>{age}</span>;
}
