import type { OsApi } from "../types";
import { certifications } from "@/data/site";

// An AWS-console-style window: my certifications, and the real architecture of this site.
const NODES = [
  { label: "your browser", note: "anywhere" },
  { label: "vercel edge", note: "nearest region" },
  { label: "next.js", note: "server components" },
  { label: "github api", note: "cached 1h" },
];

export default function Aws({ os }: { os: OsApi }) {
  return (
    <div className="min-h-full bg-[#f2f3f3] text-[#16191f]">
      <div className="flex items-center gap-3 bg-[#232f3e] px-4 py-2 text-white">
        <span className="font-bold">aws</span>
        <span className="text-xs text-white/60">Console · victor-benson · eu-west-2 (London)</span>
      </div>
      <div className="space-y-4 p-4">
        <section className="rounded border border-[#d5dbdb] bg-white">
          <h3 className="border-b border-[#eaeded] px-4 py-2.5 font-bold">Certifications <span className="font-normal text-[#687078]">({certifications.length})</span></h3>
          {certifications.map((c) => (
            <div key={c.code} className="flex items-center justify-between border-b border-[#eaeded] px-4 py-3 last:border-0">
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="font-mono text-xs text-[#687078]">{c.code}</p>
              </div>
              <span className="rounded-full bg-[#e9f7ec] px-2.5 py-0.5 text-xs font-medium text-[#037f0c]">● Active</span>
            </div>
          ))}
        </section>

        <section className="rounded border border-[#d5dbdb] bg-white p-4">
          <h3 className="font-bold">Architecture: this website</h3>
          <p className="mt-1 text-xs text-[#687078]">How the page you&apos;re looking at reached you. The dot is a request travelling through it.</p>
          <div className="os-scroll mt-4 overflow-x-auto">
            <svg viewBox="0 0 640 110" className="w-full min-w-[520px] font-mono" role="img" aria-label="Browser to Vercel edge to Next.js to GitHub API">
              <line x1="120" y1="40" x2="520" y2="40" stroke="#aab7b8" strokeWidth="2" strokeDasharray="5 5" />
              <circle r="5" fill="#ff9900">
                <animateMotion dur="2.6s" repeatCount="indefinite" path="M120,40 L520,40" />
              </circle>
              {NODES.map((n, i) => (
                <g key={n.label} transform={`translate(${i * 170},0)`}>
                  <rect x="4" y="16" width="112" height="48" rx="6" fill="#fff" stroke="#232f3e" strokeWidth="1.5" />
                  <text x="60" y="45" textAnchor="middle" fontSize="12.5" fill="#16191f">{n.label}</text>
                  <text x="60" y="88" textAnchor="middle" fontSize="11" fill="#687078">{n.note}</text>
                </g>
              ))}
            </svg>
          </div>
          <p className="mt-2 font-mono text-[11px] text-[#687078]">github data last refreshed {os.data.refreshed} (london)</p>
        </section>

        <section className="rounded border border-[#d5dbdb] bg-white p-4 text-sm">
          <h3 className="font-bold">Services I&apos;ve used</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {["S3", "CloudFront", "EC2", "IAM", "Route 53 / DNS"].map((s) => (
              <span key={s} className="rounded border border-[#d5dbdb] px-2.5 py-1 font-mono text-xs">{s}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
