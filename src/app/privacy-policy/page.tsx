import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { SITE_NAME } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect information submitted through this website."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/privacy-policy", label: "Privacy Policy" },
        ]}
      />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-sm leading-relaxed md:px-6 md:py-16">
        <p>
          This privacy policy explains how {SITE_NAME} (&ldquo;the school&rdquo;,
          &ldquo;we&rdquo;) collects and uses information submitted through this
          website. By using this site you agree to the practices described below.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Information we collect
        </h2>
        <p>
          We collect information you provide voluntarily when you submit an enquiry, a
          contact form, a TC verification request or an admission application. This
          typically includes your name, phone number, email address, residence address
          and any message you send us. We do not knowingly collect information from
          children without parental consent.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          How we use this information
        </h2>
        <p>
          Information submitted through forms is used solely to respond to your
          enquiry, process your admission application or verify a transfer certificate.
          We do not sell, rent or share your personal information with third parties
          for marketing purposes.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Cookies and analytics
        </h2>
        <p>
          This website may use basic cookies to support navigation and, where
          configured, anonymised analytics (such as Google Analytics) to understand
          usage patterns. You can disable cookies in your browser settings at any time.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Data retention
        </h2>
        <p>
          Form submissions are retained for as long as needed to respond to the
          enquiry and for the school&apos;s legitimate record-keeping. You may request
          deletion of your personal data by contacting the school office.
        </p>

        <h2 className="pt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
          Contact
        </h2>
        <p>
          For questions about this privacy policy, please write to the school office
          at krishna.pub.sch@gmail.com.
        </p>

        <p className="pt-4 text-xs text-[--color-muted-foreground]">
          This policy will be formally reviewed by the school management before the
          website goes live. The version you see now is a good-faith default and may
          be updated.
        </p>
      </section>
    </>
  );
}
