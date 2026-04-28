import Link from "next/link";
import { primaryNav, quickActions } from "@/lib/constants/nav";
import { SchoolLogo } from "@/components/common/school-logo";
import { getSiteSettings } from "@/lib/api";
import { MobileNav } from "./mobile-nav";
import { TopBar } from "./top-bar";

/**
 * Sticky header with TopBar above.
 *
 * IMPORTANT — opacity is intentional and aggressive:
 *   - Outer sticky wrapper: bg-white (so any pixel-level gap fills with white,
 *     never the page underneath)
 *   - TopBar: explicit hex on the outer wrapper (no CSS-var indirection so
 *     the color resolves before anything paints)
 *   - Header: solid bg-white + shadow for visual separation from the hero
 *
 * This deliberately fights any backdrop bleed from the hero slider's gradient
 * overlay scrolling beneath the sticky header.
 */
export async function Header() {
  const settings = await getSiteSettings();

  return (
    <div className="sticky top-0 z-50" style={{ backgroundColor: "#ffffff" }}>
      <TopBar settings={settings} />
      <header
        className="relative border-b border-[--color-border] shadow-md"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 md:py-4 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 flex-shrink items-center"
            aria-label="Krishna Public School home"
          >
            <span className="sm:hidden">
              <SchoolLogo variant="full" height={36} priority />
            </span>
            <span className="hidden sm:inline-flex">
              <SchoolLogo variant="full" height={48} priority />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-[--color-foreground] transition-colors hover:bg-[--color-muted] hover:text-[--color-primary]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {quickActions.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md bg-[--color-primary] px-3 py-2 text-sm font-medium text-[--color-primary-foreground] shadow-sm transition hover:opacity-90 hover:shadow-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <MobileNav />
        </div>
      </header>
    </div>
  );
}
