import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getNewsEvents } from "@/lib/api";
import { formatDate } from "@/lib/utils/format-date";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Recent events, achievements and announcements from Krishna Public School, Meerut.",
  alternates: { canonical: "/news" },
};

const CATEGORY_STYLES: Record<string, string> = {
  event: "bg-[--color-primary] text-white",
  announcement: "bg-[--color-highlight] text-[--color-highlight-foreground]",
  achievement: "bg-[--color-accent] text-[--color-accent-foreground]",
  activity: "bg-[--color-secondary] text-white",
};

export default async function NewsPage() {
  const items = await getNewsEvents();
  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        eyebrow="School Life"
        title="News & Events"
        description="Annual Day, Sports Day, Science Exhibition, achievements and more."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/news", label: "News & Events" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <ul className="space-y-5">
          {sorted.map((n) => (
            <li
              key={n.slug}
              className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[--color-primary] via-[--color-secondary] to-[--color-highlight] opacity-80"
              />
              <div className="p-6 pl-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      CATEGORY_STYLES[n.category] ?? "bg-[--color-muted] text-[--color-foreground]",
                    )}
                  >
                    {n.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[--color-muted-foreground]">
                    <Calendar size={12} />
                    {formatDate(n.date)}
                  </span>
                </div>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold text-[--color-neutral-dark]">
                  <Link
                    href={`/news/${n.slug}`}
                    className="transition-colors group-hover:text-[--color-primary]"
                  >
                    {n.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[--color-muted-foreground]">
                  {n.excerpt}
                </p>
                <Link
                  href={`/news/${n.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[--color-primary] transition group-hover:gap-2 hover:text-[--color-accent]"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
