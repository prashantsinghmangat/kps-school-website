import Link from "next/link";
import { primaryNav, quickActions } from "@/lib/constants/nav";
import { SchoolLogo } from "@/components/common/school-logo";
import { getSiteSettings } from "@/lib/api";
import { MobileNav } from "./mobile-nav";
import { TopBar } from "./top-bar";

/**
 * Sticky header with TopBar above. Uses backdrop blur for a frosted feel that
 * keeps the page content visible while staying readable against any
 * background. Sticky position at `top-0` means nav + quick-actions are always
 * one tap away as the parent scrolls.
 */
export async function Header() {
  const settings = await getSiteSettings();

  return (
    <div className="sticky top-0 z-40">
      <TopBar settings={settings} />
      <header className="border-b border-[--color-border] bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="flex items-center" aria-label="Krishna Public School home">
            <span className="sm:hidden">
              <SchoolLogo variant="mark" height={42} priority />
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
