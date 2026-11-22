import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Mail, Star } from "lucide-react";
import { siGithub } from "simple-icons";
import TopBar from "@/components/TopBar";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import AgeCounter from "@/components/AgeCounter";
import ProjectCard from "@/components/ProjectCard";
import RoleRow from "@/components/RoleRow";
import Heatmap from "@/components/Heatmap";
import Icon, { LinkedInIcon } from "@/components/Icon";
import { site, stack, certifications, experience, education, achievements } from "@/data/site";
import { projects } from "@/data/projects";
import { getContributions, getProfile } from "@/lib/github";

export const revalidate = 3600; // refresh the GitHub data at most once an hour

const GitHubIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d={siGithub.path} /></svg>
);

function Avatar({ size }: { size: number }) {
  return site.photo ? (
    <Image src={site.photo} alt={site.name} width={size} height={size} className="h-full w-full rounded-full object-cover" priority />
  ) : (
    // Monogram until a photo is added in src/data/site.ts.
    <div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-zinc-600 to-zinc-900 font-semibold tracking-tight text-white" style={{ fontSize: size * 0.3 }}>VB</div>
  );
}

export default async function Home() {
  const [profile, contributions] = await Promise.all([getProfile(site.githubUser), getContributions(site.githubUser)]);
  const featured = projects.filter((p) => p.featured);

  return (
    <div id="top">
      <TopBar />
      <main className="mx-auto max-w-[850px] px-5 pb-40">
        {/* Hero */}
        <section className="grid items-center gap-8 pt-12 sm:pt-24 md:grid-cols-[1fr_auto] md:gap-10">
          <Reveal>
            <h1 className="text-5xl font-bold tracking-tight text-fg sm:text-6xl">hi, i&apos;m {site.first}</h1>
            <p className="mt-3 text-[15px] font-semibold text-fg">
              <AgeCounter birthDate={site.birthDate} /> years old · {site.tagline}
            </p>
            <div className="mt-6 max-w-[460px] space-y-4 text-[15px] leading-relaxed text-muted">
              {site.intro.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {[
                { href: site.github, label: "GitHub", icon: <GitHubIcon /> },
                { href: site.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
                { href: `mailto:${site.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-faint hover:text-fg">
                  {s.icon}
                </a>
              ))}
              <a href={site.cvReady ? site.cv : `mailto:${site.email}?subject=CV%20request`}
                className="ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-bg transition hover:opacity-85">
                <FileText className="h-4 w-4" /> {site.cvReady ? "Download CV" : "Request CV"}
              </a>
            </div>
          </Reveal>

          <Reveal className="order-first flex items-center gap-4 md:order-none md:flex-col md:gap-3">
            <div className="h-24 w-24 shrink-0 rounded-full border border-line p-1 md:h-44 md:w-44 md:p-1.5">
              <Avatar size={176} />
            </div>
            <div className="flex flex-col items-start gap-2 md:items-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to work
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3 py-1 text-xs font-medium text-[#ffb347]">
                AWS Certified · SAA
              </span>
            </div>
          </Reveal>
        </section>

        {/* Status strip */}
        <Reveal className="mt-12 grid gap-3 sm:grid-cols-3">
          {site.status.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-card/60 px-4 py-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-faint">{s.label}</p>
              <p className="mt-1 text-sm text-fg">{s.value}</p>
            </div>
          ))}
        </Reveal>

        <Section id="stack" eyebrow="Stack" title="What I Work With">
          <div className="grid gap-3 md:grid-cols-2">
            {stack.map((g) => (
              <div key={g.area} className="rounded-xl border border-line bg-card/60 p-4">
                <h3 className="font-semibold text-fg">{g.area}</h3>
                <p className="mt-0.5 text-sm text-muted">{g.detail}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i.name} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-pill px-2.5 py-1.5 text-[13px] font-medium text-fg">
                      <Icon name={i.icon} /> {i.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="certifications" eyebrow="Credentials" title="Certifications">
          <div className="grid gap-3 md:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.code} className="flex gap-4 rounded-xl border border-line bg-card/60 p-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#232f3e] to-[#131a22] ring-1 ring-[#ff9900]/30">
                  <span className="text-[11px] font-bold tracking-wide text-[#ff9900]">AWS</span>
                </div>
                <div>
                  <p className="text-xs text-faint">AWS Certified · {c.code}</p>
                  <h3 className="font-semibold text-fg">{c.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Builds" title="Featured Projects">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((p) => <ProjectCard key={p.title} project={p} />)}
          </div>
          <Link href="/projects" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium uppercase tracking-wider text-fg transition hover:bg-pill">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Work">
          <div className="divide-y divide-line">
            {experience.map((r) => <RoleRow key={r.org} r={r} />)}
          </div>
          <h3 className="mt-10 text-lg font-semibold text-fg">Education</h3>
          <div className="mt-2 divide-y divide-line">
            {education.map((r) => <RoleRow key={r.org} r={r} />)}
          </div>
        </Section>

        <Section id="achievements" eyebrow="Milestones" title="Achievements" intro="Things I'm proud of so far — with plenty more to come.">
          <div className="grid gap-3 md:grid-cols-2">
            {achievements.map((a) => (
              <div key={a.title} className="rounded-xl border border-line bg-card/60 p-4">
                <h3 className="font-semibold text-fg">{a.title}</h3>
                <p className="text-sm text-muted">{a.where}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="github" eyebrow="Open source" title="GitHub Contributions">
          <div className="rounded-xl border border-line bg-card/60 p-5">
            {contributions ? (
              <Heatmap days={contributions.days} total={contributions.total} />
            ) : (
              // Fallback image if the contributions API is down.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`https://ghchart.rshah.org/40c463/${site.githubUser}`} alt="GitHub contributions" className="w-full" loading="lazy" />
            )}
          </div>
          {profile && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {profile.latest.map((r) => (
                <a key={r.name} href={r.html_url} target="_blank" rel="noreferrer" className="rounded-xl border border-line bg-card/60 p-4 transition hover:border-faint/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-fg">{r.name}</span>
                    <span className="flex items-center gap-1 text-xs text-faint"><Star className="h-3 w-3" />{r.stargazers_count}</span>
                  </div>
                  {r.description && <p className="mt-1 line-clamp-1 text-sm text-muted">{r.description}</p>}
                  {r.language && <p className="mt-2 text-xs text-faint">{r.language}</p>}
                </a>
              ))}
            </div>
          )}
          <a href={site.github} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <GitHubIcon /> {profile ? `${profile.repos} public repos` : "All repos"} on GitHub <ArrowRight className="h-4 w-4" />
          </a>
        </Section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 pt-24">
          <Reveal className="rounded-2xl border border-line bg-card/60 px-6 py-14 text-center">
            <p className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-faint">
              <span className="h-px w-5 bg-faint/60" />Contact<span className="h-px w-5 bg-faint/60" />
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">Get in touch</h2>
            <p className="mx-auto mt-3 max-w-md text-xl text-muted">Want to work with me?</p>
            <a href={`mailto:${site.email}`} className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg py-1.5 pl-1.5 pr-5 text-sm font-semibold text-fg transition hover:border-faint">
              <span className="h-7 w-7 overflow-hidden rounded-full"><Avatar size={28} /></span>
              Say hello
            </a>
            <p className="mt-4 text-sm text-faint">{site.email}</p>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-[850px] gap-8 px-5 pb-32 pt-10 text-sm sm:grid-cols-3">
          <div>
            <p className="font-semibold text-fg">Victor</p>
            <p className="mt-2 text-muted">CS student & AWS-certified builder</p>
            <p className="text-muted">University of Westminster, London</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">Links</p>
            <ul className="mt-3 space-y-1.5 text-muted">
              <li><Link href="/projects" className="hover:text-fg">Projects</Link></li>
              <li><a href="#experience" className="hover:text-fg">Experience</a></li>
              <li><a href="#achievements" className="hover:text-fg">Achievements</a></li>
              <li><a href="#github" className="hover:text-fg">Activity</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">Social</p>
            <ul className="mt-3 space-y-1.5 text-muted">
              <li><a href={site.github} target="_blank" rel="noreferrer" className="hover:text-fg">GitHub</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">LinkedIn</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-fg">Email</a></li>
            </ul>
          </div>
          <p className="text-faint sm:col-span-3">© {new Date().getFullYear()} Victor Benson. Built with Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
