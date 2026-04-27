import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Download,
  FileText,
  FileImage,
  FileType2,
  FileSpreadsheet,
  Inbox,
} from "lucide-react";
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

interface FileMeta {
  ext: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badgeClass: string;
}

function fileMeta(url: string): FileMeta {
  const ext = (url.split(/[.?#]/).filter(Boolean).pop() ?? "file").toLowerCase();
  if (ext === "pdf") {
    return {
      ext: "PDF",
      Icon: FileText,
      badgeClass: "bg-[--color-accent] text-[--color-accent-foreground]",
    };
  }
  if (["doc", "docx", "rtf", "odt"].includes(ext)) {
    return {
      ext: ext.toUpperCase(),
      Icon: FileType2,
      badgeClass: "bg-[--color-primary] text-[--color-primary-foreground]",
    };
  }
  if (["xls", "xlsx", "csv"].includes(ext)) {
    return {
      ext: ext.toUpperCase(),
      Icon: FileSpreadsheet,
      badgeClass: "bg-[--color-secondary] text-[--color-secondary-foreground]",
    };
  }
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return {
      ext: ext.toUpperCase(),
      Icon: FileImage,
      badgeClass: "bg-[--color-highlight] text-[--color-highlight-foreground]",
    };
  }
  return {
    ext: ext.toUpperCase().slice(0, 4),
    Icon: FileText,
    badgeClass: "bg-[--color-muted] text-[--color-foreground]",
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
        description={
          klass.items.length === 0
            ? "No items posted yet."
            : `${klass.items.length} item${klass.items.length === 1 ? "" : "s"} available for download.`
        }
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/academics", label: "Academics" },
          { href: "/academics/homework", label: "Homework" },
          { href: `/academics/homework/${klass.slug}`, label: klass.name },
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {klass.items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[--color-border] bg-white p-12 text-center shadow-sm">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[--color-surface-cool] text-[--color-primary]">
              <Inbox size={28} />
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-neutral-dark]">
              Nothing posted yet
            </h2>
            <p className="max-w-md text-sm text-[--color-muted-foreground]">
              No homework is currently posted for {klass.name}. Please check back later
              or contact the class teacher for updates.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {klass.items.map((item, i) => {
              const { ext, Icon, badgeClass } = fileMeta(item.url);
              return (
                <li key={`${i}-${item.url}`}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-[--color-border] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-[--color-surface-cool] text-[--color-primary]">
                      <Icon size={22} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[--color-neutral-dark]">{item.title}</p>
                      <p className="mt-0.5 text-xs text-[--color-muted-foreground]">
                        Click to open in a new tab
                      </p>
                    </div>
                    <span
                      className={`hidden flex-none rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:inline-block ${badgeClass}`}
                    >
                      {ext}
                    </span>
                    <span className="inline-flex flex-none items-center justify-center rounded-full border border-[--color-border] bg-white p-2 text-[--color-primary] transition group-hover:border-[--color-primary] group-hover:bg-[--color-primary] group-hover:text-white">
                      <Download size={16} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10">
          <Link
            href="/academics/homework"
            className="inline-flex items-center gap-1.5 rounded-full border border-[--color-border] bg-white px-4 py-2 text-sm font-medium text-[--color-primary] shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
          >
            <ArrowLeft size={14} /> Back to all classes
          </Link>
        </div>
      </section>
    </>
  );
}
