import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { Prose } from "@/components/common/prose";

type IconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

interface CmsPageViewProps {
  title: string;
  body: string;
  /** Optional large icon shown next to the heading inside the article card. */
  icon?: IconComponent;
  /** Optional tagline rendered under the heading. */
  kicker?: string;
  /** Optional siblings shown at the bottom ("Also read: X · Y · Z"). */
  siblings?: { href: string; label: string }[];
}

/**
 * Consistent, visually present template for static CMS-style pages
 * (mission / vision / motto / curriculum). Gives each page a framed article
 * card with a gradient top bar, icon chip, and optional siblings row.
 *
 * Long-form prose is rendered via the existing `Prose` helper so paragraph
 * breaks stay consistent.
 */
export function CmsPageView({ title, body, icon: Icon, kicker, siblings }: CmsPageViewProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <article className="relative overflow-hidden rounded-2xl border border-[--color-border] bg-white shadow-sm">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[--color-primary] via-[--color-secondary] to-[--color-highlight]"
        />
        <div className="p-6 pt-8 md:p-10 md:pt-12">
          <div className="flex items-start gap-4">
            {Icon ? (
              <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-[--color-primary] to-[--color-secondary] text-white shadow-sm">
                <Icon size={22} />
              </span>
            ) : null}
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[--color-neutral-dark] md:text-3xl">
                {title}
              </h2>
              {kicker ? (
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[--color-muted-foreground]">
                  {kicker}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-6">
            <Prose text={body} className="max-w-none" />
          </div>
        </div>
      </article>

      {siblings && siblings.length > 0 ? (
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[--color-muted-foreground]">
            Also read
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 rounded-full border border-[--color-border] bg-white px-4 py-2 text-sm font-medium text-[--color-primary] shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
                >
                  {s.label} <ArrowRight size={12} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
