import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { getSiteSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants/seo";

interface FormShellProps {
  /** The actual form component (already a client component). */
  children: React.ReactNode;
  /** Step-by-step "what happens after you submit" so the user knows what's
   *  coming next. Keep to 2–4 short steps. */
  steps?: { label: string; description: string }[];
  /** Optional override for the response-time line. */
  responseTime?: string;
  /** Override the side-panel intro headline. */
  asideTitle?: string;
  asideTagline?: string;
  /** Show the call/email/whatsapp alternatives panel. Default true. */
  showAlternatives?: boolean;
}

const DEFAULT_STEPS = [
  {
    label: "We receive your message",
    description:
      "Your submission lands directly in the school office's inbox.",
  },
  {
    label: "We respond within 2 working days",
    description:
      "An admissions or office team member will reach out by email or phone.",
  },
  {
    label: "We schedule next steps",
    description:
      "Campus visit, document handover or interview — whichever fits your enquiry.",
  },
];

/**
 * Shared form layout — form on the left, trust panel with "what happens
 * next" + alternative contact channels on the right. Used for /enquiry,
 * /contact, /admissions/apply and /verify-tc.
 */
export async function FormShell({
  children,
  steps = DEFAULT_STEPS,
  responseTime = "within 2 working days",
  asideTitle = "What happens next?",
  asideTagline = "Here's what to expect after you hit submit.",
  showAlternatives = true,
}: FormShellProps) {
  const settings = await getSiteSettings();
  const phone = settings.phones[0];
  const email = settings.emails[0];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hello ${SITE_NAME}, I would like to know more about admissions.`,
      )}`
    : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),360px] lg:gap-10">
      {/* Form column */}
      <div>{children}</div>

      {/* Trust + alternatives column */}
      <aside className="space-y-5 lg:sticky lg:top-36 lg:self-start">
        {/* What happens next */}
        <section className="overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
          <header
            className="px-5 py-4 text-white"
            style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-base font-bold">
              {asideTitle}
            </h2>
            <p className="mt-0.5 text-xs opacity-85">{asideTagline}</p>
          </header>
          <ol className="space-y-0 divide-y divide-[--color-border]">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 p-4">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[--color-surface-cool] text-xs font-bold text-[--color-primary]">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[--color-neutral-dark]">
                    {s.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[--color-muted-foreground]">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-2 border-t border-[--color-border] bg-[--color-surface-cool]/50 px-4 py-3 text-xs text-[--color-muted-foreground]">
            <Clock size={14} className="flex-none text-[--color-primary]" />
            <span>
              We respond <span className="font-semibold text-[--color-foreground]">{responseTime}</span>.
            </span>
          </div>
        </section>

        {/* Alternative channels */}
        {showAlternatives ? (
          <section className="overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
            <header className="px-5 pt-4 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--color-primary]">
                Prefer to talk?
              </p>
              <h3 className="mt-0.5 font-[family-name:var(--font-heading)] text-base font-bold text-[--color-neutral-dark]">
                Reach us directly
              </h3>
            </header>
            <ul className="divide-y divide-[--color-border]">
              {phone ? (
                <ChannelRow
                  href={phone.telHref}
                  icon={Phone}
                  label="Call the school"
                  value={phone.number}
                />
              ) : null}
              {email ? (
                <ChannelRow
                  href={`mailto:${email.address}`}
                  icon={Mail}
                  label="Email the office"
                  value={email.address}
                />
              ) : null}
              {waHref ? (
                <ChannelRow
                  href={waHref}
                  icon={MessageCircle}
                  label="Chat on WhatsApp"
                  value="Quick reply on WhatsApp"
                  external
                  iconClass="text-[#25D366]"
                />
              ) : null}
            </ul>
          </section>
        ) : null}

        {/* Trust badges */}
        <section className="rounded-xl border border-[--color-border] bg-gradient-to-br from-[--color-surface-cool] to-white p-5 shadow-sm">
          <ul className="space-y-2.5 text-xs text-[--color-muted-foreground]">
            <li className="flex items-start gap-2">
              <ShieldCheck
                size={14}
                className="mt-0.5 flex-none text-[--color-primary]"
              />
              <span>
                Information you share goes only to the school office. We do not
                pass it on to third parties.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                size={14}
                className="mt-0.5 flex-none text-[--color-primary]"
              />
              <span>
                Spam-protected — only real submissions reach our inbox.
              </span>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-[--color-primary] underline-offset-4 hover:underline"
              >
                Read our privacy policy →
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

function ChannelRow({
  href,
  icon: Icon,
  label,
  value,
  external,
  iconClass,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  external?: boolean;
  iconClass?: string;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-3 px-5 py-3 transition hover:bg-[--color-surface-cool]/60"
      >
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[--color-surface-cool] text-[--color-primary]">
          <Icon size={16} className={iconClass} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[--color-muted-foreground]">
            {label}
          </p>
          <p className="truncate text-sm font-semibold text-[--color-neutral-dark] group-hover:text-[--color-primary]">
            {value}
          </p>
        </div>
      </a>
    </li>
  );
}
