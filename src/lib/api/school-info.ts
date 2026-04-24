// TODO: replace with fetch('${API_BASE}/school-info') when backend is ready.
import { schoolInfoEnriched } from "@/content/enriched/school-info";

export async function getSchoolInfo() {
  // TODO: return apiGet<SchoolInfo>("/school-info", { revalidate: 86400, tags: ["school-info"] });
  return schoolInfoEnriched;
}
