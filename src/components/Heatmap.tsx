import type { Day } from "@/lib/github";

// GitHub contributions calendar, drawn in ink on paper: 53 weeks × 7 days.
const SHADES = [
  "var(--tint)",
  "color-mix(in srgb, var(--ink) 25%, var(--paper))",
  "color-mix(in srgb, var(--ink) 45%, var(--paper))",
  "color-mix(in srgb, var(--ink) 70%, var(--paper))",
  "var(--ink)",
];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export default function Heatmap({ days, total }: { days: Day[]; total: number }) {
  const first = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (Day | null)[] = [...Array(first).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Label a month only in the week its first days fall in, so labels never overlap.
  let lastMonth = -1;
  const labels = weeks.map((w) => {
    const d = w.find(Boolean);
    if (!d) return "";
    const date = new Date(d.date + "T00:00:00Z");
    const m = date.getUTCMonth();
    if (m === lastMonth || date.getUTCDate() > 7) return "";
    lastMonth = m;
    return MONTHS[m];
  });

  return (
    <figure>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          <div className="flex gap-[3px] font-mono text-[10px] text-faint">
            {labels.map((l, i) => <span key={i} className="w-[10px] whitespace-nowrap">{l}</span>)}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((d, j) => (
                  <span key={j} title={d ? `${d.count} on ${d.date}` : undefined} className="h-[10px] w-[10px] rounded-[1px]"
                    style={{ background: d ? SHADES[d.level] : "transparent" }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-xs text-faint">
        fig. 3 — {total} contributions in the last year, pulled live from github
      </figcaption>
    </figure>
  );
}
