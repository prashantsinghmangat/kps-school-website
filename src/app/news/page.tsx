import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getNewsEvents } from "@/lib/api";
import { formatDate } from "@/lib/utils/format-date";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Recent events, achievements and announcements from Krishna Public School, Meerut.",
  alternates: { canonical: "/news" },
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
        <ul className="space-y-6">
          {sorted.map((n) => (
            <li
              key={n.slug}
              className="rounded-lg border border-[--color-border] bg-white p-6"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-[--color-muted-foreground]">
                <span className="rounded-full bg-[--color-muted] px-2 py-0.5 uppercase tracking-wide">
                  {n.category}
                </span>
                <span>{formatDate(n.date)}</span>
              </div>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-semibold">
                <Link href={`/news/${n.slug}`} className="hover:text-[--color-primary]">
                  {n.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-[--color-muted-foreground]">{n.excerpt}</p>
              <Link
                href={`/news/${n.slug}`}
                className="mt-3 inline-block text-sm text-[--color-primary] hover:underline"
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
