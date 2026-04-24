"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { primaryNav, quickActions } from "@/lib/constants/nav";

/**
 * Scaffold MobileNav — simple controlled drawer. Phase 4 swaps in a Radix
 * Dialog-based drawer with focus-trap, scroll-lock and smoother animations.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] text-[--color-foreground]"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open ? (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-x-0 top-16 z-50 border-b border-[--color-border] bg-white shadow-lg"
          role="dialog"
          aria-modal="true"
        >
          <nav aria-label="Mobile primary" className="mx-auto max-w-7xl px-4 py-4">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base font-medium hover:bg-[--color-muted]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[--color-border] pt-4">
              {quickActions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-[--color-primary] px-3 py-2 text-sm font-medium text-[--color-primary-foreground]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
