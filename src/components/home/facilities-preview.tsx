import { ResilientImage } from "@/components/common/resilient-image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFacilities } from "@/lib/api";

export async function FacilitiesPreview() {
  const all = await getFacilities();
  // Prefer facilities that have an image for the preview grid.
  const withImages = all.filter((f) => f.images.length > 0);
  const preview = withImages.slice(0, 6);

  return (
    <section className="bg-[--color-muted]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
              <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
              The Campus
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
              Facilities built for real learning
            </h2>
          </div>
          <Link
            href="/facilities"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[--color-primary] hover:underline"
          >
            View all facilities <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((f) => (
            <Link
              key={f.slug}
              href={`/facilities/${f.slug}`}
              className="group overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-[--color-muted]">
                {f.images[0] ? (
                  <ResilientImage
                    src={f.images[0]}
                    alt={f.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold group-hover:text-[--color-primary]">
                  {f.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-[--color-muted-foreground]">
                  {f.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
