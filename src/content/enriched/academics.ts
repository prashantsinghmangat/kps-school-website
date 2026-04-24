/**
 * academics — overview, stages, subjects, assessment, pedagogy.
 *
 * Factual anchors (from src/content/scraped/about.ts):
 *   - Affiliation: CBSE, New Delhi. Medium: English.
 *   - Classes I–XII as per CBSE syllabi.
 *   - Core subjects at primary/middle: English, Hindi, Mathematics, Social
 *     Science, Science, Computers, Sanskrit, Arts, Physical Education, Drawing.
 *   - Senior secondary compulsory: English Core. Science stream: Physics,
 *     Chemistry, Biology, Maths, with Computer Science / Physical Education /
 *     Fine Arts electives. Commerce stream: Accountancy, Business Studies,
 *     Economics, Maths, with the same electives.
 *
 * Everything else is original prose.
 */

export interface AcademicStage {
  slug: string;
  name: string;
  grades: string;
  description: string;
}

export interface AcademicStageSubjects {
  stage: string;
  core: string[];
  additional?: string[];
  electives?: string[];
  note?: string;
}

export interface AcademicsEnriched {
  overview: string;
  stages: AcademicStage[];
  subjects: AcademicStageSubjects[];
  assessment: string;
  pedagogy: string;
}

export const academicsEnriched: AcademicsEnriched = {
  overview: `Academics at Krishna Public School are designed to move a child from curiosity to competence. We follow the Central Board of Secondary Education's framework from Nursery to Class XII, with the medium of instruction in English and Hindi as a second language from the earliest years.

The academic programme is organised into clear stages — Pre-Primary, Primary, Middle, Secondary and Senior Secondary — and each stage has its own character. Pre-primary years are built around play, language and early number sense. The primary years focus on foundational literacy, numeracy and habits of attention. The middle years open up the disciplines — sciences, mathematics, social sciences, languages and the arts — as ways of thinking about the world. Secondary and senior secondary are where students take ownership of their learning, choose specialisations, and prepare for the CBSE Board examinations.

Class sizes are kept small enough for teachers to know every child's work, and every stage includes dedicated time for reading, project work, laboratory or activity sessions, and physical education. Homework is purposeful rather than heavy. The aim is graduates who can read closely, reason carefully, write clearly, work with others, and carry themselves with integrity.`,
  stages: [
    {
      slug: "pre-primary",
      name: "Pre-Primary",
      grades: "Nursery, LKG, UKG",
      description:
        "Learning through play, story, song and sensory activity. Pre-primary at KPS builds language, early numeracy, fine motor skills and social habits in a calm, age-appropriate classroom. Children become comfortable speaking in English, begin recognising letters and numbers, and grow used to the rhythm of a school day.",
    },
    {
      slug: "primary",
      name: "Primary",
      grades: "Classes I–V",
      description:
        "Foundations for the journey ahead. Children develop fluent reading in English and Hindi, confident arithmetic and an early understanding of science and the world around them. Art, music, dance and physical education are regular timetable items. Assessment is continuous and formative — less about tests, more about noticing what each child has mastered.",
    },
    {
      slug: "middle",
      name: "Middle",
      grades: "Classes VI–VIII",
      description:
        "Where the disciplines open up. Students meet Science, Mathematics and Social Science as structured subjects, work in well-equipped labs, write longer pieces in both languages, and explore Sanskrit and Computer Science. Classroom discussion, project work and independent note-making begin to replace purely receptive learning.",
    },
    {
      slug: "secondary",
      name: "Secondary",
      grades: "Classes IX–X",
      description:
        "Preparation for the CBSE Class X Board. The secondary programme concentrates on deep subject understanding across English, Hindi, Mathematics, Science, Social Science and an additional chosen subject. Focused revision, board-pattern practice and regular parent-teacher conferences help students arrive at the Class X examination with confidence and clear preparation.",
    },
    {
      slug: "senior-secondary",
      name: "Senior Secondary",
      grades: "Classes XI–XII",
      description:
        "Specialisation and launch. Students choose the Science or Commerce stream and commit to four core subjects plus an elective. Alongside the CBSE syllabus, seniors receive structured career guidance and support for entrance tests and university admissions. The school library, labs and mentorship network all point towards life after Class XII.",
    },
  ],
  subjects: [
    {
      stage: "Pre-Primary (Nursery–UKG)",
      core: ["English", "Hindi", "Numbers & Pre-Math", "Environmental Awareness"],
      additional: ["Art & Craft", "Music & Rhythm", "Physical Play", "Story & Rhyme"],
      note: "Structured play, phonics, early writing, number readiness — no formal examinations.",
    },
    {
      stage: "Primary (Classes I–V)",
      core: ["English", "Hindi", "Mathematics", "Environmental Studies (I–II) / Science (III–V)", "Social Studies (III–V)"],
      additional: ["Computers", "Art & Drawing", "Music", "Dance", "Physical Education", "Moral Education"],
      note: "Sanskrit is introduced as a third language from the upper primary years.",
    },
    {
      stage: "Middle (Classes VI–VIII)",
      core: ["English", "Hindi", "Sanskrit", "Mathematics", "Science", "Social Science"],
      additional: ["Computer Science", "Art Education", "Work Experience", "Health & Physical Education"],
    },
    {
      stage: "Secondary (Classes IX–X)",
      core: ["English", "Hindi", "Mathematics", "Science", "Social Science"],
      additional: ["Information Technology / Computer Applications", "Art Education", "Health & Physical Education"],
      note: "Follows CBSE Class X Board examination pattern.",
    },
    {
      stage: "Senior Secondary — Science (Classes XI–XII)",
      core: ["English Core", "Physics", "Chemistry", "Mathematics or Biology"],
      electives: ["Computer Science", "Physical Education", "Fine Arts"],
      note: "Students may opt for PCM, PCB or PCMB combinations as offered each year.",
    },
    {
      stage: "Senior Secondary — Commerce (Classes XI–XII)",
      core: ["English Core", "Accountancy", "Business Studies", "Economics"],
      electives: ["Mathematics", "Computer Science", "Physical Education", "Fine Arts"],
      note: "Students choose one elective based on interest and future plans.",
    },
  ],
  assessment: `Assessment at KPS follows the CBSE framework. In primary and middle school we rely on continuous and comprehensive assessment — periodic tests, classroom observation, portfolios, project work and end-of-term examinations — so that a single number on a single day never defines a child's year. At the secondary and senior secondary stages, students move to the CBSE term-wise pattern with pre-board examinations, internal assessments and the Class X and XII Board examinations. Reporting to parents goes beyond marks: each report card carries comments on reading, writing, reasoning, effort and participation, and parent-teacher meetings are scheduled every term to discuss progress in detail.`,
  pedagogy: `Our classrooms are led by teachers, not by textbooks. We plan each unit around the concept a child should carry away, not just the page to be finished, and we expect teachers to use whatever tool best serves that concept — chalk and conversation, a laboratory demonstration, a short video clip, a group task, or a piece of student writing shared on the board.

Learning is made active wherever possible. Science lessons include hands-on experiments. Mathematics uses manipulatives in the early years and real problems in the higher classes. Language lessons prize writing and speaking alongside reading. The arts, music and physical education are taught as serious disciplines with their own progressions, not as fillers.

We also believe that children learn best when they feel safe, known and respected. Teachers take time to build relationships, classrooms are kept positive, and mistakes are treated as information rather than failure. Reading is valued — every student visits the library regularly, and we encourage the habit of reading for pleasure from the earliest grades. Across all stages, the goal is the same: graduates who can think clearly, speak well, collaborate with others, and continue learning long after school ends.`,
};
