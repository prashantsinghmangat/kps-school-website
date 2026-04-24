import { ResilientImage } from "@/components/common/resilient-image";
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
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
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

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {preview.map((img, i) => (
          <Link
            key={`${i}-${img.url}`}
            href={`/gallery/${img.categorySlug}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-[--color-muted] shadow-sm ring-1 ring-[--color-border] transition-all duration-300 hover:shadow-2xl hover:ring-[--color-primary]/40"
          >
            <ResilientImage
              src={img.url}
              alt={img.caption ?? "Krishna Public School photo"}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
            />
            {/* Permanent subtle bottom-fade to separate from background */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80"
            />
            {/* Category label that slides up on hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-6 p-3 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 rounded-full bg-[--color-highlight] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[--color-highlight-foreground]">
                {img.categorySlug.replace(/-/g, " ")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
