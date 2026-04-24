import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { CmsPageView } from "@/components/common/cms-page-view";
import { getCmsPage } from "@/lib/api";

export const metadata: Metadata = {
  title: "School Motto",
  description:
    "Labor Omnia Vincit — the motto of Krishna Public School, Meerut, and the story behind our open-book-and-rising-sun logo.",
  alternates: { canonical: "/about/motto" },
};

export default async function MottoPage() {
  const page = await getCmsPage("motto");
  if (!page) notFound();
  return (
    <>
      <PageHero
        eyebrow="About"
        title={page.title}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/about/motto", label: page.title },
        ]}
      />
      <CmsPageView
        title={page.title}
        body={page.body}
        icon={Award}
        kicker="Labor Omnia Vincit — Hard work conquers all"
        siblings={[
          { href: "/about/mission", label: "Our Mission" },
          { href: "/about/vision", label: "Our Vision" },
          { href: "/about/curriculum", label: "Curriculum" },
        ]}
      />
    </>
  );
}
