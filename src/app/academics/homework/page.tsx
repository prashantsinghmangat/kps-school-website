import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Baby, BookOpen, GraduationCap, School } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getHomeworkClasses } from "@/lib/api";
import type { HomeworkClassRecord } from "@/lib/api";

export const metadata: Metadata = {
  title: "Homework & Study Material",
  description:
    "Downloadable homework and study material for every class at Krishna Public School — Nursery through Class XII.",
  alternates: { canonical: "/academics/homework" },
};

interface StageGroup {
  key: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  classes: HomeworkClassRecord[];
}

function groupByStage(classes: HomeworkClassRecord[]): StageGroup[] {
  const findClass = (slug: string) => classes.find((c) => c.slug === slug);
  const between = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => findClass(`class-${start + i}`)).filter(
      (c): c is HomeworkClassRecord => Boolean(c),
    );
  return [
    {
      key: "pre-primary",
      label: "Pre-Primary",
      description: "Nursery, LKG, UKG",
      icon: Baby,
      classes: ["nursery", "lkg", "ukg"]
        .map((s) => findClass(s))
        .filter((c): c is HomeworkClassRecord => Boolean(c)),
    },
    {
      key: "primary",
      label: "Primary",
      description: "Class I to V",
      icon: BookOpen,
      classes: between(1, 5),
    },
    {
      key: "middle",
      label: "Middle",
      description: "Class VI to VIII",
      icon: School,
      classes: between(6, 8),
    },
    {
      key: "secondary",
      label: "Secondary & Senior",
      description: "Class IX to XII",
      icon: GraduationCap,
      classes: between(9, 12),
    },
  ];
}

export default async function HomeworkIndexPage() {
  const allClasses = await getHomeworkClasses();
  const groups = groupByStage(allClasses);
  const totalItems = allClasses.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Homework & Study Material"
        description="Pick your child's class to find homework, worksheets and study material the school has shared."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/academics", label: "Academics" },
          { href: "/academics/homework", label: "Homework" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[--color-muted-foreground] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[--color-primary]" />
          {totalItems} downloadable {totalItems === 1 ? "item" : "items"} across {allClasses.length} classes
        </div>

        <div className="space-y-10">
          {groups.map((g) => {
            const Icon = g.icon;
            const groupItems = g.classes.reduce((a, c) => a + c.items.length, 0);
            return (
              <article key={g.key}>
                <header className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-sm"
                    style={{ background: "linear-gradient(135deg, #0a3d62, #174873)" }}
                  >
                    <Icon size={20} />
                  </span>
                  <div>
                    <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-neutral-dark] md:text-xl">
                      {g.label}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.18em] text-[--color-muted-foreground]">
                      {g.description}
                      <span className="mx-1.5">·</span>
                      <span className="text-[--color-primary]">
                        {groupItems} {groupItems === 1 ? "item" : "items"}
                      </span>
                    </p>
                  </div>
                </header>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.classes.map((c) => {
                    const empty = c.items.length === 0;
                    return (
                      <Link
                        key={c.slug}
                        href={`/academics/homework/${c.slug}`}
                        className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[--color-primary] to-[--color-secondary] opacity-80"
                        />
                        <div className="flex items-start justify-between gap-3 pl-2">
                          <div>
                            <p className="font-[family-name:var(--font-heading)] text-base font-bold text-[--color-neutral-dark] group-hover:text-[--color-primary]">
                              {c.name}
                            </p>
                            <p className="mt-1 text-xs text-[--color-muted-foreground]">
                              {empty
                                ? "No items posted yet"
                                : `${c.items.length} ${c.items.length === 1 ? "file" : "files"} available`}
                            </p>
                          </div>
                          <span
                            className={`inline-flex h-7 min-w-[2.25rem] items-center justify-center rounded-full px-2 text-xs font-bold ${
                              empty
                                ? "bg-[--color-muted] text-[--color-muted-foreground]"
                                : "bg-[--color-primary] text-[--color-primary-foreground]"
                            }`}
                          >
                            {c.items.length}
                          </span>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[--color-primary] transition-all group-hover:gap-2">
                          Open <ArrowRight size={12} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
