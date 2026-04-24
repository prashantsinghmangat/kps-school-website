/**
 * Navigation — single source of truth. Replaces the legacy site's duplicated
 * desktop/mobile menus (which diverged, by the way).
 *
 * The Header component renders `primaryNav` as the top menu; `quickActions`
 * renders as the compact CTA row next to the logo. Footer-specific links live
 * in `footerLinks`.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Optional — renders a flat submenu (no deeper nesting). */
  children?: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Director's Message", href: "/about/director-message" },
      { label: "Principal's Message", href: "/about/principal-message" },
      { label: "Mission", href: "/about/mission" },
      { label: "Vision & Aims", href: "/about/vision" },
      { label: "School Motto", href: "/about/motto" },
      { label: "Curriculum", href: "/about/curriculum" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Overview", href: "/academics" },
      { label: "Classes Offered", href: "/academics/classes" },
      { label: "Homework / Study Material", href: "/academics/homework" },
    ],
  },
  { label: "Activities", href: "/activities" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  {
    label: "Info",
    href: "/school-info",
    children: [
      { label: "CBSE Mandatory Disclosure", href: "/school-info" },
      { label: "Downloads", href: "/downloads" },
      { label: "Notices", href: "/notices" },
      { label: "News & Events", href: "/news" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const quickActions: NavLink[] = [
  { label: "Pay Fees", href: "/pay-fees" },
  { label: "Study Material", href: "/academics/homework" },
  { label: "Verify TC", href: "/verify-tc" },
  { label: "Enquire", href: "/enquiry" },
];

export const footerLinks: { title: string; items: NavLink[] }[] = [
  {
    title: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Director's Message", href: "/about/director-message" },
      { label: "Principal's Message", href: "/about/principal-message" },
      { label: "Mission & Vision", href: "/about/mission" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { label: "Process", href: "/admissions/process" },
      { label: "Apply Online", href: "/admissions/apply" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
      { label: "Enquire", href: "/enquiry" },
    ],
  },
  {
    title: "School Life",
    items: [
      { label: "Facilities", href: "/facilities" },
      { label: "Activities", href: "/activities" },
      { label: "Gallery", href: "/gallery" },
      { label: "News & Events", href: "/news" },
    ],
  },
  {
    title: "Useful Links",
    items: [
      { label: "CBSE Disclosure", href: "/school-info" },
      { label: "Downloads", href: "/downloads" },
      { label: "Verify TC", href: "/verify-tc" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];
