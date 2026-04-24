import type { SliderSlide } from "./types";
// TODO: replace with fetch('${API_BASE}/header-slider') when backend is ready.
import { slider as scrapedSlider } from "@/content/scraped/slider";

export async function getSliderSlides(): Promise<SliderSlide[]> {
  // TODO: return apiGet<SliderSlide[]>("/header-slider", { revalidate: 600, tags: ["slider"] });
  return scrapedSlider.map((s, i) => ({
    src: s.src,
    alt: s.alt ?? `Krishna Public School — Campus Image ${i + 1}`,
  }));
}
