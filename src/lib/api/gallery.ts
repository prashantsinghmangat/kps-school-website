import type { GalleryCategory } from "./types";
// TODO: replace with fetch('${API_BASE}/gallery/categories') when backend is ready.
import { gallery as scrapedGallery } from "@/content/scraped/gallery";

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  // TODO: return apiGet<GalleryCategory[]>("/gallery/categories", { revalidate: 300, tags: ["gallery"] });
  return scrapedGallery
    .filter((c) => c.images.length > 0) // drop empty categories
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      cover: c.images[0]?.url ?? null,
      imageCount: c.images.length,
      images: c.images,
    }));
}

export async function getGalleryCategoryBySlug(
  slug: string,
): Promise<GalleryCategory | null> {
  // TODO: return apiGet<GalleryCategory>(`/gallery/categories/${encodeURIComponent(slug)}`, { revalidate: 300 });
  const all = await getGalleryCategories();
  return all.find((c) => c.slug === slug) ?? null;
}
