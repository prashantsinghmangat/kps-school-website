/**
 * school-info — CBSE Mandatory Public Disclosure (MPD).
 *
 * CBSE-affiliated schools are required by the Board to publish a set of
 * disclosure details on their website. The legacy /schoolinfo.php page did
 * not render any such content, so this file is authored fresh — structured
 * around the five sections the CBSE circular requires.
 *
 * IMPORTANT: most fields are placeholder strings — `"TBD — update from school
 * records"`. Do NOT invent numbers. The school office must supply real values
 * (affiliation number, school code, land area, infrastructure dimensions,
 * staff counts, results data, etc.) before this page goes live. Shipping
 * invented data in a statutory disclosure block is a compliance risk.
 *
 * Source: CBSE MPD circular; legacy /schoolinfo.php scrape (empty).
 */

const TBD = "TBD — update from school records" as const;

export interface DisclosureDocument {
  label: string;
  url: string | null;
}

export interface ResultRow {
  year: string;
  class10: {
    appeared: string;
    passed: string;
    passPercent: string;
    remarks: string;
  };
  class12: {
    appeared: string;
    passed: string;
    passPercent: string;
    remarks: string;
  };
}

export interface StaffCounts {
  principal: string;
  totalTeachers: string;
  prt: string;
  tgt: string;
  pgt: string;
  teacherSectionRatio: string;
  specialEducator: string;
  counsellor: string;
}

export interface InfrastructureRow {
  item: string;
  value: string;
}

export interface SchoolInfoEnriched {
  general: Record<string, string>;
  documents: DisclosureDocument[];
  results: ResultRow[];
  staff: StaffCounts;
  infrastructure: InfrastructureRow[];
  lastUpdated: string;
  complianceNote: string;
}

export const schoolInfoEnriched: SchoolInfoEnriched = {
  general: {
    nameOfSchool: "Krishna Public School",
    affiliationNumber: TBD,
    schoolCode: TBD,
    completeAddress:
      "NH-58 Bypass, Shradha Puri, Kanker Khera, Meerut, Uttar Pradesh",
    principal: TBD,
    emailOfPrincipal: "krishna.pub.sch@gmail.com",
    contactDetails: "0121-2554335, +91 92196 84588",
    yearOfFirstAffiliation: TBD,
    yearOfAffiliationRenewal: TBD,
    societyOrTrust: TBD,
    noObjectionCertificate: TBD,
    recognitionCertificate: TBD,
  },
  documents: [
    {
      label: "Mandatory Public Disclosure (scanned PDF)",
      url: "https://www.krishnapublicschoolmeerut.in/Downloads/71MANDATORY PUBLIC DISCLOSURE.pdf",
    },
    { label: "Copy of Affiliation / Upgradation Letter from CBSE", url: null },
    { label: "Copy of Societies / Trust / Company Registration", url: null },
    { label: "Copy of No-Objection Certificate (NOC)", url: null },
    { label: "Copy of Recognition Certificate under RTE Act", url: null },
    { label: "Copy of Valid Building Safety Certificate", url: null },
    { label: "Copy of Valid Fire Safety Certificate", url: null },
    { label: "Copy of DEO Certificate for Affiliation / Upgradation", url: null },
    { label: "Copy of Water, Health and Sanitation Certificate", url: null },
  ],
  results: [
    {
      year: "2024–25",
      class10: {
        appeared: TBD,
        passed: TBD,
        passPercent: TBD,
        remarks: TBD,
      },
      class12: {
        appeared: TBD,
        passed: TBD,
        passPercent: TBD,
        remarks: TBD,
      },
    },
    {
      year: "2023–24",
      class10: {
        appeared: TBD,
        passed: TBD,
        passPercent: TBD,
        remarks: TBD,
      },
      class12: {
        appeared: TBD,
        passed: TBD,
        passPercent: TBD,
        remarks: TBD,
      },
    },
    {
      year: "2022–23",
      class10: {
        appeared: TBD,
        passed: TBD,
        passPercent: TBD,
        remarks: TBD,
      },
      class12: {
        appeared: TBD,
        passed: TBD,
        passPercent: TBD,
        remarks: TBD,
      },
    },
  ],
  staff: {
    principal: TBD,
    totalTeachers: TBD,
    prt: TBD,
    tgt: TBD,
    pgt: TBD,
    teacherSectionRatio: TBD,
    specialEducator: TBD,
    counsellor: TBD,
  },
  infrastructure: [
    { item: "Total campus area (sq. mtrs)", value: TBD },
    { item: "Number of classrooms and size (sq. mtrs)", value: TBD },
    { item: "Number of smart classrooms", value: TBD },
    { item: "Number of laboratories and size", value: TBD },
    { item: "Internet facility (Yes / No)", value: TBD },
    { item: "Number of girls' toilets", value: TBD },
    { item: "Number of boys' toilets", value: TBD },
    { item: "CCTV surveillance (Yes / No)", value: "Yes" },
    { item: "Library (Yes / No)", value: "Yes" },
    { item: "Swimming pool (Yes / No)", value: "Yes" },
    { item: "Playground area", value: TBD },
    { item: "Auditorium (Yes / No)", value: "Yes" },
    { item: "Medical room (Yes / No)", value: "Yes" },
    { item: "Transport (Yes / No)", value: "Yes" },
  ],
  lastUpdated: TBD,
  complianceNote:
    "This Mandatory Public Disclosure is published in compliance with the directions of the Central Board of Secondary Education, New Delhi. Every field marked 'TBD — update from school records' must be filled with the school's actual data before the page goes live. Do not publish this page with placeholder values.",
};
