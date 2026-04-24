import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Users, FileCheck, Wallet, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { Reveal } from "@/components/common/reveal";
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

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold md:text-3xl">
            Admission process
          </h2>
          <p className="text-sm text-[--color-muted-foreground]">
            Six steps from first enquiry to enrolment.
          </p>
        </div>

        {/* Horizontal stepper on xl; responsive grid below. The gradient line
            connects the circles only when items are on one row. */}
        <div className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[7%] right-[7%] top-7 hidden h-0.5 bg-gradient-to-r from-transparent via-[--color-primary]/35 to-transparent xl:block"
          />
          <ol className="grid gap-8 md:grid-cols-3 xl:grid-cols-6">
            {ad.process.map((step, i) => (
              <Reveal key={step.step} as="li" delay={i * 70} className="group relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[--color-primary] text-lg font-bold text-[--color-primary-foreground] shadow-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                  {step.step}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[--color-muted-foreground]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 md:grid-cols-2 md:px-6 md:pb-16">
        <DetailCard title="Age eligibility" icon={Users}>
          <dl className="divide-y divide-[--color-border]">
            {ad.ageEligibility.map((e) => (
              <div key={e.grade} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="font-semibold text-[--color-neutral-dark]">{e.grade}</dt>
                <dd className="text-right text-sm text-[--color-muted-foreground]">
                  {e.minimumAge}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 border-t border-dashed border-[--color-border] pt-3 text-xs italic text-[--color-muted-foreground]">
            Age cutoffs shown are as per CBSE norms. Please confirm current-year
            criteria with the school office.
          </p>
        </DetailCard>

        <DetailCard title="Important dates" icon={CalendarDays}>
          <dl className="space-y-3">
            {ad.importantDates.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between gap-4 rounded-lg bg-[--color-surface-cool] px-4 py-2.5 text-sm"
              >
                <dt className="font-medium text-[--color-neutral-dark]">{d.label}</dt>
                <dd
                  className={`font-semibold ${
                    d.value.startsWith("TBD")
                      ? "text-[--color-muted-foreground]"
                      : "text-[--color-primary]"
                  }`}
                >
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </DetailCard>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <DetailCard title="Documents required" icon={FileCheck}>
          <ul className="grid gap-3 text-sm md:grid-cols-2">
            {ad.documentsRequired.map((d) => (
              <li
                key={d}
                className="flex items-start gap-2.5 rounded-lg border border-[--color-border] bg-[--color-surface-cool]/60 p-3"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 flex-none text-[--color-primary]"
                />
                <span className="text-[--color-neutral-dark]">{d}</span>
              </li>
            ))}
          </ul>
        </DetailCard>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="relative overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[--color-primary] via-[--color-secondary] to-[--color-highlight]"
          />
          <div className="bg-gradient-to-br from-[--color-surface-cool] via-white to-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-[--color-primary] to-[--color-secondary] text-white shadow-sm">
                <Wallet size={22} />
              </span>
              <div className="flex-1">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[--color-neutral-dark] md:text-2xl">
                  Fee structure
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[--color-foreground]">
                  {ad.feeStructureNote}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center gap-1.5 rounded-md bg-[--color-primary] px-5 py-2.5 text-sm font-semibold text-[--color-primary-foreground] shadow-sm transition hover:brightness-110 hover:shadow-md"
              >
                Apply online
              </Link>
              <Link
                href="/downloads"
                className="rounded-md border border-[--color-border] bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-[--color-primary]/40 hover:bg-[--color-muted]"
              >
                Prospectus &amp; forms
              </Link>
              <Link
                href="/pay-fees"
                className="rounded-md border border-[--color-border] bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-[--color-primary]/40 hover:bg-[--color-muted]"
              >
                Pay fees online
              </Link>
              <Link
                href="/enquiry"
                className="rounded-md border border-[--color-border] bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-[--color-primary]/40 hover:bg-[--color-muted]"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[--color-primary] via-[--color-secondary] to-[--color-highlight]"
      />
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[--color-primary] to-[--color-secondary] text-white shadow-sm">
            <Icon size={20} />
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-neutral-dark] md:text-xl">
            {title}
          </h2>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
