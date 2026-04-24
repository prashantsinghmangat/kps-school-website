import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { getGalleryCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos from Krishna Public School, Meerut — campus life, functions, events, results and more.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryIndexPage() {
  const categories = await getGalleryCategories();

  return (
    <>
      <PageHero
        eyebrow="School Life"
        title="Photo Gallery"
        description="Snapshots from across the school year."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/gallery", label: "Gallery" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {categories.length === 0 ? (
          <p className="rounded-lg border border-[--color-border] bg-white p-6 text-sm text-[--color-muted-foreground]">
            Gallery photos are being organised and will appear here shortly.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/gallery/${c.slug}`}
                className="group overflow-hidden rounded-lg border border-[--color-border] bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-[--color-muted]">
                  {c.cover ? (
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold group-hover:text-[--color-primary]">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-[--color-muted-foreground]">
                    {c.imageCount} photo{c.imageCount === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
