import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import AgeCounter from "@/components/AgeCounter";
import ProjectCard from "@/components/ProjectCard";
import GitHubSection from "@/components/GitHubSection";
import { site, certifications, stack, experience, achievements } from "@/data/site";
import { projects } from "@/data/projects";

export const revalidate = 3600; // rebuild the GitHub section at most once an hour

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section className="relative pb-16 pt-20 sm:pt-28">
          <div aria-hidden className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {site.openTo}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m {site.name.split(" ")[0]}.
          </h1>
          <p className="mt-3 text-xl text-neutral-300 sm:text-2xl">{site.role}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-neutral-400">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.cvReady ? (
              <a href={site.cv} className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90">
                Download CV
              </a>
            ) : (
              <a href={`mailto:${site.email}?subject=CV%20request`} className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90">
                Request my CV
              </a>
            )}
            <a href={site.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:border-accent">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:border-accent">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:border-accent">
              Email
            </a>
          </div>
        </section>

        <Section id="about" eyebrow="About" title="A bit about me">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <p className="leading-relaxed text-neutral-400">{site.about}</p>
            <div className="rounded-2xl border border-white/10 p-5 text-sm">
              <p className="text-neutral-500">Age</p>
              <p className="mt-1 text-lg"><AgeCounter birthDate={site.birthDate} /></p>
              <p className="mt-4 text-neutral-500">Based in</p>
              <p className="mt-1 text-white">{site.location}</p>
              <p className="mt-4 text-neutral-500">Studying</p>
              <p className="mt-1 text-white">BSc Computer Science, Westminster</p>
            </div>
          </div>
        </Section>

        <Section id="certifications" eyebrow="Certifications" title="Certified on AWS">
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.name} className="flex gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff9900]/10 to-transparent p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff9900]/15 font-mono text-xs font-bold text-[#ff9900]">
                  AWS
                </div>
                <div>
                  <h3 className="font-semibold text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-neutral-400">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="stack" eyebrow="Stack" title="What I work with">
          <div className="grid gap-4 sm:grid-cols-2">
            {stack.map((g) => (
              <div key={g.area} className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-semibold text-white">{g.area}</h3>
                <p className="text-sm text-neutral-500">{g.detail}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-neutral-300">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Things I've built">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProjectCard key={p.title} project={p} />)}
          </div>
          <Link href="/projects" className="mt-8 inline-block text-sm text-accent hover:underline">
            View all projects →
          </Link>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Work & education">
          <ol className="relative border-l border-white/10">
            {experience.map((e) => (
              <li key={e.title} className="mb-10 ml-6">
                <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="font-mono text-xs text-neutral-500">{e.dates}</p>
                <h3 className="mt-1 font-semibold text-white">{e.title}</h3>
                <p className="text-sm text-neutral-400">{e.org}</p>
                {e.points.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-neutral-400">
                    {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="achievements" eyebrow="Achievements" title="Milestones">
          <div className="grid gap-4 sm:grid-cols-3">
            {achievements.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{a.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="github" eyebrow="Open source" title="On GitHub">
          <GitHubSection />
        </Section>

        <Section id="contact" eyebrow="Contact" title="Say hello">
          <p className="max-w-xl text-neutral-400">
            I&apos;m looking for spring weeks, insight programmes and internships in software engineering and cloud.
            The quickest way to reach me is email.
          </p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-block text-xl font-semibold text-white underline decoration-accent underline-offset-8 hover:text-accent sm:text-2xl">
            {site.email}
          </a>
        </Section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-neutral-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Built with Next.js, deployed on Vercel.</p>
          <div className="flex gap-5">
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
