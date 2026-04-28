import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { getAdmissions } from "@/lib/api";

export const metadata: Metadata = {
  title: "Admission Process",
  description:
    "The step-by-step admission process at Krishna Public School, Meerut — from enquiry through fee payment and enrolment.",
  alternates: { canonical: "/admissions/process" },
};

export default async function AdmissionProcessPage() {
  const ad = await getAdmissions();

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Admission Process"
        description="Six steps from first enquiry to confirmed enrolment."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/admissions", label: "Admissions" },
          { href: "/admissions/process", label: "Process" },
        ]}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <ol className="space-y-4">
          {ad.process.map((step) => (
            <li
              key={step.step}
              className="flex gap-5 rounded-lg border border-[--color-border] bg-white p-5"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[--color-primary] text-sm font-bold text-[--color-primary-foreground]">
                {step.step}
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-[--color-muted-foreground]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
