import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
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
      <section className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <TcVerifyForm />
      </section>
    </>
  );
}
