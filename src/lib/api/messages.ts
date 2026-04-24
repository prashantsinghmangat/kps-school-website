import type { LeadershipMessage } from "./types";
// TODO: replace with fetch('${API_BASE}/cms/director-message|principal-message') when backend is ready.
import { messages as scrapedMessages } from "@/content/scraped/messages";

export async function getLeadershipMessages(): Promise<LeadershipMessage[]> {
  // TODO: return apiGet<LeadershipMessage[]>("/cms/messages", { revalidate: 86400, tags: ["cms"] });
  return scrapedMessages.map((m) => ({
    role: m.role,
    name: m.name,
    title: m.title,
    body: m.body,
    image: m.image,
  }));
}

export async function getLeadershipMessage(
  role: "director" | "principal",
): Promise<LeadershipMessage | null> {
  const all = await getLeadershipMessages();
  return all.find((m) => m.role === role) ?? null;
}
