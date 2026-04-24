import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
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

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-[--color-border] bg-white p-6">
            <MapPin size={22} className="text-[--color-primary]" />
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold">
              Visit us
            </h2>
            <p className="mt-2 text-sm text-[--color-muted-foreground]">
              {settings.address.line1}
              <br />
              {settings.address.line2}
              <br />
              {settings.address.city}, {settings.address.state}
            </p>
          </article>

          <article className="rounded-lg border border-[--color-border] bg-white p-6">
            <Phone size={22} className="text-[--color-primary]" />
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold">
              Call us
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              {settings.phones.map((p) => (
                <li key={p.telHref}>
                  <p className="font-medium">{p.label}</p>
                  <a href={p.telHref} className="text-[--color-primary] hover:underline">
                    {p.number}
                  </a>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-lg border border-[--color-border] bg-white p-6">
            <Mail size={22} className="text-[--color-primary]" />
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold">
              Email us
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              {settings.emails.map((e) => (
                <li key={`${e.label}-${e.address}`}>
                  <p className="font-medium">{e.label}</p>
                  <a
                    href={`mailto:${e.address}`}
                    className="text-[--color-primary] hover:underline"
                  >
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 rounded-lg border border-[--color-border] bg-white p-6">
          <Clock size={22} className="text-[--color-primary]" />
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold">
            Hours
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {settings.openingHours.map((h) => (
              <div key={h.label}>
                <p className="font-medium">{h.label}</p>
                <p className="text-sm text-[--color-muted-foreground]">{h.hours}</p>
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
