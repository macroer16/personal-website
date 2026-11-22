import Link from "next/link";
import type { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

// The page is a single column framed by dashed rules, like a page from a notebook.
export function Header() {
  return (
    <header className="border-b border-dashed border-rule">
      <div className="mx-auto flex max-w-[720px] items-baseline justify-between border-x border-dashed border-rule px-6 py-4">
        <Link href="/" className="font-serif text-2xl leading-none text-ink">
          vb<span className="text-red">.</span>
        </Link>
        <nav className="flex items-baseline gap-5 text-sm text-soft">
          <Link href="/#about" className="hidden hover:text-ink sm:inline">about</Link>
          <Link href="/#work" className="hover:text-ink">work</Link>
          <Link href="/projects" className="hover:text-ink">projects</Link>
          <Link href="/#contact" className="hidden hover:text-ink sm:inline">contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

// A section: dashed rule above, lowercase serif heading, content.
export function Block({ id, title, children }: { id?: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-4 border-b border-dashed border-rule">
      <div className="mx-auto max-w-[720px] border-x border-dashed border-rule px-6 py-12">
        {title && <h2 className="mb-6 font-serif text-[40px] leading-none text-ink">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export function Footer({ refreshed }: { refreshed?: string }) {
  return (
    <footer>
      <div className="mx-auto max-w-[720px] border-x border-dashed border-rule px-6 pb-16 pt-8 font-mono text-xs leading-relaxed text-faint">
        <p>made in london · next.js, hosted on vercel</p>
        {refreshed && <p>github data refreshed {refreshed}.</p>}
        <p>© {new Date().getFullYear()} victor benson</p>
      </div>
    </footer>
  );
}
