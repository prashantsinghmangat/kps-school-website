import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { FormShell } from "@/components/common/form-shell";
import { TcVerifyForm } from "@/components/forms/tc-verify-form";

export const metadata: Metadata = {
  title: "Verify Transfer Certificate",
  description:
    "Verify a Transfer Certificate (TC) issued by Krishna Public School, Meerut.",
  alternates: { canonical: "/verify-tc" },
};

export default function VerifyTcPage() {
  return (
    <>
      <PageHero
        eyebrow="Records"
        title="Verify Transfer Certificate"
        description="Enter the TC details below. We will match them against the school's records and respond by email."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/verify-tc", label: "Verify TC" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <FormShell
          asideTitle="How TC verification works"
          asideTagline="Until automatic verification is connected, the school office handles each request manually."
          steps={[
            {
              label: "Submit the TC details",
              description:
                "Provide the TC number, student's full name (as printed) and date of birth.",
            },
            {
              label: "School records check",
              description:
                "The administrative office verifies the details against issued TCs.",
            },
            {
              label: "We respond by email",
              description:
                "Verification result and any supporting note arrive within two working days.",
            },
          ]}
        >
          <TcVerifyForm />
        </FormShell>
      </section>
    </>
  );
}
