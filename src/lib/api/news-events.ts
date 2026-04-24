import type { NewsEvent } from "./types";
// TODO: replace with fetch('${API_BASE}/news-events') when backend is ready.
import { newsEvents } from "@/content/enriched/news-events";

export async function getNewsEvents(): Promise<NewsEvent[]> {
  // TODO: return apiGet<NewsEvent[]>("/news-events", { revalidate: 600, tags: ["news"] });
  return newsEvents.map((n) => ({ ...n }));
}

export async function getNewsEventBySlug(slug: string): Promise<NewsEvent | null> {
  // TODO: return apiGet<NewsEvent>(`/news-events/${encodeURIComponent(slug)}`, { revalidate: 600 });
  return newsEvents.find((n) => n.slug === slug) ?? null;
}
