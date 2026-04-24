/**
 * Shared API types. These shapes define the contract the frontend speaks to.
 * When the real backend is wired in, the backend JSON must be parsed into
 * these types before leaving `src/lib/api/`.
 */

export interface Notice {
  id: string;
  slug: string;
  title: string;
  body: string;
  date: string; // ISO
  url?: string | null;
}

export interface SliderSlide {
  src: string;
  alt: string;
  caption?: string | null;
  href?: string | null;
}

export interface Facility {
  slug: string;
  name: string;
  description: string;
  highlights: string[];
  images: string[];
  verified: boolean;
}

export interface GalleryImage {
  url: string;
  caption: string | null;
}

export interface GalleryCategory {
  slug: string;
  name: string;
  cover: string | null;
  imageCount: number;
  images: GalleryImage[];
}

export interface DownloadItem {
  title: string;
  url: string;
  category?: string;
}

export interface HomeworkItem {
  title: string;
  url: string;
}

export interface HomeworkClassRecord {
  slug: string;
  name: string;
  items: HomeworkItem[];
}

export interface LeadershipMessage {
  role: "director" | "principal";
  name: string | null;
  title: string;
  body: string;
  image: string | null;
}

export interface CmsPage {
  slug: string;
  title: string;
  body: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    full: string;
  };
  phones: { label: string; number: string; telHref: string }[];
  emails: { label: string; address: string }[];
  openingHours: { label: string; hours: string; days: string; note?: string }[];
  socials: { platform: string; url: string | null; status: "active" | "tbd" | "not-present" }[];
  googleMaps: {
    placeUrl: string | null;
    embedUrl: string | null;
    latitude: number | null;
    longitude: number | null;
    verified: boolean;
  };
}

export interface NewsEvent {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  body: string;
  image: string | null;
  category: "event" | "announcement" | "achievement" | "activity";
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: "parent" | "student" | "alumni";
  detail: string;
  image: string | null;
}

export interface Paginated<T> {
  data: T[];
  pagination: { page: number; limit: number; total: number };
}
