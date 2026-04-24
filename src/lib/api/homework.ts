import type { HomeworkClassRecord } from "./types";
// TODO: replace with fetch('${API_BASE}/homework/classes') when backend is ready.
import { homework as scrapedHomework } from "@/content/scraped/homework";
import { classes, classByDCatId } from "@/lib/constants/classes";

export async function getHomeworkClasses(): Promise<HomeworkClassRecord[]> {
  // TODO: return apiGet<HomeworkClassRecord[]>("/homework/classes", { revalidate: 600, tags: ["homework"] });
  const bySlug = new Map<string, HomeworkClassRecord>();

  for (const c of classes) {
    bySlug.set(c.slug, { slug: c.slug, name: c.name, items: [] });
  }

  for (const raw of scrapedHomework) {
    const klass = classByDCatId.get(raw.classId);
    if (!klass) continue;
    const rec = bySlug.get(klass.slug);
    if (!rec) continue;
    rec.items = raw.items.map((i) => ({ title: i.title, url: i.url }));
  }

  return classes.map((c) => bySlug.get(c.slug)!);
}

export async function getHomeworkForClass(slug: string): Promise<HomeworkClassRecord | null> {
  // TODO: return apiGet<HomeworkClassRecord>(`/homework/classes/${encodeURIComponent(slug)}`, { revalidate: 600 });
  const all = await getHomeworkClasses();
  return all.find((c) => c.slug === slug) ?? null;
}
