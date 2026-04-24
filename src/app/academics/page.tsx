import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { getAcademics } from "@/lib/api";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academics at Krishna Public School — the CBSE curriculum from Nursery to Class XII, organised into Pre-Primary, Primary, Middle, Secondary and Senior Secondary stages.",
  alternates: { canonical: "/academics" },
};

export default async function AcademicsPage() {
  const ac = await getAcademics();

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Academics"
        description="The CBSE journey at KPS, from Nursery through Class XII."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/academics", label: "Academics" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={ac.overview} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold">
          Stages of learning
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ac.stages.map((s) => (
            <article
              key={s.slug}
              className="rounded-lg border border-[--color-border] bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[--color-primary]">
                {s.grades}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
                {s.name}
              </h3>
              <p className="mt-3 text-sm text-[--color-muted-foreground]">{s.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 md:px-6 md:pb-16">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold">
          Subjects at each stage
        </h2>
        <div className="mt-6 space-y-6">
          {ac.subjects.map((s) => (
            <article
              key={s.stage}
              className="rounded-lg border border-[--color-border] bg-white p-5"
            >
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                {s.stage}
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <SubjectRow label="Core" items={s.core} />
                {s.additional ? <SubjectRow label="Additional" items={s.additional} /> : null}
                {s.electives ? <SubjectRow label="Electives" items={s.electives} /> : null}
              </div>
              {s.note ? (
                <p className="mt-3 text-xs italic text-[--color-muted-foreground]">{s.note}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-12 md:grid-cols-2 md:px-6 md:pb-16">
        <div className="rounded-lg border border-[--color-border] bg-white p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Assessment
          </h2>
          <p className="mt-3 text-sm leading-relaxed">{ac.assessment}</p>
        </div>
        <div className="rounded-lg border border-[--color-border] bg-white p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Pedagogy
          </h2>
          <div className="mt-3 text-sm leading-relaxed">
            <Prose text={ac.pedagogy} className="max-w-none" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/academics/classes"
            className="rounded-md bg-[--color-primary] px-4 py-2 text-sm font-semibold text-[--color-primary-foreground] hover:opacity-90"
          >
            Classes offered
          </Link>
          <Link
            href="/academics/homework"
            className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
          >
            Homework / Study Material
          </Link>
          <Link
            href="/admissions"
            className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
          >
            Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

function SubjectRow({ label, items }: { label: string; items: string[] }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-[--color-muted-foreground]">{items.join(" · ")}</span>
    </p>
  );
}
