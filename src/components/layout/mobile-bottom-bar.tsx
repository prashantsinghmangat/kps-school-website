import Link from "next/link";
import { Phone, MessageCircle, Send } from "lucide-react";
import { getSiteSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants/seo";

/**
 * Mobile-only sticky bottom bar with the three conversion CTAs:
 *   1. Call (tap-to-call the school office)
 *   2. WhatsApp (opens wa.me with a pre-filled message)
 *   3. Apply (admissions online form)
 *
 * Desktop shows the `TopBar` contact strip + the floating WhatsApp button
 * instead, so those are strictly mobile affordances.
 *
 * Below `md`, we add equivalent `pb-20` on the `<main>` so page content
 * doesn't hide under this bar — that's wired in `src/app/layout.tsx`.
 */
export async function MobileBottomBar() {
  const settings = await getSiteSettings();
  const phone = settings.phones[0];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const phoneHref = phone?.telHref ?? "tel:+911212554335";
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hello ${SITE_NAME}, I would like to know more about admissions.`,
      )}`
    : null;

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-[--color-border] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={phoneHref}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-[--color-foreground] transition active:bg-[--color-muted]"
        aria-label={`Call ${phone?.label ?? "the school office"}`}
      >
        <Phone size={18} className="text-[--color-primary]" />
        <span>Call</span>
      </a>

      {waHref ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 border-x border-[--color-border] py-2.5 text-xs font-medium text-[--color-foreground] transition active:bg-[--color-muted]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={18} className="text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      ) : (
        <Link
          href="/enquiry"
          className="flex flex-col items-center justify-center gap-0.5 border-x border-[--color-border] py-2.5 text-xs font-medium text-[--color-foreground] transition active:bg-[--color-muted]"
          aria-label="Send an enquiry"
        >
          <Send size={18} className="text-[--color-primary]" />
          <span>Enquire</span>
        </Link>
      )}

      <Link
        href="/admissions/apply"
        className="flex flex-col items-center justify-center gap-0.5 bg-[--color-primary] py-2.5 text-xs font-semibold text-[--color-primary-foreground] transition active:brightness-95"
      >
        <Send size={18} />
        <span>Apply</span>
      </Link>
    </nav>
  );
}
