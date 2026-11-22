"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/data/projects";
import type { OsApi } from "../types";

// A Finder-style window: list of projects on the left, details on the right.
export default function Projects({ os }: { os: OsApi }) {
  const [sel, setSel] = useState(0);
  const p = projects[sel];

  return (
    <div className="flex h-full min-h-[380px] flex-col sm:flex-row">
      <ul className="shrink-0 border-b border-black/10 bg-[#f1efe9] p-2 sm:w-52 sm:border-b-0 sm:border-r">
        <li className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-wide text-black/40">~/projects</li>
        {projects.map((x, i) => (
          <li key={x.title}>
            <button onClick={() => setSel(i)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] ${i === sel ? "bg-[#2f6fd6] text-white" : "hover:bg-black/5"}`}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden><path d="M1 4h5l1.5 1.5H15V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z" fill={i === sel ? "#cfe2ff" : "#5b93e6"} /></svg>
              <span className="truncate">{x.title}</span>
              <span className={`ml-auto font-mono text-[10px] ${i === sel ? "text-white/70" : "text-black/35"}`}>{x.year}</span>
            </button>
          </li>
        ))}
      </ul>

      <article key={p.title} className="os-window min-w-0 flex-1 p-5">
        {p.image ? (
          <button onClick={() => p.live && os.open("browser", { url: p.live, title: p.title })}
            className="block w-full overflow-hidden rounded-lg border border-black/10 text-left" aria-label={`Open ${p.title}`}>
            <Image src={p.image} alt={`Screenshot of ${p.title}`} width={1200} height={750} className="h-auto w-full" />
          </button>
        ) : (
          <div className="grid h-40 place-items-center rounded-lg border border-dashed border-black/15 bg-[#f6f4ee] font-mono text-xs text-black/40">
            {p.title === "MirrorVerse" ? "screenshots coming soon · 30K+ on tiktok" : "no screenshot yet"}
          </div>
        )}
        <h2 className="mt-4 font-serif text-3xl leading-none">{p.title}</h2>
        <p className="mt-1 font-mono text-[11px] text-black/45">{p.stack}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-black/75">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
          {p.live && (
            <button onClick={() => os.open("browser", { url: p.live, title: p.title })} className="rounded-md bg-[#1b1a17] px-3 py-1.5 text-white hover:bg-black">
              Open here
            </button>
          )}
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="rounded-md border border-black/15 px-3 py-1.5 hover:bg-black/5">New tab ↗</a>}
          {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="rounded-md border border-black/15 px-3 py-1.5 hover:bg-black/5">Code ↗</a>}
        </div>
      </article>
    </div>
  );
}
