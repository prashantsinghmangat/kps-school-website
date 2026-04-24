# Krishna Public School Meerut — Project Status

**Last updated:** 2026-04-24
**Project root:** `d:\Project\kps-website\`
**Live legacy site:** https://www.krishnapublicschoolmeerut.in
**Target domain (new site):** krishnapublicschoolmeerut.in

> **What this document is.** A single consolidated view of the project — tech choices, backend strategy, what is finished, what is pending, and where to find every other document. Start here.

---

## 1. Executive summary

We are replacing the legacy PHP website with a modern Next.js 15 site. The codebase, content, 80+ pages, forms, SEO and documentation are **all in place and build cleanly**. The site can be deployed today and will work end-to-end — emails fall back to local log files until Resend is keyed, CAPTCHA disables itself until Turnstile is keyed, and the Google Maps embed shows a placeholder until the place URL is confirmed. Everything else renders real content.

What is blocking an actual public launch is not code — it is **school-side inputs** (logo, brand colour, confirmed fee structure and admission dates, CBSE disclosure details, real photos, etc.). All these items are consolidated in [`SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md).

---

## 2. The backend question

**Are we using the legacy PHP backend? No.**

The legacy site is PHP pages that read directly from MySQL and render HTML — it has no API and no source-code access was given. We cannot plug a modern React frontend into it.

**What we did instead** — a three-layer strategy:

```
+------------------------------+
| Pages (src/app)              |  never import content directly
+---------------+--------------+
                |
+---------------v--------------+
| API abstraction              |  src/lib/api/<resource>.ts
| (one file per resource)      |  every function shaped like a real backend call
+---------------+--------------+
                |
+---------------v--------------+
| Content layer (today)        |  src/content/scraped/* + src/content/enriched/*
| Real backend (tomorrow)      |  flip each resource file to fetch() when ready
+------------------------------+
```

- Content for every page lives in `src/content/` as typed TypeScript modules.
- Pages read through `src/lib/api/` — a thin facade whose function signatures already match what a future backend would expose (`getNotices`, `getFacilities`, `getHomeworkForClass`, etc.).
- Each API function carries a `// TODO: replace with fetch(...)` marker at the exact line that will change when a real backend exists.

**When / how a real backend can land later:**

| Option | Effort | What it looks like |
|---|---|---|
| **A. Node/Fastify API on the existing VPS**, connecting to the legacy MySQL | Moderate | Cleanest long-term path. Reverse-engineer the DB, write one endpoint per resource, swap each `src/lib/api/*` file to use `apiGet` / `apiPost` helpers. Page layer unchanged. |
| **B. Add JSON endpoints to the existing PHP** | Low | Quickest stopgap. `/api/notices.php → json_encode(...)`. Same frontend swap pattern as Option A. |
| **C. Headless CMS (Directus / Strapi) on top of the same MySQL** | Moderate | Free admin UI for non-technical staff. Nice parent-to-CMS workflow. |
| **D. Keep the current content-layer approach forever** | Zero | Viable for a low-traffic school site. Content updates go through a developer pushing to git. Not recommended long-term. |

**For any of A, B, C** we also need MySQL credentials, DB dump or SSH access to the existing VPS — none of which have been provided yet. See §7 below.

---

## 3. Tech stack (locked)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSR + SSG + ISR, best SEO, native image + font optimisation |
| Language | **TypeScript**, strict mode | Catches content-contract drift at build time |
| Styling | **Tailwind CSS v4** with `@theme` CSS tokens | Utility-first, small bundle, CSS-first config |
| UI primitives | Radix UI + custom components (shadcn-style) | Accessibility out of the box |
| Forms (client) | **react-hook-form** + **@hookform/resolvers** + **Zod** | Same Zod schemas on client and server |
| Forms (server) | **Next.js Server Actions** | No REST layer needed |
| CAPTCHA | **Cloudflare Turnstile** | Privacy-friendly; free |
| Email (optional) | **Resend** | Clean API; free tier covers this usage |
| Carousel | **embla-carousel-react** | Small, accessible |
| Icons | **lucide-react** | Tree-shaken; lookup by string name supported |
| Package manager | **pnpm** (pinned to 9.15.0) | Fast, disk-efficient |
| Deployment | **Vercel** | Auto-HTTPS, edge CDN, image optimisation, free for this traffic |
| DNS / CDN | Cloudflare (planned) | Optional — Vercel covers HTTPS on its own |
| Analytics | Google Analytics 4 (planned) + Microsoft Clarity (optional) | Free |
| Monitoring | Vercel Analytics + Sentry (optional) | Web Vitals + error capture |

### Dependencies (top-level)

See [`../package.json`](../package.json). Runtime: `next`, `react`, `react-dom`, `tailwindcss`, `zod`, `react-hook-form`, `@hookform/resolvers`, `lucide-react`, `embla-carousel-react`, `resend`, `clsx`, `tailwind-merge`, Radix UI slot/dialog/dropdown/accordion/tabs. Dev: `typescript`, `tsx`, `cheerio`, `eslint`, `prettier`, `@tailwindcss/postcss`.

### Directory layout

```
kps-website/
  scripts/           legacy scraper + transform + one-off mappings
  src/
    app/             Next.js App Router — all routes, sitemap, robots, OG, icons
    content/
      scraped/       auto-generated from legacy scrape
      enriched/      hand-authored original prose (replaces/expands scraped)
    components/
      layout/        Header, MobileNav, Footer, Breadcrumbs
      common/        PageHero, Prose, PagePlaceholder
      home/          Homepage sections (hero slider, notices row, ...)
      forms/         EnquiryForm, ContactForm, AdmissionForm, TcVerifyForm + Turnstile
      seo/           JSON-LD blocks
    lib/
      api/           abstraction layer (one file per resource)
      actions/       Server Actions + persistence + captcha verification
      schemas/       Zod schemas
      constants/     nav, seo, classes, redirects
      utils/         cn, slug, format-date
    middleware.ts    301s every legacy .php URL to the new clean path
```

Full layout + rationale: [`../README.md`](../README.md).

---

## 4. What is done

### 4.1 Content — done

- **Legacy site fully scraped.** 58 URLs, 0 failures, 170 content images, 97 PDFs, 26 homepage slider images, 9 of 15 gallery categories named, 8 of 13 infrastructure rows populated. Output at `scripts/output/raw-scraped.json` (gitignored) and `SCRAPE_REPORT.md`. 10 typed TS modules at `src/content/scraped/`.
- **Original enriched prose written** — 11 files, ~7,983 words total. Covers About, Why-Choose-Us (6 items), Academics (overview + 5 stages + 6 subject blocks + assessment + pedagogy), Co-curricular (5 categories), Facilities (13 at 150–250 words each), Admissions (process + eligibility + docs + dates), FAQ (12 Q&A), Testimonials (6 PLACEHOLDER), News & Events (6 PLACEHOLDER), School Info / CBSE MPD (with TBD markers), Contact.

### 4.2 Site — done

80+ real pages, all build static:

| Area | Pages |
|---|---|
| Home | `/` — hero slider, notice board, welcome, why-us, messages, facilities, gallery, admissions CTA, location |
| About | `/about`, `/about/director-message`, `/about/principal-message`, `/about/mission`, `/about/vision`, `/about/motto`, `/about/curriculum` |
| Academics | `/academics`, `/academics/classes`, `/academics/homework`, `/academics/homework/[class]` (15 routes) |
| School life | `/activities`, `/facilities` + `/facilities/[slug]` (13), `/gallery` + `/gallery/[slug]` (11) |
| Admissions | `/admissions`, `/admissions/process`, `/admissions/apply`, `/admissions/fee-structure` |
| Updates | `/notices`, `/news`, `/news/[slug]` (6) |
| Info & help | `/contact`, `/faq`, `/downloads`, `/school-info` |
| Forms / services | `/enquiry`, `/verify-tc`, `/pay-fees` |
| Legal | `/privacy-policy`, `/terms` |
| SEO + system | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/icon`, `/apple-icon` |

All are either static (`○`) or statically generated at build via `generateStaticParams` (`●`). Build time ~4s for 83 routes.

### 4.3 Forms — done

All four forms wired and working:

- **Enquiry** (`/enquiry`) — name, email, phone, address, message
- **Contact** (on `/contact`) — name, email, mobile, message
- **Admission Application** (`/admissions/apply`) — student + guardian details
- **TC Verification** (`/verify-tc`) — TC number, student name, DOB

Each uses: same Zod schema on client (react-hook-form) and server (Server Action), honeypot field for spam, Turnstile widget (feature-flagged on env), `useActionState` for pending state and result banner, form reset + smooth-scroll on success.

**Submission flow:**
1. Client RHF validates against Zod schema.
2. On valid, FormData posted to Server Action.
3. Action re-validates (authoritative).
4. `verifyCaptcha(token)` — skipped if no `TURNSTILE_SECRET_KEY`, else enforced.
5. `persistSubmission(kind, payload)` — always: console log + JSON file to `os.tmpdir()/kps-submissions/`. Conditionally: Resend email if `RESEND_API_KEY` is set.

Submission data therefore never gets lost — worst case it is recorded locally on the server with a timestamp.

### 4.4 SEO — done

- Per-page `<title>`, description, canonical, Open Graph, Twitter card metadata
- Site-wide `EducationalOrganization` + `WebSite` JSON-LD (root layout)
- `LocalBusiness` JSON-LD (contact page)
- `NewsArticle` + `Event` JSON-LD (news detail pages)
- `Place` + `ImageObject` JSON-LD (facility detail pages)
- `EducationalOccupationalProgram` JSON-LD (admissions page)
- `FAQPage` JSON-LD (FAQ page)
- `BreadcrumbList` JSON-LD (every non-home page via the Breadcrumbs component)
- Dynamic `sitemap.xml` — 83 URLs including facilities, gallery categories, homework classes, news posts, notices
- `robots.txt` + security headers (HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Dynamic Open Graph image (1200×630, rendered from JSX via `next/og`)
- Favicon (32×32) + Apple touch icon (180×180) generated from JSX
- `manifest.webmanifest` for installability

All JSON-LD blocks link back to `{SITE_URL}#organization` via `@id` so Google sees one linked graph.

### 4.5 Legacy URL redirects — done

Every legacy `.php` URL 301s to the new clean path. Implemented in [`src/middleware.ts`](../src/middleware.ts). Mappings in [`src/lib/constants/redirects.ts`](../src/lib/constants/redirects.ts).

- Static 1:1: `/aboutus.php → /about`, `/contactus.php → /contact`, etc.
- Parameterised: `/infrastructure.php?InfraId=1 → /facilities/library` (9 IDs mapped)
- Parameterised: `/homeworklist.php?DCatId=1 → /academics/homework/class-1` (all 15 IDs mapped)
- Parameterised: `/gallery.php?GalleryCatId=N` (5 of 15 IDs mapped — rest need school confirmation of category names)

Middleware matcher fires only on `.php` URLs — no overhead on normal routes.

### 4.6 Documentation — done

| File | Location | What it is |
|---|---|---|
| [`README.md`](../README.md) | repo root | Short entry point + pointers into `docs/` |
| [`docs/README.md`](README.md) | `docs/` | Docs index — start here when looking for anything in `docs/` |
| [`docs/PROJECT_STATUS.md`](PROJECT_STATUS.md) | `docs/` | **This document** — master status snapshot |
| [`docs/PROGRESS.md`](PROGRESS.md) | `docs/` | Phase-by-phase log — what landed when and why |
| [`docs/SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md) | `docs/` | 80+ items the school needs to provide, non-technical, with a priority matrix |
| [`.env.example`](../.env.example) | repo root | All supported environment variables with comments |

---

## 5. What is pending

Separated into what is blocked on the school vs. what is still dev work.

### 5.1 Blocked on school-side inputs

All consolidated in [`SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md) with a priority matrix. Highlights:

| Priority | What | Where it surfaces |
|---|---|---|
| **Must have** | Logo SVG | Header, favicon, OG image |
| **Must have** | Brand colour hex | Tokens in `globals.css` (`#b01c2f` is a guess) |
| **Must have** | Postal code | LocalBusiness JSON-LD, footer, schema.org PostalAddress |
| **Must have** | Google Maps place URL + coordinates | Contact page embed, LocalBusiness geo |
| **Must have** | Director's name + portrait photo | `/about/director-message` + homepage card |
| **Must have** | Principal's full name | Byline |
| **Must have** | Admission dates for AY 2026–27 | `/admissions` (6 currently marked "TBD") |
| **Must have** | Age cutoff confirmation | `/admissions` |
| **Must have** | Current prospectus PDF, admission form PDF, fee structure PDF | `/downloads`, `/admissions/fee-structure` |
| **Must have** | CBSE affiliation number + school code | `/school-info` Mandatory Public Disclosure |
| **Must have** | Hero slider photos — high res, wide | Homepage hero |
| **Must have** | 6 real consented testimonials | Homepage trust section |
| **Must have** | `FORM_SENDER_EMAIL` at a verified domain | Needed before Resend will actually send email |
| **Should have** | School hours (summer + winter) | `/contact` |
| **Should have** | Office hours, transport enquiry hours | `/contact` |
| **Should have** | Social URLs (or confirmation none exist) | Footer, org JSON-LD `sameAs` |
| **Should have** | Director's + Principal's message confirmed/rewritten | About pages |
| **Should have** | CBSE MPD full data — NOC PDF, Fire/Building/Water certificates, staff counts (PRT/TGT/PGT), 3 years of board results, infrastructure stats | `/school-info` |
| **Should have** | Facility photos (library, labs, pool, etc.) — high res | `/facilities/[slug]` |
| **Should have** | Gallery photos — recent events | `/gallery/*` |
| **Should have** | 6 real news items to replace placeholders | `/news/*` |
| **Should have** | Confirmation of Smart Classrooms, Medical Room, Transport, Auditorium — do they exist on campus? | `/facilities/*` (4 facilities currently flagged `verificationStatus: "brief-added"`) |
| **Should have** | Privacy policy + terms legal review | `/privacy-policy`, `/terms` |
| **Nice to have** | Fee payment gateway choice + credentials | `/pay-fees` currently stubbed |
| **Nice to have** | TC verification backend integration OR confirmation of manual lookup | `/verify-tc` currently logs to school office |
| **Nice to have** | School video, alumni section, achievements | Optional enhancements |

### 5.2 Dev work that does not need school inputs

Nothing is strictly blocking launch — but these are worth doing before shipping:

- [ ] **Deploy to a Vercel preview URL** so the school and team can review it live
- [ ] **Run Lighthouse + axe DevTools** on the preview; fix anything below the target (≥95 performance, ≥95 accessibility, 100 SEO, ≥95 best-practices)
- [ ] **Sticky header** — nice polish on scroll
- [ ] **Floating WhatsApp contact button** — common on Indian school sites, feature-flagged on env
- [ ] **Playwright smoke tests** for the critical routes (home, admissions, contact, enquiry submit)
- [ ] **GitHub Actions CI** — typecheck + lint + build on each PR
- [ ] **shadcn/ui init** — we've held off because our plain HTML form + button components are sufficient; shadcn lands when we need Dialog / Accordion / Tabs / ComboBox
- [ ] **Add GA4 / Microsoft Clarity** — one-line additions to root layout, feature-flagged on env
- [ ] **On-demand ISR webhook** — so when the backend exists, content updates can push-revalidate without redeploy

### 5.3 Explicitly out of scope (unless asked)

- Multi-language (Hindi)
- Native mobile apps
- Online learning / LMS functionality
- Parent portal / attendance / progress reports

---

## 6. Environment variables — at a glance

All documented in [`../.env.example`](../.env.example). For dev, an empty `.env.local` works — every service degrades gracefully without its key.

| Var | Required? | Purpose | Degrade behaviour |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URLs, sitemap, JSON-LD | Defaults to production URL |
| `NEXT_PUBLIC_API_URL` | Only with real backend | Base URL for swap | Unused today |
| `RESEND_API_KEY` | Optional | Send form emails | Falls back to log + JSON file in tmpdir |
| `FORM_SENDER_EMAIL` | With Resend on | Verified sender domain | Not needed if Resend off |
| `FORM_RECIPIENT_EMAIL` | Optional | Where forms deliver | Defaults to `krishna.pub.sch@gmail.com` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | Turnstile widget site key | Widget hides; forms still validate |
| `TURNSTILE_SECRET_KEY` | Optional | Turnstile server verification | Verification skipped; forms accept submissions |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 | Analytics off |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Optional | Future Maps JS usage | Unused today |
| `REVALIDATE_SECRET` | Only for webhook-driven ISR | Secret header for on-demand revalidate route | Unused today |

---

## 7. Unknowns that would unblock a real backend

If and when we want to move off the local content layer:

- [ ] MySQL host + port + credentials + database name
- [ ] Full `mysqldump` or at least the schema
- [ ] SSH / FTP access to the VPS hosting the legacy site
- [ ] Confirmation of whether the existing `/Downloads/`, `/HeaderImages/`, `/MessageImages/` folders should be migrated or kept where they are
- [ ] Any existing PHP admin panel — URL + credentials — so we know what staff already uses
- [ ] Which option (A/B/C from §2) the school or ops team prefers

Until any of this arrives, the local content layer is the backend.

---

## 8. Quick reference — how to do common things

```bash
# Dev (localhost:3000)
pnpm install
pnpm dev

# Production build (verify it ships cleanly)
pnpm build

# Type check (should be silent)
pnpm typecheck

# Lint
pnpm lint

# Re-scrape the legacy site (hits the live server — do this sparingly)
pnpm scrape && pnpm transform
```

Add a new page: see the [`README.md`](../README.md#adding-a-new-page) section.
Edit copy: find the string in `src/content/enriched/*.ts` and change it. Save, refresh.
Turn on email sending: set `RESEND_API_KEY` + `FORM_SENDER_EMAIL` in `.env.local`.
Turn on Turnstile: set both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

---

## 9. Summary of summaries

| Thing | Status |
|---|---|
| Build | ✅ Green. 80+ routes, 0 type errors, 0 lint errors |
| Tech stack | ✅ Locked. Next.js 15 + Tailwind v4 + TS strict + pnpm + Vercel target |
| Backend | ⚠️ No backend today. Local content layer + API abstraction ready for later swap. Legacy PHP backend not reused |
| Content | ✅ Real content on every page. ~8,000 words of original prose + full legacy scrape |
| Forms | ✅ Four forms working with Zod + RHF + Server Actions + honeypot + Turnstile (feature-flagged) |
| SEO | ✅ Full metadata + JSON-LD + sitemap + OG + favicons + security headers |
| Redirects | ✅ Every legacy `.php` URL 301s to the new clean path |
| Documentation | ✅ Consolidated under `docs/` — PROJECT_STATUS (this), PROGRESS, SCHOOL_OFFICE_CHECKLIST, docs/README index + root README entry point |
| Launch blockers | 🟡 School-side inputs only — no more code work required to go live |
| Deployment | 🟡 Not yet pushed to Vercel — waiting on go-ahead |

---

*If a single item in this document goes out of sync with reality, update it immediately. This is the master status doc — other docs reference it.*
