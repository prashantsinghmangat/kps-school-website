import type { Facility } from "./types";
// TODO: replace with fetch('${API_BASE}/facilities') when backend is ready.
import { facilities as scrapedFacilities } from "@/content/scraped/facilities";
import { enrichedFacilities } from "@/content/enriched/facilities";

function merge(): Facility[] {
  const scrapedBySlug = new Map(scrapedFacilities.map((f) => [f.slug, f]));
  return enrichedFacilities.map((e) => {
    const s = scrapedBySlug.get(e.slug);
    return {
      slug: e.slug,
      name: e.name,
      description: e.description,
      highlights: e.highlights,
      images: s?.images ?? [],
      verified: e.verificationStatus === "scraped",
    };
  });
}

export async function getFacilities(): Promise<Facility[]> {
  // TODO: return apiGet<Facility[]>("/facilities", { revalidate: 3600, tags: ["facilities"] });
  return merge();
}

export async function getFacilityBySlug(slug: string): Promise<Facility | null> {
  // TODO: return apiGet<Facility>(`/facilities/${encodeURIComponent(slug)}`, { revalidate: 3600 });
  const all = await getFacilities();
  return all.find((f) => f.slug === slug) ?? null;
}
