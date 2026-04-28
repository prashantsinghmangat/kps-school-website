import type { Metadata } from "next";
import { ResilientImage } from "@/components/common/resilient-image";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getFacilities } from "@/lib/api";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Krishna Public School's campus — library, science and computer labs, dance and music rooms, art room, swimming pool, playground, and more.",
  alternates: { canonical: "/facilities" },
};

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  return (
    <>
      <PageHero
        eyebrow="Campus"
        title="Facilities"
        description="Spaces that support academic, physical and creative learning across the school year."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/facilities", label: "Facilities" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <Link
              key={f.slug}
              href={`/facilities/${f.slug}`}
              className="group overflow-hidden rounded-lg border border-[--color-border] bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-[--color-muted]">
                {f.images[0] ? (
                  <ResilientImage
                    src={f.images[0]}
                    alt={f.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-[--color-muted-foreground]">
                    Photo coming soon
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold group-hover:text-[--color-primary]">
                  {f.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-[--color-muted-foreground]">
                  {f.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
