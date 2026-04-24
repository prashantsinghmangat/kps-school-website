import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AdmissionsCta() {
  return (
    <section className="bg-[--color-primary] text-[--color-primary-foreground]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
              Admissions Open
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold md:text-3xl">
              Join the KPS family for 2026–27
            </h2>
            <p className="mt-3 max-w-2xl text-sm opacity-90 md:text-base">
              Open for Nursery through Class IX and Class XI. Limited seats may be
              available in other classes. Visit the campus, meet the team, and decide
              with confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[--color-primary] hover:bg-white/90"
            >
              Admissions details <ArrowRight size={16} />
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-md border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Send an enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
