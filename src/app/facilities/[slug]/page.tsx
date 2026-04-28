import type { Metadata } from "next";
import { ResilientImage } from "@/components/common/resilient-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { JsonLdFacility } from "@/components/seo/json-ld";
import { getFacilities, getFacilityBySlug } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = await getFacilities();
  return all.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) return { title: "Facility" };
  return {
    title: f.name,
    description: f.description.slice(0, 160),
    alternates: { canonical: `/facilities/${f.slug}` },
  };
}

export default async function FacilityDetailPage({ params }: Props) {
  const { slug } = await params;
  const f = await getFacilityBySlug(slug);
  if (!f) notFound();

  // Pick "next" / "previous" facilities for cross-nav at the bottom.
  const all = await getFacilities();
  const idx = all.findIndex((x) => x.slug === f.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <>
      <JsonLdFacility
        slug={f.slug}
        name={f.name}
        description={f.description}
        images={f.images}
      />
      <PageHero
        eyebrow="Facility"
        title={f.name}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/facilities", label: "Facilities" },
          { href: `/facilities/${f.slug}`, label: f.name },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {f.images[0] ? (
          <div className="relative overflow-hidden rounded-2xl bg-[--color-muted] shadow-lg ring-1 ring-[--color-border]">
            <div className="relative aspect-[16/9]">
              <ResilientImage
                src={f.images[0]}
                alt={f.name}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
              {/* Brand gradient overlay at the bottom for image-text contrast */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[--color-primary-deep]/50 to-transparent"
              />
              {/* Floating chip with location */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[--color-primary] shadow-md backdrop-blur">
                <MapPin size={12} />
                On campus
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,300px]">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
              <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
              About this facility
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[--color-neutral-dark] md:text-3xl">
              {f.name}
            </h2>
            <div className="mt-5">
              <Prose text={f.description} className="max-w-none" />
            </div>

            {!f.verified ? (
              <p className="mt-8 inline-flex items-start gap-2 rounded-md border border-dashed border-[--color-border] bg-[--color-surface-warm] px-4 py-3 text-xs text-[--color-muted-foreground]">
                <Sparkles size={14} className="mt-0.5 flex-none text-[--color-highlight]" />
                <span>
                  This facility description is based on our standard programme. The
                  school office will confirm the on-campus setup before final
                  publication.
                </span>
              </p>
            ) : null}
          </div>

          {f.highlights.length ? (
            <aside className="lg:sticky lg:top-36 lg:self-start">
              <div className="overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
                <div
                  className="px-5 py-3 text-white"
                  style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
                >
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    <Sparkles size={14} className="text-[--color-highlight]" />
                    Highlights
                  </h3>
                </div>
                <ul className="divide-y divide-[--color-border]">
                  {f.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 px-5 py-3 text-sm text-[--color-neutral-dark]"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 flex-none text-[--color-primary]"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>

        {/* Prev / Next cross-nav */}
        {prev || next ? (
          <nav
            aria-label="More facilities"
            className="mt-14 grid gap-4 border-t border-[--color-border] pt-8 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/facilities/${prev.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-[--color-border] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[--color-surface-cool] text-[--color-primary] transition group-hover:bg-[--color-primary] group-hover:text-white">
                  <ArrowLeft size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[--color-muted-foreground]">
                    Previous
                  </p>
                  <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[--color-neutral-dark] group-hover:text-[--color-primary]">
                    {prev.name}
                  </p>
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/facilities/${next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-[--color-border] bg-white p-4 text-right shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[--color-muted-foreground]">
                    Next
                  </p>
                  <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[--color-neutral-dark] group-hover:text-[--color-primary]">
                    {next.name}
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[--color-surface-cool] text-[--color-primary] transition group-hover:bg-[--color-primary] group-hover:text-white">
                  <ArrowRight size={16} />
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}

        <div className="mt-10">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-1.5 rounded-full border border-[--color-border] bg-white px-4 py-2 text-sm font-medium text-[--color-primary] shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
          >
            <ArrowLeft size={14} /> Back to all facilities
          </Link>
        </div>
      </section>
    </>
  );
}
