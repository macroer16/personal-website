"use client";

import { useEffect, useRef, useState } from "react";

// A soft glowing dot that follows the mouse. Hidden on touch screens and for users
// who prefer reduced motion.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);

    let x = 0, y = 0, cx = 0, cy = 0, frame = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      // Ease towards the pointer for a smooth trailing effect.
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${cx - 12}px, ${cy - 12}px)`;
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(frame); };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 rounded-full bg-accent/30 blur-[2px] mix-blend-screen"
    />
  );
}
