"use client";

import { useState } from "react";

// A tiny browser that runs one of my live projects inside the desktop.
export default function Browser({ url }: { url: string }) {
  const [key, setKey] = useState(0);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-black/10 bg-[#f4f2ec] px-3 py-1.5">
        <button onClick={() => setKey((k) => k + 1)} aria-label="Reload" className="rounded px-1.5 text-black/50 hover:bg-black/5">↻</button>
        <div className="flex-1 truncate rounded-md bg-white px-3 py-1 font-mono text-xs text-black/60">🔒 {url.replace("https://", "")}</div>
        <a href={url} target="_blank" rel="noreferrer" className="rounded px-1.5 text-xs text-black/50 hover:bg-black/5">open ↗</a>
      </div>
      <iframe key={key} src={url} title={url} className="min-h-[300px] w-full flex-1 bg-white" />
    </div>
  );
}
