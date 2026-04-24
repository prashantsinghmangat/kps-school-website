/**
 * co-curricular — activity categories for the Co-curricular page.
 *
 * Factual anchors (from src/content/scraped/about.ts and facilities.ts):
 *   - Dedicated Dance Room, Music Room, Art Room, Activity Room
 *   - Swimming Pool and Playground
 *   - Legacy site lists co-curricular activities as part of the curriculum
 *
 * Prose is original. Keep language warm but specific — each description runs
 * ~120 words.
 */

export interface CoCurricularCategory {
  slug: string;
  name: string;
  description: string;
  activities: string[];
}

export const coCurricular: CoCurricularCategory[] = [
  {
    slug: "sports",
    name: "Sports & Athletics",
    description:
      "Physical education at Krishna Public School is daily, structured and inclusive. Every child takes part, every year. Our wide playground, swimming pool and indoor activity spaces let us run real seasons rather than the occasional match — children learn a sport properly, from rules and technique through to match-day temperament. Inter-house tournaments run through the year, and interschool participation builds experience against wider competition. Coaches adapt training to age and ability so beginners grow in confidence while keen athletes stretch their limits. Sports teach something no classroom can — how to train, how to lose well, how to win with grace, and how to be part of a team.",
    activities: [
      "Football",
      "Cricket",
      "Badminton",
      "Basketball",
      "Volleyball",
      "Swimming",
      "Athletics (sprints, long distance, field events)",
      "Chess",
      "Yoga & fitness",
    ],
  },
  {
    slug: "performing-arts",
    name: "Performing Arts",
    description:
      "Our dance and music rooms are busy rooms. Students learn Indian classical and folk dance alongside contemporary forms, and explore vocal music, instrumental music and rhythm through regular timetabled classes rather than last-minute rehearsal sessions. Dramatics is introduced from the middle years, giving students the chance to script, stage and perform short pieces for school audiences. Annual day, cultural evenings, assemblies and interschool competitions offer real stages to grow into. Performing arts teach children poise, memorisation, listening, collaboration with other performers, and the particular courage it takes to step into the light — skills that serve them long after the last curtain falls.",
    activities: [
      "Indian classical dance (Kathak, Bharatanatyam basics)",
      "Folk and contemporary dance",
      "Vocal music — Indian and Western",
      "Instrumental music — keyboard, tabla, percussion",
      "Choral singing",
      "Dramatics and theatre",
      "Elocution and declamation",
    ],
  },
  {
    slug: "visual-arts",
    name: "Visual Arts & Craft",
    description:
      "The Fine Art Room is a place where children learn to see before they learn to draw. Structured art sessions take students through pencil and colour, composition, perspective, Indian art traditions and a range of craft techniques. Younger children work with textures, paper and clay; older students progress to painting, print-making and mixed-media work. Student pieces are displayed around the campus and gathered for the annual art exhibition, where families see a year of progress. For students interested in design, architecture or visual communication later in life, these years in the art room lay a genuinely useful foundation in observation, patience and craft.",
    activities: [
      "Drawing and sketching",
      "Painting — water colour, poster, acrylic",
      "Clay modelling and pottery",
      "Collage and paper craft",
      "Calligraphy",
      "Indian folk and traditional art forms",
      "Annual school art exhibition",
    ],
  },
  {
    slug: "clubs",
    name: "Clubs & Societies",
    description:
      "Clubs give students a place to pursue an interest with their peers outside the exam timetable. Each club runs regular meetings, takes on projects and contributes to events across the school year. The Literary Club publishes writing and runs reading circles. The Science Club designs experiments, takes part in school exhibitions and keeps up with news in science and technology. The Eco Club leads plantation drives, waste segregation initiatives and awareness campaigns on campus. The Mathematics Club works on puzzles, olympiad-style problems and interschool contests. Students are encouraged to join one club at a time and stay with it long enough to grow into a contributor, not a spectator.",
    activities: [
      "Literary Club",
      "Science Club",
      "Eco Club",
      "Mathematics Club",
      "Computer / Coding Club",
      "Social Service & Community Club",
      "Heritage Club",
    ],
  },
  {
    slug: "events",
    name: "Annual Events & Festivals",
    description:
      "The school year has a rhythm beyond the timetable. Annual Day brings the whole community together for a showcase of music, dance and drama. Sports Day is a full day of inter-house competition where every child has an event to run or play in. The Cultural Fest offers students a platform for performance, speech, fashion, food and craft. Our Science Exhibition turns corridors into working labs where younger visitors watch older students explain real experiments. National festivals — Republic Day, Independence Day, Gandhi Jayanti — are marked with dignified school assemblies. These events are not extras. They are where the year's learning becomes visible.",
    activities: [
      "Annual Day",
      "Sports Day",
      "Cultural Fest",
      "Science Exhibition",
      "Investiture Ceremony",
      "Inter-house competitions",
      "National festival celebrations",
      "Graduation and farewell for Class XII",
    ],
  },
];
