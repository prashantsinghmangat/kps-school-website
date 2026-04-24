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
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
          <span className="inline-block h-[2px] w-8 bg-[--color-highlight]" />
          From our leadership
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
          Words from the team
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ordered.map((m) => {
            const href =
              m.role === "director"
                ? "/about/director-message"
                : "/about/principal-message";
            return (
              <article
                key={m.role}
                className="flex flex-col overflow-hidden rounded-lg border border-[--color-border] bg-white"
              >
                <div className="flex gap-5 p-6">
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full bg-[--color-muted]">
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
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[--color-primary]">
                      {m.role}
                    </p>
                    <h3 className="mt-0.5 font-[family-name:var(--font-heading)] text-lg font-semibold">
                      {m.title}
                    </h3>
                    {m.name ? (
                      <p className="text-sm text-[--color-muted-foreground]">{m.name}</p>
                    ) : null}
                  </div>
                </div>

                <blockquote className="relative flex-1 px-6 pb-6 text-sm leading-relaxed text-[--color-foreground]">
                  <Quote
                    size={20}
                    className="absolute -left-1 top-0 -translate-y-1 text-[--color-muted] opacity-70"
                    aria-hidden
                  />
                  <p className="pl-4">{truncate(m.body, 280)}</p>
                </blockquote>

                <div className="border-t border-[--color-border] bg-[--color-muted] px-6 py-3 text-right">
                  <Link
                    href={href}
                    className="text-sm font-medium text-[--color-primary] hover:underline"
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
