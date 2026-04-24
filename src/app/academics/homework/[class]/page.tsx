import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getHomeworkClasses, getHomeworkForClass } from "@/lib/api";

interface Props {
  params: Promise<{ class: string }>;
}

export async function generateStaticParams() {
  const all = await getHomeworkClasses();
  return all.map((c) => ({ class: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { class: slug } = await params;
  const klass = await getHomeworkForClass(slug);
  if (!klass) return { title: "Homework" };
  return {
    title: `Homework — ${klass.name}`,
    description: `Homework and study material for ${klass.name} at Krishna Public School, Meerut.`,
    alternates: { canonical: `/academics/homework/${klass.slug}` },
  };
}

export default async function HomeworkClassPage({ params }: Props) {
  const { class: slug } = await params;
  const klass = await getHomeworkForClass(slug);
  if (!klass) notFound();

  return (
    <>
      <PageHero
        eyebrow="Homework"
        title={klass.name}
        description={`${klass.items.length} item${klass.items.length === 1 ? "" : "s"} available for download.`}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/academics", label: "Academics" },
          { href: "/academics/homework", label: "Homework" },
          { href: `/academics/homework/${klass.slug}`, label: klass.name },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {klass.items.length === 0 ? (
          <div className="rounded-lg border border-[--color-border] bg-white p-6 text-sm text-[--color-muted-foreground]">
            No homework is currently posted for {klass.name}. Please check back later or
            contact the class teacher for updates.
          </div>
        ) : (
          <ul className="space-y-2">
            {klass.items.map((item, i) => (
              <li key={`${i}-${item.url}`}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-[--color-border] bg-white p-4 hover:border-[--color-primary] hover:bg-[--color-muted]"
                >
                  <FileText size={20} className="flex-none text-[--color-primary]" />
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-[--color-muted-foreground]">Download</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <Link
            href="/academics/homework"
            className="text-sm text-[--color-primary] hover:underline"
          >
            ← Back to all classes
          </Link>
        </div>
      </section>
    </>
  );
}
