import { site } from "@/data/site";
import type { OsApi } from "../types";

// Live GitHub activity: the contributions grid in GitHub greens, plus recently pushed repos.
const GREENS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export default function GitHub({ os }: { os: OsApi }) {
  const c = os.data.contributions;
  const weeks: ({ date: string; count: number; level: number } | null)[][] = [];
  if (c) {
    const first = new Date(c.days[0].date + "T00:00:00Z").getUTCDay();
    const cells = [...Array(first).fill(null), ...c.days];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-medium">@{site.githubUser}</p>
        <a href={site.github} target="_blank" rel="noreferrer" className="font-mono text-xs text-[#2f6fd6] hover:underline">github.com/{site.githubUser} ↗</a>
      </div>
      <p className="mt-0.5 text-sm text-black/55">
        {c ? `${c.total} contributions in the last year` : "contributions unavailable right now"}
        {os.data.repoCount !== null && ` · ${os.data.repoCount} public repos`}
      </p>

      {c && (
        <div className="os-scroll mt-4 overflow-x-auto rounded-lg border border-black/10 bg-white p-3">
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((d, j) => (
                  <span key={j} title={d ? `${d.count} on ${d.date}` : undefined} className="h-[10px] w-[10px] rounded-[2px]"
                    style={{ background: d ? GREENS[d.level] : "transparent" }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {os.data.repos.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {os.data.repos.map((r) => (
            <li key={r.name}>
              <a href={r.html_url} target="_blank" rel="noreferrer" className="block rounded-lg border border-black/10 bg-white p-3 hover:border-black/25">
                <p className="truncate font-mono text-[13px] text-[#2f6fd6]">{r.name}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-black/55">{r.description ?? "—"}</p>
                {r.language && <p className="mt-1.5 text-[11px] text-black/45">● {r.language}</p>}
              </a>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 font-mono text-[11px] text-black/40">fetched live from the github api · refreshed {os.data.refreshed} london time</p>
    </div>
  );
}
