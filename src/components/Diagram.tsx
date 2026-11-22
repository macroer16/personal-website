// fig. — how this page got to you. A small architecture diagram of the real setup,
// with the time the GitHub data was last refreshed. One packet travels along the path.

const NODES = [
  { x: 20, label: "your browser", note: "wherever you are" },
  { x: 200, label: "vercel edge", note: "nearest region" },
  { x: 380, label: "next.js", note: "server components" },
  { x: 560, label: "github api", note: "cached 1 hour" },
];

export default function Diagram({ refreshed }: { refreshed: string }) {
  return (
    <figure>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 700 120" className="min-w-[560px] w-full font-mono" role="img"
          aria-label="Your browser requests the page from Vercel's edge network, which runs Next.js server components, which read from the GitHub API.">
          <line x1="140" y1="45" x2="560" y2="45" stroke="var(--rule)" strokeWidth="1.5" strokeDasharray="4 4" />
          {NODES.slice(0, -1).map((n) => (
            <path key={n.x} d={`M${n.x + 172},40 l8,5 l-8,5`} fill="none" stroke="var(--faint)" strokeWidth="1.5" />
          ))}
          <circle r="4" fill="var(--red)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M140,45 L560,45" />
          </circle>
          {NODES.map((n) => (
            <g key={n.label}>
              <rect x={n.x} y="22" width="120" height="46" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
              <text x={n.x + 60} y="50" textAnchor="middle" fontSize="13" fill="var(--ink)">{n.label}</text>
              <text x={n.x + 60} y="90" textAnchor="middle" fontSize="11" fill="var(--faint)">{n.note}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 font-mono text-xs text-faint">
        fig. 2 — how this page got to you. github data last refreshed {refreshed}, london time.
      </figcaption>
    </figure>
  );
}
