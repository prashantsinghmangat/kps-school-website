import type { Metadata } from "next";
import {
  FileText,
  Download,
  BookOpen,
  ClipboardList,
  CalendarDays,
  ShieldCheck,
  Folder,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getDownloads } from "@/lib/api";
import type { DownloadItem } from "@/lib/api";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Downloadable documents from Krishna Public School, Meerut — prospectus, admission form, mandatory disclosure and academic calendar.",
  alternates: { canonical: "/downloads" },
};

interface DownloadGroup {
  key: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  gradient: string;
  match: (item: DownloadItem) => boolean;
}

/**
 * Group definitions ordered by importance for parents. The matchers run
 * top-down — first match wins, so put more specific groups first. Anything
 * unmatched goes into "Other".
 */
const GROUPS: DownloadGroup[] = [
  {
    key: "prospectus",
    title: "Prospectus & Information",
    blurb: "Everything a new parent needs about the school in one document.",
    icon: BookOpen,
    gradient: "from-[--color-primary] to-[--color-secondary]",
    match: (i) => /prospect|information|brochure/i.test(i.title),
  },
  {
    key: "admission",
    title: "Admission Forms",
    blurb: "Forms to download, fill, and submit to the school office.",
    icon: ClipboardList,
    gradient: "from-[--color-accent] to-[--color-primary]",
    match: (i) => /admission|enrol|enroll|application/i.test(i.title),
  },
  {
    key: "calendar",
    title: "Academic Calendar",
    blurb: "Term dates, holidays, events and parent-teacher meetings.",
    icon: CalendarDays,
    gradient: "from-[--color-highlight] to-[--color-accent]",
    match: (i) => /calen|schedule|date sheet|datesheet/i.test(i.title),
  },
  {
    key: "disclosure",
    title: "CBSE Mandatory Disclosure",
    blurb: "Statutory documents published as per CBSE requirements.",
    icon: ShieldCheck,
    gradient: "from-[--color-secondary] to-[--color-primary-deep]",
    match: (i) => /disclosure|mandatory|cbse/i.test(i.title),
  },
];

function fileExt(url: string): string {
  return (url.split(/[.?#]/).filter(Boolean).pop() ?? "FILE").toUpperCase();
}

function categorise(items: DownloadItem[]) {
  const buckets = new Map<string, DownloadItem[]>();
  GROUPS.forEach((g) => buckets.set(g.key, []));
  const other: DownloadItem[] = [];

  for (const item of items) {
    const group = GROUPS.find((g) => g.match(item));
    if (group) {
      buckets.get(group.key)!.push(item);
    } else {
      other.push(item);
    }
  }

  return { buckets, other };
}

export default async function DownloadsPage() {
  const downloads = await getDownloads();
  const { buckets, other } = categorise(downloads);
  const populatedGroups = GROUPS.filter((g) => (buckets.get(g.key)?.length ?? 0) > 0);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Downloads"
        description="Prospectus, admission form, calendar and statutory disclosure — all in one place."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/downloads", label: "Downloads" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
          {populatedGroups.map((g) => {
            const items = buckets.get(g.key) ?? [];
            const Icon = g.icon;
            return (
              <article
                key={g.key}
                className="group relative overflow-hidden rounded-2xl border border-[--color-border] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[--color-primary]/30 hover:shadow-lg"
              >
                <div className={`relative bg-gradient-to-br ${g.gradient} text-white`}>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(255,255,255,0.15),transparent_60%)]"
                  />
                  <div className="relative flex items-start gap-4 p-5 sm:p-6">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20 backdrop-blur sm:h-12 sm:w-12">
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-80">
                        {items.length} {items.length === 1 ? "file" : "files"}
                      </p>
                      <h2 className="mt-0.5 font-[family-name:var(--font-heading)] text-lg font-bold sm:text-xl">
                        {g.title}
                      </h2>
                      <p className="mt-1 text-xs opacity-85 sm:text-sm">{g.blurb}</p>
                    </div>
                  </div>
                </div>
                <ul className="divide-y divide-[--color-border]">
                  {items.map((item, i) => (
                    <li key={`${i}-${item.url}`}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/file flex items-center gap-3 px-5 py-3 transition hover:bg-[--color-surface-cool]/60 sm:px-6"
                      >
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-[--color-surface-cool] text-[--color-primary]">
                          <FileText size={16} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[--color-neutral-dark]">
                            {item.title}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-[--color-muted-foreground]">
                            {fileExt(item.url)} · click to open
                          </p>
                        </div>
                        <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[--color-border] bg-white text-[--color-primary] transition group-hover/file:border-[--color-primary] group-hover/file:bg-[--color-primary] group-hover/file:text-white">
                          <Download size={14} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {other.length > 0 ? (
          <article className="mt-6 overflow-hidden rounded-2xl border border-[--color-border] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[--color-border] bg-[--color-surface-cool] px-5 py-4 sm:px-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[--color-primary] text-[--color-primary-foreground]">
                <Folder size={16} />
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-base font-bold text-[--color-neutral-dark] sm:text-lg">
                Other documents
              </h2>
            </div>
            <ul className="divide-y divide-[--color-border]">
              {other.map((item, i) => (
                <li key={`${i}-${item.url}`}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3 transition hover:bg-[--color-surface-cool]/60 sm:px-6"
                  >
                    <FileText size={18} className="flex-none text-[--color-primary]" />
                    <span className="flex-1 truncate text-sm font-medium text-[--color-neutral-dark]">
                      {item.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[--color-muted-foreground]">
                      {fileExt(item.url)}
                    </span>
                    <Download
                      size={16}
                      className="flex-none text-[--color-muted-foreground]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <p className="mt-8 rounded-lg border border-dashed border-[--color-border] bg-[--color-surface-cool] p-4 text-xs text-[--color-muted-foreground]">
          Documents open in a new tab. For the most current versions of fee structure,
          academic calendar and admission forms, please also check with the school
          office — printed copies are available at reception.
        </p>
      </section>
    </>
  );
}
