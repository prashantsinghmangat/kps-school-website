import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
} from "lucide-react";
import { footerLinks } from "@/lib/constants/nav";
import { SchoolLogo } from "@/components/common/school-logo";
import { getSiteSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants/seo";

/**
 * Full-width footer on a deep navy band. Gradient bg (primary -> deep ->
 * secondary) adds depth, a gold accent bar sits on top, a decorative blur
 * glows on the right. Logo goes on a translucent white chip (not a full
 * white card) so it reads on dark without looking slapped on.
 *
 * Columns:
 *   1. Brand (logo + tagline + key contact block + socials)
 *   2..N. Link columns from `footerLinks`
 * Bottom strip: copyright + motto + small nav.
 */

type SocialPlatform = "facebook" | "instagram" | "youtube" | "twitter" | "linkedin";

const SOCIAL_ICON: Record<
  SocialPlatform,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
};

const SOCIAL_LABEL: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  twitter: "X (Twitter)",
  linkedin: "LinkedIn",
};

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const activeSocials = settings.socials.filter(
    (s): s is (typeof settings.socials)[number] & { platform: SocialPlatform; url: string } =>
      s.status === "active" && !!s.url && s.platform in SOCIAL_ICON,
  );

  return (
    <footer className="relative overflow-hidden bg-[--color-primary] text-white">
      {/* Gradient base */}
      <div
        aria-hidden
        className="absolute inset-0 brand-gradient-band opacity-95"
      />
      {/* Gold top accent bar */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[--color-highlight] to-transparent"
      />
      {/* Decorative blurred glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[--color-highlight]/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[--color-accent]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-14 md:px-6 md:pt-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-3 rounded-xl bg-white/95 p-3 pr-5 shadow-lg ring-1 ring-white/20 backdrop-blur">
              <SchoolLogo variant="full" height={44} />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
              A CBSE co-educational senior secondary school on NH-58 in Meerut —
              Nursery to Class XII. Admissions open for 2026–27.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 flex-none text-[--color-highlight]" />
                <span className="text-white/85">{settings.address.full}</span>
              </li>
              {settings.phones.map((p) => (
                <li key={p.telHref} className="flex gap-3">
                  <Phone size={16} className="mt-0.5 flex-none text-[--color-highlight]" />
                  <a
                    href={p.telHref}
                    className="text-white/90 transition hover:text-white hover:underline underline-offset-4"
                  >
                    <span className="opacity-70">{p.label}:</span>{" "}
                    <span className="font-medium">{p.number}</span>
                  </a>
                </li>
              ))}
              {settings.emails.slice(0, 1).map((e) => (
                <li key={e.address} className="flex gap-3">
                  <Mail size={16} className="mt-0.5 flex-none text-[--color-highlight]" />
                  <a
                    href={`mailto:${e.address}`}
                    className="text-white/90 transition hover:text-white hover:underline underline-offset-4"
                  >
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>

            {activeSocials.length > 0 ? (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[--color-highlight]">
                  Follow Us
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {activeSocials.map((s) => {
                    const Icon = SOCIAL_ICON[s.platform];
                    return (
                      <li key={s.platform}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={SOCIAL_LABEL[s.platform]}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition hover:border-[--color-highlight] hover:bg-white/10 hover:text-[--color-highlight]"
                        >
                          <Icon size={16} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="relative pb-3 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.18em] text-[--color-highlight] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-[--color-highlight]/60">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block text-white/80 transition hover:translate-x-0.5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-14 border-t border-white/15 pt-6 pb-8">
          <div className="flex flex-col gap-3 text-xs text-white/75 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {SITE_NAME}. All rights reserved.
            </p>
            <p className="italic tracking-wide text-[--color-highlight]">
              Labor Omnia Vincit — Hard work conquers all
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/school-info" className="hover:text-white">
                CBSE Disclosure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
