import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAbout } from "@/lib/api";

export async function WelcomeSnippet() {
  const about = await getAbout();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1fr,360px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
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

        <aside className="rounded-lg border border-[--color-border] bg-white p-6">
          <dl className="space-y-3 text-sm">
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
