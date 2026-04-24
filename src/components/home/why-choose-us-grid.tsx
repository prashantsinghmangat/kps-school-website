import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { getWhyChooseUs } from "@/lib/api";

type IconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

function lookupIcon(name: string): IconComponent {
  const lib = LucideIcons as unknown as Record<string, IconComponent>;
  return lib[name] ?? lib.HelpCircle;
}

export async function WhyChooseUsGrid() {
  const items = await getWhyChooseUs();

  return (
    <section className="relative overflow-hidden bg-[--color-surface-cool]">
      {/* Decorative navy glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[--color-primary]/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
          <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
          Why KPS
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
          Six reasons families choose Krishna Public School
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = lookupIcon(item.icon);
            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg"
              >
                {/* Gradient accent top bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[--color-primary] via-[--color-secondary] to-[--color-highlight] opacity-80 transition-opacity group-hover:opacity-100"
                />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[--color-primary] to-[--color-secondary] text-white shadow-sm">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-[--color-neutral-dark]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[--color-muted-foreground]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
