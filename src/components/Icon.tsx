import * as si from "simple-icons";
import { Database, FolderOpen, Globe, KeyRound, Laptop, Lock, Mail, Network, Server, ShieldCheck } from "lucide-react";

// Lucide icons for AWS/Microsoft services that have no public brand logo.
const LUCIDE = { Database, FolderOpen, Globe, KeyRound, Laptop, Lock, Mail, Network, Server, ShieldCheck };

// Renders a real brand logo (simple-icons) or a lucide fallback, in the current text colour.
export default function Icon({ name, className = "h-3.5 w-3.5" }: { name: string; className?: string }) {
  if (name.startsWith("si")) {
    const icon = (si as unknown as Record<string, { path: string; title: string }>)[name];
    if (!icon) return null;
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d={icon.path} />
      </svg>
    );
  }
  const L = LUCIDE[name as keyof typeof LUCIDE];
  return L ? <L className={className} strokeWidth={2} aria-hidden /> : null;
}

// LinkedIn isn't in simple-icons any more, so it's drawn here.
export function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
