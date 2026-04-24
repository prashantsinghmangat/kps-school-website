import Link from "next/link";
import { primaryNav, quickActions } from "@/lib/constants/nav";
import { SITE_NAME } from "@/lib/constants/seo";
import { MobileNav } from "./mobile-nav";

/**
 * Scaffold Header — functional but unpolished. Phase 4 builds the real design
 * (sticky behaviour, logo image, dropdown sub-menus, animated indicators).
 */
export function Header() {
  return (
    <header className="border-b border-[--color-border] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[--color-primary] text-sm font-bold text-[--color-primary-foreground]"
          >
            KPS
          </span>
          <span className="hidden font-[family-name:var(--font-heading)] text-base font-semibold sm:inline">
            {SITE_NAME}
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
              className="rounded-md bg-[--color-primary] px-3 py-2 text-sm font-medium text-[--color-primary-foreground] transition-colors hover:opacity-90"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
