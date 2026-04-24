import type { Testimonial } from "./types";
// TODO: replace with fetch('${API_BASE}/testimonials') when backend is ready.
import { testimonials } from "@/content/enriched/testimonials";

export async function getTestimonials(): Promise<Testimonial[]> {
  // TODO: return apiGet<Testimonial[]>("/testimonials", { revalidate: 86400, tags: ["testimonials"] });
  return testimonials.map((t) => ({ ...t }));
}
