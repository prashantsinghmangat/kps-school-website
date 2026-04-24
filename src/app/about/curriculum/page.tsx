import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { CmsPageView } from "@/components/common/cms-page-view";
import { getCmsPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "Krishna Public School follows the CBSE curriculum from Class I to XII, with English medium, structured subjects and Science/Commerce streams at senior secondary.",
  alternates: { canonical: "/about/curriculum" },
};

export default async function CurriculumPage() {
  const page = await getCmsPage("curriculum");
  if (!page) notFound();
  return (
    <>
      <PageHero
        eyebrow="About"
        title={page.title}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/about/curriculum", label: page.title },
        ]}
      />
      <CmsPageView
        title={page.title}
        body={page.body}
        icon={BookOpen}
        kicker="CBSE framework from Nursery to Class XII"
        siblings={[
          { href: "/academics", label: "Academics overview" },
          { href: "/academics/classes", label: "Classes offered" },
          { href: "/about/mission", label: "Our Mission" },
        ]}
      />
    </>
  );
}
