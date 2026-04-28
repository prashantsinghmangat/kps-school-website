import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AdmissionsCta() {
  return (
    <section className="brand-gradient-band relative overflow-hidden text-white">
      {/* Radial gold highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[120%] w-[60%] -translate-y-1/2 rounded-full bg-[--color-highlight]/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[--color-accent] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[--color-accent-foreground]">
              ★ Admissions Open · 2026–27
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
              className="inline-flex items-center gap-1.5 rounded-md bg-[--color-highlight] px-5 py-3 text-sm font-bold text-[--color-highlight-foreground] shadow-lg transition hover:brightness-105 hover:shadow-xl"
            >
              Admissions details <ArrowRight size={16} />
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-md border border-white/60 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Send an enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
