import { site, certifications, work } from "@/data/site";

// CV viewer. Shows the PDF once it's added; until then, a one-page summary.
export default function Cv() {
  if (site.cvReady) return <iframe src={site.cv} title="Victor Benson CV" className="h-full min-h-[420px] w-full" />;
  return (
    <div className="bg-[#e9e6df] p-4 sm:p-6">
      <div className="mx-auto max-w-[560px] bg-white p-7 text-[13px] leading-relaxed shadow-md">
        <h1 className="font-serif text-3xl leading-none">Victor Benson</h1>
        <p className="mt-1 text-black/55">London · {site.email.toLowerCase()} · github.com/{site.githubUser}</p>
        <h2 className="mt-5 border-b border-black/15 pb-1 text-[11px] font-semibold tracking-wide text-black/60">EDUCATION</h2>
        <p className="mt-2"><b className="font-medium">BSc Computer Science</b>, University of Westminster <span className="float-right text-black/45">2026 – 2029</span></p>
        <p><b className="font-medium">BTEC L3 Extended Diploma in Computing</b>, Hertford Regional College <span className="float-right text-black/45">2024 – 2026</span></p>
        <h2 className="mt-5 border-b border-black/15 pb-1 text-[11px] font-semibold tracking-wide text-black/60">CERTIFICATIONS</h2>
        {certifications.map((c) => <p key={c.code} className="mt-1">{c.name} ({c.code})</p>)}
        <h2 className="mt-5 border-b border-black/15 pb-1 text-[11px] font-semibold tracking-wide text-black/60">EXPERIENCE</h2>
        {work.map((w) => (
          <div key={w.org} className="mt-2">
            <p><b className="font-medium">{w.org}</b> — {w.role} <span className="float-right text-black/45">{w.dates}</span></p>
          </div>
        ))}
        <p className="mt-6 rounded bg-[#fff6d6] px-3 py-2 text-center">
          Want the full PDF? <a className="underline" href={`mailto:${site.email}?subject=CV%20request`}>Email me</a> and I&apos;ll send it.
        </p>
      </div>
    </div>
  );
}
