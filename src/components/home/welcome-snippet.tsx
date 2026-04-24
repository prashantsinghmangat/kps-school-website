import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAbout } from "@/lib/api";

export async function WelcomeSnippet() {
  const about = await getAbout();

  return (
    <section className="relative overflow-hidden bg-[--color-surface-warm]">
      {/* Soft gold glow in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[--color-accent]/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1fr,360px]">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            <span className="inline-block h-[2px] w-8 bg-[--color-accent]" />
            Welcome
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
            {about.tagline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[--color-foreground] md:text-lg">
            {about.shortIntro}
          </p>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[--color-primary] hover:underline"
            >
              Read more about the school <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-6 shadow-sm">
          {/* Gold accent top bar */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[--color-primary] via-[--color-accent] to-[--color-secondary]"
          />
          <dl className="mt-2 space-y-3 text-sm">
            <Fact
              label="Affiliation"
              value={about.establishedFacts.affiliation}
            />
            <Fact label="Medium" value={about.establishedFacts.medium} />
            <Fact label="Grades" value={about.establishedFacts.gradeRange} />
            <Fact
              label="Streams"
              value={about.establishedFacts.streams.join(" · ")}
            />
            <Fact
              label="Motto"
              value={`${about.establishedFacts.motto} — ${about.establishedFacts.mottoTranslation}`}
            />
          </dl>
        </aside>
      </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-[--color-muted-foreground]">
        {label}
      </dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}
