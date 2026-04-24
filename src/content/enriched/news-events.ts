// PLACEHOLDER — replace with real news and events before go-live.
//
// These six items are representative of the kind of content the News & Events
// page should carry. Dates are ISO-formatted placeholder strings pointing at
// the current academic year. Images are null — pick images from the scraped
// gallery, or ask the school office for current photographs when replacing.

export interface NewsEventItem {
  slug: string;
  title: string;
  date: string; // ISO date — YYYY-MM-DD
  excerpt: string;
  body: string;
  image: string | null;
  category: "event" | "announcement" | "achievement" | "activity";
}

export const newsEvents: NewsEventItem[] = [
  {
    slug: "annual-day-2026",
    title: "Annual Day 2026 — An Evening of Music, Dance and Story",
    date: "2026-02-22",
    excerpt:
      "The school community came together for a full-length showcase of the year's performing arts — from pre-primary song and rhythm pieces right up to the senior dramatics production.",
    body: "PLACEHOLDER. Annual Day 2026 opened with the school choir and moved through more than a dozen acts across dance, music and drama. Pre-primary classes presented their rhyme and rhythm pieces. Classical and folk dance groups from the middle and senior school performed individually choreographed pieces rehearsed through the year. The senior dramatics team staged a short original play scripted by the Literary Club. The evening closed with the Director and Principal addressing the community and recognising students and staff whose work made the year possible. Families left with the sense — which is the point of Annual Day — that the year's quiet everyday learning adds up to something worth celebrating.",
    image: null,
    category: "event",
  },
  {
    slug: "sports-day-2026",
    title: "Sports Day 2026 — Full Day, Full House, Full Effort",
    date: "2026-01-18",
    excerpt:
      "Every child took part in at least one event. Four houses competed through track, field and team events across the main playground from morning assembly to closing ceremony.",
    body: "PLACEHOLDER. Sports Day opened with a march-past by the four school houses, followed by the oath-taking ceremony. Track events ran through the morning — sprints for every age group, middle-distance races for the seniors and the always-anticipated 4×100 m relay finals. Field events and team matches filled the afternoon, with house points awarded across every event. Beyond the medals, what stood out was the participation: every child on the rolls ran, jumped or played in at least one event. The closing ceremony announced the winning house for the year and the Best Sportsperson awards for boys and girls across age groups.",
    image: null,
    category: "event",
  },
  {
    slug: "science-exhibition-2026",
    title: "Science Exhibition Turns Corridors into Working Labs",
    date: "2026-03-08",
    excerpt:
      "Middle and senior students set up working experiments across the school's corridors, explaining each to visiting parents, younger classes and a panel of teacher judges.",
    body: "PLACEHOLDER. Organised by the Science Club, this year's exhibition grouped student projects into four themes — Energy, Environment, Human Body and Everyday Physics. Working models included a simple solar collector built from household materials, a demonstration of rainwater harvesting flow, a small-scale weather station, and several Class XII projects tied to the current Physics and Chemistry syllabus. Younger students led parents through the working exhibits with rehearsed but genuinely informed commentary. The panel of teacher judges picked three top projects across the senior and junior categories, with a special mention for the best presentation by a primary student.",
    image: null,
    category: "event",
  },
  {
    slug: "cbse-board-results-2025",
    title: "Class X and XII CBSE Board Results — 2024–25",
    date: "2025-05-13",
    excerpt:
      "A strong year for Krishna Public School at the CBSE Board examinations, with steady pass percentages and several students securing distinction in multiple subjects.",
    body: "PLACEHOLDER. The school's Class X and Class XII students returned a strong set of CBSE Board results for the 2024–25 academic year. The full result summary and subject-level performance details will be shared through the school office. Senior students planning college applications are encouraged to book career-guidance sessions over the coming weeks so that subject results, entrance-test timelines and university options can be discussed in detail with the academic team.",
    image: null,
    category: "achievement",
  },
  {
    slug: "interschool-swim-meet-2026",
    title: "KPS Swim Team at the District Interschool Meet",
    date: "2026-03-02",
    excerpt:
      "The school swim team represented KPS at the district interschool meet, returning with medals across sub-junior, junior and senior age groups.",
    body: "PLACEHOLDER. The KPS swim team — trained through the year in the school pool — travelled to the district interschool swim meet and competed against teams from across the region. Medals came home across sub-junior, junior and senior age groups in freestyle and backstroke events. The school extends its congratulations to the team, their coaches, and the many students who trialled for the squad and built the depth that made the final results possible. The swim team will continue training through the summer for the state-level qualifiers.",
    image: null,
    category: "achievement",
  },
  {
    slug: "admissions-open-2026-27",
    title: "Admissions Open for Academic Session 2026–27",
    date: "2026-01-05",
    excerpt:
      "Admissions for the 2026–27 academic year are now open for Nursery through Class IX and Class XI. Families are welcome to visit the campus before applying.",
    body: "PLACEHOLDER. We are accepting applications for the 2026–27 academic session for Nursery, LKG, UKG, Classes I through IX, and Class XI. Limited seats may be available in other classes depending on availability. Interested families are encouraged to arrange a campus visit with the admissions office before applying — a short tour and a conversation with the admissions team is the best way to decide whether KPS is the right fit for your child. The prospectus and admission form are available at the school office, and the current admission notification is on the downloads page of this website.",
    image: null,
    category: "announcement",
  },
];
