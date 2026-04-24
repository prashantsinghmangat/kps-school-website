import type { CmsPage } from "./types";
// TODO: replace with fetch('${API_BASE}/cms/:slug') when backend is ready.
import { about } from "@/content/scraped/about";
import { aboutEnriched } from "@/content/enriched/about";
import { academicsEnriched } from "@/content/enriched/academics";
import { coCurricular } from "@/content/enriched/co-curricular";
import { faq } from "@/content/enriched/faq";
import { admissionsEnriched } from "@/content/enriched/admissions";

/**
 * Static CMS-style page content. `src/content/scraped/about.ts` provides the
 * factual baseline; `src/content/enriched/` provides the rewritten prose. When
 * the real CMS/API is wired in, keep the same slug set to avoid a page sweep.
 */
const pages: CmsPage[] = [
  { slug: "about", title: "About Us", body: aboutEnriched.narrative },
  { slug: "mission", title: "Our Mission", body: about.mission },
  { slug: "vision", title: "Our Vision", body: about.vision },
  { slug: "motto", title: "School Motto", body: about.moto },
  { slug: "curriculum", title: "Curriculum", body: about.song },
  { slug: "academics-overview", title: "Academics Overview", body: academicsEnriched.overview },
  { slug: "academics-assessment", title: "Assessment", body: academicsEnriched.assessment },
  { slug: "academics-pedagogy", title: "Pedagogy", body: academicsEnriched.pedagogy },
  { slug: "admissions-overview", title: "Admissions", body: admissionsEnriched.overview },
];

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  // TODO: return apiGet<CmsPage>(`/cms/${encodeURIComponent(slug)}`, { revalidate: 86400, tags: ["cms"] });
  return pages.find((p) => p.slug === slug) ?? null;
}

export async function listCmsPages(): Promise<CmsPage[]> {
  return pages;
}

// Re-export structured content that doesn't fit the flat CMS-page shape.
// Pages that need the nested structure (stages list, FAQ array, etc.) should
// read these through dedicated resource functions below.

export async function getAcademics() {
  // TODO: return apiGet<AcademicsPayload>("/cms/academics", { revalidate: 86400 });
  return academicsEnriched;
}

export async function getAdmissions() {
  // TODO: return apiGet<AdmissionsPayload>("/cms/admissions", { revalidate: 86400 });
  return admissionsEnriched;
}

export async function getCoCurricular() {
  // TODO: return apiGet<CoCurricularPayload>("/cms/co-curricular", { revalidate: 86400 });
  return coCurricular;
}

export async function getFaq() {
  // TODO: return apiGet<FaqEntry[]>("/cms/faq", { revalidate: 86400 });
  return faq;
}

export async function getAbout() {
  return aboutEnriched;
}
