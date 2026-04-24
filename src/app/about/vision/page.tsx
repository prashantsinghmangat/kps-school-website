import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Eye } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { CmsPageView } from "@/components/common/cms-page-view";
import { getCmsPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Vision & Aims",
  description:
    "The vision of Krishna Public School, Meerut — developing the total personality of the child as a future citizen rooted in moral and ethical values.",
  alternates: { canonical: "/about/vision" },
};

export default async function VisionPage() {
  const page = await getCmsPage("vision");
  if (!page) notFound();
  return (
    <>
      <PageHero
        eyebrow="About"
        title={page.title}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/about/vision", label: page.title },
        ]}
      />
      <CmsPageView
        title={page.title}
        body={page.body}
        icon={Eye}
        kicker="The student we hope to send forward"
        siblings={[
          { href: "/about/mission", label: "Our Mission" },
          { href: "/about/motto", label: "School Motto" },
          { href: "/about/curriculum", label: "Curriculum" },
        ]}
      />
    </>
  );
}
