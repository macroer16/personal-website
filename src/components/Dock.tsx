"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Award, Briefcase, FolderGit2, Home, Mail, Moon, Sun, Activity } from "lucide-react";

const ITEMS = [
  { href: "/#top", label: "Home", Icon: Home },
  { href: "/#projects", label: "Projects", Icon: FolderGit2 },
  { href: "/#experience", label: "Experience", Icon: Briefcase },
  { href: "/#achievements", label: "Achievements", Icon: Award },
  { href: "/#github", label: "GitHub activity", Icon: Activity },
  { href: "/#contact", label: "Contact", Icon: Mail },
];

// Floating bottom dock, scroll progress bar, back-to-top button and light/dark toggle.
export default function Dock() {
  const [progress, setProgress] = useState(0);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[3px] bg-gradient-to-r from-accent to-violet-500" style={{ width: `${progress * 100}%` }} />

      <nav aria-label="Quick navigation" className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <ul className="flex items-center gap-0.5 rounded-full border border-line bg-card/80 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-md">
          {ITEMS.map(({ href, label, Icon }) => (
            <li key={href} className="group relative">
              <a href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-pill hover:text-fg">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-card px-2 py-1 text-xs text-fg opacity-0 transition group-hover:opacity-100">
                {label}
              </span>
            </li>
          ))}
          <li className="mx-1 h-6 w-px bg-line" aria-hidden />
          <li>
            <button onClick={toggleTheme} aria-label="Toggle light and dark mode" className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-pill hover:text-fg">
              {light ? <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />}
            </button>
          </li>
        </ul>
      </nav>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 hidden h-11 w-11 place-items-center rounded-full bg-fg text-bg shadow-lg transition sm:grid ${progress > 0.08 ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
