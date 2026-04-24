import { ORGANIZATION, SITE_URL, SITE_NAME } from "@/lib/constants/seo";

/**
 * Shared JSON-LD block components. Pages import the block they need, pass
 * page-specific data, and render it in the tree. Each block references the
 * site-wide EducationalOrganization via its `@id` so the graph stays linked.
 */

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface JsonLdLocalBusinessProps {
  phones: string[];
  email: string;
  openingHours?: { days: string; hours: string }[];
  latitude?: number | null;
  longitude?: number | null;
}

export function JsonLdLocalBusiness({
  phones,
  email,
  openingHours = [],
  latitude,
  longitude,
}: JsonLdLocalBusinessProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${SITE_URL}#organization`,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: `${SITE_URL}/opengraph-image.png`,
    email,
    telephone: phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.streetAddress,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    ...(latitude && longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude,
            longitude,
          },
        }
      : {}),
    ...(openingHours.length
      ? {
          openingHoursSpecification: openingHours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            description: h.hours,
          })),
        }
      : {}),
  };
  return <JsonLdScript data={data} />;
}

interface JsonLdNewsArticleProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  datePublished: string;
  image?: string | null;
}

export function JsonLdNewsArticle({
  slug,
  title,
  description,
  body,
  datePublished,
  image,
}: JsonLdNewsArticleProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    articleBody: body,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/news/${slug}` },
    datePublished,
    dateModified: datePublished,
    ...(image ? { image: [image] } : {}),
    author: { "@id": `${SITE_URL}#organization`, name: SITE_NAME },
    publisher: { "@id": `${SITE_URL}#organization` },
  };
  return <JsonLdScript data={data} />;
}

interface JsonLdEventProps {
  slug: string;
  title: string;
  description: string;
  startDate: string;
  image?: string | null;
}

export function JsonLdEvent({
  slug,
  title,
  description,
  startDate,
  image,
}: JsonLdEventProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description,
    startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: ORGANIZATION.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: ORGANIZATION.address.streetAddress,
        addressLocality: ORGANIZATION.address.addressLocality,
        addressRegion: ORGANIZATION.address.addressRegion,
        addressCountry: ORGANIZATION.address.addressCountry,
      },
    },
    organizer: { "@id": `${SITE_URL}#organization`, name: SITE_NAME },
    ...(image ? { image: [image] } : {}),
    url: `${SITE_URL}/news/${slug}`,
  };
  return <JsonLdScript data={data} />;
}

interface JsonLdFacilityProps {
  slug: string;
  name: string;
  description: string;
  images: string[];
}

export function JsonLdFacility({
  slug,
  name,
  description,
  images,
}: JsonLdFacilityProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${name} — ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/facilities/${slug}`,
    isPartOf: { "@id": `${SITE_URL}#organization` },
    ...(images.length
      ? {
          image: images.map((img) => ({
            "@type": "ImageObject",
            url: img,
            caption: name,
          })),
        }
      : {}),
    containedInPlace: {
      "@type": "Place",
      name: ORGANIZATION.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: ORGANIZATION.address.streetAddress,
        addressLocality: ORGANIZATION.address.addressLocality,
        addressRegion: ORGANIZATION.address.addressRegion,
        addressCountry: ORGANIZATION.address.addressCountry,
      },
    },
  };
  return <JsonLdScript data={data} />;
}

export function JsonLdEducationalProgram() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "CBSE School Programme (Nursery to Class XII)",
    description:
      "CBSE-affiliated co-educational programme from Nursery to Class XII, with Science and Commerce streams at senior secondary.",
    provider: { "@id": `${SITE_URL}#organization`, name: SITE_NAME },
    educationalProgramMode: "full-time",
    programType: "School",
    occupationalCategory: "Education",
    url: `${SITE_URL}/admissions`,
    offers: {
      "@type": "Offer",
      category: "Admission",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/admissions/apply`,
    },
  };
  return <JsonLdScript data={data} />;
}
