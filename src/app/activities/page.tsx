import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { getCoCurricular } from "@/lib/api";

export const metadata: Metadata = {
  title: "Co-curricular Activities",
  description:
    "Sports, performing arts, visual arts, clubs and annual events at Krishna Public School, Meerut — a full life beyond the classroom.",
  alternates: { canonical: "/activities" },
};

export default async function ActivitiesPage() {
  const categories = await getCoCurricular();

  return (
    <>
      <PageHero
        eyebrow="School Life"
        title="Co-curricular Activities"
        description="Sports, performing arts, visual arts, clubs and events that make the school year complete."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/activities", label: "Activities" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-10">
          {categories.map((c) => (
            <article
              key={c.slug}
              id={c.slug}
              className="rounded-lg border border-[--color-border] bg-white p-6 md:p-8"
            >
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold">
                {c.name}
              </h2>
              <p className="mt-3 text-[--color-foreground] leading-relaxed">{c.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.activities.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-[--color-muted] px-3 py-1 text-sm text-[--color-foreground]"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
