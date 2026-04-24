import { MessageCircle } from "lucide-react";
import { SITE_NAME } from "@/lib/constants/seo";

interface FloatingWhatsAppProps {
  /** Override to show on mobile — by default this hides below `md` since the
   *  mobile bottom bar carries WhatsApp already. */
  showOnMobile?: boolean;
}

/**
 * Floating WhatsApp button, bottom-right. Opens wa.me with a pre-filled
 * enquiry message. Feature-flagged on NEXT_PUBLIC_WHATSAPP_NUMBER — renders
 * nothing if unset, so dev and the "do we even have WhatsApp" question is
 * handled with the same flag.
 */
export function FloatingWhatsApp({ showOnMobile = false }: FloatingWhatsAppProps) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  const phoneDigits = number.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${SITE_NAME}, I would like to know more about admissions.`,
  );
  const href = `https://wa.me/${phoneDigits}?text=${message}`;
  const visibility = showOnMobile ? "flex" : "hidden md:flex";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`${visibility} fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40 active:scale-[0.98]`}
    >
      <MessageCircle size={20} className="fill-white text-white" />
      <span className="hidden md:inline">Chat on WhatsApp</span>
    </a>
  );
}
