import type { Day } from "@/lib/github";

// GitHub-style contributions calendar: 53 columns (weeks) × 7 rows (days).
const COLOURS = ["bg-pill", "bg-emerald-900", "bg-emerald-700", "bg-emerald-500", "bg-emerald-400"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Heatmap({ days, total }: { days: Day[]; total: number }) {
  // Pad the start so the first column begins on a Sunday, like GitHub.
  const first = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells: (Day | null)[] = [...Array(first).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Month label above the first week that starts in a new month.
  let lastMonth = -1;
  const labels = weeks.map((w) => {
    const d = w.find(Boolean);
    if (!d) return "";
    const date = new Date(d.date + "T00:00:00Z");
    const m = date.getUTCMonth();
    // Only label a month in the week its first days fall in, so labels never overlap.
    if (m === lastMonth || date.getUTCDate() > 7) return "";
    lastMonth = m;
    return MONTHS[m];
  });

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-1">
          <div className="flex gap-[3px] pl-0 text-[10px] text-faint">
            {labels.map((l, i) => (
              <span key={i} className="w-[11px] overflow-visible whitespace-nowrap">{l}</span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((d, j) =>
                  d ? (
                    <span
                      key={j}
                      title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                      className={`h-[11px] w-[11px] rounded-[2px] ${COLOURS[d.level]}`}
                    />
                  ) : (
                    <span key={j} className="h-[11px] w-[11px]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>{total.toLocaleString()} contributions in the last year</span>
        <span className="flex items-center gap-1">
          Less
          {COLOURS.map((c) => <span key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />)}
          More
        </span>
      </div>
    </div>
  );
}
