import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { getGalleryCategories, getGalleryCategoryBySlug } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = await getGalleryCategories();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getGalleryCategoryBySlug(slug);
  if (!cat) return { title: "Gallery" };
  return {
    title: cat.name,
    description: `${cat.name} at Krishna Public School, Meerut — ${cat.imageCount} photos.`,
    alternates: { canonical: `/gallery/${cat.slug}` },
  };
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = await getGalleryCategoryBySlug(slug);
  if (!cat) notFound();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={cat.name}
        description={`${cat.imageCount} photo${cat.imageCount === 1 ? "" : "s"}`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/gallery", label: "Gallery" },
          { href: `/gallery/${cat.slug}`, label: cat.name },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {cat.images.map((img, i) => (
            <div
              key={`${i}-${img.url}`}
              className="relative aspect-square overflow-hidden rounded-lg bg-[--color-muted]"
            >
              <Image
                src={img.url}
                alt={img.caption ?? `${cat.name} photo ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/gallery" className="text-sm text-[--color-primary] hover:underline">
            ← Back to all categories
          </Link>
        </div>
      </section>
    </>
  );
}
