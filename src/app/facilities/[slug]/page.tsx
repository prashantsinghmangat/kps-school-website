import type { Metadata } from "next";
import { ResilientImage } from "@/components/common/resilient-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
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

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        {f.images[0] ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[--color-muted]">
            <ResilientImage
              src={f.images[0]}
              alt={f.name}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr,280px]">
          <Prose text={f.description} className="max-w-none" />
          {f.highlights.length ? (
            <aside className="rounded-lg border border-[--color-border] bg-white p-5">
              <h2 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wide">
                Highlights
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {f.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 flex-none text-[--color-primary]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        {!f.verified ? (
          <p className="mt-8 rounded-md border border-dashed border-[--color-border] bg-[--color-muted] p-4 text-xs text-[--color-muted-foreground]">
            This facility description is based on our standard programme. The school
            office will confirm the on-campus setup for this facility before final
            publication.
          </p>
        ) : null}

        <div className="mt-10">
          <Link href="/facilities" className="text-sm text-[--color-primary] hover:underline">
            ← Back to all facilities
          </Link>
        </div>
      </section>
    </>
  );
}
