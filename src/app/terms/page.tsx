import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { SITE_NAME } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The terms on which this website is provided."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/terms", label: "Terms of Use" },
        ]}
      />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-sm leading-relaxed md:px-6 md:py-16">
        <p>
          This website is operated by {SITE_NAME}. Your use of this website is
          governed by these terms of use. By accessing the website you agree to these
          terms; if you do not agree, please discontinue use.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Content on this site
        </h2>
        <p>
          Content on this website — including text, images, logos and downloadable
          documents — is the property of {SITE_NAME} or used with permission, and is
          provided for information purposes only. You may not reproduce, republish or
          distribute content from this website without the school&apos;s prior
          written consent.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Accuracy of information
        </h2>
        <p>
          The school makes every effort to keep information on this website current
          and accurate, including admissions details, fee structure and academic
          calendar. However, details may change from time to time — please confirm
          critical information (fees, dates, eligibility) with the school office
          before acting on it.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          External links
        </h2>
        <p>
          This website may link to third-party websites (for example, payment
          gateways, social media, CBSE). We are not responsible for the content,
          privacy practices or availability of third-party websites.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Changes
        </h2>
        <p>
          The school reserves the right to update these terms at any time. The most
          current version posted on this page applies to your use of the website.
        </p>

        <p className="pt-4 text-xs text-[--color-muted-foreground]">
          These terms will be formally reviewed by the school management before the
          website goes live.
        </p>
      </section>
    </>
  );
}
