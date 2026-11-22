import Image from "next/image";
import Link from "next/link";
import { Header, Block, Footer } from "@/components/Frame";
import AgeCounter from "@/components/AgeCounter";
import Clock from "@/components/Clock";
import Diagram from "@/components/Diagram";
import Heatmap from "@/components/Heatmap";
import ProjectEntry from "@/components/ProjectEntry";
import { site, toolbox, certifications, work, study, log } from "@/data/site";
import { projects } from "@/data/projects";
import { getContributions, getProfile } from "@/lib/github";
import type { Role } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Plain version", description: "Victor Benson in one page: about, projects, work, toolbox and contact." };

export const revalidate = 3600; // refresh GitHub data at most once an hour

function RoleEntry({ r }: { r: Role }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-medium text-ink">
          {r.org}
          {r.now && <span className="ml-2 font-mono text-[11px] font-normal text-red">● now</span>}
        </p>
        <p className="shrink-0 text-right font-mono text-xs text-faint">{r.place}<br />{r.dates}</p>
      </div>
      <p className="text-sm text-soft">{r.role}</p>
      {r.summary && <p className="mt-2 text-soft">{r.summary}</p>}
    </div>
  );
}

export default async function Home() {
  const [profile, contributions] = await Promise.all([getProfile(site.githubUser), getContributions(site.githubUser)]);
  const refreshed = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" });
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Header />
      <main>
        {/* Intro */}
        <Block>
          <div className="flex items-start gap-5">
            <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[4px] border border-rule bg-tint">
              {site.photo ? (
                <Image src={site.photo} alt="Victor Benson" fill sizes="84px" className="object-cover" priority />
              ) : (
                <span className="grid h-full w-full place-items-center font-serif text-4xl text-ink">vb</span>
              )}
            </div>
            <div>
              <h1 className="font-serif text-[52px] leading-[0.95] tracking-[-0.01em] text-ink sm:text-[64px]">victor benson</h1>
              <p className="mt-2 font-mono text-[13px] text-soft">computer science student &amp; cloud builder</p>
            </div>
          </div>

          <dl className="relative mt-8 grid gap-x-8 gap-y-2 font-mono text-[13px] text-soft sm:grid-cols-2">
            <div className="flex gap-2"><dt className="text-faint">study</dt><dd>bsc cs, university of westminster</dd></div>
            <div className="flex gap-2"><dt className="text-faint">based</dt><dd>london, uk</dd></div>
            <div className="flex gap-2"><dt className="text-faint">age</dt><dd><AgeCounter birthDate={site.birthDate} /></dd></div>
            <div className="flex gap-2"><dt className="text-faint">local</dt><dd><Clock /></dd></div>
            <span aria-hidden className="pointer-events-none absolute -right-2 top-9 hidden rotate-[-4deg] font-hand text-xl text-red md:block">
              ↖ my time, not yours
            </span>
          </dl>

          <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            <a className="link text-ink" href={site.github} target="_blank" rel="noreferrer">github ↗</a>
            <a className="link text-ink" href={site.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a>
            <a className="link text-ink" href={`mailto:${site.email}`}>email</a>
            {site.cvReady
              ? <a className="link text-ink" href={site.cv}>cv (pdf)</a>
              : <a className="link text-ink" href={`mailto:${site.email}?subject=CV%20request`}>ask for my cv</a>}
          </p>
        </Block>

        <Block id="about" title="about">
          <div className="space-y-4 text-[17px] leading-[1.7] text-soft">
            <p>
              I&apos;m Victor, a first-year computer science student at the University of Westminster. I got into tech through IT support —
              fixing laptops, accounts and network problems for staff and students — and at some point I started wanting to build
              things instead of just fixing them.
            </p>
            <p>
              In summer 2025 I set up Microsoft 365 for four departments at <span className="text-ink">Techlogic IT Services</span>, and before
              starting uni I passed the <span className="text-ink">AWS Solutions Architect – Associate</span> exam. Since then I&apos;ve been
              shipping my own projects: <a href="/plain#projects" className="link text-ink">MirrorVerse</a>, an AI hairstyle try-on app with a 30K+
              TikTok following, and <a href="https://cs-visualiser.vercel.app" className="link text-ink">CS Visualiser</a>, revision tools I
              built for my own modules.
            </p>
            <p>Away from the laptop I play basketball for the Westminster Dragons.</p>
            <p className="text-ink">
              Right now I&apos;m looking for <span className="bg-tint px-1">spring weeks and summer internships</span> in software engineering
              and cloud. If that&apos;s you, <a href="#contact" className="link">say hello</a>.
            </p>
          </div>
        </Block>

        <Block id="projects" title="projects">
          <div className="divide-y divide-dashed divide-rule">
            {featured.map((p, i) => <ProjectEntry key={p.title} p={p} fig={i + 1} />)}
          </div>
          <Link href="/projects" className="link mt-8 inline-block font-mono text-xs text-ink">everything i&apos;ve built →</Link>
        </Block>

        <Block id="work" title="work">
          <div className="divide-y divide-dashed divide-rule">
            {work.map((r) => <RoleEntry key={r.org} r={r} />)}
          </div>
          <h3 className="mb-4 mt-12 font-serif text-[28px] leading-none text-ink">study</h3>
          <div className="divide-y divide-dashed divide-rule">
            {study.map((r) => <RoleEntry key={r.org} r={r} />)}
          </div>
        </Block>

        <Block id="toolbox" title="toolbox">
          <dl className="space-y-2.5">
            {toolbox.map((t) => (
              <div key={t.area} className="grid gap-1 sm:grid-cols-[110px_1fr]">
                <dt className="font-mono text-xs leading-6 text-faint">{t.area}</dt>
                <dd className="text-soft">{t.items}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 space-y-2">
            {certifications.map((c) => (
              <p key={c.code} className="flex items-baseline justify-between gap-4 border-b border-dashed border-rule pb-2 text-ink">
                <span>{c.name}</span>
                <span className="font-mono text-xs text-faint">{c.code}</span>
              </p>
            ))}
          </div>
          <div className="mt-10">
            <Diagram refreshed={refreshed} />
          </div>
        </Block>

        <Block id="github" title="on github">
          {contributions ? (
            <Heatmap days={contributions.days} total={contributions.total} />
          ) : (
            <p className="text-soft">The contributions grid couldn&apos;t load just now — <a className="link text-ink" href={site.github}>see it on GitHub</a>.</p>
          )}
          {profile && profile.latest.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 font-mono text-xs text-faint">recently pushed</p>
              <ul className="divide-y divide-dashed divide-rule">
                {profile.latest.map((r) => (
                  <li key={r.name}>
                    <a href={r.html_url} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-4 py-2.5">
                      <span className="font-mono text-sm text-ink group-hover:underline">{r.name}</span>
                      <span className="truncate text-right text-sm text-faint">{r.language ?? ""}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Block>

        <Block id="log" title="log">
          <ul className="space-y-2">
            {log.map((l) => (
              <li key={l.what} className="grid grid-cols-[100px_1fr] gap-3">
                <span className="font-mono text-xs leading-6 text-faint">{l.when}</span>
                <span className="text-soft">{l.what}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="contact" title="say hello">
          <p className="max-w-[520px] text-[17px] text-soft">
            Recruiters, course mates, people building cool things — my inbox is open. Email is the quickest way to reach me.
          </p>
          <a href={`mailto:${site.email}`} className="link mt-5 inline-block font-serif text-[30px] italic text-ink sm:text-[36px]">
            {site.email.toLowerCase()}
          </a>
        </Block>
      </main>
      <Footer refreshed={refreshed} />
    </>
  );
}
