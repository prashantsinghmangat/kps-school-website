import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Target } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { CmsPageView } from "@/components/common/cms-page-view";
import { getCmsPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "The mission of Krishna Public School, Meerut — our commitment to communication, learning resources, community engagement and environmental awareness.",
  alternates: { canonical: "/about/mission" },
};

export default async function MissionPage() {
  const page = await getCmsPage("mission");
  if (!page) notFound();
  return (
    <>
      <PageHero
        eyebrow="About"
        title={page.title}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/about/mission", label: page.title },
        ]}
      />
      <CmsPageView
        title={page.title}
        body={page.body}
        icon={Target}
        kicker="What we set out to do every day"
        siblings={[
          { href: "/about/vision", label: "Our Vision" },
          { href: "/about/motto", label: "School Motto" },
          { href: "/about/curriculum", label: "Curriculum" },
        ]}
      />
    </>
  );
}
