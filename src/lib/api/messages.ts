import type { LeadershipMessage } from "./types";
// TODO: replace with fetch('${API_BASE}/cms/director-message|principal-message') when backend is ready.
import { messages as scrapedMessages } from "@/content/scraped/messages";

/**
 * Known-broken legacy image URLs. The legacy site scraper captured these at
 * the time of the scrape, but the files are no longer served (the whole
 * /MessageImages/ directory returns 404 on the legacy server). Mapping these
 * to null here makes the UI fall back to its "Portrait not available" state
 * cleanly instead of trying to load an image that will 404.
 *
 * To extend: drop any known-broken legacy URL into this set. If the legacy
 * file is ever restored, remove the URL from this set.
 */
const BROKEN_LEGACY_IMAGES = new Set<string>([
  "https://www.krishnapublicschoolmeerut.in/MessageImages/Principalmessage.jpg",
]);

function filterBroken(url: string | null): string | null {
  if (!url) return null;
  return BROKEN_LEGACY_IMAGES.has(url) ? null : url;
}

export async function getLeadershipMessages(): Promise<LeadershipMessage[]> {
  // TODO: return apiGet<LeadershipMessage[]>("/cms/messages", { revalidate: 86400, tags: ["cms"] });
  return scrapedMessages.map((m) => ({
    role: m.role,
    name: m.name,
    title: m.title,
    body: m.body,
    image: filterBroken(m.image),
  }));
}

export async function getLeadershipMessage(
  role: "director" | "principal",
): Promise<LeadershipMessage | null> {
  const all = await getLeadershipMessages();
  return all.find((m) => m.role === role) ?? null;
}
