import Link from "next/link";
import { PageHero } from "./page-hero";
import type { Crumb } from "@/components/layout/breadcrumbs";

interface PagePlaceholderProps {
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  eyebrow?: string;
}

/**
 * Placeholder page — used for every nav target we haven't built yet. Keeps
 * the navigation browsable and tells the user what they'll find when the
 * section is ready. Replace individual routes with real content as Phase 4
 * progresses.
 */
export function PagePlaceholder({
  title,
  description,
  breadcrumbs,
  eyebrow,
}: PagePlaceholderProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[--color-border] bg-white p-6 md:p-8">
          <p className="text-sm text-[--color-muted-foreground]">
            This section of the website is being prepared. The content will appear here
            shortly. In the meantime, please use the links below or{" "}
            <Link href="/contact" className="text-[--color-primary] underline-offset-4 hover:underline">
              contact the school office
            </Link>{" "}
            for immediate help.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm font-medium hover:bg-[--color-muted]"
            >
              Home
            </Link>
            <Link
              href="/admissions"
              className="rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm font-medium hover:bg-[--color-muted]"
            >
              Admissions
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm font-medium hover:bg-[--color-muted]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm font-medium hover:bg-[--color-muted]"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
