import type { DownloadItem } from "./types";
// TODO: replace with fetch('${API_BASE}/downloads') when backend is ready.
import { downloads as scrapedDownloads } from "@/content/scraped/downloads";

export async function getDownloads(): Promise<DownloadItem[]> {
  // TODO: return apiGet<DownloadItem[]>("/downloads", { revalidate: 3600, tags: ["downloads"] });
  return scrapedDownloads.map((d) => ({
    title: d.title,
    url: d.url,
  }));
}
