import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
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
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={page.body} />
      </section>
    </>
  );
}
