import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
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
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <AdmissionForm />
      </section>
    </>
  );
}
