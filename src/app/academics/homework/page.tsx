import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getHomeworkClasses } from "@/lib/api";

export const metadata: Metadata = {
  title: "Homework & Study Material",
  description:
    "Downloadable homework and study material for every class at Krishna Public School — Nursery through Class XII.",
  alternates: { canonical: "/academics/homework" },
};

export default async function HomeworkIndexPage() {
  const allClasses = await getHomeworkClasses();

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Homework & Study Material"
        description="Choose a class to view available homework and study material."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/academics", label: "Academics" },
          { href: "/academics/homework", label: "Homework" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allClasses.map((c) => (
            <Link
              key={c.slug}
              href={`/academics/homework/${c.slug}`}
              className="flex items-center justify-between rounded-lg border border-[--color-border] bg-white p-4 hover:border-[--color-primary] hover:bg-[--color-muted]"
            >
              <span className="font-medium">{c.name}</span>
              <span className="text-xs text-[--color-muted-foreground]">
                {c.items.length} item{c.items.length === 1 ? "" : "s"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
