import Link from "next/link";
import { Quote } from "lucide-react";
import { ResilientImage } from "@/components/common/resilient-image";
import { getLeadershipMessages } from "@/lib/api";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, Math.max(lastSpace, max - 20)).trimEnd()}…`;
}

export async function MessagesRow() {
  const messages = await getLeadershipMessages();
  const ordered = [
    messages.find((m) => m.role === "director"),
    messages.find((m) => m.role === "principal"),
  ].filter(Boolean) as typeof messages;

  return (
    <section className="bg-[--color-muted]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
          <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
          From our leadership
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Words from the team
        </h2>

        <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2">
          {ordered.map((m) => {
            const href =
              m.role === "director"
                ? "/about/director-message"
                : "/about/principal-message";
            return (
              <article
                key={m.role}
                className="flex flex-col overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm"
              >
                <div className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full bg-[--color-surface-cool] ring-2 ring-[--color-highlight]/40 sm:h-20 sm:w-20">
                    {m.image ? (
                      <ResilientImage
                        src={m.image}
                        alt={m.name ?? m.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                        fallback="Photo"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[--color-muted-foreground]">
                        Photo
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[--color-primary] sm:text-xs">
                      {m.role}
                    </p>
                    <h3 className="mt-0.5 font-[family-name:var(--font-heading)] text-base font-bold text-[--color-neutral-dark] sm:text-lg">
                      {m.title}
                    </h3>
                    {m.name ? (
                      <p className="text-xs text-[--color-muted-foreground] sm:text-sm">
                        {m.name}
                      </p>
                    ) : null}
                  </div>
                </div>

                <blockquote className="relative flex-1 px-5 pb-5 text-sm leading-relaxed text-[--color-foreground] sm:px-6 sm:pb-6">
                  <Quote
                    size={18}
                    className="absolute left-4 top-0 -translate-y-1 text-[--color-primary]/15 sm:left-5 sm:-translate-y-2"
                    aria-hidden
                  />
                  <p className="pl-5">{truncate(m.body, 280)}</p>
                </blockquote>

                <div className="border-t border-[--color-border] bg-[--color-surface-cool]/60 px-5 py-3 text-right sm:px-6">
                  <Link
                    href={href}
                    className="text-sm font-semibold text-[--color-primary] hover:underline"
                  >
                    Read full message →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
