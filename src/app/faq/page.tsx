import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
        <ul className="space-y-3">
          {faq.map((q, i) => (
            <li key={i}>
              <details className="group overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm transition-shadow open:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-[family-name:var(--font-heading)] text-base font-semibold text-[--color-neutral-dark] transition-colors hover:bg-[--color-surface-cool]">
                  <span className="flex-1">{q.question}</span>
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[--color-surface-cool] text-[--color-primary] transition-transform duration-200 group-open:rotate-180 group-open:bg-[--color-primary] group-open:text-white">
                    <ChevronDown size={16} />
                  </span>
                </summary>
                <div className="border-t border-[--color-border] bg-[--color-surface-cool]/40 px-5 py-4 text-sm leading-relaxed text-[--color-muted-foreground]">
                  {q.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-xl border border-[--color-border] bg-gradient-to-br from-[--color-surface-cool] to-white p-6 text-sm">
          <p className="font-semibold">Didn&apos;t find what you were looking for?</p>
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
