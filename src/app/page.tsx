import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/hero-slider";
import { NoticeBoard } from "@/components/home/notice-board";
import { WelcomeSnippet } from "@/components/home/welcome-snippet";
import { MessagesRow } from "@/components/home/messages-row";
import { WhyChooseUsGrid } from "@/components/home/why-choose-us-grid";
import { FacilitiesPreview } from "@/components/home/facilities-preview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { AdmissionsCta } from "@/components/home/admissions-cta";
import { LocationStrip } from "@/components/home/location-strip";
import { getSliderSlides } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — CBSE Senior Secondary School, Meerut`,
  description:
    "Krishna Public School is a CBSE co-educational senior secondary school on NH-58 in Shradha Puri, Meerut. Admissions open for Nursery to Class XII.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — CBSE Senior Secondary School, Meerut`,
    description:
      "A CBSE co-educational senior secondary school on NH-58 in Meerut. Admissions open for Nursery through Class XII.",
    url: SITE_URL,
    type: "website",
  },
};

export default async function HomePage() {
  const slides = await getSliderSlides();

  return (
    <>
      <HeroSlider slides={slides.slice(0, 8)} />
      <NoticeBoard />
      <WelcomeSnippet />
      <WhyChooseUsGrid />
      <MessagesRow />
      <FacilitiesPreview />
      <GalleryPreview />
      <AdmissionsCta />
      <LocationStrip />
    </>
  );
}
