"use client";

import { useState } from "react";
import { site } from "@/data/site";

// A compose window. "Send" opens the visitor's own email app with everything filled in.
export default function Mail() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("Hello Victor");
  const [body, setBody] = useState("");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + (from ? `\n\n— ${from}` : ""))}`;

  return (
    <div className="flex h-full flex-col text-[14px]">
      <div className="divide-y divide-black/10 border-b border-black/10">
        <p className="flex gap-3 px-4 py-2"><span className="w-16 text-black/40">To</span><span>Victor Benson &lt;{site.email.toLowerCase()}&gt;</span></p>
        <label className="flex gap-3 px-4 py-2"><span className="w-16 text-black/40">From</span>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="your name" className="flex-1 bg-transparent outline-none" /></label>
        <label className="flex gap-3 px-4 py-2"><span className="w-16 text-black/40">Subject</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="flex-1 bg-transparent outline-none" /></label>
      </div>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} aria-label="Message"
        placeholder="Spring week, internship, a project, or just hi…" className="min-h-[140px] flex-1 resize-none bg-transparent p-4 outline-none" />
      <div className="flex items-center justify-between border-t border-black/10 px-4 py-2.5">
        <p className="font-mono text-[11px] text-black/40">opens in your email app</p>
        <a href={href} className="rounded-md bg-[#2f6fd6] px-4 py-1.5 text-white hover:bg-[#2459ad]">Send</a>
      </div>
    </div>
  );
}
