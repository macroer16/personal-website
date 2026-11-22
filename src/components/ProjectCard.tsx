import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { title, years, description, tags, github, live, status } = project;
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="shrink-0 font-mono text-xs text-neutral-500">{years}</span>
      </div>
      {status && (
        <span
          className={`mt-2 w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${
            status === "Live"
              ? "bg-emerald-400/10 text-emerald-300"
              : status === "In progress"
                ? "bg-amber-400/10 text-amber-300"
                : "bg-white/5 text-neutral-400"
          }`}
        >
          {status}
        </span>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-neutral-300">
            {t}
          </li>
        ))}
      </ul>
      {(github || live) && (
        <div className="mt-5 flex gap-4 text-sm">
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              Live site ↗
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white">
              Code ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
