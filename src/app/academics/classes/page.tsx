import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { getAcademics } from "@/lib/api";
import { classes } from "@/lib/constants/classes";

export const metadata: Metadata = {
  title: "Classes Offered",
  description:
    "Krishna Public School offers classes from Nursery through Class XII, with Science and Commerce streams at senior secondary.",
  alternates: { canonical: "/academics/classes" },
};

export default async function ClassesOfferedPage() {
  const ac = await getAcademics();

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Classes offered"
        description="Nursery through Class XII, grouped by learning stage."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/academics", label: "Academics" },
          { href: "/academics/classes", label: "Classes" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="space-y-6">
          {ac.stages.map((s) => (
            <article
              key={s.slug}
              className="rounded-lg border border-[--color-border] bg-white p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {s.name}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-[--color-primary]">
                  {s.grades}
                </p>
              </div>
              <p className="mt-3 text-sm text-[--color-muted-foreground]">{s.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-[--color-border] bg-white p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
            Full class list
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
            {classes.map((c) => (
              <li
                key={c.slug}
                className="rounded-md bg-[--color-muted] px-3 py-2 text-[--color-foreground]"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
