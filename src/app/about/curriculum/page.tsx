import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
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
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={page.body} />
      </section>
    </>
  );
}
