// Hand-drawn app icons for VictorOS. Each is a 64×64 rounded tile.
import type { ReactElement } from "react";

const Tile = ({ bg, children }: { bg: string; children: React.ReactNode }) => (
  <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]" aria-hidden>
    <rect x="2" y="2" width="60" height="60" rx="14" fill={bg} />
    <rect x="2" y="2" width="60" height="30" rx="14" fill="#fff" opacity="0.08" />
    {children}
  </svg>
);

export const ICONS: Record<string, () => ReactElement> = {
  about: () => (
    <Tile bg="#f5f2ea">
      <text x="32" y="42" textAnchor="middle" fontFamily="Instrument Serif, serif" fontSize="30" fill="#1b1a17">vb</text>
      <circle cx="45" cy="38" r="2.4" fill="#c8102e" />
    </Tile>
  ),
  projects: () => (
    <Tile bg="#2f6fd6">
      <path d="M14 22h14l4 5h18v21a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" fill="#9cc3ff" />
      <path d="M14 29h36v19a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" fill="#cfe2ff" />
    </Tile>
  ),
  terminal: () => (
    <Tile bg="#16181b">
      <path d="M17 24l9 8-9 8" stroke="#5be38a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="38" width="16" height="4" rx="2" fill="#5be38a" />
    </Tile>
  ),
  github: () => (
    <Tile bg="#0f1a12">
      {[0, 1, 2, 3, 4].map((c) =>
        [0, 1, 2, 3].map((r) => {
          const lvl = (c * 7 + r * 3) % 5;
          const fill = ["#1d2a20", "#0e4429", "#006d32", "#26a641", "#39d353"][lvl];
          return <rect key={`${c}${r}`} x={14 + c * 8} y={17 + r * 8} width="6" height="6" rx="1.2" fill={fill} />;
        }),
      )}
    </Tile>
  ),
  hoops: () => (
    <Tile bg="#1b2a4a">
      <circle cx="32" cy="32" r="16" fill="#f08a24" />
      <path d="M16 32h32M32 16v32M20.5 20.5c6 6 6 17 0 23M43.5 20.5c-6 6-6 17 0 23" stroke="#3a1d06" strokeWidth="1.8" fill="none" />
    </Tile>
  ),
  mail: () => (
    <Tile bg="#e9e4d8">
      <rect x="13" y="20" width="38" height="26" rx="3" fill="#fff" stroke="#1b1a17" strokeWidth="1.5" />
      <path d="M14 22l18 13 18-13" stroke="#1b1a17" strokeWidth="1.5" fill="none" />
      <rect x="40" y="23" width="8" height="9" fill="#c8102e" />
    </Tile>
  ),
  work: () => (
    <Tile bg="#6b4a2e">
      <rect x="14" y="24" width="36" height="24" rx="3" fill="#c79a6b" />
      <path d="M26 24v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" stroke="#f3dfc6" strokeWidth="3" fill="none" />
      <rect x="14" y="33" width="36" height="3" fill="#a9784a" />
    </Tile>
  ),
  cv: () => (
    <Tile bg="#ffffff">
      <path d="M20 12h17l9 9v31H20z" fill="#f4f1ea" stroke="#cfc9bb" />
      <path d="M37 12v9h9" fill="#e4dfd2" />
      {[26, 31, 36].map((y) => <rect key={y} x="24" y={y} width="18" height="2" rx="1" fill="#bdb6a6" />)}
      <rect x="18" y="41" width="22" height="9" rx="2" fill="#c8102e" />
      <text x="29" y="48" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="700" fill="#fff">CV</text>
    </Tile>
  ),
  browser: () => (
    <Tile bg="#e8eef7">
      <circle cx="32" cy="32" r="16" fill="#fff" stroke="#2f6fd6" strokeWidth="2.5" />
      <path d="M16 32h32M32 16c-6 5-6 27 0 32M32 16c6 5 6 27 0 32" stroke="#2f6fd6" strokeWidth="1.8" fill="none" />
    </Tile>
  ),
  aws: () => (
    <Tile bg="#232f3e">
      <text x="32" y="34" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontWeight="700" fontSize="15" fill="#fff">aws</text>
      <path d="M19 40c8 5 18 5 26 0" stroke="#ff9900" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M42 37l4 2.5-3.5 3" stroke="#ff9900" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </Tile>
  ),
};
