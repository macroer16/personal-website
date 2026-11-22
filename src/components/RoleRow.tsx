import { ChevronRight } from "lucide-react";
import type { Role } from "@/data/site";

// One experience/education row. Click to expand the details (works without JavaScript).
export default function RoleRow({ r }: { r: Role }) {
  const body = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="flex flex-wrap items-center gap-2 font-semibold text-fg">
          {r.org}
          {r.badge && <span className="rounded-md bg-pill px-2 py-0.5 text-xs font-medium text-fg/85">{r.badge}</span>}
          {r.points.length > 0 && <ChevronRight className="h-4 w-4 text-faint transition group-open:rotate-90" />}
        </p>
        <p className="mt-0.5 text-sm text-muted">{r.role}</p>
      </div>
      <p className="shrink-0 text-sm tabular-nums text-muted">{r.dates}</p>
    </div>
  );

  if (!r.points.length) return <div className="py-3">{body}</div>;
  return (
    <details className="group py-3">
      <summary className="cursor-pointer">{body}</summary>
      <ul className="mt-3 space-y-1.5 border-l border-line pl-4 text-sm leading-relaxed text-muted">
        {r.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </details>
  );
}
