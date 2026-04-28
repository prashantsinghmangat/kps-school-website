import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { FormShell } from "@/components/common/form-shell";
import { AdmissionForm } from "@/components/forms/admission-form";

export const metadata: Metadata = {
  title: "Apply Online",
  description:
    "Submit an online admission application to Krishna Public School, Meerut for academic session 2026–27.",
  alternates: { canonical: "/admissions/apply" },
};

export default function AdmissionsApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions 2026–27"
        title="Apply online for admission"
        description="Share your child's details below. The admissions office will follow up with next steps."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/admissions", label: "Admissions" },
          { href: "/admissions/apply", label: "Apply" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <FormShell
          asideTitle="Your admission journey"
          asideTagline="From application to enrolment, here's what to expect."
          steps={[
            {
              label: "Application received",
              description:
                "We confirm receipt by email and assign a reference for your record.",
            },
            {
              label: "Document & eligibility check",
              description:
                "The admissions office reviews ages, documents and seat availability.",
            },
            {
              label: "Parent–child interaction",
              description:
                "An informal meet at school for the family — usually 20 minutes.",
            },
            {
              label: "Offer & enrolment",
              description:
                "On admission, we share fee details, uniform info and start dates.",
            },
          ]}
          responseTime="within 2 working days"
        >
          <AdmissionForm />
        </FormShell>
      </section>
    </>
  );
}
