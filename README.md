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

- Dark, single-page layout with a sticky nav and smooth scrolling
- Live age counter and a subtle custom cursor (turned off on touch screens and for reduced-motion users)
- Projects driven by one data file (`src/data/projects.ts`) plus a `/projects` page
- Live GitHub section: repo count, followers, top language, latest repos and a contribution graph
- Full SEO: title template, description, Open Graph + Twitter cards and a generated social preview image

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
