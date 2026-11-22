import Link from "next/link";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#github", label: "GitHub" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono text-sm font-semibold text-white">
          victor<span className="text-accent">.</span>benson
        </Link>
        <ul className="hidden gap-6 text-sm text-neutral-400 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white transition hover:border-accent hover:text-accent"
        >
          Say hello
        </Link>
      </nav>
    </header>
  );
}
