import type { SiteSettings } from "./types";
// TODO: replace with fetch('${API_BASE}/site-settings') when backend is ready.
import { contactEnriched } from "@/content/enriched/contact";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/seo";

export async function getSiteSettings(): Promise<SiteSettings> {
  // TODO: return apiGet<SiteSettings>("/site-settings", { revalidate: 3600, tags: ["settings"] });
  return {
    siteName: SITE_NAME,
    tagline: SITE_TAGLINE,
    address: contactEnriched.address,
    phones: contactEnriched.phones,
    emails: contactEnriched.emails,
    openingHours: contactEnriched.openingHours,
    socials: contactEnriched.socials.map((s) => ({
      platform: s.platform,
      url: s.url,
      status: s.status,
    })),
    googleMaps: contactEnriched.googleMaps,
  };
}
