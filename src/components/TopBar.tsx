import Link from "next/link";
import { Home } from "lucide-react";

const LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#github", label: "Activity" },
];

export default function TopBar() {
  return (
    <header className="mx-auto flex max-w-[850px] items-center justify-between px-5 pt-6">
      <Link href="/" aria-label="Home" className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-pill hover:text-fg">
        <Home className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </Link>
      <nav className="hidden rounded-full border border-line bg-card/70 px-1.5 py-1 backdrop-blur sm:block">
        <ul className="flex text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block rounded-full px-3 py-1.5 text-muted transition hover:bg-pill hover:text-fg">{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
