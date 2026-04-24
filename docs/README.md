# Documentation

Everything you need to understand, run, extend or hand off this project.

## Start here

| File | Read this for |
|---|---|
| [`PROJECT_STATUS.md`](PROJECT_STATUS.md) | **Master status snapshot.** Tech stack, backend answer ("are we using the PHP backend?" — no, and why), what's done, what's pending, env vars at a glance. **If you only read one doc, read this.** |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | **Full architecture & rebuild plan.** 10-step reference covering reverse-engineering strategy, tech-stack rationale, folder design, routing, API layer, SEO, UI/UX, performance, deployment, and example code — grounded in the actual repo. |
| [`PROGRESS.md`](PROGRESS.md) | **Phase-by-phase log.** Every phase from scraping the legacy site through to today, with numbers, decisions and known gaps. Read top-down to understand how the project evolved. |
| [`SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md) | **What the school still needs to provide.** 80+ items in non-technical language (logo, photos, admission dates, CBSE disclosure fields, etc.), with a priority matrix at the end. Forward to the school office as-is. |
| [`../README.md`](../README.md) | Slim root entry point — quickstart commands, TL;DR, structure diagram, pointers back to this folder. |

## Where to find specific information

### "How do I run the project?"
[`../README.md`](../README.md) → Quick start section.

### "What's the tech stack?"
[`PROJECT_STATUS.md §3`](PROJECT_STATUS.md#3-tech-stack-locked).

### "Are we using the legacy PHP backend?"
[`PROJECT_STATUS.md §2`](PROJECT_STATUS.md#2-the-backend-question). Short answer: no. We use a local content layer today with an API abstraction ready for a real backend later. Four backend-swap options are listed.

### "What's actually done?"
[`PROJECT_STATUS.md §4`](PROJECT_STATUS.md#4-what-is-done) for the feature-by-feature breakdown. [`PROGRESS.md`](PROGRESS.md) for the chronological story.

### "What's pending?"
[`PROJECT_STATUS.md §5`](PROJECT_STATUS.md#5-what-is-pending). Split between (5.1) school-side inputs and (5.2) dev work that doesn't need school input.

### "What does the school need to give us?"
[`SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md). Forward that one document to the school and they'll see everything in one place, organised by topic with a priority matrix.

### "What env vars matter?"
[`PROJECT_STATUS.md §6`](PROJECT_STATUS.md#6-environment-variables--at-a-glance) for the quick table. [`../.env.example`](../.env.example) for every variable with comments. Every service degrades gracefully without its key — an empty `.env.local` works for dev.

### "How do I add a new page?"
[`../README.md`](../README.md#adding-a-new-page) — template and the three things to update alongside it (nav, sitemap, redirects).

### "How do the forms work?"
[`../README.md`](../README.md#forms) — the Zod-on-both-sides + Server Actions pattern, the Resend-or-tmpdir persistence strategy, honeypot, Turnstile integration.

### "How do redirects from the legacy site work?"
[`../README.md`](../README.md#legacy-url-redirects) — how the middleware matches `.php` URLs and dispatches to the new clean paths. Add new ones in [`../src/lib/constants/redirects.ts`](../src/lib/constants/redirects.ts).

### "How do I ship this?"
[`../README.md`](../README.md#deployment-vercel) — import to Vercel, set env vars, point DNS. Nothing special required.

## Document status

| Doc | Current as of | Kept up to date by |
|---|---|---|
| [`PROJECT_STATUS.md`](PROJECT_STATUS.md) | 2026-04-24 | Update whenever a status table or a section fact goes stale |
| [`PROGRESS.md`](PROGRESS.md) | 2026-04-24 | Append a new phase entry each session with real work |
| [`SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md) | 2026-04-24 | Revise when the school replies with any of the answers |
| [`../README.md`](../README.md) | 2026-04-24 | Minor — stays short; avoid drifting into detail that belongs in `PROJECT_STATUS.md` |

## Doc conventions

- Markdown links inside `docs/` use filenames relative to this folder (e.g. `[PROGRESS.md](PROGRESS.md)`).
- Markdown links to files outside `docs/` use `../path/from/repo/root` (e.g. `[src/middleware.ts](../src/middleware.ts)`).
- Dates are ISO (`YYYY-MM-DD`).
- Backticks for file paths; bold for section headers / key verdicts; tables for status grids.
- If a number, path, or state claim in any of these docs goes out of sync with reality, fix it immediately — the docs are load-bearing.

## Not in this folder

- **Code documentation** (what a function does, what a component accepts) lives as inline comments in the source files themselves. Only write code comments when the *why* is non-obvious.
- **Generated output** lives under `scripts/output/` at the repo root (scrape JSON, SCRAPE_REPORT.md). That is a build artefact of the scraper, not a human-authored doc.
- **Env variable values** are in `.env.local` at the repo root (gitignored). The [`../.env.example`](../.env.example) file is the reference of what keys exist.
