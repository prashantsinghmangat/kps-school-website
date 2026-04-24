import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants/seo";

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Scaffold Breadcrumbs. Renders the visible trail AND the BreadcrumbList
 * JSON-LD needed for search-engine rich snippets.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-3 md:px-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[--color-muted-foreground]">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight size={14} aria-hidden /> : null}
              {isLast ? (
                <span aria-current="page" className="font-medium text-[--color-foreground]">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-[--color-primary]">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
