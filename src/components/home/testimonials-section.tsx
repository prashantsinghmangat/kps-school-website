import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/api";

/**
 * Testimonials section — 3-up grid on desktop, 1-up on mobile. Reads from
 * the enriched content layer (currently PLACEHOLDER data clearly flagged in
 * the source). Replace testimonials in src/content/enriched/testimonials.ts
 * with real, consented quotes before launch.
 */
export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  const featured = testimonials.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[--color-surface-warm]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[--color-highlight]/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
          <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
          What Families Say
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
          Voices from the KPS community
        </h2>
        <p className="mt-2 max-w-2xl text-[--color-muted-foreground]">
          Parents, students and alumni on what the school has meant to them.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <article
              key={i}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[--color-border] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Large decorative quote mark in the corner */}
              <Quote
                size={64}
                className="pointer-events-none absolute -right-2 -top-2 text-[--color-primary]/10"
                aria-hidden
              />
              <div className="relative">
                <Quote size={22} className="text-[--color-accent]" aria-hidden />
                <blockquote className="mt-4 text-sm leading-relaxed text-[--color-foreground]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <footer className="relative mt-6 border-t border-[--color-border] pt-4">
                <p className="text-sm font-semibold text-[--color-primary]">{t.author}</p>
                <p className="text-xs uppercase tracking-wide text-[--color-muted-foreground]">
                  {t.detail}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
