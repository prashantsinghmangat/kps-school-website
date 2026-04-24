import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
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
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={page.body} />
      </section>
    </>
  );
}
