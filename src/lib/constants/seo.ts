/**
 * SEO constants — single source of truth for site-wide metadata defaults.
 */

export const SITE_NAME = "Krishna Public School, Meerut";
export const SITE_SHORT_NAME = "KPS Meerut";
export const SITE_TAGLINE = "A CBSE Senior Secondary School on NH-58, Meerut";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.krishnapublicschoolmeerut.in";

export const SITE_DESCRIPTION =
  "Krishna Public School is a co-educational CBSE senior secondary school on NH-58 in Shradha Puri, Kanker Khera, Meerut. Admissions open for Nursery to Class XII.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image.png`;

export const DEFAULT_LOCALE = "en-IN";

export const DEFAULT_KEYWORDS = [
  "Krishna Public School Meerut",
  "KPS Meerut",
  "CBSE school Meerut",
  "best CBSE school Meerut",
  "schools near Kanker Khera",
  "schools on NH-58 Meerut",
  "English medium school Meerut",
  "senior secondary school Meerut",
  "admissions Meerut 2026-27",
] as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Krishna Public School",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "krishna.pub.sch@gmail.com",
  telephone: ["+91-121-2554335", "+91-92196-84588"],
  address: {
    streetAddress: "NH-58 Bypass, Shradha Puri, Kanker Khera",
    addressLocality: "Meerut",
    addressRegion: "Uttar Pradesh",
    postalCode: "", // TODO: confirm postal code with school office
    addressCountry: "IN",
  },
} as const;
