import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}

export function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[--color-surface-cool] via-[--color-muted] to-white">
      {/* Soft brand glow on the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-[--color-primary]/10 blur-3xl"
      />
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-14 lg:px-8">
        {eyebrow ? (
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[--color-primary] sm:text-sm">
            <span className="inline-block h-[2px] w-6 bg-[--color-highlight] sm:w-8" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[--color-neutral-dark] sm:text-3xl md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[--color-muted-foreground] sm:text-base md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
