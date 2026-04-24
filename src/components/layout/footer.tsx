import Link from "next/link";
import { footerLinks } from "@/lib/constants/nav";
import { getSiteSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants/seo";

/**
 * Scaffold Footer — renders columns, contact, copyright. Phase 4 adds the
 * newsletter signup, social icon row and responsive refinement.
 */
export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[--color-border] bg-[--color-secondary] text-[--color-secondary-foreground]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
              {SITE_NAME}
            </h3>
            <p className="mt-3 max-w-sm text-sm opacity-90">{settings.address.full}</p>
            <div className="mt-4 space-y-1 text-sm opacity-90">
              {settings.phones.map((p) => (
                <p key={p.telHref}>
                  <span className="font-medium">{p.label}:</span>{" "}
                  <a className="underline-offset-4 hover:underline" href={p.telHref}>
                    {p.number}
                  </a>
                </p>
              ))}
              {settings.emails.map((e) => (
                <p key={`${e.label}-${e.address}`}>
                  <span className="font-medium">{e.label}:</span>{" "}
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`mailto:${e.address}`}
                  >
                    {e.address}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wide">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2 text-sm opacity-90">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="underline-offset-4 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs opacity-80">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
