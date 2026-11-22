import Image from "next/image";
import type { Project } from "@/data/projects";

// One project: optional screenshot as a captioned figure, then title, year, words and links.
export default function ProjectEntry({ p, fig }: { p: Project; fig?: number }) {
  return (
    <article className="py-7 first:pt-0 last:pb-0">
      {p.image && (
        <figure className="mb-5">
          <a href={p.live ?? p.github} target="_blank" rel="noreferrer"
            className="block overflow-hidden rounded-[3px] border border-rule">
            <Image src={p.image} alt={`Screenshot of ${p.title}`} width={1200} height={750} className="h-auto w-full" />
          </a>
          {fig && <figcaption className="mt-2 font-mono text-xs text-faint">fig. {fig} — {p.live?.replace("https://", "")}</figcaption>}
        </figure>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[28px] leading-tight text-ink">{p.title}</h3>
        <span className="font-mono text-xs text-faint">{p.year}</span>
      </div>
      <p className="mt-2 text-soft">{p.description}</p>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-xs">
        <span className="text-faint">{p.stack}</span>
        {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="link text-ink">live ↗</a>}
        {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="link text-ink">code ↗</a>}
      </div>
    </article>
  );
}
