import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { JsonLdEducationalProgram } from "@/components/seo/json-ld";
import { getAdmissions } from "@/lib/api";

export const metadata: Metadata = {
  title: "Admissions 2026–27",
  description:
    "Admissions are open at Krishna Public School, Meerut for the 2026–27 academic year. Learn about the process, eligibility, documents required and important dates.",
  alternates: { canonical: "/admissions" },
};

export default async function AdmissionsPage() {
  const ad = await getAdmissions();

  return (
    <>
      <JsonLdEducationalProgram />
      <PageHero
        eyebrow="Join KPS"
        title="Admissions 2026–27"
        description="Open for Nursery through Class IX and Class XI. Limited seats in other classes."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/admissions", label: "Admissions" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={ad.overview} />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 md:px-6 md:pb-16">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold">
          Admission process
        </h2>
        <ol className="mt-6 space-y-4">
          {ad.process.map((step) => (
            <li
              key={step.step}
              className="flex gap-5 rounded-lg border border-[--color-border] bg-white p-5"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[--color-primary] text-sm font-bold text-[--color-primary-foreground]">
                {step.step}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[--color-muted-foreground]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-12 md:grid-cols-2 md:px-6 md:pb-16">
        <div className="rounded-lg border border-[--color-border] bg-white p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Age eligibility
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {ad.ageEligibility.map((e) => (
              <div key={e.grade}>
                <dt className="font-semibold">{e.grade}</dt>
                <dd className="text-[--color-muted-foreground]">{e.minimumAge}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs italic text-[--color-muted-foreground]">
            Age cutoffs shown are as per CBSE norms. Please confirm current-year criteria
            with the school office.
          </p>
        </div>

        <div className="rounded-lg border border-[--color-border] bg-white p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Important dates
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {ad.importantDates.map((d) => (
              <div key={d.label}>
                <dt className="font-semibold">{d.label}</dt>
                <dd className="text-[--color-muted-foreground]">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="rounded-lg border border-[--color-border] bg-white p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Documents required
          </h2>
          <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
            {ad.documentsRequired.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[--color-primary]" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
        <div className="rounded-lg border border-[--color-border] bg-white p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Fee structure
          </h2>
          <p className="mt-3 text-sm leading-relaxed">{ad.feeStructureNote}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admissions/apply"
              className="rounded-md bg-[--color-primary] px-4 py-2 text-sm font-semibold text-[--color-primary-foreground] hover:opacity-90"
            >
              Apply online
            </Link>
            <Link
              href="/downloads"
              className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
            >
              Prospectus & forms
            </Link>
            <Link
              href="/enquiry"
              className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
            >
              Enquire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
