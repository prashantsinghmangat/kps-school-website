import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  UserRound,
  Target,
  Eye,
  Award,
  BookOpen,
  ArrowRight,
  Quote,
} from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { getAbout } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Krishna Public School is a CBSE co-educational senior secondary school on NH-58 in Meerut. Learn about our campus, curriculum, philosophy and school motto.",
  alternates: { canonical: "/about" },
};

const RELATED = [
  {
    href: "/about/director-message",
    label: "Director's Message",
    icon: MessageCircle,
    blurb: "A word from the school director",
  },
  {
    href: "/about/principal-message",
    label: "Principal's Message",
    icon: UserRound,
    blurb: "From the principal's desk",
  },
  {
    href: "/about/mission",
    label: "Mission",
    icon: Target,
    blurb: "What we set out to do every day",
  },
  {
    href: "/about/vision",
    label: "Vision & Aims",
    icon: Eye,
    blurb: "The student we hope to send forward",
  },
  {
    href: "/about/motto",
    label: "School Motto",
    icon: Award,
    blurb: "Labor Omnia Vincit — and what it stands for",
  },
  {
    href: "/about/curriculum",
    label: "Curriculum",
    icon: BookOpen,
    blurb: "CBSE framework from Nursery to Class XII",
  },
];

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <PageHero
        eyebrow="About the School"
        title={about.tagline}
        description={about.shortIntro}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <Prose text={about.narrative} />

        {/* Pull-quote highlighting the school motto */}
        <figure className="my-12 rounded-2xl border border-[--color-border] bg-gradient-to-br from-[--color-surface-cool] via-white to-[--color-surface-warm] p-8 shadow-sm md:p-10">
          <Quote size={28} className="text-[--color-primary]" aria-hidden />
          <blockquote className="mt-3 font-[family-name:var(--font-heading)] text-xl font-semibold text-[--color-neutral-dark] md:text-2xl">
            &ldquo;{about.establishedFacts.motto}&rdquo; —{" "}
            <span className="italic text-[--color-primary]">
              {about.establishedFacts.mottoTranslation}
            </span>
          </blockquote>
          <figcaption className="mt-3 text-sm uppercase tracking-[0.18em] text-[--color-muted-foreground]">
            Our school motto since inception
          </figcaption>
        </figure>

        {/* Established facts as a framed dashboard card */}
        <div className="overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
          <div className="flex items-center justify-between bg-gradient-to-r from-[--color-primary] to-[--color-secondary] px-6 py-4 text-white">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
              At a glance
            </h2>
            <span className="rounded-full bg-[--color-highlight] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[--color-highlight-foreground]">
              Verified
            </span>
          </div>
          <dl className="grid gap-6 p-6 sm:grid-cols-2 md:p-8">
            <Fact label="Affiliation" value={about.establishedFacts.affiliation} />
            <Fact label="Medium" value={about.establishedFacts.medium} />
            <Fact label="Grade range" value={about.establishedFacts.gradeRange} />
            <Fact
              label="Senior Secondary Streams"
              value={about.establishedFacts.streams.join(" · ")}
            />
            <Fact
              label="Motto"
              value={`${about.establishedFacts.motto} — ${about.establishedFacts.mottoTranslation}`}
            />
            <Fact label="Location" value={about.establishedFacts.location} />
          </dl>
        </div>
      </section>

      {/* Related topics — card grid, not a pill row */}
      <section className="bg-[--color-surface-cool]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
            <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
            More about us
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight md:text-3xl">
            Explore more of Krishna Public School
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group relative overflow-hidden rounded-xl border border-[--color-border] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-lg"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[--color-primary] via-[--color-secondary] to-[--color-highlight] opacity-80"
                  />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[--color-primary] to-[--color-secondary] text-white shadow-sm">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-semibold text-[--color-neutral-dark] group-hover:text-[--color-primary]">
                    {r.label}
                  </h3>
                  <p className="mt-1 text-sm text-[--color-muted-foreground]">
                    {r.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[--color-primary] transition-all group-hover:gap-2">
                    Read more <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[--color-primary]">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-[--color-neutral-dark]">{value}</dd>
    </div>
  );
}
