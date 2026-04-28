import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { FormShell } from "@/components/common/form-shell";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Enquiry",
  description:
    "Send an enquiry to Krishna Public School, Meerut. We respond to every enquiry within two working days.",
  alternates: { canonical: "/enquiry" },
};

export default function EnquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Send us an enquiry"
        description="Share your question with the school office. We respond within two working days."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/enquiry", label: "Enquiry" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <FormShell>
          <EnquiryForm />
        </FormShell>
      </section>
    </>
  );
}
