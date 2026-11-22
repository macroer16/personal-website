"use client";

import { useEffect, useState } from "react";

// The wallpaper is the real sky over London right now: dawn, day, dusk or night,
// worked out from the London clock, with clouds drifting past.

type Phase = "dawn" | "day" | "dusk" | "night";

const SKIES: Record<Phase, string> = {
  dawn: "linear-gradient(180deg,#2b3a67 0%,#c9778b 45%,#f6c28b 75%,#ffe3b5 100%)",
  day: "linear-gradient(180deg,#3b82c4 0%,#76b0e0 45%,#b9dcf5 80%,#e6f3fb 100%)",
  dusk: "linear-gradient(180deg,#1d2346 0%,#5b3f78 35%,#d86f5a 70%,#f4b66e 100%)",
  night: "linear-gradient(180deg,#05070f 0%,#0b1530 50%,#18264a 85%,#283a63 100%)",
};

function londonHour() {
  return Number(new Date().toLocaleString("en-GB", { timeZone: "Europe/London", hour: "2-digit", hour12: false }));
}

export function skyPhase(h = londonHour()): Phase {
  if (h >= 6 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

// Deterministic pseudo-random so stars/clouds are the same on every render.
const rand = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const CLOUDS = Array.from({ length: 9 }, (_, i) => ({
  top: 8 + rand(i) * 70,
  scale: 0.5 + rand(i + 20) * 1.1,
  duration: 90 + rand(i + 40) * 120,
  delay: -rand(i + 60) * 200,
  opacity: 0.35 + rand(i + 80) * 0.5,
}));

const STARS = Array.from({ length: 90 }, (_, i) => ({ x: rand(i + 100) * 100, y: rand(i + 300) * 65, s: rand(i + 500) * 1.6 + 0.4 }));

function Cloud({ tint }: { tint: string }) {
  return (
    <svg viewBox="0 0 220 90" className="h-[90px] w-[220px]" aria-hidden>
      <g fill={tint}>
        <ellipse cx="60" cy="58" rx="50" ry="24" />
        <ellipse cx="105" cy="42" rx="44" ry="34" />
        <ellipse cx="150" cy="56" rx="48" ry="26" />
        <ellipse cx="110" cy="66" rx="80" ry="20" />
      </g>
    </svg>
  );
}

export default function Sky({ override }: { override?: Phase }) {
  const [phase, setPhase] = useState<Phase>("day");
  useEffect(() => {
    const update = () => setPhase(override ?? skyPhase());
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, [override]);

  const tint = phase === "night" ? "#3a4a72" : phase === "dusk" ? "#f3c1a8" : phase === "dawn" ? "#ffd9c2" : "#ffffff";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transition-[background] duration-1000" style={{ background: SKIES[phase] }}>
      {phase === "night" &&
        STARS.map((s, i) => (
          <span key={i} className="absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: 0.5 + (i % 5) / 10 }} />
        ))}
      {(phase === "night" || phase === "dusk") && (
        <div className="absolute right-[12%] top-[12%] h-16 w-16 rounded-full bg-[#f4efe1] shadow-[0_0_60px_12px_rgba(244,239,225,0.25)]" style={{ opacity: phase === "night" ? 1 : 0.6 }} />
      )}
      {(phase === "day" || phase === "dawn") && (
        <div className="absolute right-[14%] top-[10%] h-20 w-20 rounded-full bg-[#fff4c4] shadow-[0_0_80px_30px_rgba(255,236,170,0.55)]" />
      )}
      {CLOUDS.map((c, i) => (
        <div key={i} className="absolute left-0 motion-safe:animate-[drift_linear_infinite]"
          style={{ top: `${c.top}%`, opacity: c.opacity, animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s` }}>
          <div style={{ transform: `scale(${c.scale})` }}><Cloud tint={tint} /></div>
        </div>
      ))}
      {/* A low London skyline silhouette along the bottom edge. */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 h-[90px] w-full" aria-hidden>
        <path
          fill={phase === "day" ? "rgba(30,50,80,0.25)" : "rgba(5,8,18,0.55)"}
          d="M0 120V92h40v-10h30v10h25V70h18v22h30V84h22V60h8V40h4v20h8v24h30V76h40v16h28V58l14-14 14 14v34h22V80h36v12h30V66h10V30h6v-12h4v12h6v36h10v26h40V74h24v18h30V86h50v6h28V64h12V50h8v14h12v28h36V72h30v20h44V80h26v12h60V68h16l10-18 10 18h16v24h40V78h30v14h28V60h24v32h34V82h40v10h36V74h22v18h46V86h40v6h44V70h30v22h40v28z"
        />
        {/* the London Eye */}
        <g stroke={phase === "day" ? "rgba(30,50,80,0.25)" : "rgba(5,8,18,0.55)"} fill="none">
          <circle cx="1105" cy="58" r="34" strokeWidth="3" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 8;
            return <line key={i} x1={1105 - 34 * Math.cos(a)} y1={58 - 34 * Math.sin(a)} x2={1105 + 34 * Math.cos(a)} y2={58 + 34 * Math.sin(a)} strokeWidth="1" />;
          })}
          <path d="M1105 58 L1088 120 M1105 58 L1122 120" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
