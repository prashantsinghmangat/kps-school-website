import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/page-hero";
import { LeadershipMessageView } from "@/components/common/leadership-message-view";
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
      <LeadershipMessageView
        msg={msg}
        related={{
          href: "/about/director-message",
          label: "Read the Director's Message",
        }}
      />
    </>
  );
}
