# Krishna Public School Meerut — Website

Modern rebuild of https://www.krishnapublicschoolmeerut.in. Next.js 15 + App Router, TypeScript strict, Tailwind v4, pnpm, Vercel deployment target.

**Full documentation lives in [`docs/`](docs/). Start at [docs/README.md](docs/README.md).**

---

## TL;DR

- The legacy PHP site has no backend API, so this project **scrapes** legacy content, **enriches** the gaps with original prose, and stores everything as typed TypeScript modules under [`src/content/`](src/content/).
- Every page reads through an **API abstraction layer** ([`src/lib/api/`](src/lib/api/)) whose function signatures match the future backend. When a real backend lands, swapping is a per-file internal change — pages don't touch.
- Forms use Zod + react-hook-form on the client and Server Actions on the server. Falls back to log + JSON file in `os.tmpdir()` if Resend isn't keyed. Turnstile CAPTCHA is feature-flagged on env.

## Quick start

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm build            # production build
pnpm typecheck        # tsc --noEmit
pnpm lint
pnpm scrape           # re-run the legacy scraper
pnpm transform        # raw-scraped.json -> src/content/scraped/*.ts
```

Requires: Node.js 20+, pnpm (this repo pins `packageManager: pnpm@9.15.0`).

On Windows, `pnpm` installed via `npm i -g pnpm` lands in `%APPDATA%\npm\` which is not on PATH in git-bash. Either add it to PATH or call `"$APPDATA/npm/pnpm.cmd"` directly.

See [`.env.example`](.env.example) for the full set of environment variables. For local dev, an empty `.env.local` works — every service degrades gracefully without its key.

## Documentation

All status and reference docs are in [`docs/`](docs/):

| File | What to read it for |
|---|---|
| [`docs/README.md`](docs/README.md) | Docs index — **start here** |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | Master status — tech stack, backend answer, what's done, what's pending |
| [`docs/PROGRESS.md`](docs/PROGRESS.md) | Phase-by-phase log — what landed when and why |
| [`docs/SCHOOL_OFFICE_CHECKLIST.md`](docs/SCHOOL_OFFICE_CHECKLIST.md) | 80+ items the school needs to provide (non-technical, with priority) |

## What is done vs. what is pending

- **Done:** build clean, 83 routes, full content on every page, 4 forms with Zod + RHF + Server Actions + Turnstile, full SEO stack (JSON-LD, sitemap, OG image, favicons, security headers), every legacy `.php` URL 301s to the new clean path.
- **Pending:** school-side inputs (logo, brand colour, CBSE disclosure data, admission dates, photos, testimonials, Resend sender domain). All consolidated in [`docs/SCHOOL_OFFICE_CHECKLIST.md`](docs/SCHOOL_OFFICE_CHECKLIST.md).
- **Not yet deployed** — waiting on go-ahead to push to Vercel.

Full detail in [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md).

## Backend — short answer

We are **not** using the legacy PHP backend (no source, no API, no access was given). The site runs off a local content layer today. When a real backend is ready, flip each file under [`src/lib/api/`](src/lib/api/) from "read content module" to "fetch backend endpoint". The page layer doesn't change. Four backend options (Node/Fastify, PHP JSON endpoints, headless CMS, stay on content layer) are discussed in [`docs/PROJECT_STATUS.md §2`](docs/PROJECT_STATUS.md#2-the-backend-question).

## Project structure

```
kps-website/
  docs/                       Project documentation — status, progress, checklists
  scripts/                    Legacy scraper + transform
  src/
    app/                      Next.js App Router — all routes, sitemap, robots, OG, icons
    content/
      scraped/                Auto-generated from legacy scrape (do not edit)
      enriched/               Hand-authored original prose
    components/
      layout/                 Header, MobileNav, Footer, Breadcrumbs
      common/                 PageHero, Prose, PagePlaceholder
      home/                   Homepage sections
      forms/                  EnquiryForm, ContactForm, AdmissionForm, TcVerifyForm + Turnstile
      seo/                    JSON-LD blocks
    lib/
      api/                    API abstraction layer (one file per resource)
      actions/                Server Actions + persistence + CAPTCHA verification
      schemas/                Zod schemas
      constants/              nav, seo, classes, redirects
      utils/                  cn, slug, format-date
    middleware.ts             301s every legacy .php URL to the new clean path
  next.config.ts / tailwind / eslint / tsconfig / postcss
```

## Contributing

Content changes: edit files under [`src/content/enriched/`](src/content/enriched/). Scraped modules under [`src/content/scraped/`](src/content/scraped/) are auto-generated — don't hand-edit.

New pages, backend swap, form pattern, SEO setup, deployment — all documented under [`docs/`](docs/).

## License

Private — all rights reserved to Krishna Public School, Meerut.
