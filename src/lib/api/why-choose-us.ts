// TODO: replace with fetch('${API_BASE}/why-choose-us') when backend is ready.
import { whyChooseUs } from "@/content/enriched/why-choose-us";

export async function getWhyChooseUs() {
  return whyChooseUs;
}
