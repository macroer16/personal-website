import Image from "next/image";
import { Globe } from "lucide-react";
import { siGithub } from "simple-icons";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { title, dates, description, tags, github, live, image, label } = project;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition hover:border-faint/50">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        {image ? (
          <Image src={image} alt={`${title} screenshot`} fill sizes="(min-width: 768px) 280px, 100vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
        ) : (
          // Placeholder art: a soft glow on a grid with the project's one-line label.
          <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:24px_24px]">
            <div className="absolute h-24 w-24 rounded-full bg-accent/25 blur-2xl" />
            <span className="relative text-[11px] font-medium uppercase tracking-[0.25em] text-muted">{label ?? title}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-fg">{title}</h3>
        <p className="mt-0.5 text-xs text-faint">{dates}</p>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{description}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t} className="rounded-md bg-pill px-2 py-0.5 text-[11px] font-medium text-fg/80">{t}</li>
          ))}
        </ul>
        {(live || github) && (
          <div className="mt-4 flex gap-2">
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-fg px-2.5 py-1 text-xs font-medium text-bg transition hover:opacity-85">
                <Globe className="h-3.5 w-3.5" /> Website
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-fg transition hover:bg-pill">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden><path d={siGithub.path} /></svg> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
