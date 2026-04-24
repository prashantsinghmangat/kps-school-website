import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
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
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={page.body} />
      </section>
    </>
  );
}
