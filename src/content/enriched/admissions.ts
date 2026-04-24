/**
 * admissions — process, age eligibility, documents, dates and fees note.
 *
 * Factual anchors (from src/content/scraped/downloads.ts):
 *   - An "ADMISSION OPEN.docx" is linked from the legacy downloads page.
 *   - A "KPS_prospectus_draft4" PDF is available. We reference it.
 *   - Prospectus and admission form are downloadable from the legacy site.
 *
 * No hard deadlines are visible in the scrape, so `importantDates` is
 * placeholder with "TBD — update from school office" strings. Age cutoffs
 * follow common CBSE-school practice in India but should be confirmed with
 * the school before launch.
 */

export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
}

export interface AgeEligibility {
  grade: string;
  minimumAge: string;
  note?: string;
}

export interface ImportantDate {
  label: string;
  value: string;
}

export interface AdmissionsEnriched {
  overview: string;
  process: AdmissionStep[];
  ageEligibility: AgeEligibility[];
  documentsRequired: string[];
  importantDates: ImportantDate[];
  feeStructureNote: string;
}

export const admissionsEnriched: AdmissionsEnriched = {
  overview: `Admissions at Krishna Public School open every year for Nursery through Class IX and Class XI, with limited seats available in other classes depending on availability. We look for children whose families share our commitment to steady learning, good conduct and an all-round school life — academic strength is welcome, but so is curiosity, perseverance and a willingness to take part in the broader life of the school. Parents are encouraged to visit the campus before applying. A short school tour, a conversation with the admissions office, and time to meet the teaching staff will give you a much better sense of whether KPS is the right fit for your child than any brochure can. Applications are accepted through a straightforward process outlined below. We keep the process transparent: there are no hidden charges beyond the published prospectus fee at the application stage, and we respond to every enquiry we receive. For the most current admission notification and seat availability, please contact the school office or download the admission document from our downloads page.`,
  process: [
    {
      step: 1,
      title: "Enquire and Visit",
      description:
        "Start with an enquiry — through the school office, a phone call, or the enquiry form on this website. We will schedule a campus visit where you can meet the admissions team, see the classrooms and facilities, and get your questions answered in person.",
    },
    {
      step: 2,
      title: "Collect the Prospectus and Admission Form",
      description:
        "Collect the school prospectus and admission form from the office, or download the current prospectus and admission document from the downloads section of this website. The prospectus sets out the curriculum, facilities, rules and fee structure in detail.",
    },
    {
      step: 3,
      title: "Submit the Completed Form",
      description:
        "Fill in the admission form carefully and submit it at the school office along with the required supporting documents listed below. Incomplete forms will be returned for correction, so please double-check entries before submission.",
    },
    {
      step: 4,
      title: "Interaction / Assessment",
      description:
        "For Nursery, LKG and UKG, the child and parents are invited for a short, informal interaction — not a test, simply a conversation to help us know your child. For Classes I onwards, a short written assessment at grade-appropriate level is conducted alongside the parent interaction.",
    },
    {
      step: 5,
      title: "Confirmation of Admission",
      description:
        "Successful applicants are notified by the school office and invited to complete admission formalities. This is also when you will receive the fee schedule, uniform details, booklist and the date from which your child starts school.",
    },
    {
      step: 6,
      title: "Fee Payment and Enrolment",
      description:
        "Pay the applicable admission and term fees as per the schedule shared with you to confirm the seat. Once payment is completed and documents are verified, your child is formally enrolled and added to the class roll for the coming academic session.",
    },
  ],
  ageEligibility: [
    {
      grade: "Nursery",
      minimumAge: "3 years as on 31 March of the admission year",
      note: "Confirm with the school office — age cutoff to be verified.",
    },
    {
      grade: "LKG",
      minimumAge: "4 years as on 31 March of the admission year",
      note: "Confirm with the school office — age cutoff to be verified.",
    },
    {
      grade: "UKG",
      minimumAge: "5 years as on 31 March of the admission year",
      note: "Confirm with the school office — age cutoff to be verified.",
    },
    {
      grade: "Class I",
      minimumAge: "6 years as on 31 March of the admission year",
      note: "Confirm with the school office — age cutoff to be verified.",
    },
  ],
  documentsRequired: [
    "Completed admission form",
    "Birth certificate (photocopy + original for verification)",
    "Passport-size photographs of the child (4 copies)",
    "Passport-size photograph of each parent (1 copy each)",
    "Aadhaar card copies — child and both parents",
    "Residence proof (utility bill / rent agreement / Aadhaar)",
    "Transfer Certificate (TC) from previous school — for Class I admissions and above",
    "Progress report / latest report card from previous school — for Class I admissions and above",
    "Caste certificate, if applicable and claiming reservation under any category",
    "Medical certificate / vaccination record",
  ],
  importantDates: [
    {
      label: "Prospectus and forms available from",
      value: "TBD — update from school office",
    },
    {
      label: "Last date for form submission",
      value: "TBD — update from school office",
    },
    {
      label: "Parent–child interaction / assessment window",
      value: "TBD — update from school office",
    },
    {
      label: "Admission confirmation list published",
      value: "TBD — update from school office",
    },
    {
      label: "Fee payment deadline for confirmed admissions",
      value: "TBD — update from school office",
    },
    {
      label: "Academic session 2026–27 begins",
      value: "TBD — update from school office",
    },
  ],
  feeStructureNote: `The current fee structure for the academic session is detailed in the school prospectus and is shared with families at the point of admission confirmation. Fees are charged on a term-wise basis and include tuition, activity fees and examination fees. Transport fees are separate, based on the route opted for. For the latest fee details, please refer to the prospectus on the downloads page or contact the school office directly — we prefer to discuss fees with parents in person so that every cost is clearly explained and nothing is left ambiguous.`,
};
