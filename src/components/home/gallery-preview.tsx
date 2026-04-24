import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getGalleryCategories } from "@/lib/api";

export async function GalleryPreview() {
  const categories = await getGalleryCategories();

  // Pick a handful of images across the biggest categories for the preview.
  const pool: { url: string; caption: string | null; categorySlug: string }[] = [];
  for (const c of categories) {
    for (const img of c.images) {
      pool.push({ url: img.url, caption: img.caption, categorySlug: c.slug });
      if (pool.length >= 40) break;
    }
    if (pool.length >= 40) break;
  }
  const preview = pool.slice(0, 8);

  if (preview.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            Through the year
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
            Photo Gallery
          </h2>
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[--color-primary] hover:underline"
        >
          Browse gallery <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {preview.map((img, i) => (
          <Link
            key={`${i}-${img.url}`}
            href={`/gallery/${img.categorySlug}`}
            className="group relative aspect-square overflow-hidden rounded-lg bg-[--color-muted]"
          >
            <Image
              src={img.url}
              alt={img.caption ?? "Krishna Public School photo"}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform group-hover:scale-[1.05]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
