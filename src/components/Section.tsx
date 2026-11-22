import type { ReactNode } from "react";
import Reveal from "./Reveal";

// Section with the small "— LABEL" eyebrow above a bold title.
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 pt-20">
      <Reveal>
        <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-faint">
          <span className="h-px w-5 bg-faint/60" />
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg">{title}</h2>
        {intro && <p className="mt-1.5 text-[15px] text-muted">{intro}</p>}
        <div className="mt-7">{children}</div>
      </Reveal>
    </section>
  );
}
