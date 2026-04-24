import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getDownloads } from "@/lib/api";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Downloadable documents from Krishna Public School, Meerut — prospectus, admission form, mandatory disclosure and academic calendar.",
  alternates: { canonical: "/downloads" },
};

export default async function DownloadsPage() {
  const downloads = await getDownloads();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Downloads"
        description="Prospectus, admission form, calendar and mandatory disclosure — all in one place."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/downloads", label: "Downloads" },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <ul className="space-y-2">
          {downloads.map((d, i) => (
            <li key={`${i}-${d.url}`}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-[--color-border] bg-white p-4 hover:border-[--color-primary] hover:bg-[--color-muted]"
              >
                <FileText size={22} className="flex-none text-[--color-primary]" />
                <span className="flex-1 text-sm font-medium">{d.title}</span>
                <Download size={16} className="flex-none text-[--color-muted-foreground]" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 rounded-lg border border-dashed border-[--color-border] bg-[--color-muted] p-4 text-xs text-[--color-muted-foreground]">
          Documents open in a new tab. For the most current versions of fee structure,
          academic calendar and admission forms, please also check with the school
          office — printed copies are available at reception.
        </p>
      </section>
    </>
  );
}
