"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Sky from "./Sky";
import Window from "./Window";
import { ICONS } from "./Icons";
import type { AppId, OsApi, OsData, Win } from "./types";
import About from "./apps/About";
import Projects from "./apps/Projects";
import Terminal from "./apps/Terminal";
import GitHub from "./apps/GitHub";
import Hoops from "./apps/Hoops";
import Mail from "./apps/Mail";
import Work from "./apps/Work";
import Cv from "./apps/Cv";
import Aws from "./apps/Aws";
import Browser from "./apps/Browser";

// ---- App registry: title, default window size, and what to render ----
const APPS: Record<AppId, { title: string; label: string; w: number; h: number }> = {
  about: { title: "about.txt", label: "About", w: 560, h: 560 },
  projects: { title: "~/projects", label: "Projects", w: 760, h: 520 },
  terminal: { title: "guest@victoros — zsh", label: "Terminal", w: 640, h: 420 },
  github: { title: "GitHub — @macroer16", label: "GitHub", w: 760, h: 470 },
  hoops: { title: "hoops.exe", label: "Hoops", w: 380, h: 560 },
  mail: { title: "New message", label: "Mail", w: 520, h: 400 },
  work: { title: "Experience", label: "Work", w: 560, h: 540 },
  cv: { title: "Victor_Benson_CV.pdf", label: "CV", w: 620, h: 600 },
  aws: { title: "AWS Console", label: "AWS", w: 700, h: 560 },
  browser: { title: "Browser", label: "Browser", w: 980, h: 640 },
};
const DESKTOP_ICONS: AppId[] = ["about", "projects", "work", "cv", "terminal", "aws"];
const DOCK: AppId[] = ["about", "projects", "terminal", "github", "aws", "hoops", "mail"];

function renderApp(w: Win, os: OsApi): ReactNode {
  switch (w.app) {
    case "about": return <About os={os} />;
    case "projects": return <Projects os={os} />;
    case "terminal": return <Terminal os={os} />;
    case "github": return <GitHub os={os} />;
    case "hoops": return <Hoops />;
    case "mail": return <Mail />;
    case "work": return <Work />;
    case "cv": return <Cv />;
    case "aws": return <Aws os={os} />;
    case "browser": return <Browser url={w.url!} />;
  }
}

function useLondonTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleString("en-GB", { timeZone: "Europe/London", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }));
    f();
    const i = setInterval(f, 10_000);
    return () => clearInterval(i);
  }, []);
  return t;
}

// ---- Boot screen ----
const BOOT = [
  "VictorOS 1.0 — booting from london (eu-west-2)",
  "mounting s3://victor-benson ............ ok",
  "loading westminster-cs-2029.ko ......... ok",
  "verifying aws-saa-c03 .................. valid",
  "fetching github.com/macroer16 .......... ok",
  "starting desktop",
];

function Boot({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= BOOT.length) { const t = setTimeout(onDone, 350); return () => clearTimeout(t); }
    const t = setTimeout(() => setN(n + 1), n === 0 ? 300 : 230);
    return () => clearTimeout(t);
  }, [n, onDone]);
  return (
    <button onClick={onDone} className="fixed inset-0 z-[999] flex cursor-default flex-col items-start justify-end bg-[#07090d] p-8 text-left font-mono text-[13px] text-[#5be38a] sm:p-12" aria-label="Skip start-up animation">
      {BOOT.slice(0, n).map((l) => <p key={l}>{l}</p>)}
      <p className="mt-1">_<span className="caret">█</span></p>
      <p className="mt-6 text-white/30">click to skip</p>
    </button>
  );
}

// ---- Main component ----
export default function Desktop({ data }: { data: OsData }) {
  const [wins, setWins] = useState<Win[]>([]);
  const [booted, setBooted] = useState<boolean | null>(null);
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [sheet, setSheet] = useState<Win | null>(null);
  const z = useRef(10);
  const time = useLondonTime();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    let seen = false;
    try { seen = sessionStorage.getItem("booted") === "1"; } catch {}
    setBooted(seen);
    return () => mq.removeEventListener("change", set);
  }, []);

  const open = useCallback((app: AppId, opts?: { url?: string; title?: string }) => {
    const def = APPS[app];
    if (window.matchMedia("(max-width: 767px)").matches) {
      setSheet({ id: app, app, title: opts?.title ?? def.title, x: 0, y: 0, w: 0, h: 0, z: 0, min: false, max: false, url: opts?.url });
      return;
    }
    setWins((ws) => {
      const existing = ws.find((w) => w.app === app && (app !== "browser" || w.url === opts?.url));
      z.current += 1;
      if (existing) return ws.map((w) => (w.id === existing.id ? { ...w, min: false, z: z.current } : w));
      const vw = window.innerWidth, vh = window.innerHeight;
      const w = Math.min(def.w, vw - 40), h = Math.min(def.h, vh - 140);
      const n = ws.length;
      const x = Math.max(20, Math.min(vw - w - 20, (vw - w) / 2 + (n % 5) * 28 - 60));
      const y = Math.max(40, Math.min(vh - h - 100, (vh - h) / 2 + (n % 5) * 24 - 40));
      return [...ws, { id: `${app}-${Date.now()}`, app, title: opts?.title ? `${opts.title} — browser` : def.title, x, y, w, h, z: z.current, min: false, max: false, url: opts?.url }];
    });
  }, []);

  // After boot, open the About window so there's something to read straight away.
  const finishBoot = useCallback(() => {
    try { sessionStorage.setItem("booted", "1"); } catch {}
    setBooted(true);
  }, []);
  useEffect(() => {
    if (booted && mobile === false && wins.length === 0) open("about");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, mobile]);

  const os: OsApi = { open, data };
  const focus = (id: string) => { z.current += 1; setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z: z.current } : w))); };
  const patch = (id: string, p: Partial<Win>) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...p } : w)));
  const topId = wins.filter((w) => !w.min).sort((a, b) => b.z - a.z)[0]?.id;

  if (mobile === null || booted === null) return <div className="fixed inset-0 bg-[#07090d]" />;

  // ---------- Phone: a home screen of apps ----------
  if (mobile) {
    return (
      <div className="fixed inset-0 overflow-hidden text-white">
        <Sky />
        {!booted && <Boot onDone={finishBoot} />}
        <div className="relative flex h-full flex-col px-5 pb-6 pt-3">
          <div className="flex justify-between text-[13px] font-medium"><span>{time.split(", ").pop()}</span><span>london</span></div>
          <div className="mt-6 rounded-3xl bg-black/25 p-5 backdrop-blur-md">
            <p className="font-serif text-4xl leading-none">Victor Benson</p>
            <p className="mt-2 text-sm text-white/80">CS @ Westminster · AWS Solutions Architect</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs"><span className="h-2 w-2 rounded-full bg-[#5be38a]" />open to spring weeks &amp; internships</p>
          </div>
          <div className="mt-7 grid grid-cols-4 gap-x-4 gap-y-6">
            {(["about", "projects", "work", "terminal", "github", "aws", "cv", "hoops"] as AppId[]).map((a) => (
              <button key={a} onClick={() => open(a)} className="flex flex-col items-center gap-1.5">
                <span className="h-14 w-14">{ICONS[a]()}</span>
                <span className="text-[11px] drop-shadow">{APPS[a].label}</span>
              </button>
            ))}
          </div>
          <Link href="/plain" className="mt-6 self-center rounded-full bg-black/25 px-4 py-1.5 text-xs backdrop-blur">plain version for recruiters →</Link>
          <div className="mt-auto flex justify-around rounded-3xl bg-white/20 p-3 backdrop-blur-md">
            {(["mail", "terminal", "projects", "github"] as AppId[]).map((a) => (
              <button key={a} onClick={() => open(a)} aria-label={APPS[a].label} className="h-14 w-14">{ICONS[a]()}</button>
            ))}
          </div>
        </div>
        {sheet && (
          <div className="os-window fixed inset-0 z-50 flex flex-col bg-[#fbfaf7] text-[#1b1a17]">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
              <button onClick={() => setSheet(null)} className="text-[15px] text-[#2f6fd6]">‹ Home</button>
              <p className="truncate px-2 text-[15px] font-medium">{sheet.title}</p>
              <span className="w-14" />
            </div>
            <div className="min-h-0 flex-1 overflow-auto">{renderApp(sheet, os)}</div>
          </div>
        )}
      </div>
    );
  }

  // ---------- Desktop ----------
  return (
    <div className="fixed inset-0 select-none overflow-hidden">
      <Sky />
      {!booted && <Boot onDone={finishBoot} />}

      {/* Menu bar */}
      <header className="absolute inset-x-0 top-0 z-[500] flex h-7 items-center gap-5 bg-black/30 px-4 text-[13px] text-white backdrop-blur-md">
        <span className="font-semibold">●&nbsp; VictorOS</span>
        {(["about", "projects", "work", "terminal", "mail"] as AppId[]).map((a) => (
          <button key={a} onClick={() => open(a)} className="hidden text-white/85 hover:text-white lg:inline">{APPS[a].label === "Mail" ? "Contact" : APPS[a].label}</button>
        ))}
        <span className="ml-auto" />
        <Link href="/plain" className="rounded bg-white/15 px-2 py-0.5 text-[12px] hover:bg-white/25">plain version</Link>
        <span className="tabular-nums">{time}</span>
      </header>

      {/* Desktop icons */}
      <div className="absolute left-4 top-12 z-[1] grid grid-flow-col grid-rows-6 gap-2">
        {DESKTOP_ICONS.map((a) => (
          <button key={a} onDoubleClick={() => open(a)} onClick={(e) => e.detail === 0 && open(a)}
            onKeyDown={(e) => e.key === "Enter" && open(a)}
            className="group flex w-[84px] flex-col items-center gap-1 rounded-lg p-1.5 text-white focus:bg-white/15" title={`Double-click to open ${APPS[a].label}`}>
            <span className="h-12 w-12 transition group-hover:scale-105">{ICONS[a]()}</span>
            <span className="rounded px-1 text-[12px] leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">{a === "about" ? "about.txt" : a === "cv" ? "CV.pdf" : a === "projects" ? "Projects" : APPS[a].label}</span>
          </button>
        ))}
      </div>

      {/* Widgets */}
      <aside className="absolute right-5 top-12 z-[1] hidden w-64 space-y-3 xl:block">
        <div className="rounded-2xl bg-black/30 p-4 text-white backdrop-blur-md">
          <p className="text-[11px] uppercase text-white/60">london</p>
          <p className="text-4xl font-light tabular-nums">{time.split(", ").pop()}</p>
          <p className="mt-1 text-xs text-white/70">the sky behind is the real one right now</p>
        </div>
        <button onClick={() => open("github")} className="block w-full rounded-2xl bg-black/30 p-4 text-left text-white backdrop-blur-md hover:bg-black/40">
          <p className="text-[11px] uppercase text-white/60">github</p>
          <p className="text-3xl font-light">{data.contributions?.total ?? "—"}</p>
          <p className="text-xs text-white/70">contributions this year →</p>
        </button>
        <div className="rotate-[1.5deg] bg-[#fff3a8] p-4 font-hand text-[22px] leading-tight text-[#3b3110] shadow-lg">
          hi! I&apos;m Victor. double-click anything — or try the terminal. there&apos;s a game in the dock too.
          <span className="mt-1 block text-right">— v</span>
        </div>
      </aside>

      {/* Windows */}
      {wins.map((w) => (
        <Window key={w.id} win={w} active={w.id === topId}
          onFocus={() => focus(w.id)}
          onClose={() => setWins((ws) => ws.filter((x) => x.id !== w.id))}
          onMin={() => patch(w.id, { min: true })}
          onMax={() => patch(w.id, { max: !w.max })}
          onMove={(x, y) => patch(w.id, { x, y })}>
          {renderApp(w, os)}
        </Window>
      ))}

      {/* Dock */}
      <nav aria-label="Dock" className="absolute bottom-3 left-1/2 z-[600] -translate-x-1/2">
        <ul className="flex items-end gap-2 rounded-2xl border border-white/25 bg-white/20 px-2.5 py-2 backdrop-blur-xl">
          {DOCK.map((a) => {
            const isOpen = wins.some((w) => w.app === a);
            return (
              <li key={a} className="group relative flex flex-col items-center">
                <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">{APPS[a].label}</span>
                <button onClick={() => open(a)} aria-label={`Open ${APPS[a].label}`} className="h-12 w-12 transition-all duration-150 group-hover:-translate-y-2 group-hover:scale-125">
                  {ICONS[a]()}
                </button>
                <span className={`mt-1 h-1 w-1 rounded-full ${isOpen ? "bg-white" : "bg-transparent"}`} />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
