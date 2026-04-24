# Progress log

Phase-by-phase log of what was done, when, and what decisions landed. New
phases append at the top.

---

## Phase 5 — Turnstile + doc consolidation — 2026-04-24

**Goal.** Wire Cloudflare Turnstile end-to-end (widget + server verify) as
the form spam layer, and consolidate every project document under a single
`docs/` folder.

### Done — Turnstile

- `components/forms/turnstile.tsx` — client widget. Feature-flagged on
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; renders nothing without a key so forms
  still work locally. Uses managed mode with
  `data-response-field-name="captchaToken"` so the injected token lands
  under the name our Zod schemas already expect.
- `lib/actions/_captcha.ts` — server helper `verifyCaptcha()`. If
  `TURNSTILE_SECRET_KEY` is unset, verification is skipped entirely (dev
  mode). If set, it hits Cloudflare's siteverify endpoint and rejects on
  any non-success verdict.
- All four server actions (`submit-enquiry`, `submit-contact`,
  `submit-admission`, `verify-tc`) now call `verifyCaptcha` before
  `persistSubmission` and return a user-friendly error if verification
  fails.
- All four form components render `<Turnstile />` and build FormData
  straight from the live form DOM so the injected captcha input travels
  to the server action alongside the RHF-managed fields.
- `pnpm run build` clean. Form routes gain ~2 KB each from the Turnstile
  loader.

### Done — docs reorg

- `docs/` folder created at repo root.
- Moved: `PROGRESS.md` → `docs/PROGRESS.md`, `PROJECT_STATUS.md` →
  `docs/PROJECT_STATUS.md`, `SCHOOL_OFFICE_CHECKLIST.md` →
  `docs/SCHOOL_OFFICE_CHECKLIST.md`.
- Root `README.md` rewritten as a slim entry point pointing into `docs/`.
- `docs/README.md` added as the docs index.
- Updated cross-refs so code-file links from inside `docs/` use
  `../src/...` and doc-to-doc links stay relative inside `docs/`.

### Decisions

- Kept `README.md` at the repo root rather than moving it into `docs/`.
  GitHub, IDE tooling, and casual browsers all expect the top-level
  `README.md` to exist — moving it would hide it.

---

## Phase 4d — School-office checklist + dev README — 2026-04-24

**Goal.** Consolidate every TBD on the site into one Markdown doc the school
can work through end-to-end; rewrite the README for the new project state.

### Done

- `SCHOOL_OFFICE_CHECKLIST.md` at repo root — 14 sections, ~80 items,
  non-technical language, with a priority matrix at the end (must-have /
  should-have / nice-to-have before launch). Covers logo, brand color,
  contact details, maps, social URLs, leadership, admissions, fee payment,
  TC verification, CBSE MPD, photos, news/events/testimonials/notices,
  analytics/email/CAPTCHA ops, legal review, and optional extras.
- Rewrote `README.md` as a developer/maintainer guide — TL;DR, architecture
  diagram, project layout, content-layer strategy, how to swap to a real
  backend, form pattern, SEO setup, middleware, adding a new page,
  deployment, troubleshooting.

---

## Phase 4c — SEO pass — 2026-04-24

**Goal.** Dynamic OG image, favicons, and page-type JSON-LD blocks beyond
the site-wide EducationalOrganization/WebSite we already had.

### Done

- `app/opengraph-image.tsx` — 1200x630 branded card rendered via `next/og`.
- `app/icon.tsx` + `app/apple-icon.tsx` — favicon (32px) and Apple touch
  icon (180px) from JSX — both rebuild automatically when brand tokens change.
- `components/seo/json-ld.tsx` — shared blocks: `JsonLdLocalBusiness`,
  `JsonLdNewsArticle`, `JsonLdEvent`, `JsonLdFacility`,
  `JsonLdEducationalProgram`. All reference `{SITE_URL}#organization` via
  `@id` so Google sees a linked graph.
- Wired: LocalBusiness on `/contact`, NewsArticle (+Event when applicable)
  on `/news/[slug]`, Place on `/facilities/[slug]`,
  EducationalOccupationalProgram on `/admissions`.
- 83 routes, build clean.

---

## Phase 4b — Forms — 2026-04-24

**Goal.** Wire real forms into /enquiry, /contact, /admissions/apply,
/verify-tc calling the server actions built in Phase 3.

### Done

- `components/forms/fields.tsx` — shared Label / Input / Textarea / Select /
  FieldError / FormRow / Honeypot primitives (Tailwind, ARIA).
- `components/forms/submit-button.tsx` with pending state + spinner.
- `components/forms/form-alert.tsx` success/error banner.
- Four forms — `enquiry-form.tsx`, `contact-form.tsx`, `admission-form.tsx`,
  `tc-verify-form.tsx` — each uses react-hook-form + zodResolver on the
  client and useActionState against the existing server action. Resets form
  and smooth-scrolls to the success banner on submit. Shows server
  fieldErrors inline if anything slips past client validation.
- Replaced the placeholder pages (`/enquiry`, `/verify-tc`, `/admissions/apply`)
  with real form pages. Added ContactForm below the existing contact info
  on `/contact`.

### Known gaps (not blocking)

- CAPTCHA widget — schemas already accept `captchaToken`; Turnstile site-key
  wiring pending (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`).
- `FORM_SENDER_EMAIL` needs a Resend-verified domain before email actually
  sends; fallback persistence still works without.

---

## Phase 4a — Pages — 2026-04-24

**Goal.** Replace Phase 3's placeholder homepage and 404-ing nav with real
content across every linked route.

### Done — shared page components

- `components/common/page-hero.tsx`, `page-placeholder.tsx`, `prose.tsx`.

### Done — real homepage

Composed in `app/page.tsx`:

- `HeroSlider` (client Embla with loop, autoplay, dots, arrows, reduced-motion
  fallback, priority on first slide, pauses when tab hidden, ARIA roles).
- `NoticeBoard` strip (empty state handled).
- `WelcomeSnippet` with key facts sidebar.
- `WhyChooseUsGrid` — lucide icons looked up by name at render time.
- `MessagesRow` — director + principal cards with portrait + excerpt +
  "Read full message".
- `FacilitiesPreview`, `GalleryPreview`, `AdmissionsCta`, `LocationStrip`
  with graceful map placeholder.

### Done — real pages

Every nav target now renders real content from the API abstraction layer:

- `/about` plus six sub-pages (director-message, principal-message, mission,
  vision, motto, curriculum).
- `/academics`, `/academics/classes`, `/academics/homework`,
  `/academics/homework/[class]` (15 SSG routes).
- `/activities`, `/facilities` + `/facilities/[slug]` (13 SSG routes).
- `/gallery` + `/gallery/[slug]` (11 SSG routes).
- `/admissions`, `/admissions/process`, `/admissions/fee-structure`.
- `/contact`, `/faq` (with FAQPage JSON-LD), `/downloads`.
- `/school-info` — full CBSE MPD table with TBD indicators.
- `/notices`, `/news` + `/news/[slug]` (6 SSG routes).
- `/privacy-policy`, `/terms` — legal defaults flagged for school review.

### Intentional placeholders (form pages + legal shells)

- `/enquiry`, `/verify-tc`, `/admissions/apply` — replaced in Phase 4b.
- `/pay-fees` — awaiting gateway decision (question in the school checklist).

### Other fixes

- Duplicate React key in `Footer` (both email rows used the same address)
  fixed by keying on `${label}-${address}`.
- Redundant `react/no-danger` eslint-disable comments removed (Next's ESLint
  preset doesn't include the rule).

### Numbers

- 80 static routes build clean, 0 type errors.
- Middleware bundle: 34.8 KB.
- Shared first-load JS: ~102 KB.
- Largest page bundle: homepage at 9.37 KB (includes the Embla carousel).

---

## Phase 3 — Next.js scaffold — 2026-04-24

**Goal.** Stand up the Next.js 15 project on top of the Phase 1 scraper
setup, and put the foundation in place (API abstraction, middleware, SEO
infra, form server actions, layout components) — no pages yet.

### Done — configs

- Updated `package.json` with Next.js 15 + React 19 + Tailwind v4 +
  shadcn-compatible Radix + react-hook-form + zod + resend + lucide + embla.
  Added `dev`, `build`, `start`, `lint`, `typecheck` scripts alongside the
  scraper ones.
- Rewrote `tsconfig.json` for Next.js: jsx preserve, moduleResolution
  Bundler, path alias `@/*` -> `src/*`, Next plugin entry.
- `next.config.ts` — `remotePatterns` for the legacy image host + security
  headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- `postcss.config.mjs`, `eslint.config.mjs`, `.prettierrc.json`,
  `.gitignore`, `.env.example`.

### Done — API abstraction (src/lib/api/)

Every resource gets one file matching a future backend shape. Each function
carries a `// TODO: replace with fetch(...)` marker at the swap site.

- `types.ts` — shared payload types.
- `client.ts` — thin `apiGet` / `apiPost` wrapper + `isBackendLive` flag.
- `notices.ts`, `slider.ts`, `facilities.ts` (merges scraped + enriched),
  `gallery.ts`, `downloads.ts`, `homework.ts`, `messages.ts`, `cms.ts`
  (static CMS pages + structured academics/admissions/faq/co-curricular
  getters), `settings.ts`, `news-events.ts`, `testimonials.ts`,
  `why-choose-us.ts`, `school-info.ts`, `index.ts` (barrel).

### Done — schemas + server actions

- Zod schemas in `lib/schemas/`: enquiry, contact, admission, tc. All with a
  `website` honeypot field and optional `captchaToken` for future Turnstile.
- Server actions in `lib/actions/`: submit-enquiry, submit-contact,
  submit-admission, verify-tc. Each validates with its Zod schema and calls
  `persistSubmission` from `_persist.ts`. Persistence strategy: console log
  + JSON file to `os.tmpdir()/kps-submissions/` (portable alternative to
  `/tmp` since this is Windows), plus Resend email if `RESEND_API_KEY` set.

### Done — constants + utils

- `lib/constants/`: `nav.ts` (single source for header/footer menus),
  `seo.ts` (organization, defaults), `classes.ts` (with legacy DCatId map),
  `redirects.ts` (static + parameterised legacy-URL mappings).
- `lib/utils/`: `cn.ts`, `slug.ts`, `format-date.ts`.

### Done — app + SEO infra + middleware

- `app/layout.tsx` — Inter + Plus Jakarta Sans via `next/font`; full
  metadata incl. OG/Twitter/robots; site-wide JSON-LD rendered once.
- `app/globals.css` — Tailwind v4 with `@theme` brand tokens.
- `app/page.tsx` — Phase 3 placeholder homepage (replaced in Phase 4a).
- `app/not-found.tsx`, `app/sitemap.ts` (static + facilities + gallery +
  homework + news + notices), `app/robots.ts`, `app/manifest.ts`.
- `components/layout/`: `Header`, `MobileNav`, `Footer`, `Breadcrumbs`
  (visible + BreadcrumbList JSON-LD).
- `components/seo/json-ld-school.tsx` — EducationalOrganization + WebSite.
- `src/middleware.ts` — matches `.php` paths only, 301s each legacy URL
  including `/infrastructure.php?InfraId=`, `/homeworklist.php?DCatId=`,
  `/gallery.php?GalleryCatId=` parameterised redirects.

### Decisions — kept + deferred

- Dropped `noUncheckedIndexedAccess` from tsconfig (the existing scraper
  hadn't been written for it and would need touching up; trade-off not
  worth it).
- **Deferred** until a later phase: shadcn/ui init (not useful until pages
  need concrete Dialog/Accordion/Tabs), Playwright + Vitest, GitHub Actions.
- Phase 3 spec in the original briefing was truncated mid-"Install deps";
  scope inferred from Appendix B of the migration plan.

### Numbers

- Initial Phase 3 build: 5 routes, ~102 KB shared JS, 34.8 KB middleware.

---

## Phase 2 — Content enrichment — 2026-04-24

**Goal.** Produce 11 original parent-facing TypeScript content files under
`src/content/enriched/`, using the Phase 1 scrape as a factual baseline and
TBD markers where facts are unknown.

### Done

All 11 files written and type-clean:

- `about.ts` (395 words) — 400-word school narrative + established facts
  (affiliation, medium, streams, motto, location).
- `why-choose-us.ts` (309 words) — 6 items with lucide icon names, 40-60
  words each.
- `academics.ts` (932 words) — overview, 5 stages (Pre-Primary through
  Senior Secondary with grade ranges), 6 subject blocks, assessment,
  pedagogy.
- `co-curricular.ts` (663 words) — 5 categories (Sports, Performing Arts,
  Visual Arts, Clubs, Events) with ~120-word descriptions and activity lists.
- `facilities.ts` (2347 words) — 13 facilities at 150-250 words each.
  Scraped facilities marked `scraped: true`; the four brief-added ones
  (Smart Classrooms, Medical Room, Transport, Auditorium) flagged
  `verificationStatus: "brief-added"` so the school confirms before launch.
- `admissions.ts` (769 words) — overview, 6 process steps, age eligibility,
  docs, 6 TBD importantDates, fee structure note.
- `faq.ts` (984 words) — 12 parent Q&A, 50-100 words per answer.
- `testimonials.ts` (355 words) — 6 PLACEHOLDERS. File header warns not to
  publish as-is.
- `news-events.ts` (789 words) — 6 sample items marked PLACEHOLDER.
- `school-info.ts` (272 words) — CBSE MPD structured shell. Most fields
  `"TBD — update from school records"`. Compliance note attached.
- `contact.ts` (168 words) — merged scrape (address, phones, email) plus
  hours rough, Google Maps null, all 5 socials `status: "tbd"`.

Total: ~7,983 words of original prose. `tsc --noEmit` clean.

---

## Phase 1 — Scrape legacy site — 2026-04-24

**Goal.** Capture every piece of existing content and image URL from
https://www.krishnapublicschoolmeerut.in into structured JSON, then emit typed
TypeScript modules the future Next.js app can import.

### Done

- Created `kps-website/` project folder with `package.json`, `tsconfig.json`.
- Wrote `scripts/scrape-legacy.ts`: built-in `fetch` + cheerio, 500 ms delay,
  20 s timeout, polite UA, follows redirects, isolates main content, strips
  chrome, collects images and download links.
- Scraped 58 URLs (home, index, about, director/principal messages, mission,
  vision-mission, moto, song, co-curricular, photo gallery index, downloads,
  school-info, contact us, homework class index, 13 × infrastructure, 15 ×
  gallery category, 15 × homework category). All returned HTTP 200.
- Did two one-off lookups to map `GalleryCatId → name` and `DCatId → class`
  (needed because my main scraper's cheerio selectors couldn't link label text
  to `<a>` hrefs cleanly) — saved to `scripts/output/mappings.json`.
- Wrote `scripts/transform-scraped.ts`: reads raw + mappings, strips leaked
  chrome paragraphs/headings/images, emits 10 typed TS modules under
  `src/content/scraped/` and a `SCRAPE_REPORT.md`.
- `pnpm exec tsc --noEmit` passes clean.

### Numbers

- 58 / 58 pages OK, 0 errors
- 170 content images (captcha + logo excluded)
- 97 download PDFs
- 26 homepage slider images
- 9 of 15 gallery categories have names
- 8 of 13 infrastructure rows populated

### Content gaps identified

See README §"Content gaps" — 11 specific items to address in Phase 2.

### Environment notes

- `pnpm` landed in `%APPDATA%\npm\` after `npm i -g pnpm`. Not on PATH in git-
  bash — prefix `export PATH="$APPDATA/npm:$PATH"` or use the full path.
- `corepack enable pnpm` failed with EPERM against the nvm4w directory.

### Decisions locked / deferred

- **Hot-link images** from legacy domain — locked during briefing (may flip if
  reliability matters; see README open decisions).
- **Notice-board source** — deferred. Legacy marquee wasn't in the HTML we
  fetched; Phase 2 will decide whether to re-scrape with a different selector,
  author fresh, or wait for a real feed.

### Awaiting

- User to say "continue" to start Phase 2.
- User to paste the rest of the original prompt (truncated mid-Phase 3).

---

## Phase 0 — Decisions — 2026-04-24

Locked before any work started:

- Next.js 15 App Router + TypeScript strict
- Tailwind CSS v4 + shadcn/ui
- pnpm
- Vercel deployment
- Domain `krishnapublicschoolmeerut.in`
- English only
- No backend access — scrape + local content layer + Server Actions for forms
- Forms: Zod + react-hook-form, Server Actions, Resend if `RESEND_API_KEY` set,
  otherwise log + write to `/tmp/submissions/` (will adapt to `os.tmpdir()` on
  Windows when we hit that phase).
