"use client";

import Image from "next/image";
import { site } from "@/data/site";
import AgeCounter from "@/components/AgeCounter";
import type { OsApi } from "../types";

// "about.txt" — styled like a note.
export default function About({ os }: { os: OsApi }) {
  return (
    <div className="p-6 sm:p-7">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-[#ebe6da]">
          {site.photo ? (
            <Image src={site.photo} alt="Victor Benson" fill sizes="80px" className="object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center font-serif text-4xl">vb</span>
          )}
        </div>
        <div>
          <h1 className="font-serif text-4xl leading-none">Victor Benson</h1>
          <p className="mt-1.5 font-mono text-xs text-black/55">cs student @ westminster · aws certified · london</p>
          <p className="mt-1 font-mono text-xs text-black/45">age <AgeCounter birthDate={site.birthDate} /></p>
        </div>
      </div>

      <div className="mt-6 space-y-3.5 text-[15px] leading-relaxed text-black/75">
        <p>
          Hi — I&apos;m Victor, a first-year computer science student at the University of Westminster. I got into tech through IT
          support, fixing laptops, accounts and network problems, and somewhere along the way I wanted to build things instead of just
          fixing them.
        </p>
        <p>
          In summer 2025 I set up Microsoft 365 for four departments at Techlogic IT Services. Before uni I passed the{" "}
          <button onClick={() => os.open("aws")} className="font-medium text-[#1b1a17] underline decoration-[#ff9900] decoration-2 underline-offset-2">AWS Solutions Architect – Associate</button>{" "}
          exam. Now I ship my own{" "}
          <button onClick={() => os.open("projects")} className="font-medium text-[#1b1a17] underline decoration-[#2f6fd6] decoration-2 underline-offset-2">projects</button>
          {" "}— including MirrorVerse, an AI hairstyle try-on app with a 30K+ TikTok following.
        </p>
        <p>
          I play basketball for the Westminster Dragons (there&apos;s a{" "}
          <button onClick={() => os.open("hoops")} className="font-medium text-[#1b1a17] underline decoration-[#f08a24] decoration-2 underline-offset-2">game on this desktop</button>
          {" "}if you want to beat my score).
        </p>
        <p className="rounded-lg bg-[#fff6d6] px-3 py-2 text-[#1b1a17]">
          Looking for <b className="font-medium">spring weeks &amp; summer internships</b> in software engineering and cloud.{" "}
          <button onClick={() => os.open("mail")} className="underline underline-offset-2">Say hello →</button>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
        <a href={site.github} target="_blank" rel="noreferrer" className="rounded-md border border-black/15 px-2.5 py-1.5 hover:bg-black/5">github ↗</a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-black/15 px-2.5 py-1.5 hover:bg-black/5">linkedin ↗</a>
        <button onClick={() => os.open("work")} className="rounded-md border border-black/15 px-2.5 py-1.5 hover:bg-black/5">experience</button>
        <button onClick={() => os.open("terminal")} className="rounded-md border border-black/15 px-2.5 py-1.5 hover:bg-black/5">open terminal</button>
      </div>
    </div>
  );
}
