import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/seo";
import {
  getFacilities,
  getGalleryCategories,
  getHomeworkClasses,
  getNewsEvents,
  getNotices,
} from "@/lib/api";

const staticPaths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/director-message", changeFrequency: "yearly", priority: 0.6 },
  { path: "/about/principal-message", changeFrequency: "yearly", priority: 0.6 },
  { path: "/about/mission", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/vision", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/motto", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/curriculum", changeFrequency: "yearly", priority: 0.5 },
  { path: "/academics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/academics/classes", changeFrequency: "yearly", priority: 0.6 },
  { path: "/academics/homework", changeFrequency: "weekly", priority: 0.6 },
  { path: "/activities", changeFrequency: "monthly", priority: 0.7 },
  { path: "/facilities", changeFrequency: "monthly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/notices", changeFrequency: "daily", priority: 0.8 },
  { path: "/news", changeFrequency: "weekly", priority: 0.7 },
  { path: "/downloads", changeFrequency: "monthly", priority: 0.6 },
  { path: "/admissions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/admissions/process", changeFrequency: "yearly", priority: 0.7 },
  { path: "/admissions/apply", changeFrequency: "yearly", priority: 0.8 },
  { path: "/admissions/fee-structure", changeFrequency: "yearly", priority: 0.7 },
  { path: "/school-info", changeFrequency: "yearly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/enquiry", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/verify-tc", changeFrequency: "yearly", priority: 0.4 },
  { path: "/pay-fees", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [facilities, galleryCats, homeworkClasses, news, noticesPage] = await Promise.all([
    getFacilities(),
    getGalleryCategories(),
    getHomeworkClasses(),
    getNewsEvents(),
    getNotices({ limit: 1000 }),
  ]);

  const fromStatic: MetadataRoute.Sitemap = staticPaths.map((s) => ({
    url: `${SITE_URL}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  const fromFacilities: MetadataRoute.Sitemap = facilities.map((f) => ({
    url: `${SITE_URL}/facilities/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const fromGallery: MetadataRoute.Sitemap = galleryCats.map((c) => ({
    url: `${SITE_URL}/gallery/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const fromHomework: MetadataRoute.Sitemap = homeworkClasses.map((c) => ({
    url: `${SITE_URL}/academics/homework/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const fromNews: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const fromNotices: MetadataRoute.Sitemap = noticesPage.data.map((n) => ({
    url: `${SITE_URL}/notices/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...fromStatic,
    ...fromFacilities,
    ...fromGallery,
    ...fromHomework,
    ...fromNews,
    ...fromNotices,
  ];
}
