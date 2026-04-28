import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
} from "@/lib/constants/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp";
import { AdmissionsPopup } from "@/components/common/admissions-popup";
import { JsonLdSchool } from "@/components/seo/json-ld-school";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a3d62",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — CBSE Senior Secondary School, Meerut`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
  alternates: { canonical: "/" },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — CBSE Senior Secondary School, Meerut`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${heading.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Navigation progress bar — fires on every client-side navigation,
            shows a gold bar at the top so clicks never feel dead. */}
        <NextTopLoader
          color="#f5b800"
          height={3}
          showSpinner={false}
          crawl
          easing="ease"
          speed={200}
          shadow="0 0 10px #f5b800, 0 0 5px #f5b800"
        />
        <JsonLdSchool />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        {/* Footer carries the bottom offset (pb-24 md:pb-0) so the MobileBottomBar
            doesn't hide the copyright line. */}
        <Footer />
        <FloatingWhatsApp />
        <MobileBottomBar />
        <AdmissionsPopup />
      </body>
    </html>
  );
}
