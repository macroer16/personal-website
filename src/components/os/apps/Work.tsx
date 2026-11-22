import { work, study } from "@/data/site";
import type { Role } from "@/data/site";

// Experience, as a vertical timeline.
function Item({ r, colour }: { r: Role; colour: string }) {
  return (
    <li className="relative pb-6 pl-6 last:pb-0">
      <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full" style={{ background: colour }} />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <p className="font-medium">{r.org}{r.now && <span className="ml-2 rounded bg-[#e4f6e9] px-1.5 py-0.5 font-mono text-[10px] text-[#17803d]">now</span>}</p>
        <p className="font-mono text-[11px] text-black/45">{r.dates} · {r.place}</p>
      </div>
      <p className="text-[13px] text-black/55">{r.role}</p>
      {r.summary && <p className="mt-1.5 text-[14px] leading-relaxed text-black/75">{r.summary}</p>}
    </li>
  );
}

export default function Work() {
  return (
    <div className="p-6">
      <h2 className="font-serif text-3xl leading-none">work</h2>
      <ol className="relative mt-5 border-l border-black/10 pl-0 [&>li]:-ml-[5px]">
        {work.map((r) => <Item key={r.org} r={r} colour="#6b4a2e" />)}
      </ol>
      <h2 className="mt-8 font-serif text-3xl leading-none">study</h2>
      <ol className="relative mt-5 border-l border-black/10 [&>li]:-ml-[5px]">
        {study.map((r) => <Item key={r.org} r={r} colour="#2f6fd6" />)}
      </ol>
    </div>
  );
}
