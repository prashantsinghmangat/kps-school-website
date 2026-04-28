import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Music,
  Palette,
  Users,
  CalendarDays,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getCoCurricular } from "@/lib/api";

export const metadata: Metadata = {
  title: "Co-curricular Activities",
  description:
    "Sports, performing arts, visual arts, clubs and annual events at Krishna Public School, Meerut — a full life beyond the classroom.",
  alternates: { canonical: "/activities" },
};

/**
 * Per-category visual treatment — icon + a coloured gradient header. The
 * `bg` strings are Tailwind utility chains so we can theme each card with
 * a distinct mood while staying in the brand palette.
 */
const CATEGORY_VIS: Record<string, { icon: LucideIcon; gradient: string; accent: string }> = {
  sports: {
    icon: Trophy,
    gradient: "from-[--color-primary] to-[--color-secondary]",
    accent: "bg-[--color-highlight] text-[--color-highlight-foreground]",
  },
  "performing-arts": {
    icon: Music,
    gradient: "from-[--color-accent] to-[--color-primary]",
    accent: "bg-[--color-primary] text-[--color-primary-foreground]",
  },
  "visual-arts": {
    icon: Palette,
    gradient: "from-[--color-highlight] to-[--color-accent]",
    accent: "bg-[--color-accent] text-[--color-accent-foreground]",
  },
  clubs: {
    icon: Users,
    gradient: "from-[--color-secondary] to-[--color-primary-deep]",
    accent: "bg-[--color-secondary] text-[--color-secondary-foreground]",
  },
  events: {
    icon: CalendarDays,
    gradient: "from-[--color-primary-deep] to-[--color-secondary]",
    accent: "bg-[--color-primary] text-[--color-primary-foreground]",
  },
};

const FALLBACK_VIS = {
  icon: Trophy,
  gradient: "from-[--color-primary] to-[--color-secondary]",
  accent: "bg-[--color-primary] text-[--color-primary-foreground]",
};

export default async function ActivitiesPage() {
  const categories = await getCoCurricular();

  return (
    <>
      <PageHero
        eyebrow="School Life"
        title="Co-curricular Activities"
        description="Sports, performing arts, visual arts, clubs and events that make the school year complete."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/activities", label: "Activities" },
        ]}
      />

      {/* Quick category nav */}
      <section className="border-b border-[--color-border] bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2">
            {categories.map((c) => {
              const vis = CATEGORY_VIS[c.slug] ?? FALLBACK_VIS;
              const Icon = vis.icon;
              return (
                <li key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    className="inline-flex flex-none items-center gap-2 rounded-full border border-[--color-border] bg-white px-3 py-1.5 text-xs font-semibold text-[--color-neutral-dark] shadow-sm transition hover:border-[--color-primary]/40 hover:text-[--color-primary]"
                  >
                    <Icon size={14} className="text-[--color-primary]" />
                    {c.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="space-y-8 sm:space-y-10">
          {categories.map((c) => {
            const vis = CATEGORY_VIS[c.slug] ?? FALLBACK_VIS;
            const Icon = vis.icon;
            return (
              <article
                key={c.slug}
                id={c.slug}
                className="group relative overflow-hidden rounded-2xl border border-[--color-border] bg-white shadow-sm scroll-mt-32"
              >
                {/* Coloured header band */}
                <div
                  className={`relative bg-gradient-to-r ${vis.gradient} text-white`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(255,255,255,0.15),transparent_60%)]"
                  />
                  <div className="relative flex items-center gap-4 px-5 py-5 sm:gap-5 sm:px-7 sm:py-6">
                    <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur sm:h-14 sm:w-14">
                      <Icon size={24} className="text-white sm:hidden" />
                      <Icon size={28} className="hidden text-white sm:block" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-80">
                        {c.activities.length} activities
                      </p>
                      <h2 className="mt-0.5 font-[family-name:var(--font-heading)] text-xl font-bold sm:text-2xl">
                        {c.name}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-7">
                  <p className="text-[--color-foreground] leading-relaxed">{c.description}</p>

                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[--color-muted-foreground]">
                    What&apos;s on offer
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.activities.map((a) => (
                      <li
                        key={a}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${vis.accent}`}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA at the bottom */}
        <div className="mt-12 rounded-2xl border border-[--color-border] bg-gradient-to-br from-[--color-surface-cool] via-white to-[--color-surface-warm] p-6 text-center shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[--color-primary]">
            Beyond the classroom
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-[--color-neutral-dark] sm:text-2xl">
            Want to know more about KPS school life?
          </h3>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 rounded-md bg-[--color-primary] px-5 py-2.5 text-sm font-semibold text-[--color-primary-foreground] shadow-sm transition hover:brightness-110 hover:shadow-md"
            >
              See the photo gallery <ArrowRight size={14} />
            </Link>
            <Link
              href="/admissions"
              className="rounded-md border border-[--color-border] bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-[--color-primary]/40 hover:bg-[--color-muted]"
            >
              Admissions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
