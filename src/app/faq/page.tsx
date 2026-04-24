import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getFaq } from "@/lib/api";
import { SITE_URL } from "@/lib/constants/seo";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions from parents about admissions, fees, transport, timings, curriculum and school life at Krishna Public School, Meerut.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faq = await getFaq();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
    url: `${SITE_URL}/faq`,
  };

  return (
    <>
      <PageHero
        eyebrow="Help"
        title="Frequently Asked Questions"
        description="Common questions we hear from parents."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/faq", label: "FAQ" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <dl className="space-y-4">
          {faq.map((q, i) => (
            <details
              key={i}
              className="group rounded-lg border border-[--color-border] bg-white p-5 transition-shadow open:shadow-md"
            >
              <summary className="cursor-pointer list-none">
                <dt className="flex items-baseline justify-between gap-4 font-[family-name:var(--font-heading)] text-base font-semibold">
                  <span>{q.question}</span>
                  <span className="select-none text-[--color-primary] transition-transform group-open:rotate-45">
                    +
                  </span>
                </dt>
              </summary>
              <dd className="mt-3 text-sm leading-relaxed text-[--color-muted-foreground]">
                {q.answer}
              </dd>
            </details>
          ))}
        </dl>

        <div className="mt-10 rounded-lg border border-[--color-border] bg-[--color-muted] p-6 text-sm">
          <p className="font-medium">Didn&apos;t find what you were looking for?</p>
          <p className="mt-1 text-[--color-muted-foreground]">
            Please{" "}
            <Link href="/contact" className="text-[--color-primary] hover:underline">
              contact the school office
            </Link>{" "}
            or{" "}
            <Link href="/enquiry" className="text-[--color-primary] hover:underline">
              send an enquiry
            </Link>
            .
          </p>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
