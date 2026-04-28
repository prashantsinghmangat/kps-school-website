import {
  GraduationCap,
  Users,
  Laptop,
  Trophy,
  Palette,
  ShieldCheck,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { getWhyChooseUs } from "@/lib/api";

/**
 * Static icon map — explicit so the icons used here are tree-shake-safe
 * and never depend on a dynamic string lookup that could miss in the dev
 * cache (which previously left empty icon tiles on mobile).
 *
 * If you add a new entry to `src/content/enriched/why-choose-us.ts`, also
 * add the icon component here. The HelpCircle fallback ensures the tile
 * never renders empty.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  Laptop,
  Trophy,
  Palette,
  ShieldCheck,
};

function lookupIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? HelpCircle;
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
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
          <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
          Why KPS
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Six reasons families choose Krishna Public School
        </h2>

        <div className="mt-8 grid gap-4 sm:gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
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
                {/* Icon tile — solid primary so it's visible even if the
                    gradient utility ever fails to paint. Inline style is
                    a belt-and-suspenders against CSS-var resolution edge
                    cases under Tailwind v4 + dev HMR. */}
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-sm"
                  style={{ backgroundColor: "#0a3d62" }}
                >
                  <Icon size={22} strokeWidth={2} />
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
