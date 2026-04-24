/**
 * Legacy site scraper for www.krishnapublicschoolmeerut.in
 *
 * Produces scripts/output/raw-scraped.json — raw per-page extraction.
 * Run the transform step after this to generate the typed content files.
 */
import * as cheerio from "cheerio";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "output");
const RAW_OUTPUT = resolve(OUTPUT_DIR, "raw-scraped.json");
const BASE = "https://www.krishnapublicschoolmeerut.in";

const USER_AGENT =
  "Mozilla/5.0 (compatible; KPS-RebuildBot/1.0; +https://www.krishnapublicschoolmeerut.in)";
const REQUEST_DELAY_MS = 500;
const REQUEST_TIMEOUT_MS = 20_000;

type PageKind =
  | "home"
  | "about"
  | "message"
  | "mission"
  | "vision-mission"
  | "moto"
  | "song"
  | "cocurricular"
  | "infrastructure"
  | "photo-gallery-index"
  | "gallery-category"
  | "downloads"
  | "school-info"
  | "contact"
  | "homework-index"
  | "homework-category";

interface TargetPage {
  kind: PageKind;
  slug: string;
  url: string;
  query?: Record<string, string | number>;
}

interface ScrapedPage {
  kind: PageKind;
  slug: string;
  url: string;
  query?: Record<string, string | number>;
  status: number;
  ok: boolean;
  title: string | null;
  metaDescription: string | null;
  headings: { level: string; text: string }[];
  paragraphs: string[];
  lists: string[][];
  tables: { headers: string[]; rows: string[][] }[];
  images: { src: string; alt: string | null }[];
  downloads: { href: string; text: string }[];
  rawLength: number;
  error?: string;
}

interface RawScrapeOutput {
  scrapedAt: string;
  base: string;
  pages: ScrapedPage[];
  sliderImages: { src: string; alt: string | null }[];
  noticeBoard: { text: string; href: string | null }[];
  errors: { url: string; message: string }[];
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function absolutize(src: string): string {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("//")) return "https:" + src;
  if (src.startsWith("/")) return BASE + src;
  return BASE + "/" + src;
}

function normalizeWhitespace(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

async function fetchHtml(url: string): Promise<{ status: number; body: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    const body = await res.text();
    return { status: res.status, body };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Remove DOM regions that are chrome (nav, header, footer, sidebar slider/notice
 * boards that appear on every page). Returns a cheerio "root" of just the main
 * content. We are conservative — if nothing recognizable remains, we fall back
 * to the body.
 */
function isolateMain($: cheerio.CheerioAPI): cheerio.Cheerio<any> {
  // Kill obvious chrome
  $(
    "nav, header, footer, script, style, noscript, iframe, .navbar, .footer, .header, .top-bar, .topbar, .menu, .sidebar, .breadcrumb, .breadcrumbs, #header, #footer, #nav, #menu, .slider, #slider, .carousel, .owl-carousel, .notice-board, .noticeboard, #noticeboard, .marquee, marquee",
  ).remove();

  // Candidate main containers (ordered)
  const selectors = [
    "main",
    "#main",
    ".main-content",
    "#content",
    ".content",
    ".page-content",
    ".inner-page",
    ".about-content",
    ".container .row",
    ".container",
    "body",
  ];
  for (const sel of selectors) {
    const el = $(sel).first();
    if (el.length && normalizeWhitespace(el.text()).length > 80) return el;
  }
  return $("body");
}

function extractPage(
  target: TargetPage,
  status: number,
  html: string,
): ScrapedPage {
  const $ = cheerio.load(html);
  const title = $("title").first().text().trim() || null;
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;

  const main = isolateMain($);

  const headings: { level: string; text: string }[] = [];
  main.find("h1, h2, h3, h4").each((_, el) => {
    const text = normalizeWhitespace($(el).text());
    if (text) headings.push({ level: el.tagName.toLowerCase(), text });
  });

  const paragraphs: string[] = [];
  main.find("p").each((_, el) => {
    const text = normalizeWhitespace($(el).text());
    if (text && text.length > 1) paragraphs.push(text);
  });

  // Also capture div text blocks that aren't paragraphs but hold content (legacy PHP habit)
  main.find("div").each((_, el) => {
    const $el = $(el);
    if ($el.find("p, h1, h2, h3, h4, div, table, ul, ol").length > 0) return;
    const text = normalizeWhitespace($el.text());
    if (text.length > 40 && !paragraphs.includes(text)) paragraphs.push(text);
  });

  const lists: string[][] = [];
  main.find("ul, ol").each((_, el) => {
    const items: string[] = [];
    $(el)
      .children("li")
      .each((_, li) => {
        const t = normalizeWhitespace($(li).text());
        if (t) items.push(t);
      });
    if (items.length) lists.push(items);
  });

  const tables: { headers: string[]; rows: string[][] }[] = [];
  main.find("table").each((_, el) => {
    const headerRow: string[] = [];
    $(el)
      .find("thead tr th, thead tr td")
      .each((_, th) => {
        headerRow.push(normalizeWhitespace($(th).text()));
      });
    const rows: string[][] = [];
    $(el)
      .find("tbody tr, tr")
      .each((_, tr) => {
        if ($(tr).parent().is("thead")) return;
        const row: string[] = [];
        $(tr)
          .find("td, th")
          .each((_, td) => {
            row.push(normalizeWhitespace($(td).text()));
          });
        if (row.length && row.some((c) => c)) rows.push(row);
      });
    if (headerRow.length || rows.length) tables.push({ headers: headerRow, rows });
  });

  const images: { src: string; alt: string | null }[] = [];
  const seenImg = new Set<string>();
  main.find("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src");
    if (!src) return;
    const abs = absolutize(src);
    if (seenImg.has(abs)) return;
    seenImg.add(abs);
    const alt = $(el).attr("alt")?.trim() || null;
    images.push({ src: abs, alt });
  });

  const downloads: { href: string; text: string }[] = [];
  const seenDl = new Set<string>();
  main.find("a").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const lower = href.toLowerCase();
    const isFile = /\.(pdf|docx?|xlsx?|pptx?|zip|rar)(\?|#|$)/.test(lower);
    if (!isFile) return;
    const abs = absolutize(href);
    if (seenDl.has(abs)) return;
    seenDl.add(abs);
    const text = normalizeWhitespace($(el).text()) || abs.split("/").pop() || abs;
    downloads.push({ href: abs, text });
  });

  return {
    kind: target.kind,
    slug: target.slug,
    url: target.url,
    query: target.query,
    status,
    ok: status >= 200 && status < 400,
    title,
    metaDescription,
    headings,
    paragraphs,
    lists,
    tables,
    images,
    downloads,
    rawLength: html.length,
  };
}

function extractHomepageExtras($: cheerio.CheerioAPI): {
  sliderImages: { src: string; alt: string | null }[];
  noticeBoard: { text: string; href: string | null }[];
} {
  const sliderImages: { src: string; alt: string | null }[] = [];
  const seenSlider = new Set<string>();
  $(
    ".slider img, .carousel img, .owl-carousel img, #slider img, .banner img, .hero img",
  ).each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src");
    if (!src) return;
    const abs = absolutize(src);
    if (seenSlider.has(abs)) return;
    seenSlider.add(abs);
    sliderImages.push({ src: abs, alt: $(el).attr("alt")?.trim() || null });
  });
  // Heuristic fallback: any image under /HeaderImages/ or /slider/
  if (!sliderImages.length) {
    $("img").each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src") || "";
      if (/HeaderImages|\/slider\//i.test(src)) {
        const abs = absolutize(src);
        if (seenSlider.has(abs)) return;
        seenSlider.add(abs);
        sliderImages.push({ src: abs, alt: $(el).attr("alt")?.trim() || null });
      }
    });
  }

  const noticeBoard: { text: string; href: string | null }[] = [];
  $(
    ".notice-board li, .noticeboard li, #noticeboard li, marquee li, .marquee li, .notice li, .notices li",
  ).each((_, el) => {
    const text = normalizeWhitespace($(el).text());
    const href = $(el).find("a").attr("href") || null;
    if (text) noticeBoard.push({ text, href: href ? absolutize(href) : null });
  });

  return { sliderImages, noticeBoard };
}

function buildTargets(): TargetPage[] {
  const targets: TargetPage[] = [
    { kind: "home", slug: "home", url: `${BASE}/` },
    { kind: "home", slug: "index", url: `${BASE}/index.php` },
    { kind: "about", slug: "aboutus", url: `${BASE}/aboutus.php` },
    { kind: "message", slug: "directormessage", url: `${BASE}/directormessage.php` },
    {
      kind: "message",
      slug: "principalmessage",
      url: `${BASE}/principalmessage.php`,
    },
    { kind: "mission", slug: "mission", url: `${BASE}/mission.php` },
    {
      kind: "vision-mission",
      slug: "visionmission",
      url: `${BASE}/visionmission.php`,
    },
    { kind: "moto", slug: "schoolmoto", url: `${BASE}/schoolmoto.php` },
    { kind: "song", slug: "schoolsong", url: `${BASE}/schoolsong.php` },
    {
      kind: "cocurricular",
      slug: "cocurricularactivities",
      url: `${BASE}/cocurricularactivities.php`,
    },
    {
      kind: "photo-gallery-index",
      slug: "photogallery",
      url: `${BASE}/photogallery.php`,
    },
    { kind: "downloads", slug: "downloads", url: `${BASE}/downloads.php` },
    { kind: "school-info", slug: "schoolinfo", url: `${BASE}/schoolinfo.php` },
    { kind: "contact", slug: "contactus", url: `${BASE}/contactus.php` },
    { kind: "homework-index", slug: "hwclass", url: `${BASE}/hwclass.php` },
  ];

  for (let i = 1; i <= 13; i++) {
    targets.push({
      kind: "infrastructure",
      slug: `infrastructure-${i}`,
      url: `${BASE}/infrastructure.php?InfraId=${i}`,
      query: { InfraId: i },
    });
  }
  for (let i = 1; i <= 15; i++) {
    targets.push({
      kind: "gallery-category",
      slug: `gallery-${i}`,
      url: `${BASE}/gallery.php?GalleryCatId=${i}`,
      query: { GalleryCatId: i },
    });
  }
  for (let i = 1; i <= 15; i++) {
    targets.push({
      kind: "homework-category",
      slug: `homework-${i}`,
      url: `${BASE}/homeworklist.php?DCatId=${i}`,
      query: { DCatId: i },
    });
  }
  return targets;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const targets = buildTargets();
  const pages: ScrapedPage[] = [];
  const errors: { url: string; message: string }[] = [];
  let sliderImages: { src: string; alt: string | null }[] = [];
  let noticeBoard: { text: string; href: string | null }[] = [];

  console.log(`Scraping ${targets.length} URLs from ${BASE}`);
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const prefix = `[${String(i + 1).padStart(3, "0")}/${targets.length}]`;
    try {
      const { status, body } = await fetchHtml(t.url);
      const page = extractPage(t, status, body);
      pages.push(page);
      if (t.slug === "home" || t.slug === "index") {
        const $ = cheerio.load(body);
        const extras = extractHomepageExtras($);
        if (extras.sliderImages.length && !sliderImages.length)
          sliderImages = extras.sliderImages;
        if (extras.noticeBoard.length && !noticeBoard.length)
          noticeBoard = extras.noticeBoard;
      }
      console.log(
        `${prefix} ${status} ${t.url} — ${page.paragraphs.length}p ${page.images.length}img ${page.downloads.length}dl`,
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push({ url: t.url, message: msg });
      pages.push({
        kind: t.kind,
        slug: t.slug,
        url: t.url,
        query: t.query,
        status: 0,
        ok: false,
        title: null,
        metaDescription: null,
        headings: [],
        paragraphs: [],
        lists: [],
        tables: [],
        images: [],
        downloads: [],
        rawLength: 0,
        error: msg,
      });
      console.warn(`${prefix} ERR ${t.url} — ${msg}`);
    }
    await sleep(REQUEST_DELAY_MS);
  }

  const output: RawScrapeOutput = {
    scrapedAt: new Date().toISOString(),
    base: BASE,
    pages,
    sliderImages,
    noticeBoard,
    errors,
  };

  await writeFile(RAW_OUTPUT, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\nWrote ${RAW_OUTPUT}`);
  console.log(
    `Summary: ${pages.filter((p) => p.ok).length} ok, ${pages.filter((p) => !p.ok).length} failed, ${sliderImages.length} slider imgs, ${noticeBoard.length} notices`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
