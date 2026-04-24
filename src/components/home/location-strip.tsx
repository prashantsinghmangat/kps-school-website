import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { getSiteSettings } from "@/lib/api";

export async function LocationStrip() {
  const settings = await getSiteSettings();
  const mainPhone = settings.phones[0];
  const mainEmail = settings.emails[0];

  return (
    <section className="bg-[--color-muted]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            Find us
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
            Visit our campus
          </h2>
          <p className="mt-3 text-[--color-muted-foreground]">
            On the NH-58 bypass at Shradha Puri, Kanker Khera — a few minutes from
            Meerut city. Parents are welcome to schedule a visit any working day.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 flex-none text-[--color-primary]" />
              <span>{settings.address.full}</span>
            </li>
            {mainPhone ? (
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 flex-none text-[--color-primary]" />
                <a
                  href={mainPhone.telHref}
                  className="hover:text-[--color-primary]"
                >
                  {mainPhone.number}
                </a>
              </li>
            ) : null}
            {mainEmail ? (
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 flex-none text-[--color-primary]" />
                <a
                  href={`mailto:${mainEmail.address}`}
                  className="hover:text-[--color-primary]"
                >
                  {mainEmail.address}
                </a>
              </li>
            ) : null}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-[--color-primary] px-4 py-2 text-sm font-semibold text-[--color-primary-foreground] hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/enquiry"
              className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-white/80"
            >
              Send an enquiry
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-[--color-border] bg-white md:min-h-[360px]">
          {settings.googleMaps.embedUrl ? (
            <iframe
              src={settings.googleMaps.embedUrl}
              title="Krishna Public School on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-[--color-muted-foreground]">
              <MapPin size={28} className="text-[--color-primary]" />
              <p className="font-medium text-[--color-foreground]">Map embed coming soon</p>
              <p>
                A verified Google Maps embed will appear here once the school&apos;s
                place listing is confirmed.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
