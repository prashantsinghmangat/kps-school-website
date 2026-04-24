import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getAdmissions, getDownloads } from "@/lib/api";

export const metadata: Metadata = {
  title: "Fee Structure",
  description:
    "The fee structure for Krishna Public School, Meerut is detailed in the school prospectus and shared with parents at the time of admission confirmation.",
  alternates: { canonical: "/admissions/fee-structure" },
};

export default async function FeeStructurePage() {
  const [ad, downloads] = await Promise.all([getAdmissions(), getDownloads()]);
  const prospectus = downloads.find((d) => d.title.toLowerCase().includes("prospectus"));

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Fee Structure"
        description="Term-wise fees for the current academic session."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/admissions", label: "Admissions" },
          { href: "/admissions/fee-structure", label: "Fee Structure" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-lg border border-[--color-border] bg-white p-6 md:p-8">
          <p className="text-[--color-foreground] leading-relaxed">{ad.feeStructureNote}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {prospectus ? (
              <a
                href={prospectus.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[--color-primary] px-4 py-2 text-sm font-semibold text-[--color-primary-foreground] hover:opacity-90"
              >
                Download prospectus (PDF)
              </a>
            ) : null}
            <Link
              href="/enquiry"
              className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
            >
              Request fee details
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
            >
              Contact school office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
