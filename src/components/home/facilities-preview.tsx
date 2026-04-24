import { ResilientImage } from "@/components/common/resilient-image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[--color-border] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-[--color-primary]/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[--color-muted]">
                {f.images[0] ? (
                  <ResilientImage
                    src={f.images[0]}
                    alt={f.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                ) : null}
                {/* Bottom-to-top dark gradient reveal on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[--color-primary-deep]/90 via-[--color-primary-deep]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {/* Gold ribbon appearing from the top on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-1 w-0 bg-[--color-highlight] transition-all duration-500 group-hover:w-full"
                />
                {/* Caption that reveals on hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    Explore facility <ArrowRight size={14} />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[--color-neutral-dark] group-hover:text-[--color-primary]">
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
