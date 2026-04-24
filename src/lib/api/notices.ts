import type { Notice, Paginated } from "./types";
// TODO: replace the scraped import with fetch('${API_BASE}/notices') when
// backend is ready. Keep the same return shape.
import { notices as scrapedNotices } from "@/content/scraped/notices";

const DEFAULT_LIMIT = 10;

export async function getNotices(
  opts: { page?: number; limit?: number } = {},
): Promise<Paginated<Notice>> {
  const page = Math.max(1, opts.page ?? 1);
  const limit = Math.max(1, opts.limit ?? DEFAULT_LIMIT);

  // TODO: const res = await apiGet<Paginated<Notice>>(
  //   `/notices?page=${page}&limit=${limit}`,
  //   { revalidate: 300, tags: ["notices"] },
  // ); return res;

  // Scraper found no notice-board items. Phase 2 will either re-scrape with a
  // different selector or seed notices from a future CMS. Until then this is
  // empty — pages that render notices should handle the empty state cleanly.
  const all: Notice[] = scrapedNotices.map((n) => ({
    id: n.id,
    slug: n.id, // TODO: use a proper slug once notices have titles
    title: n.title,
    body: "",
    date: n.date,
    url: n.url ?? null,
  }));
  const start = (page - 1) * limit;
  return {
    data: all.slice(start, start + limit),
    pagination: { page, limit, total: all.length },
  };
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  // TODO: return apiGet<Notice>(`/notices/${encodeURIComponent(slug)}`, { revalidate: 300 });
  const { data } = await getNotices({ limit: 1000 });
  return data.find((n) => n.slug === slug) ?? null;
}

export async function getLatestNotices(count = 5): Promise<Notice[]> {
  // TODO: return (await apiGet<Paginated<Notice>>(`/notices?page=1&limit=${count}`, { revalidate: 300 })).data;
  const { data } = await getNotices({ limit: count });
  return data;
}
