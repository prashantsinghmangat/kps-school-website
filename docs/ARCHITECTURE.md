# Architecture & Rebuild Plan — Krishna Public School Meerut

> **Status:** All 10 steps in this document are **already implemented** in this repository. Each step includes the *plan* and a pointer to the *actual code* that realises it. Treat this as a migration playbook *and* the executed reference implementation for a no-backend-access school-website rebuild.

**Source legacy site:** https://www.krishnapublicschoolmeerut.in (PHP + MySQL, no API, no source access)
**Target:** modern, static-first, SEO-maximal Next.js 15 site on Vercel
**Backend strategy:** none today; local content layer with API abstraction for a future swap. See [`PROJECT_STATUS.md §2`](PROJECT_STATUS.md#2-the-backend-question).

---

## Step 1 — Reverse engineering the legacy site

### 1.1 Reality check before you start

The first instinct on "reverse-engineer the API" is wrong for this class of site. Before opening DevTools, classify what you're looking at:

| Legacy architecture | Reverse-engineering strategy |
|---|---|
| SPA hitting JSON endpoints | Open DevTools → Network → filter XHR/Fetch → document each endpoint's URL, method, params, response shape. Use [Postman Interceptor](https://www.postman.com/) or `mitmproxy` for a structured capture. |
| Server-rendered HTML, no API | **Scrape pages as HTML**. There are no endpoints to document. This is our case. |
| Hybrid (mostly SSR with a few XHRs, e.g., search) | Scrape HTML for pages, document the handful of XHR endpoints separately. |

A quick way to classify in under 60 seconds: open the site with JS disabled. If it still renders the same content, it's HTML-first and your job is scraping, not API reverse-engineering.

For Krishna Public School Meerut the legacy is classic PHP+MySQL — every page is server-rendered, query-string-keyed (`?InfraId=N`, `?DCatId=N`, `?GalleryCatId=N`), with zero XHR traffic. Scraping was the path.

### 1.2 Route extraction

Three complementary methods, used in order:

1. **Sitemap first** — fetch `/sitemap.xml` if it exists. Legacy didn't have one.
2. **Header and footer nav traversal** — enumerate every `<a href>` from the homepage, visit each, repeat one level. This is a manual `wget --spider` or a cheerio crawl.
3. **Parameterised URL discovery** — for query-string-driven pages, probe the ID range (e.g., `?InfraId=1` through `?InfraId=20`) and keep the ones that return non-empty content.

In code: [`scripts/scrape-legacy.ts`](../scripts/scrape-legacy.ts) uses a manually curated list of 58 target URLs covering homepage, index, about, director/principal messages, mission, vision-mission, moto, song, co-curricular, photo gallery index, downloads, school-info, contact us, homework class index, 13× infrastructure, 15× gallery category, 15× homework category.

### 1.3 Content extraction

- Use `cheerio` (server-side jQuery-compatible HTML parser) to isolate the main content area on each page, strip the nav/header/footer/marquee repetitions.
- For every image and downloadable asset, collect the absolute URL; don't download yet.
- Persist raw results as JSON so you can re-transform without re-hitting the live server.

Key trade-off: **hot-link the legacy assets** (use them in place) vs. **mirror them to your CDN**. Hot-linking is simpler and works as long as the legacy domain is alive. Mirroring is safer but adds a step. We hot-link today; `next/image` `remotePatterns` allow-lists the legacy host. See [`next.config.ts`](../next.config.ts).

### 1.4 Transform to a typed content layer

Raw scrape → typed TypeScript modules is the key step that makes the rest of the project type-safe. Each legacy resource gets a schema:

```ts
// Example: src/content/scraped/facilities.ts (auto-generated)
export interface Facility {
  id: number; slug: string; name: string; description: string; images: string[];
}
export const facilities: Facility[] = [/* ... */];
```

Scripts: [`scripts/transform-scraped.ts`](../scripts/transform-scraped.ts) reads the raw JSON and emits 10 typed modules under [`src/content/scraped/`](../src/content/scraped/).

### 1.5 Tooling cheat-sheet

| Job | Tool |
|---|---|
| Fetch HTML with a polite delay | Node `fetch` with a 500 ms delay, 20 s timeout |
| Parse HTML | `cheerio` |
| Document API responses (when there are any) | DevTools → Network → right-click → "Save as HAR" |
| Extract GraphQL schema | [`graphql-introspector`](https://www.npmjs.com/package/graphql-introspector) (if introspection is enabled) |
| Traverse a site | `wget --spider -r -np -l 2` for a quick URL dump |
| Bulk-download files | `wget -i urls.txt` or [`curl` in parallel](https://curl.se/docs/manual.html) |
| Sanity-check assets served | `curl -I` to see `Content-Type` + size |

### 1.6 Documenting the findings

After scraping, produce a report **both machine and human readable**:

- Machine: `scripts/output/raw-scraped.json` — full raw data, gitignored, regeneratable.
- Human: [`scripts/output/SCRAPE_REPORT.md`](../scripts/output/SCRAPE_REPORT.md) — URLs succeeded/failed, counts by resource type, content gaps that need Phase 2 enrichment.

---

## Step 2 — Tech stack recommendation

### 2.1 The stack we shipped

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15, App Router** | SSR + SSG + ISR in one tool. Best-in-class SEO. Server Components mean less client JS. No client-side router dance for 80+ static pages. |
| Language | **TypeScript, strict mode** | Catches content-contract drift at build time. Non-negotiable for any project larger than a weekend hack. |
| Styling | **Tailwind CSS v4**, CSS `@theme` tokens | Utility-first, small bundle (only used classes ship), CSS-first config, consistent design language. Alternatives: CSS Modules (verbose), CSS-in-JS (runtime cost, hurts RSC). |
| UI primitives | **Radix UI + shadcn-style custom wrappers** | Accessibility by default. No vendor lock-in (copy-paste not npm-install). |
| Forms | **react-hook-form + Zod + Server Actions** | Same Zod schema on client AND server. Server Actions remove the REST API layer. |
| Icons | **lucide-react** | Tree-shakeable, supports string lookup (`*` as icons; `icons[name]`). |
| Carousel | **embla-carousel-react** | Small, accessible, no opinions on styling. |
| Email (optional) | **Resend** | Clean API, free tier covers school-website traffic, falls back to log + tmpfile when not configured. |
| CAPTCHA | **Cloudflare Turnstile** | Privacy-friendly alternative to reCAPTCHA. Free. Feature-flagged on env so it disables itself in dev. |
| Package manager | **pnpm** (pinned) | Fastest, disk-efficient, strict dep resolution. Pinned via `packageManager` field so everyone uses the same version. |
| Deployment | **Vercel** | Native Next.js, auto-HTTPS, global edge, image optimisation free. No Kubernetes to run. |

### 2.2 What we chose NOT to use and why

| Not used | Why |
|---|---|
| **React Query / SWR** | Server Components + `fetch` with cache tags cover the data-fetching story. Client-side query caching is unnecessary when 80% of pages are static. |
| **Axios** | Native `fetch` is everywhere in Next.js 15 (Node, edge, browser) and integrates with Next's cache/revalidate. No reason to add a wrapper. |
| **Redux / Zustand / Jotai** | A content-heavy school website has almost no client state. Server components + `useState` on the form components cover it. Add state management when you have at least three shared client state concerns. |
| **CSS-in-JS (styled-components, Emotion)** | Runtime cost, poor Server Component story, more bundle weight. Tailwind v4 eliminates the need. |
| **Pages Router** | App Router is the supported, documented path in Next.js 15. Pages Router is legacy-mode. |
| **Formik** | react-hook-form is smaller, faster, and uncontrolled by default. |
| **Jest** | Vitest is faster, ESM-native, less config. (Not yet added — see pending list.) |

### 2.3 Data fetching: Server Components + fetch, no extra lib

Why this combination is optimal for a school website:

- **Every page is a Server Component by default.** Data fetching happens at build time (SSG) or at revalidate time (ISR) — never at render time on the client. No waterfall, no loading spinner for primary content.
- **`fetch` is deduplicated and cached by Next** for the lifetime of a request. `fetch(url, { next: { revalidate: 300, tags: ["notices"] } })` replaces both React Query's cache and its background revalidation.
- **Client-side state is only used in three places**: hero carousel, mobile nav, form components. None of them need cross-component state.
- **Forms use `useActionState`** (React 19) to track server action pending/result. No client fetch lib.

### 2.4 Decision checklist for your own project

- [ ] Is your content mostly static or slow-changing? → Next.js Server Components win.
- [ ] Do you have a team fluent in CSS-in-JS and actively using it? → Tailwind v4 still wins for new projects; don't migrate an existing Emotion codebase.
- [ ] Do you need authenticated multi-user interactions (dashboard, LMS, cart)? → Revisit React Query + Zustand. For a public website, no.
- [ ] Is SEO critical? → Next.js App Router, period. Vite + React Router cannot match native metadata + streaming + ISR.

---

## Step 3 — Project architecture

### 3.1 Folder tree (actual, not hypothetical)

```
kps-website/
  docs/                       project documentation
    README.md                 docs index
    PROJECT_STATUS.md         master status
    PROGRESS.md               phase log
    SCHOOL_OFFICE_CHECKLIST.md items from the school
    ARCHITECTURE.md           this file
  scripts/
    scrape-legacy.ts          one-off scraper
    transform-scraped.ts      raw JSON -> typed modules
    output/                   scrape artefacts (partly gitignored)
  public/                     static assets, favicons, robots fallback
  src/
    app/                      Next.js App Router — routes, sitemap, robots, OG, icons
      layout.tsx              root layout (fonts, header, footer, site JSON-LD)
      page.tsx                homepage composition
      globals.css             Tailwind + @theme tokens
      sitemap.ts              dynamic sitemap
      robots.ts               robots.txt
      manifest.ts             PWA manifest
      opengraph-image.tsx     dynamic OG card (1200x630)
      icon.tsx                favicon (32x32)
      apple-icon.tsx          Apple touch icon (180x180)
      not-found.tsx           custom 404
      <route>/page.tsx        every concrete route
    content/
      scraped/                auto-generated (do not hand-edit)
      enriched/               hand-authored original prose
    components/
      layout/                 Header, MobileNav, Footer, Breadcrumbs
      common/                 PageHero, Prose, PagePlaceholder
      home/                   Homepage sections
      forms/                  Forms + shared field primitives + Turnstile
      seo/                    JSON-LD blocks
    lib/
      api/                    resource facades (one file per resource)
      actions/                Server Actions + persistence + captcha
      schemas/                Zod schemas shared client/server
      constants/              nav, seo, classes, redirects
      utils/                  cn, slug, format-date
    middleware.ts             301s legacy .php URLs
  next.config.ts
  tailwind config via @theme in globals.css (v4)
  tsconfig.json
  eslint.config.mjs
  package.json
  .env.example
```

### 3.2 Why this shape

- **`src/` wrapper** — keeps app code separate from config, avoids polluting the repo root. Path alias `@/*` maps to `src/*` so imports stay tidy.
- **`content/` as code** — content lives in TypeScript, not JSON or MDX, so it is type-checked, refactorable, and bundled at build. Scraped and enriched are kept apart so regeneration doesn't touch hand-authored work.
- **`lib/api/` is the only way pages touch data** — pages never `import { facilities } from "@/content/scraped/..."`. Enforced by convention and by grep-ability at review time. This is the single point of swap when a real backend arrives.
- **`lib/actions/` is the only way forms touch persistence** — Server Actions colocate with their persistence helpers (`_persist.ts`, `_captcha.ts`) so the whole contract is in one folder.
- **`components/` by intent, not by type** — `components/home/*` groups by where it's used, not by what it is (card/button/etc.). This keeps the layout-card-with-specific-homepage-logic from fighting generic primitives.
- **`seo/` gets its own folder** — JSON-LD blocks aren't components in the UX sense; isolating them makes it obvious what's for search engines vs. users.

### 3.3 Adding a new resource — 3-step checklist

1. **Create the content shape**, either scraped from legacy (if applicable) or enriched from scratch:
   ```ts
   // src/content/enriched/announcements.ts
   export interface Announcement { slug: string; title: string; date: string; body: string; }
   export const announcements: Announcement[] = [/* ... */];
   ```
2. **Add the API facade** with a function shaped like the future backend:
   ```ts
   // src/lib/api/announcements.ts
   import { announcements } from "@/content/enriched/announcements";
   // TODO: replace with fetch('${API_BASE}/announcements') when backend is ready.
   export async function getAnnouncements() { return announcements; }
   export async function getAnnouncementBySlug(slug: string) {
     return announcements.find(a => a.slug === slug) ?? null;
   }
   ```
3. **Consume in a page** — a route file under `src/app/`:
   ```tsx
   // src/app/announcements/page.tsx
   import { getAnnouncements } from "@/lib/api";
   export default async function AnnouncementsPage() {
     const all = await getAnnouncements();
     return <ul>{all.map(a => <li key={a.slug}>{a.title}</li>)}</ul>;
   }
   ```

Then add the route to `sitemap.ts`, add the link to `constants/nav.ts` if it's a primary page, and add a redirect to `constants/redirects.ts` if it replaces a legacy URL.

---

## Step 4 — Routing plan

### 4.1 The full 83-route tree

```
/                                              Home
/about                                         About Us
/about/director-message                        Director's Message
/about/principal-message                       Principal's Message
/about/mission                                 Mission
/about/vision                                  Vision & Aims
/about/motto                                   School Motto
/about/curriculum                              Curriculum

/academics                                     Academics overview
/academics/classes                             Classes Nursery - XII
/academics/homework                            Class selector
/academics/homework/[class]                    Per-class homework (15 SSG)

/activities                                    Co-curricular activities
/facilities                                    Facilities index
/facilities/[slug]                             Facility detail (13 SSG)
/gallery                                       Gallery categories
/gallery/[slug]                                Gallery category (11 SSG)

/admissions                                    Admissions landing
/admissions/process                            Step-by-step process
/admissions/apply                              Online application form
/admissions/fee-structure                      Current fees

/notices                                       Notice board
/news                                          News & events
/news/[slug]                                   News detail (6 SSG)

/downloads                                     Prospectus, forms, calendar
/school-info                                   CBSE Mandatory Public Disclosure
/faq                                           Frequently asked questions

/enquiry                                       Enquiry form
/contact                                       Contact info + form
/verify-tc                                     TC verification form
/pay-fees                                      Fee payment gateway

/privacy-policy                                Legal
/terms                                         Legal

/sitemap.xml        /robots.txt        /manifest.webmanifest
/opengraph-image    /icon              /apple-icon
```

Route listing + sizes from the production build is in [`PROJECT_STATUS.md §4.2`](PROJECT_STATUS.md#42-site--done).

### 4.2 Dynamic route strategy

| Dynamic segment | Strategy | Where |
|---|---|---|
| `/academics/homework/[class]` | `generateStaticParams` from the 15 classes | [`src/app/academics/homework/[class]/page.tsx`](../src/app/academics/homework/%5Bclass%5D/page.tsx) |
| `/facilities/[slug]` | `generateStaticParams` from the 13 facilities | [`src/app/facilities/[slug]/page.tsx`](../src/app/facilities/%5Bslug%5D/page.tsx) |
| `/gallery/[slug]` | `generateStaticParams` from the 11 non-empty categories | [`src/app/gallery/[slug]/page.tsx`](../src/app/gallery/%5Bslug%5D/page.tsx) |
| `/news/[slug]` | `generateStaticParams` from the 6 posts | [`src/app/news/[slug]/page.tsx`](../src/app/news/%5Bslug%5D/page.tsx) |

Every dynamic route is fully static at build time today. When the backend lands, switching to ISR is a one-line change: add `export const revalidate = 300` to the page.

### 4.3 Rendering modes — choosing per route

| Mode | When | Our usage |
|---|---|---|
| `SSG` (static at build) | Rarely-changing content | All `/about/*`, `/academics`, `/activities`, `/facilities/*`, legal pages |
| `ISR` (revalidate N seconds) | Moderate change rate | Future: `/notices`, `/news`, `/gallery/*` once backend is live |
| `SSR` (every request) | Per-user or rapidly-changing | None today; forms are Server Actions, not SSR pages |
| `Client` | Only for interactivity that can't be done server-side | Hero carousel, mobile nav drawer, form components |

### 4.4 Legacy URL → new URL mapping

Everything a parent or Google might have bookmarked must 301-redirect, or we lose search equity. Three kinds of mappings:

| Type | Example | Where |
|---|---|---|
| Static 1:1 | `/aboutus.php → /about` | `staticRedirects` in [`src/lib/constants/redirects.ts`](../src/lib/constants/redirects.ts) |
| Query-string | `/infrastructure.php?InfraId=1 → /facilities/library` | `infrastructureSlugByInfraId` map + middleware switch |
| Query-string | `/homeworklist.php?DCatId=3 → /academics/homework/class-3` | `homeworkSlugByDCatId` + middleware |

Middleware: [`src/middleware.ts`](../src/middleware.ts). Matcher: `/((?!_next|api|.*\\..*).*\\.php$)` — fires only on `.php` URLs so normal routes skip it.

---

## Step 5 — API integration layer

### 5.1 The abstraction

```
pages (src/app/)
   │ imports from
   ▼
src/lib/api/index.ts  (barrel)
   │ re-exports from
   ▼
src/lib/api/notices.ts, facilities.ts, gallery.ts, ...  (one file per resource)
   │ currently reads from
   ▼
src/content/scraped/* + src/content/enriched/*
```

Every resource file exports functions shaped like a real backend call (`getNotices`, `getFacilityBySlug`, `getHomeworkForClass`) and carries a `// TODO: replace with fetch(...)` marker at the swap site.

### 5.2 The fetch client

[`src/lib/api/client.ts`](../src/lib/api/client.ts) — ~70 lines:

```ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message); this.name = "ApiError";
  }
}

export async function apiGet<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  if (!API_BASE) throw new ApiError(500, "NEXT_PUBLIC_API_URL is not configured");
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    next: { revalidate: opts.revalidate, tags: opts.tags },
  });
  if (!res.ok) throw new ApiError(res.status, `GET ${path} -> ${res.status}`);
  return (await res.json()) as T;
}

export async function apiPost<T>(...): Promise<T> { /* ... */ }

export const isBackendLive = false;  // feature flag for progressive swap
```

### 5.3 Caching strategy

Three levels:

1. **Request-level dedup** — within a single request, Next dedupes identical `fetch(url)` calls automatically.
2. **Data cache with revalidate** — `fetch(url, { next: { revalidate: 300 }})` caches the result at the edge for 5 minutes, globally.
3. **On-demand revalidation via tags** — tag the fetch (`tags: ["notices"]`), then from an admin route call `revalidateTag("notices")` to bust the cache immediately. The webhook + secret pattern for this is in `.env.example` as `REVALIDATE_SECRET`.

Revalidate defaults we use:
- `settings`, `cms`: 1 hour
- `facilities`, `downloads`, `school-info`: 1 hour
- `notices`, `homework`, `gallery`, `news-events`: 5 minutes
- `slider`, `testimonials`: 24 hours

### 5.4 Error handling in the page layer

Three strategies depending on severity:

| Situation | Strategy | Example |
|---|---|---|
| Resource not found for a slug | `notFound()` (Next.js) → 404 page | Facility detail page — if no match, render the 404 |
| Content is empty | Render graceful empty state | Notices page with no notices — "no notices currently posted" |
| Backend throws | Global `error.tsx` boundary | Pending — will add when backend is live |

### 5.5 Loading states

Next.js App Router has conventional loading UI. Add `loading.tsx` next to any `page.tsx` that does non-trivial data fetching. Today all routes are effectively instant (content is build-time static), so we haven't needed loading states. When the backend lands, each page can have its own skeleton.

### 5.6 Forms — Server Actions + Zod

```
browser
  ├── react-hook-form (client validation via same Zod schema)
  ├── useActionState  (pending/result state)
  └── FormData → Server Action
                   │
                   ▼ (server)
              parse via Zod (authoritative)
                   │
                   ▼
              verifyCaptcha(token)  — if TURNSTILE_SECRET_KEY set
                   │
                   ▼
              persistSubmission    — console log + JSON tmpfile + optional Resend email
                   │
                   ▼ (back to client)
              { ok: true, message } or { ok: false, fieldErrors }
```

Real code: [`src/components/forms/enquiry-form.tsx`](../src/components/forms/enquiry-form.tsx) (client), [`src/lib/actions/submit-enquiry.ts`](../src/lib/actions/submit-enquiry.ts) (server), [`src/lib/actions/_persist.ts`](../src/lib/actions/_persist.ts), [`src/lib/actions/_captcha.ts`](../src/lib/actions/_captcha.ts).

---

## Step 6 — SEO optimization plan

### 6.1 Per-page metadata

Every `page.tsx` either exports a static `metadata` object or an async `generateMetadata` function that reads the data the page will render and composes title/description accordingly.

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) return { title: "Facility" };
  return {
    title: f.name,
    description: f.description.slice(0, 160),
    alternates: { canonical: `/facilities/${f.slug}` },
  };
}
```

Global defaults (title template, OG, Twitter card, robots directives) live on the root layout: [`src/app/layout.tsx`](../src/app/layout.tsx).

### 6.2 Structured data (JSON-LD)

| Schema type | Where | File |
|---|---|---|
| `EducationalOrganization` + `WebSite` (site-wide) | Root layout | [`src/components/seo/json-ld-school.tsx`](../src/components/seo/json-ld-school.tsx) |
| `LocalBusiness` | Contact page | [`src/components/seo/json-ld.tsx`](../src/components/seo/json-ld.tsx) → `JsonLdLocalBusiness` |
| `NewsArticle` + `Event` | News detail | `JsonLdNewsArticle`, `JsonLdEvent` |
| `Place` + `ImageObject` | Facility detail | `JsonLdFacility` |
| `EducationalOccupationalProgram` | Admissions | `JsonLdEducationalProgram` |
| `FAQPage` | FAQ | Inline in [`src/app/faq/page.tsx`](../src/app/faq/page.tsx) |
| `BreadcrumbList` | Every non-home page | Emitted by [`src/components/layout/breadcrumbs.tsx`](../src/components/layout/breadcrumbs.tsx) |

All JSON-LD blocks reference `{SITE_URL}#organization` via `@id` so Google sees a linked graph, not disconnected entities.

### 6.3 Sitemap, robots, manifest

- **Sitemap** — [`src/app/sitemap.ts`](../src/app/sitemap.ts) exports a default async function that returns a `MetadataRoute.Sitemap`. Combines static path list + dynamic entries from facilities / gallery / homework / news / notices. Rebuilt on every deploy.
- **robots.txt** — [`src/app/robots.ts`](../src/app/robots.ts). Allows all, disallows `/api/` + `/admin/`, points at the sitemap URL.
- **manifest.webmanifest** — [`src/app/manifest.ts`](../src/app/manifest.ts). PWA installability.

### 6.4 Dynamic Open Graph image + favicons

All three rendered from JSX via `next/og` — so the design is in code and rebuilds automatically:

- [`src/app/opengraph-image.tsx`](../src/app/opengraph-image.tsx) — 1200×630 branded card
- [`src/app/icon.tsx`](../src/app/icon.tsx) — 32×32 favicon
- [`src/app/apple-icon.tsx`](../src/app/apple-icon.tsx) — 180×180 iOS home-screen icon

### 6.5 Canonicals and hreflang

Every page sets `alternates: { canonical: "/path" }`. For a school serving one region in one language, hreflang is overkill today — we set `<html lang="en-IN">` on the root and leave it at that. If Hindi is added later, add an `en-IN` / `hi-IN` `alternates.languages` block.

### 6.6 Local SEO (critical for a physical school)

- Google Business Profile — claim + verify. Weekly photo uploads.
- NAP (Name, Address, Phone) consistency across website, GBP, JustDial, UrbanPro, Shiksha.
- Target keywords: "best CBSE school Meerut", "schools near Kanker Khera", "NH-58 Meerut schools", "admissions Meerut 2026", etc. See [`src/lib/constants/seo.ts`](../src/lib/constants/seo.ts) `DEFAULT_KEYWORDS`.

---

## Step 7 — UI/UX upgrade plan

### 7.1 Design tokens

Defined once in [`src/app/globals.css`](../src/app/globals.css) using Tailwind v4 `@theme`:

```css
@theme {
  --color-primary: #b01c2f;
  --color-primary-foreground: #ffffff;
  --color-secondary: #0b2447;
  --color-accent: #f59e0b;
  --color-muted: #f1f5f9;
  --color-border: #e2e8f0;
  --radius: 0.75rem;
  --font-sans: "Inter", ...;
  --font-heading: "Plus Jakarta Sans", ...;
}
```

Every component references these via arbitrary-value Tailwind classes like `bg-[--color-primary]`. Changing a brand colour is a one-line edit.

### 7.2 Homepage composition (actual)

[`src/app/page.tsx`](../src/app/page.tsx):

```tsx
<HeroSlider slides={slides.slice(0, 8)} />   // full-bleed 16:7 carousel
<NoticeBoard />                              // latest 5 notices strip
<WelcomeSnippet />                           // tagline + fact sidebar
<WhyChooseUsGrid />                          // 6 icon cards
<MessagesRow />                              // director + principal cards
<FacilitiesPreview />                        // 6-tile grid
<GalleryPreview />                           // 8-photo masonry
<AdmissionsCta />                            // full-width primary-coloured band
<LocationStrip />                            // 2-col: info + map embed
```

Each is a separate component under [`src/components/home/`](../src/components/home/) for clean review.

### 7.3 Hero slider implementation

[`src/components/home/hero-slider.tsx`](../src/components/home/hero-slider.tsx):

- Client Component (uses `useEmblaCarousel`)
- Loop, autoplay 5 s, dot indicators, arrow buttons
- Respects `prefers-reduced-motion` (kills autoplay)
- Pauses when the tab is hidden (`document.hidden` check)
- First slide gets `priority` so it's LCP-optimal
- ARIA `roledescription="carousel"`, each slide labelled `"N of total"`

### 7.4 Admissions CTA

[`src/components/home/admissions-cta.tsx`](../src/components/home/admissions-cta.tsx) — full-width primary-colour band, 2-CTA row (detail + enquire). One screen-height above the fold is always visible once you scroll past the hero. Simple, high-conversion.

### 7.5 News / events

List + detail pattern.

- List: [`src/app/news/page.tsx`](../src/app/news/page.tsx) — sorted descending by date, category pill + date + excerpt + read-more.
- Detail: [`src/app/news/[slug]/page.tsx`](../src/app/news/%5Bslug%5D/page.tsx) — full body + back link + NewsArticle/Event JSON-LD.

### 7.6 Gallery

Two-level nav: category grid → image grid per category.

- [`src/app/gallery/page.tsx`](../src/app/gallery/page.tsx) — category cards with cover image + photo count.
- [`src/app/gallery/[slug]/page.tsx`](../src/app/gallery/%5Bslug%5D/page.tsx) — responsive 2/3/4-col image grid.

Next upgrade: add a lightbox. `yet-another-react-lightbox` is a zero-config choice.

### 7.7 Testimonials

Placeholder today. Layout ready — see [`src/content/enriched/testimonials.ts`](../src/content/enriched/testimonials.ts) and the recommended homepage slot between `MessagesRow` and `FacilitiesPreview`. Real testimonials replace placeholders file-and-go.

### 7.8 Contact form with map

[`src/app/contact/page.tsx`](../src/app/contact/page.tsx) — three cards (visit, call, email), hours grid, map iframe (shows placeholder until the school's verified Google Places URL is in), followed by the contact form ([`src/components/forms/contact-form.tsx`](../src/components/forms/contact-form.tsx)).

### 7.9 Mobile-first responsive rules

- Tailwind breakpoints: `sm` (640), `md` (768), `lg` (1024), `xl` (1280).
- Every page uses the container pattern: `mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16`.
- Nav collapses to a drawer below `lg` — [`src/components/layout/mobile-nav.tsx`](../src/components/layout/mobile-nav.tsx).
- Images specify `sizes` attributes so `next/image` serves the right resolution per breakpoint.
- Touch targets ≥ 44×44 px on mobile; buttons are `py-2.5` minimum.

---

## Step 8 — Performance optimization

### 8.1 Current baseline

| Metric | Value |
|---|---|
| Routes | 83 static at build |
| First-load JS (shared) | ~102 KB |
| Largest page (homepage) | 120 KB first-load (Embla + page chunk) |
| Form pages (RHF) | 137–139 KB first-load |
| Middleware bundle | 34.8 KB |
| Build time | ~4 s clean |

### 8.2 Lazy loading

- Images — `next/image` lazy by default; `priority` only on the first hero slide.
- Carousel — already loaded inline on homepage (worth the weight because it's the hero). For any non-critical carousels, use `dynamic(() => import(...), { ssr: false })`.
- Turnstile script — loaded with `strategy="lazyOnload"` via `next/script` so form pages don't block on it.

### 8.3 Image optimization

`next/image` with:

```ts
// next.config.ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "www.krishnapublicschoolmeerut.in" }],
  formats: ["image/avif", "image/webp"],
}
```

Every image in the codebase uses `next/image` with explicit `sizes`. No raw `<img>` tags. This gets you AVIF/WebP serving, responsive `srcset`, and automatic LCP optimisation on the Vercel image CDN.

### 8.4 Code splitting

Next.js App Router splits per route automatically. Additional manual splits:

- Client components are in `"use client"` leaves — Server Components aren't bundled for the browser.
- The Embla carousel chunk only loads on pages that import `HeroSlider`.
- `react-hook-form` + `@hookform/resolvers` chunk only loads on form routes (~30 KB).

### 8.5 Fonts

`next/font/google` for Inter + Plus Jakarta Sans, self-hosted on the Vercel CDN, `display: swap`, preloaded via the `<html>` variable CSS vars:

```tsx
const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const heading = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap",
  weight: ["500", "600", "700"], variable: "--font-heading" });
```

### 8.6 CDN

Vercel's global edge CDN is automatic. All static assets, images, and the edge middleware are served from the nearest PoP to the user. No manual CloudFront config needed.

### 8.7 What to measure, and when

Run **after first Vercel deploy**, not on localhost:

- **Lighthouse** — target ≥95 perf, ≥95 a11y, 100 SEO, ≥95 best-practices
- **PageSpeed Insights** — real-world LCP / INP / CLS
- **WebPageTest** — filmstrip for LCP investigation
- **Search Console → Core Web Vitals** — ongoing monitoring

---

## Step 9 — Deployment plan

### 9.1 Vercel (recommended)

1. Push to GitHub (already done — see repo root).
2. https://vercel.com/new → Import Git Repository → pick this repo.
3. Framework preset is auto-detected as Next.js. No build command changes needed.
4. Environment variables — paste from [`.env.example`](../.env.example), fill in the ones you have:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.krishnapublicschoolmeerut.in` (final domain)
   - `RESEND_API_KEY`, `FORM_SENDER_EMAIL` if you have Resend set up
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` if you have Turnstile set up
   - Skip the rest for now.
5. Deploy. You get a preview URL like `kps-school-website-abc.vercel.app` in ~90 s.
6. Add the production domain: **Settings → Domains → Add** → `krishnapublicschoolmeerut.in` + `www.krishnapublicschoolmeerut.in`.
7. **DNS changes at your registrar:**
   - Apex: `A` record to Vercel's IP (Vercel shows this), or `ALIAS`/`ANAME` if the registrar supports it.
   - `www`: `CNAME` to `cname.vercel-dns.com`.
   - TTL 300 s during migration, then raise to 3600 once stable.

### 9.2 Switching domains — cutover sequence

Doing this wrong will 404 for users mid-switch. The safe order:

1. Deploy new site at a Vercel subdomain (`kps.vercel.app`) — verify every page works.
2. Internal review. Fix anything that breaks.
3. Lower DNS TTL on existing records at the registrar to 300 s, wait 24 h.
4. Cutover: change DNS `A`/`CNAME` at the registrar to point at Vercel.
5. Watch Vercel logs for 48 h.
6. Submit new sitemap to Google Search Console + Bing Webmaster Tools.
7. After two weeks, check Search Console for crawl errors; request reindexing for key pages.

### 9.3 CI / CD

Currently Vercel deploys on every push to `main`. That's enough for a single-developer project.

Recommended small-team upgrade — add a GitHub Actions workflow that typechecks, lints, and builds on every PR before merge:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm build
```

### 9.4 Backup / rollback

Vercel keeps every deployment. Rolling back is: **Deployments → find previous successful build → Promote to Production**. Zero downtime, seconds.

### 9.5 Preview URLs

Every PR gets an automatic preview URL from Vercel. Perfect for stakeholder review before merging to main.

---

## Step 10 — Example code (real, from this repo)

### 10.1 A page — facility detail

[`src/app/facilities/[slug]/page.tsx`](../src/app/facilities/%5Bslug%5D/page.tsx):

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { JsonLdFacility } from "@/components/seo/json-ld";
import { getFacilities, getFacilityBySlug } from "@/lib/api";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  const all = await getFacilities();
  return all.map(f => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) return { title: "Facility" };
  return {
    title: f.name,
    description: f.description.slice(0, 160),
    alternates: { canonical: `/facilities/${f.slug}` },
  };
}

export default async function FacilityDetailPage({ params }: Props) {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) notFound();

  return (
    <>
      <JsonLdFacility slug={f.slug} name={f.name}
                     description={f.description} images={f.images} />
      <PageHero
        eyebrow="Facility"
        title={f.name}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/facilities", label: "Facilities" },
          { href: `/facilities/${f.slug}`, label: f.name },
        ]}
      />
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        {f.images[0] ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image src={f.images[0]} alt={f.name} fill priority sizes="(min-width: 1024px) 1024px, 100vw" />
          </div>
        ) : null}
        <Prose text={f.description} className="mt-8 max-w-none" />
      </section>
    </>
  );
}
```

### 10.2 API facade — notices

[`src/lib/api/notices.ts`](../src/lib/api/notices.ts):

```ts
import type { Notice, Paginated } from "./types";
import { notices as scrapedNotices } from "@/content/scraped/notices";

export async function getNotices(opts: { page?: number; limit?: number } = {}): Promise<Paginated<Notice>> {
  const page = Math.max(1, opts.page ?? 1);
  const limit = Math.max(1, opts.limit ?? 10);

  // TODO: const res = await apiGet<Paginated<Notice>>(
  //   `/notices?page=${page}&limit=${limit}`,
  //   { revalidate: 300, tags: ["notices"] },
  // );
  // return res;

  const all: Notice[] = scrapedNotices.map(n => ({
    id: n.id, slug: n.id, title: n.title, body: "", date: n.date, url: n.url ?? null,
  }));
  const start = (page - 1) * limit;
  return {
    data: all.slice(start, start + limit),
    pagination: { page, limit, total: all.length },
  };
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  const { data } = await getNotices({ limit: 1000 });
  return data.find(n => n.slug === slug) ?? null;
}

export async function getLatestNotices(count = 5): Promise<Notice[]> {
  const { data } = await getNotices({ limit: count });
  return data;
}
```

### 10.3 SEO component — LocalBusiness JSON-LD

[`src/components/seo/json-ld.tsx`](../src/components/seo/json-ld.tsx) (excerpt):

```tsx
export function JsonLdLocalBusiness({
  phones, email, openingHours = [], latitude, longitude,
}: JsonLdLocalBusinessProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${SITE_URL}#organization`,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: `${SITE_URL}/opengraph-image.png`,
    email,
    telephone: phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.streetAddress,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    ...(latitude && longitude && {
      geo: { "@type": "GeoCoordinates", latitude, longitude },
    }),
    ...(openingHours.length && {
      openingHoursSpecification: openingHours.map(h => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days, description: h.hours,
      })),
    }),
  };
  return <script type="application/ld+json"
                 dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

Pages call it like:

```tsx
<JsonLdLocalBusiness
  phones={settings.phones.map(p => p.telHref.replace("tel:", ""))}
  email={settings.emails[0].address}
  openingHours={settings.openingHours.map(h => ({ days: h.days, hours: h.hours }))}
  latitude={settings.googleMaps.latitude}
  longitude={settings.googleMaps.longitude}
/>
```

### 10.4 Reusable UI component — PageHero

[`src/components/common/page-hero.tsx`](../src/components/common/page-hero.tsx):

```tsx
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}

export function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-[--color-muted]">
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base text-[--color-muted-foreground] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
```

Used by every non-home page. One component, consistent header across 80+ routes, zero duplication.

### 10.5 Server Action — submit enquiry

[`src/lib/actions/submit-enquiry.ts`](../src/lib/actions/submit-enquiry.ts):

```ts
"use server";

import { enquirySchema } from "@/lib/schemas/enquiry";
import { persistSubmission, renderKvHtml } from "./_persist";
import { verifyCaptcha } from "./_captcha";

export async function submitEnquiry(
  _prev: FormActionResult | null,
  formData: FormData,
): Promise<FormActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  if (parsed.data.website) return { ok: true, message: "Thanks." }; // honeypot

  const captcha = await verifyCaptcha(parsed.data.captchaToken);
  if (!captcha.ok) return { ok: false, message: "Captcha failed — reload and retry." };

  await persistSubmission("enquiry", parsed.data, {
    subject: `New enquiry from ${parsed.data.name}`,
    html: renderKvHtml("New website enquiry", { /* ... */ }),
  });

  return { ok: true, message: "Thank you — your enquiry has been received." };
}
```

### 10.6 A client form — RHF + Zod + useActionState

[`src/components/forms/enquiry-form.tsx`](../src/components/forms/enquiry-form.tsx) (condensed):

```tsx
"use client";
import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "@/lib/schemas/enquiry";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";
import { Turnstile } from "./turnstile";
// ...

export function EnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: { /* ... */ },
  });

  useEffect(() => {
    if (state?.ok) { reset(); formRef.current?.reset(); }
  }, [state, reset]);

  // After client validates, grab FormData from the live DOM so Turnstile's
  // injected captcha token travels with our own fields.
  const onValid = () => {
    if (!formRef.current) return;
    formAction(new FormData(formRef.current));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onValid)} noValidate>
      {/* ... inputs via register() ... */}
      <Turnstile />
      <SubmitButton pending={isPending}>Send enquiry</SubmitButton>
    </form>
  );
}
```

---

## Summary — the 10 steps mapped to this repo

| Step | Summary | Where to see it |
|---|---|---|
| 1 | Scrape-not-API, typed content layer | `scripts/`, `src/content/` |
| 2 | Next.js 15 + Tailwind v4 + TS strict + pnpm + Vercel | `package.json`, `next.config.ts`, `tsconfig.json` |
| 3 | Grouped by intent (home/forms/layout/seo), API abstraction between pages and content | `src/components/`, `src/lib/api/` |
| 4 | 83 routes, query-string redirects via middleware | `src/app/`, `src/middleware.ts`, `src/lib/constants/redirects.ts` |
| 5 | Thin `apiGet`/`apiPost` wrapper, Server Actions for writes | `src/lib/api/client.ts`, `src/lib/actions/` |
| 6 | Per-page metadata, 7 kinds of JSON-LD, dynamic OG + favicons | `src/components/seo/`, `src/app/opengraph-image.tsx` + `icon.tsx` + `apple-icon.tsx` |
| 7 | Hero carousel, admissions CTA, news/events, gallery, contact + map | `src/app/page.tsx`, `src/components/home/`, `src/components/forms/` |
| 8 | `next/image`, `next/font`, Embla lazy on relevant pages, Vercel CDN | `next.config.ts`, `src/app/layout.tsx` |
| 9 | Vercel Git-auto deploy, preview URLs per PR, rollback in UI | — |
| 10 | Real code in this repo; copy patterns when adding new resources | everywhere |

**Where to go next** — read [`PROJECT_STATUS.md`](PROJECT_STATUS.md) for the live status snapshot and [`SCHOOL_OFFICE_CHECKLIST.md`](SCHOOL_OFFICE_CHECKLIST.md) for what the school still needs to supply before launch.

---

*This document is the architecture reference. Keep it current as patterns change. If something in here stops being true, update the section rather than leaving a stale recipe in place.*
