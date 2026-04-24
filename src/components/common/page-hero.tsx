import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}

export function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-[--color-muted]">
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base text-[--color-muted-foreground] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
