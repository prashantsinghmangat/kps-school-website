"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { primaryNav, quickActions } from "@/lib/constants/nav";
import { SchoolLogo } from "@/components/common/school-logo";

/**
 * Full-screen mobile drawer (no more brittle `top-16` that misaligns on
 * tablet where the TopBar is visible). Structure:
 *   - Trigger button in the header
 *   - When open, a fixed inset-0 overlay with its own logo header + close
 *     button + scrollable nav list + quick-action buttons at the bottom
 *   - Locks body scroll while open, restores on close or route change
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] bg-white text-[--color-foreground] transition hover:bg-[--color-muted]"
      >
        <Menu size={20} />
      </button>

      {open ? (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-[60] flex flex-col bg-white"
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
        >
          {/* Header strip inside the drawer (logo + close) */}
          <div className="flex items-center justify-between border-b border-[--color-border] px-4 py-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center"
              aria-label="Home"
            >
              <SchoolLogo variant="full" height={40} />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] bg-white text-[--color-foreground] transition hover:bg-[--color-muted]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable nav content */}
          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-[--color-neutral-dark] transition hover:bg-[--color-muted] hover:text-[--color-primary]"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} className="opacity-40" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick-actions pinned at the bottom */}
          <div className="border-t border-[--color-border] bg-[--color-surface-cool] px-4 py-3">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-[--color-primary] px-3 py-2.5 text-center text-sm font-semibold text-[--color-primary-foreground] transition hover:brightness-110"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
