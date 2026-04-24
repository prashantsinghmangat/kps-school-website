/**
 * contact — merged scraped info + enriched hours, maps, socials.
 *
 * Factual anchors (from src/content/scraped/contact.ts):
 *   - Address: NH-58 Bypass, Shradha Puri, Kanker Khera, Meerut
 *   - Phones: 0121-2554335, 9219684588
 *   - Email: krishna.pub.sch@gmail.com
 *   - Socials: none listed on legacy site
 *
 * Google Maps embed and social-media URLs are marked TBD — confirm the
 * exact Places listing and any active social accounts with the school office
 * before going live.
 */

export interface ContactPhone {
  label: string;
  number: string;
  /** tel: href-ready format — no spaces or dashes in digits. */
  telHref: string;
}

export interface ContactEmail {
  label: string;
  address: string;
}

export interface OpeningHoursBlock {
  label: string;
  hours: string;
  days: string;
  note?: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "youtube" | "twitter" | "linkedin";
  url: string | null;
  status: "active" | "tbd" | "not-present";
}

export interface ContactEnriched {
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    /** Free-form, single-line, for display in the footer. */
    full: string;
  };
  phones: ContactPhone[];
  emails: ContactEmail[];
  openingHours: OpeningHoursBlock[];
  googleMaps: {
    /** Human place URL — used for "Get Directions" button. */
    placeUrl: string | null;
    /** Embed URL for iframe. */
    embedUrl: string | null;
    /** Decimal coordinates for JSON-LD. */
    latitude: number | null;
    longitude: number | null;
    /** True once the school has confirmed the listing is theirs. */
    verified: boolean;
  };
  socials: SocialLink[];
  /** Short pointer shown near the contact form. */
  responseNote: string;
}

export const contactEnriched: ContactEnriched = {
  address: {
    line1: "Krishna Public School",
    line2: "NH-58 Bypass, Shradha Puri, Kanker Khera",
    city: "Meerut",
    state: "Uttar Pradesh",
    country: "India",
    full: "Krishna Public School, NH-58 Bypass, Shradha Puri, Kanker Khera, Meerut, Uttar Pradesh, India",
  },
  phones: [
    {
      label: "School Office (Landline)",
      number: "0121-2554335",
      telHref: "tel:+911212554335",
    },
    {
      label: "Admissions & General Enquiries",
      number: "+91 92196 84588",
      telHref: "tel:+919219684588",
    },
  ],
  emails: [
    {
      label: "General Enquiries",
      address: "krishna.pub.sch@gmail.com",
    },
    {
      label: "Admissions",
      address: "krishna.pub.sch@gmail.com",
    },
  ],
  openingHours: [
    {
      label: "School Hours",
      // Specific start/end times not visible in scrape — keep range wording
      // general until the office confirms the current term's timings.
      hours: "Morning to early afternoon — exact timings vary by term",
      days: "Monday to Saturday",
      note: "Summer and winter timings differ. Confirm current-term timings with the school office or refer to the student diary.",
    },
    {
      label: "Office Hours (Admissions, Enquiries)",
      hours: "09:00 AM – 03:00 PM",
      days: "Monday to Saturday",
      note: "TBD — confirm exact office hours with the school reception.",
    },
    {
      label: "Transport Enquiry",
      hours: "09:00 AM – 12:00 PM",
      days: "Monday to Saturday",
      note: "TBD — confirm dedicated transport enquiry window.",
    },
  ],
  googleMaps: {
    // TODO: confirm the exact Google Business Profile / Places entry for KPS
    // and replace these fields with the verified URLs and coordinates.
    placeUrl: null,
    embedUrl: null,
    latitude: null,
    longitude: null,
    verified: false,
  },
  socials: [
    { platform: "facebook", url: null, status: "tbd" },
    { platform: "instagram", url: null, status: "tbd" },
    { platform: "youtube", url: null, status: "tbd" },
    { platform: "twitter", url: null, status: "tbd" },
    { platform: "linkedin", url: null, status: "tbd" },
  ],
  responseNote:
    "We aim to respond to every enquiry within two working days. For urgent admission queries during the admissions window, please call the school office directly — phone is the fastest way to reach us.",
};
