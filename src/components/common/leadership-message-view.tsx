import Link from "next/link";
import { Quote, UserRound, ArrowRight } from "lucide-react";
import { ResilientImage } from "@/components/common/resilient-image";
import { Prose } from "@/components/common/prose";
import type { LeadershipMessage } from "@/lib/api";

interface LeadershipMessageViewProps {
  msg: LeadershipMessage;
  /** What to link to at the bottom of the page — usually the other leader. */
  related?: { href: string; label: string };
}

/**
 * Premium two-column layout for Director / Principal messages:
 *   - Left (desktop): portrait inside a decorative frame, name + title caption
 *   - Right (desktop): pull-quote highlighting the first line of the message,
 *     then the full prose, then a link to the other leader's message.
 * On mobile the portrait stacks on top.
 */
export function LeadershipMessageView({ msg, related }: LeadershipMessageViewProps) {
  // Pull a crisp opening quote out of the body (first ~200 chars or the first
  // sentence, whichever is shorter). Purely visual — the full body is rendered
  // below.
  const firstSentence = msg.body.split(/(?<=[.!?])\s+/)[0] ?? "";
  const pullQuote =
    firstSentence.length > 0 && firstSentence.length < 220
      ? firstSentence
      : msg.body.slice(0, 180).trimEnd() + "…";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[260px,1fr] md:items-start">
        {/* Portrait column */}
        <div className="mx-auto w-full max-w-[260px] md:sticky md:top-36">
          <div className="relative">
            {/* Decorative gold corner frames */}
            <span
              aria-hidden
              className="absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-[--color-highlight]"
            />
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[--color-highlight]"
            />
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[--color-surface-cool] shadow-xl ring-1 ring-[--color-border]">
              {msg.image ? (
                <ResilientImage
                  src={msg.image}
                  alt={msg.name ?? `${msg.role}, Krishna Public School`}
                  fill
                  priority
                  sizes="260px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-[--color-muted-foreground]">
                  <UserRound size={40} className="text-[--color-primary]/30" />
                  <p className="text-xs font-medium">Portrait coming soon</p>
                </div>
              )}
            </div>
          </div>
          <div
            className="mt-5 rounded-lg px-4 py-3 text-center text-white shadow-sm"
            style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[--color-highlight]">
              {msg.role}
            </p>
            {msg.name ? (
              <p className="mt-1 font-[family-name:var(--font-heading)] text-base font-semibold">
                {msg.name}
              </p>
            ) : null}
            <p className="mt-1 text-xs italic text-white/80">
              Krishna Public School
            </p>
          </div>
        </div>

        {/* Body column */}
        <div>
          <figure className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[--color-surface-warm] via-white to-[--color-surface-cool] p-6 shadow-sm md:p-8">
            <Quote
              size={36}
              aria-hidden
              className="absolute -right-2 -top-2 text-[--color-primary]/10"
            />
            <Quote size={22} className="text-[--color-primary]" aria-hidden />
            <blockquote className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold leading-relaxed text-[--color-neutral-dark] md:text-xl">
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
          </figure>

          <div className="mt-8">
            <Prose text={msg.body} className="max-w-none" />
          </div>

          {related ? (
            <Link
              href={related.href}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-white px-5 py-2.5 text-sm font-semibold text-[--color-primary] shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary]/40 hover:shadow-md"
            >
              {related.label} <ArrowRight size={14} />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
