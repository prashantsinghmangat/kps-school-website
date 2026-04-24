import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { getAbout } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Krishna Public School is a CBSE co-educational senior secondary school on NH-58 in Meerut. Learn about our campus, curriculum, philosophy and school motto.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const about = await getAbout();

  const related = [
    { href: "/about/director-message", label: "Director's Message" },
    { href: "/about/principal-message", label: "Principal's Message" },
    { href: "/about/mission", label: "Mission" },
    { href: "/about/vision", label: "Vision & Aims" },
    { href: "/about/motto", label: "School Motto" },
    { href: "/about/curriculum", label: "Curriculum" },
  ];

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

        <div className="mt-10 grid gap-4 rounded-lg border border-[--color-border] bg-white p-6 md:grid-cols-2">
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
        </div>

        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
            Read more about Krishna Public School
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm font-medium hover:bg-[--color-muted]"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-[--color-muted-foreground]">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
