"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { site, toolbox, certifications, work } from "@/data/site";
import { projects } from "@/data/projects";
import type { AppId, OsApi } from "../types";

// A small shell with real commands. Type `help` to see them all.

type Line = { kind: "in" | "out"; content: ReactNode };

const G = ({ children }: { children: ReactNode }) => <span className="text-[#5be38a]">{children}</span>;
const Y = ({ children }: { children: ReactNode }) => <span className="text-[#ffcb6b]">{children}</span>;
const B = ({ children }: { children: ReactNode }) => <span className="text-[#7ab8ff]">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-white/45">{children}</span>;

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const COMMANDS: Record<string, string> = {
  help: "list commands",
  whoami: "who is victor?",
  neofetch: "system info, victor edition",
  projects: "list projects",
  "aws s3 ls": "my projects, as s3 buckets",
  skills: "what I work with",
  certs: "certifications",
  experience: "where I've worked",
  "open <app>": "open about | projects | github | hoops | mail | work | cv | aws",
  contact: "how to reach me",
  github: "live github stats",
  date: "time in london",
  clear: "clear the screen",
};

const APPS: AppId[] = ["about", "projects", "github", "hoops", "mail", "work", "cv", "aws", "terminal"];

export default function Terminal({ os }: { os: OsApi }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", content: <>VictorOS 1.0 — login: <G>guest</G> · {new Date().toDateString()}</> },
    { kind: "out", content: <D>type <span className="text-white">help</span> to get started, or try <span className="text-white">neofetch</span></D> },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => { box.current?.scrollTo(0, box.current.scrollHeight); }, [lines]);
  useEffect(() => { field.current?.focus(); }, []);

  const run = (raw: string): ReactNode | null | "clear" => {
    const cmd = raw.trim().replace(/\s+/g, " ");
    const lower = cmd.toLowerCase();
    if (!cmd) return null;
    if (lower === "clear" || lower === "cls") return "clear";
    if (lower === "help") {
      return (
        <div className="grid grid-cols-[150px_1fr] gap-x-3">
          {Object.entries(COMMANDS).map(([c, d]) => [<G key={c}>{c}</G>, <D key={c + "-d"}>{d}</D>])}
        </div>
      );
    }
    if (lower === "whoami") {
      return <>victor benson — first-year computer science @ university of westminster, london. aws certified solutions architect. builds things and posts them on tiktok. <Y>open to spring weeks & internships.</Y></>;
    }
    if (lower === "neofetch") {
      const c = os.data.contributions;
      return (
        <div className="flex gap-5">
          <pre className="leading-tight text-[#7ab8ff]">{`  __   __
  \\ \\ / /
   \\ V /
    \\_/ `}<span className="text-[#ff5f57]">{`
     ●`}</span></pre>
          <div>
            <p><G>victor</G>@<G>westminster</G></p>
            <D>-------------------</D>
            <p><B>os</B>        VictorOS 1.0 (london)</p>
            <p><B>uptime</B>    {((Date.now() - new Date(site.birthDate).getTime()) / 31556952000).toFixed(2)} years</p>
            <p><B>degree</B>    BSc Computer Science (2026–29)</p>
            <p><B>cloud</B>     AWS SAA-C03 ✓  CLF-C02 ✓</p>
            <p><B>languages</B> python, typescript, javascript</p>
            <p><B>commits</B>   {c ? `${c.total} in the last year` : "see github"}</p>
            <p><B>sport</B>     basketball — westminster dragons</p>
          </div>
        </div>
      );
    }
    if (lower === "projects" || lower === "ls" || lower === "ls projects") {
      return projects.map((p) => <p key={p.title}><B>{slug(p.title)}/</B> <D>— {p.year} · {p.stack}</D></p>);
    }
    if (lower === "aws s3 ls") {
      return projects.map((p) => (
        <p key={p.title}><D>2026-11-22 18:00:00</D> s3://victor-{slug(p.title)}{p.live ? <G> (live)</G> : ""}</p>
      ));
    }
    if (lower === "skills") return toolbox.map((t) => <p key={t.area}><Y>{t.area.padEnd(10, " ")}</Y> {t.items}</p>);
    if (lower === "certs") return certifications.map((c) => <p key={c.code}><G>✓</G> {c.name} <D>({c.code})</D></p>);
    if (lower === "experience" || lower === "work") return work.map((w) => <p key={w.org}><Y>{w.dates}</Y> {w.org} <D>— {w.role}</D></p>);
    if (lower === "contact") return <>email <G>{site.email.toLowerCase()}</G> · linkedin <B>/in/victor-benson</B> · github <B>@{site.githubUser}</B>. or type <span className="text-white">open mail</span>.</>;
    if (lower === "github") {
      const c = os.data.contributions;
      return <>{c ? <><G>{c.total}</G> contributions in the last year · </> : null}{os.data.repoCount ?? "?"} public repos · <span className="text-white">open github</span> for the full grid</>;
    }
    if (lower === "date") return new Date().toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" }) + " (london)";
    if (lower.startsWith("open ")) {
      const a = lower.slice(5) as AppId;
      if (APPS.includes(a)) { os.open(a); return <D>opening {a}…</D>; }
      return <>open: no app called &quot;{a}&quot;. try: {APPS.join(", ")}</>;
    }
    if (lower.startsWith("sudo")) {
      if (lower.includes("hire")) { os.open("mail"); return <G>permission granted. opening mail…</G>; }
      return <>nice try. guest is not in the sudoers file. <D>(try: sudo hire victor)</D></>;
    }
    if (lower === "exit") return <D>there&apos;s no leaving. close the window instead.</D>;
    if (lower === "rm -rf /" || lower.startsWith("rm ")) return <>rm: refusing — this is a portfolio, not a playground. 😅</>;
    if (lower === "ping victor") return <>PONG — replies fastest by email. <D>(open mail)</D></>;
    return <>command not found: {cmd.split(" ")[0]}. type <span className="text-white">help</span>.</>;
  };

  const submit = () => {
    const out = run(input);
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 50));
    setHIdx(-1);
    if (out === "clear") { setLines([]); setInput(""); return; }
    setLines((l) => [...l, { kind: "in", content: input }, ...(out ? [{ kind: "out" as const, content: out }] : [])]);
    setInput("");
  };

  const complete = () => {
    const opts = [...Object.keys(COMMANDS).filter((c) => !c.includes("<")), ...APPS.map((a) => `open ${a}`), "sudo hire victor"];
    const m = opts.filter((o) => o.startsWith(input.toLowerCase()));
    if (m.length === 1) setInput(m[0]);
    else if (m.length > 1) setLines((l) => [...l, { kind: "in", content: input }, { kind: "out", content: <D>{m.join("   ")}</D> }]);
  };

  return (
    <div ref={box} onClick={() => field.current?.focus()} className="os-scroll h-full min-h-[300px] cursor-text overflow-auto bg-[#111316] p-4 font-mono text-[13px] leading-relaxed text-white/85">
      {lines.map((l, i) =>
        l.kind === "in" ? (
          <p key={i} className="mt-2"><G>guest@victoros</G><D>:~$</D> {l.content}</p>
        ) : (
          <div key={i} className="mt-1 whitespace-pre-wrap break-words">{l.content}</div>
        ),
      )}
      <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="mt-2 flex">
        <label htmlFor="term-in" className="shrink-0"><G>guest@victoros</G><D>:~$</D>&nbsp;</label>
        <input id="term-in" ref={field} value={input} autoComplete="off" spellCheck={false} autoCapitalize="none"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") { e.preventDefault(); complete(); }
            if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hIdx + 1, history.length - 1); if (history[n] !== undefined) { setHIdx(n); setInput(history[n]); } }
            if (e.key === "ArrowDown") { e.preventDefault(); const n = hIdx - 1; setHIdx(Math.max(n, -1)); setInput(n >= 0 ? history[n] : ""); }
          }}
          className="min-w-0 flex-1 bg-transparent text-white caret-[#5be38a] outline-none" />
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {["neofetch", "aws s3 ls", "skills", "sudo hire victor"].map((s) => (
          <button key={s} onClick={(e) => { e.stopPropagation(); setInput(s); field.current?.focus(); }}
            className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-white/55 hover:border-white/40 hover:text-white">{s}</button>
        ))}
      </div>
    </div>
  );
}
