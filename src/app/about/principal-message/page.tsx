import type { Metadata } from "next";
import { ResilientImage } from "@/components/common/resilient-image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { Prose } from "@/components/common/prose";
import { getLeadershipMessage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "A message from the Principal of Krishna Public School, Meerut — on the school's academic approach, values and commitment to student development.",
  alternates: { canonical: "/about/principal-message" },
};

export default async function PrincipalMessagePage() {
  const msg = await getLeadershipMessage("principal");
  if (!msg) notFound();

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title={msg.title}
        description={msg.name ?? undefined}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/about/principal-message", label: "Principal's Message" },
        ]}
      />
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-[200px,1fr]">
          {msg.image ? (
            <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-lg bg-[--color-muted]">
              <ResilientImage
                src={msg.image}
                alt={msg.name ?? "Principal, Krishna Public School"}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-[3/4] w-full max-w-[200px] items-center justify-center rounded-lg bg-[--color-muted] text-xs text-[--color-muted-foreground]">
              Portrait not available
            </div>
          )}
          <Prose text={msg.body} />
        </div>
      </section>
    </>
  );
}
