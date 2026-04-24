import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { LeadershipMessageView } from "@/components/common/leadership-message-view";
import { getLeadershipMessage } from "@/lib/api";

export const metadata: Metadata = {
  title: "Director's Message",
  description:
    "A message from the Director of Krishna Public School, Meerut — on the school's setting, campus, facilities and philosophy of education.",
  alternates: { canonical: "/about/director-message" },
};

export default async function DirectorMessagePage() {
  const msg = await getLeadershipMessage("director");
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
          { href: "/about/director-message", label: "Director's Message" },
        ]}
      />
      <LeadershipMessageView
        msg={msg}
        related={{
          href: "/about/principal-message",
          label: "Read the Principal's Message",
        }}
      />
    </>
  );
}
