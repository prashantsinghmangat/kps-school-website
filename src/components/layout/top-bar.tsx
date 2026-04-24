import { Phone, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/api";

interface TopBarProps {
  settings: SiteSettings;
}

/**
 * Thin contact strip above the main header. Desktop-only — on mobile the
 * bottom bar carries the same affordances and the top stays quiet.
 */
export function TopBar({ settings }: TopBarProps) {
  const firstPhone = settings.phones[0];
  const firstEmail = settings.emails[0];

  return (
    <div className="hidden border-b border-white/10 bg-[--color-secondary] text-[--color-secondary-foreground] md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs md:px-6">
        <div className="flex items-center gap-5">
          {firstPhone ? (
            <a
              href={firstPhone.telHref}
              className="inline-flex items-center gap-1.5 opacity-90 transition hover:opacity-100"
            >
              <Phone size={13} />
              <span>{firstPhone.number}</span>
            </a>
          ) : null}
          {firstEmail ? (
            <a
              href={`mailto:${firstEmail.address}`}
              className="inline-flex items-center gap-1.5 opacity-90 transition hover:opacity-100"
            >
              <Mail size={13} />
              <span>{firstEmail.address}</span>
            </a>
          ) : null}
        </div>

        <Link
          href="/admissions"
          className="group inline-flex items-center gap-1.5 rounded-full bg-[--color-accent] px-3 py-0.5 text-[11px] font-semibold text-[--color-accent-foreground] transition hover:brightness-105"
        >
          <Sparkles size={12} className="transition group-hover:rotate-12" />
          Admissions Open 2026–27
        </Link>
      </div>
    </div>
  );
}
