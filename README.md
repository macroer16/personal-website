# victor.benson — personal website

My personal site: who I am, my AWS certifications, my stack, projects, experience and live GitHub stats.

**Live:** https://victor-benson.vercel.app

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript + [Tailwind CSS v4](https://tailwindcss.com)
- Fonts: Instrument Serif, IBM Plex Sans & Mono, Caveat (self-hosted via Fontsource)
- GitHub REST API + github-contributions-api for live data, fetched on the server and cached for 1 hour
- Hosted on [Vercel](https://vercel.com)

## Design

Paper-and-ink editorial layout: one framed column, lowercase serif headings, mono details, no cards or icon libraries.
Live London clock and age, a light/dark switch, a contributions grid drawn from real data, and a small diagram of how
the site is served. Why it looks like this: [RESEARCH.md](RESEARCH.md).

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Edit the content

| What | Where |
| --- | --- |
| Links, toolbox, work, study, log | `src/data/site.ts` (the about text is in `src/app/page.tsx`) |
| Projects | `src/data/projects.ts` |
| Photo | Put a square photo at `public/victor.jpg`, then set `photo: "/victor.jpg"` in `src/data/site.ts` |
| CV | Put the PDF at `public/Victor_Benson_CV.pdf`, then set `cvReady: true` in `src/data/site.ts` |
| Colours | CSS variables at the top of `src/app/globals.css` |

## Deploy

1. Push to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repo and click **Deploy** (no settings needed).
3. Every push to `main` redeploys automatically.

## Structure

```
src/
  app/            pages, layout (SEO metadata), OG image, favicon
  components/     Frame (header, sections, footer), ProjectEntry, Heatmap, Diagram, Clock, AgeCounter, ThemeToggle
  data/           site.ts and projects.ts — the content
  lib/github.ts   GitHub API helper
```
