/**
 * about — enriched original prose for the About Us page.
 *
 * Factual anchors (from src/content/scraped/about.ts and messages.ts):
 *   - Located on NH-58 bypass, Shradha Puri, Kanker Khera, Meerut
 *   - CBSE affiliated, co-educational, Nursery through Class XII
 *   - Science and Commerce streams at senior secondary
 *   - School motto: Labor Omnia Vincit — "success all conquers"
 *   - English medium
 *
 * Everything else is original parent-facing narrative. Do not copy from
 * other school sites if you revise this file.
 */

export interface AboutEnriched {
  tagline: string;
  shortIntro: string;
  narrative: string;
  establishedFacts: {
    affiliation: string;
    medium: string;
    gradeRange: string;
    streams: string[];
    motto: string;
    mottoTranslation: string;
    location: string;
  };
}

export const aboutEnriched: AboutEnriched = {
  tagline: "Where learning, character and possibility meet.",
  shortIntro:
    "Krishna Public School is a CBSE co-educational senior secondary school on the NH-58 bypass in Meerut, serving children from Nursery to Class XII in a calm, tree-lined campus built for focused learning.",
  narrative: `Krishna Public School sits on the Delhi–Roorkee highway at Shradha Puri, Kanker Khera — a few kilometres west of Meerut city, far enough from the main road for quiet study and close enough that families from across western Meerut reach us in minutes. The campus was designed around one idea: that children do their best work in buildings that feel like learning homes, not factories. Lawns, shaded walkways, wide corridors, well-lit classrooms and dedicated activity spaces form the everyday backdrop of a Krishna student's day.

We are affiliated to the Central Board of Secondary Education, New Delhi, and follow the CBSE framework rigorously from Class I through Class XII. English is the medium of instruction. At the senior secondary stage we offer Science and Commerce streams, each with a thoughtful choice of electives including Computer Science, Physical Education and Fine Arts alongside the core disciplines.

Our teaching philosophy rests on three commitments. First, academics grounded in reasoning — we want students to understand why an answer is correct, not just what the answer is. Second, a full co-curricular life — music, dance, visual art, sport and clubs carry the same seriousness as the academic timetable, because character is built in places beyond the classroom. Third, respect — for elders, for classmates, for the natural environment, and for the rich plurality of Indian culture from which our students come.

The school motto, Labor Omnia Vincit — "hard work conquers all" — is not a slogan we put on walls and forget. It is the standard we set for ourselves and the quality we hope to see in every child who passes through our gates. Our open-book-and-rising-sun logo stands for the openness of thought, the honesty of action, and the fresh possibility each school day offers.

Krishna Public School exists to prepare young people who are academically strong, culturally rooted, socially aware and personally confident — ready for the universities they choose and the lives they will build.`,
  establishedFacts: {
    affiliation: "Central Board of Secondary Education (CBSE), New Delhi",
    medium: "English",
    gradeRange: "Nursery to Class XII",
    streams: ["Science", "Commerce"],
    motto: "Labor Omnia Vincit",
    mottoTranslation: "Hard work conquers all",
    location: "NH-58 Bypass, Shradha Puri, Kanker Khera, Meerut, Uttar Pradesh",
  },
};
