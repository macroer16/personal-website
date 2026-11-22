"use client";

import { useRef } from "react";
import type { ReactNode, PointerEvent } from "react";
import type { Win } from "./types";

// A draggable window with close / minimise / maximise buttons.
export default function Window({
  win, active, onFocus, onClose, onMin, onMax, onMove, children,
}: {
  win: Win;
  active: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMin: () => void;
  onMax: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
}) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button") || win.max) return;
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const x = Math.min(Math.max(e.clientX - drag.current.dx, -win.w + 120), window.innerWidth - 120);
    const y = Math.min(Math.max(e.clientY - drag.current.dy, 28), window.innerHeight - 80);
    onMove(x, y);
  };

  const style = win.max
    ? { left: 0, top: 28, width: "100vw", height: "calc(100vh - 28px - 84px)", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <section
      role="dialog"
      aria-label={win.title}
      onPointerDown={onFocus}
      className={`os-window absolute flex flex-col overflow-hidden rounded-xl border bg-[#fbfaf7] text-[#1b1a17] ${win.min ? "hidden" : ""} ${
        active ? "border-black/25 shadow-[0_24px_70px_-10px_rgba(0,0,0,0.55)]" : "border-black/15 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)]"
      }`}
      style={style}
    >
      <div
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => (drag.current = null)}
        onDoubleClick={onMax}
        className={`flex h-9 shrink-0 cursor-grab select-none items-center gap-2 border-b border-black/10 px-3 active:cursor-grabbing ${active ? "bg-[#efece4]" : "bg-[#f4f2ec]"}`}
      >
        <div className="group flex gap-1.5">
          <button aria-label="Close" onClick={onClose} className="grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] text-[8px] leading-none text-black/0 group-hover:text-black/60">×</button>
          <button aria-label="Minimise" onClick={onMin} className="grid h-3 w-3 place-items-center rounded-full bg-[#febc2e] text-[8px] leading-none text-black/0 group-hover:text-black/60">–</button>
          <button aria-label="Maximise" onClick={onMax} className="grid h-3 w-3 place-items-center rounded-full bg-[#28c840] text-[8px] leading-none text-black/0 group-hover:text-black/60">+</button>
        </div>
        <p className={`flex-1 truncate pr-12 text-center text-[13px] ${active ? "text-black/75" : "text-black/40"}`}>{win.title}</p>
      </div>
      <div className="os-scroll relative min-h-0 flex-1 overflow-auto">{children}</div>
    </section>
  );
}
