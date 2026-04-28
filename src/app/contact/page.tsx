import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { IconTile } from "@/components/common/icon-tile";
import { JsonLdLocalBusiness } from "@/components/seo/json-ld";
import { getSiteSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Krishna Public School, Meerut. Visit us on NH-58, Shradha Puri, Kanker Khera, or reach the school office by phone or email.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLdLocalBusiness
        phones={settings.phones.map((p) => p.telHref.replace("tel:", ""))}
        email={settings.emails[0]?.address ?? "krishna.pub.sch@gmail.com"}
        openingHours={settings.openingHours.map((h) => ({
          days: h.days,
          hours: h.hours,
        }))}
        latitude={settings.googleMaps.latitude}
        longitude={settings.googleMaps.longitude}
      />
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Call the office, send us a message, or drop in for a campus visit."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
            />
            <IconTile icon={MapPin} size="lg" tone="gradient" />
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-[--color-neutral-dark]">
              Visit us
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[--color-muted-foreground]">
              {settings.address.line1}
              <br />
              {settings.address.line2}
              <br />
              {settings.address.city}, {settings.address.state}
            </p>
          </article>

          <article className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
            />
            <IconTile icon={Phone} size="lg" tone="gradient" />
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-[--color-neutral-dark]">
              Call us
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              {settings.phones.map((p) => (
                <li key={p.telHref}>
                  <p className="font-medium">{p.label}</p>
                  <a
                    href={p.telHref}
                    className="text-[--color-primary] transition hover:text-[--color-accent] hover:underline"
                  >
                    {p.number}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
            />
            <IconTile icon={Mail} size="lg" tone="gradient" />
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-[--color-neutral-dark]">
              Email us
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              {settings.emails.map((e) => (
                <li key={`${e.label}-${e.address}`}>
                  <p className="font-medium">{e.label}</p>
                  <a
                    href={`mailto:${e.address}`}
                    className="text-[--color-primary] transition hover:text-[--color-accent] hover:underline"
                  >
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
          <div
            className="px-6 py-4 text-white"
            style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
          >
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[--color-highlight]" />
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                Hours
              </h2>
            </div>
          </div>
          <div className="grid gap-5 p-6 md:grid-cols-3">
            {settings.openingHours.map((h) => (
              <div
                key={h.label}
                className="rounded-lg bg-[--color-surface-cool] p-4"
              >
                <p className="font-semibold text-[--color-neutral-dark]">{h.label}</p>
                <p className="mt-1 text-sm text-[--color-muted-foreground]">{h.hours}</p>
                <p className="text-xs text-[--color-muted-foreground]">{h.days}</p>
                {h.note ? (
                  <p className="mt-1 text-xs italic text-[--color-muted-foreground]">{h.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {settings.googleMaps.embedUrl ? (
            <div className="overflow-hidden rounded-lg border border-[--color-border]">
              <iframe
                src={settings.googleMaps.embedUrl}
                title={`Map — ${settings.siteName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[400px] w-full"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[--color-border] bg-[--color-muted] p-6 text-sm text-[--color-muted-foreground]">
              Google Maps embed will appear here once the school&apos;s verified place
              listing is confirmed.
            </div>
          )}
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold">
              Send us a message
            </h2>
            <Link
              href="/admissions"
              className="text-sm text-[--color-primary] hover:underline"
            >
              Admissions details →
            </Link>
          </div>
          <p className="mt-1 text-sm text-[--color-muted-foreground]">
            For admission-related questions, please also see our admissions page. The
            form below reaches the school office directly.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
