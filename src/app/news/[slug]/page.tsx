import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { JsonLdNewsArticle, JsonLdEvent } from "@/components/seo/json-ld";
import { getNewsEvents, getNewsEventBySlug } from "@/lib/api";
import { formatDate } from "@/lib/utils/format-date";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = await getNewsEvents();
  return all.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsEventBySlug(slug);
  if (!item) return { title: "News" };
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsEventBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <JsonLdNewsArticle
        slug={item.slug}
        title={item.title}
        description={item.excerpt}
        body={item.body}
        datePublished={item.date}
        image={item.image}
      />
      {item.category === "event" ? (
        <JsonLdEvent
          slug={item.slug}
          title={item.title}
          description={item.excerpt}
          startDate={item.date}
          image={item.image}
        />
      ) : null}
      <PageHero
        eyebrow={item.category}
        title={item.title}
        description={formatDate(item.date)}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/news", label: "News & Events" },
          { href: `/news/${item.slug}`, label: item.title },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <Prose text={item.body} />
        <div className="mt-10">
          <Link href="/news" className="text-sm text-[--color-primary] hover:underline">
            ← Back to news
          </Link>
        </div>
      </section>
    </>
  );
}
