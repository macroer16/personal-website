# Research: making it look like a person made it

## 1. What makes a site look AI-generated

Sources: Jenny Ouyang's study of 120 AI-built pages (buildtolaunch.substack.com), "Is your website AI slop?" (dev.to/laurilllll),
noqode.fr, interfacekit.io, regards.design, vibemole.com, creativemindhabits.com.

The most common tells, and what this site does instead:

| Tell | Here |
| --- | --- |
| Inter / Geist, one font at one weight | Instrument Serif headings, IBM Plex Sans body, IBM Plex Mono details, Caveat for one handwritten note |
| Purple/blue gradient, glowing blob behind the headline | Warm paper and ink, one accent (London bus red) used in three places |
| A card / rounded box around every piece of information | No cards. Dashed rules and whitespace separate things |
| One icon set and nothing else (Lucide), icon on top of feature cards | No icon library at all; plain text links with ↗ |
| Small uppercase labels with wide letter spacing above every heading | Lowercase serif headings: "about", "work", "projects" |
| Pill badge above the headline, gradient word in the headline | Neither |
| Every section fading up on scroll, cards lifting on hover | No scroll animation. One moving thing: the packet in the diagram |
| Copy that could fit anyone ("passionate about building seamless experiences") | First person, specific: what I fixed, where, when, for whom |
| Round, unbacked numbers and fake logos/testimonials | Only true facts; nothing invented |
| Placeholder art where a product image should be | Real screenshot where one exists; otherwise just words |

## 2. Sites I studied

- **krishnagupta.web.app** (one of the most-liked on wonderfulsite.org) — paper background, serif lowercase headings, mono details,
  local time, dashed column frame, handwritten note. The closest model for this design.
- **sanyi.space** — live age counter, live GitHub data, "open to work".
- **brittanychiang.com, leerob.com, paco.me, emilkowal.ski, rauno.me** — text-first, links inside sentences, almost no decoration.
- **heyamit.dev, pengyuhao.com, prateekjain.dev, gordontu.com** — one personal signature each (ASCII art, field notes, hand drawings).
- **wonderfulsite.org** — 789 personal sites from @zarazhangrui's threads; the most-liked ones all have something only that person would have.

## 3. The signature detail

Each good site has one thing that only its owner would make. Here it's **fig. 2 — how this page got to you**: a small architecture
diagram of how the site is actually served (browser → Vercel edge → Next.js → GitHub API), with the real time the data was last
refreshed. It fits an AWS-certified solutions architect better than any animation would.

## 4. Still to do (needs Victor)

- A real photo (`public/victor.jpg`) — every top site has one.
- CV PDF (`public/Victor_Benson_CV.pdf`).
