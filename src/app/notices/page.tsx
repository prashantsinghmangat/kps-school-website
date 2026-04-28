import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getNotices } from "@/lib/api";
import { formatDate } from "@/lib/utils/format-date";

export const metadata: Metadata = {
  title: "Notices",
  description: "Latest notices and announcements from Krishna Public School, Meerut.",
  alternates: { canonical: "/notices" },
};

export default async function NoticesPage() {
  const { data: notices } = await getNotices({ limit: 100 });

  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="Notices"
        description="Official announcements from the school office."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/notices", label: "Notices" },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {notices.length === 0 ? (
          <div className="rounded-lg border border-[--color-border] bg-white p-6 text-sm text-[--color-muted-foreground]">
            There are no notices posted at the moment. Please check back later — or visit
            our{" "}
            <Link href="/news" className="text-[--color-primary] hover:underline">
              News & Events
            </Link>{" "}
            page for recent school updates.
          </div>
        ) : (
          <ul className="space-y-3">
            {notices.map((n) => (
              <li
                key={n.id}
                className="rounded-lg border border-[--color-border] bg-white p-4"
              >
                <p className="text-xs text-[--color-muted-foreground]">{formatDate(n.date)}</p>
                <h2 className="mt-1 font-[family-name:var(--font-heading)] text-base font-semibold">
                  {n.title}
                </h2>
                {n.body ? (
                  <p className="mt-2 text-sm text-[--color-muted-foreground]">{n.body}</p>
                ) : null}
                {n.url ? (
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-[--color-primary] hover:underline"
                  >
                    View notice
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
