# victor.benson — personal website

My personal site: who I am, my AWS certifications, my stack, projects, experience and live GitHub stats.

**Live:** https://victor-benson.vercel.app

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Geist](https://vercel.com/font) font
- GitHub REST API for live repo stats (fetched on the server, cached for 1 hour)
- Hosted on [Vercel](https://vercel.com)

## Features

- Dotted-grid dark theme with a light/dark toggle (no flash on load)
- Floating dock navigation, scroll progress bar and back-to-top button
- Live age counter, status strip, and tech pills with real brand logos
- Project cards with screenshots, driven by `src/data/projects.ts`, plus a `/projects` page
- Expandable experience rows
- GitHub contributions heatmap rendered from live data, plus latest repos
- Fade-in on scroll (respects reduced motion) and a subtle custom cursor
- Full SEO: Open Graph + Twitter cards and a generated social preview image

Design research: see [RESEARCH.md](RESEARCH.md).

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Edit the content

| What | Where |
| --- | --- |
| Name, intro, links, stack, experience, achievements | `src/data/site.ts` |
| Projects | `src/data/projects.ts` |
| Photo | Put a square photo at `public/victor.jpg`, then set `photo: "/victor.jpg"` in `src/data/site.ts` |
| CV | Put the PDF at `public/Victor_Benson_CV.pdf`, then set `cvReady: true` in `src/data/site.ts` |
| Accent colour | `--color-accent` in `src/app/globals.css` |

## Deploy

1. Push to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repo and click **Deploy** (no settings needed).
3. Every push to `main` redeploys automatically.

## Structure

```
src/
  app/            pages, layout (SEO metadata), OG image, favicon
  components/     Nav, Section, ProjectCard, GitHubSection, AgeCounter, Cursor
  data/           site.ts and projects.ts — all the content
  lib/github.ts   GitHub API helper
```
