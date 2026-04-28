import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Phone, QrCode } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getSiteSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Pay Fees",
  description:
    "Pay Krishna Public School fees securely via HDFC SmartFees. Click the fee-payment card to open the school's SmartHub portal.",
  alternates: { canonical: "/pay-fees" },
};

/**
 * The legacy school uses HDFC SmartFees as its fee-collection partner. URLs
 * captured from the legacy `/payfee.php` page. Replace HDFC_FEE_URL if the
 * school changes providers.
 */
const HDFC_FEE_URL =
  "https://smarthubeducation.hdfcbank.com/SmartFees/Landing.action?instId=4429";
const PTS_LOGIN_URL = "http://117.247.45.64/login.aspx";

export default async function PayFeesPage() {
  const settings = await getSiteSettings();
  const phone = settings.phones[0];

  return (
    <>
      <PageHero
        eyebrow="Fees"
        title="Pay school fees online"
        description="Secure payment via HDFC SmartHub Education. You'll be redirected to the bank's portal to complete the transaction."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/pay-fees", label: "Pay Fees" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href={HDFC_FEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-xl border border-[--color-border] bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary] hover:shadow-lg"
          >
            <div className="relative flex h-28 w-56 items-center justify-center overflow-hidden rounded-lg bg-[--color-muted]">
              <Image
                src="/brand/fee-payment.jpg"
                alt="HDFC SmartFees — Pay Online"
                width={400}
                height={200}
                className="h-full w-full object-contain p-2"
              />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-primary]">
              Pay Fees (HDFC SmartFees)
            </h2>
            <p className="mt-2 text-sm text-[--color-muted-foreground]">
              Secure payment through HDFC Bank&apos;s SmartHub Education portal.
              You&apos;ll be redirected to the bank&apos;s payment page.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[--color-accent]">
              Open portal <ExternalLink size={14} />
            </span>
          </a>

          <a
            href={PTS_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-xl border border-[--color-border] bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary] hover:shadow-lg"
          >
            <div className="relative flex h-28 w-56 items-center justify-center overflow-hidden rounded-lg bg-[--color-muted]">
              <Image
                src="/brand/pts-login.gif"
                alt="Parent-Teacher System login"
                width={300}
                height={100}
                unoptimized
                className="h-full w-full object-contain p-2"
              />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-primary]">
              Parent Login (PTS)
            </h2>
            <p className="mt-2 text-sm text-[--color-muted-foreground]">
              Sign in to the school&apos;s parent-teacher system to view fee
              history, receipts and outstanding balances.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[--color-accent]">
              Open login <ExternalLink size={14} />
            </span>
          </a>

          <div className="group flex flex-col items-center rounded-xl border border-[--color-border] bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[--color-primary] hover:shadow-lg">
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-[--color-border]">
              <Image
                src="/brand/fee-qr.jpeg"
                alt="Scan to pay via UPI"
                width={300}
                height={300}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <h2 className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-primary]">
              <QrCode size={18} /> Scan &amp; Pay (UPI)
            </h2>
            <p className="mt-2 text-sm text-[--color-muted-foreground]">
              Scan this QR from any UPI app (PhonePe, Google Pay, Paytm, BHIM) to
              pay school fees directly. Include student name &amp; class in the note.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[--color-highlight-foreground]">
              <span className="rounded-full bg-[--color-highlight] px-2 py-0.5">UPI ready</span>
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-xl border border-[--color-border] bg-[--color-surface-cool] p-6 md:grid-cols-2">
          <div className="flex gap-3">
            <ShieldCheck size={22} className="mt-0.5 flex-none text-[--color-primary]" />
            <div>
              <p className="font-semibold">Payments handled by HDFC Bank</p>
              <p className="mt-1 text-sm text-[--color-muted-foreground]">
                All online fee payments are processed on HDFC Bank&apos;s secure
                SmartHub Education platform. The school does not store your card
                details.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone size={22} className="mt-0.5 flex-none text-[--color-primary]" />
            <div>
              <p className="font-semibold">Need help?</p>
              <p className="mt-1 text-sm text-[--color-muted-foreground]">
                For receipts, refunds or technical issues with online payment,
                call the school office
                {phone ? (
                  <>
                    {" "}at{" "}
                    <a className="text-[--color-primary] hover:underline" href={phone.telHref}>
                      {phone.number}
                    </a>
                  </>
                ) : null}
                .
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/downloads"
            className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
          >
            Fee structure &amp; forms
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
          >
            Contact the accounts office
          </Link>
        </div>
      </section>
    </>
  );
}
