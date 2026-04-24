/**
 * facilities — enriched descriptions for each facility.
 *
 * Factual anchors (from src/content/scraped/facilities.ts and messages.ts):
 *   - Confirmed facilities on campus: Library, Labs (Physics, Chemistry,
 *     Biology, Mathematics, Geography, Computer Center), Dance Room, Music
 *     Room, Activity Room, Canteen, Fine Art Room, Swimming Pool, Playground.
 *   - Director's message also confirms Administration block, lecture rooms
 *     and Digi-classes.
 *
 * Added facilities — mentioned by the phase-2 brief but not present in scrape:
 * Smart Classrooms, Medical Room, Transport, Auditorium. These are flagged in
 * `verificationStatus: "brief-added"` so we remember to confirm with the
 * school before launch.
 *
 * Each description is original prose, 150–250 words.
 */

export interface EnrichedFacility {
  slug: string;
  name: string;
  /** True if this facility appears in the legacy site scrape. */
  scraped: boolean;
  verificationStatus: "scraped" | "brief-added";
  description: string;
  highlights: string[];
}

export const enrichedFacilities: EnrichedFacility[] = [
  {
    slug: "library",
    name: "Library",
    scraped: true,
    verificationStatus: "scraped",
    description: `The Library at Krishna Public School is the quiet heart of the campus. A large, well-lit reading hall holds a carefully curated collection of fiction and non-fiction for every age group — picture books and early readers for the pre-primary and primary years, graded series for the middle years, subject reference material for secondary and senior secondary students, and a growing shelf of Indian and world literature for senior readers. Daily library periods are timetabled for every class from Nursery to Class XII, so visiting the library is a routine, not a treat. Our library staff help children choose the right book for their level, track borrowings, and run reading-corner activities through the year. Newspapers, age-appropriate magazines and competition-preparation material are available for older students. Silent study tables let senior students review, revise or work on assignments during free periods. Our endeavour is simple: we want every child leaving KPS to have a real, lifelong reading habit, not just a school-leaving certificate.`,
    highlights: [
      "Dedicated library period for every class",
      "Age-graded collection from picture books to reference texts",
      "Newspapers, magazines and competition material",
      "Silent study area for senior students",
    ],
  },
  {
    slug: "labs",
    name: "Science & Computer Labs",
    scraped: true,
    verificationStatus: "scraped",
    description: `Science and technology at Krishna Public School are taught in dedicated laboratories — Physics, Chemistry, Biology, Mathematics, Geography and a full Computer Centre. Each lab is equipped for the CBSE practical syllabus, with apparatus, safety equipment and workstations arranged so students work in small groups rather than watching a single demonstration from a distance. The Physics and Chemistry labs let students run the experiments their textbooks describe, from light and electricity to acids, bases and salts. The Biology lab holds microscopes, prepared slides and specimens for the middle and senior classes. The Mathematics and Geography labs provide manipulatives, maps, globes and models that turn abstract ideas into something students can handle and discuss. Our Computer Centre gives every student supervised practice time with age-appropriate software, coding tools and internet learning resources. Lab sessions are not extras — they are part of the weekly timetable from the middle school onwards, and lab notebooks carry real weight in the overall assessment. We want our students to experience science as something you do, not something you only read about.`,
    highlights: [
      "Separate Physics, Chemistry, Biology, Mathematics and Geography labs",
      "Computer Centre with supervised practical sessions",
      "CBSE practical syllabus fully supported",
      "Small-group practical work for every student",
    ],
  },
  {
    slug: "smart-classrooms",
    name: "Smart & Digi Classrooms",
    scraped: false,
    verificationStatus: "brief-added",
    description: `Alongside traditional classrooms, Krishna Public School runs Digi-classrooms equipped with large displays, audio systems and teaching software mapped to the CBSE syllabus. A good smart classroom is one where technology disappears into the lesson — a diagram can be animated the moment it is needed, a short video clip can support a geography lesson, a simulation can reveal what a static textbook image cannot. Our teachers are trained to use the smart board as an extension of the blackboard, not a replacement for it. Lessons move naturally between discussion, writing and on-screen resources. Students still take notes, still answer questions, still solve problems on paper — but they also see processes in motion, listen to spoken English at different paces, and revisit tricky concepts as many times as the class needs. The technology is kept deliberately simple and reliable so a lost projector does not derail a lesson. The aim is better teaching, not fancier teaching.`,
    highlights: [
      "Large interactive displays with CBSE-mapped content",
      "Audio-visual resources integrated with every subject",
      "Teacher-led, not technology-led",
      "Regular refreshes and teacher training on smart-class tools",
    ],
  },
  {
    slug: "dance-room",
    name: "Dance Room",
    scraped: true,
    verificationStatus: "scraped",
    description: `The Dance Room is a purpose-built space with a sprung floor, wall mirrors and an audio system — the setting a dance class actually needs. Students here learn Indian classical forms alongside folk and contemporary styles, working through posture, rhythm, footwork and expression over the course of each academic year. Younger classes begin with simple movement patterns that build body awareness and coordination. From the middle years upwards, students work on longer choreographed pieces that they eventually perform at Annual Day, Cultural Fest and inter-school competitions. Dance at KPS is not an elective reserved for the naturally gifted — every child takes part, discovers what their body can do, and grows in confidence on a stage. The physical discipline of daily dance practice also carries into other parts of school life: better focus, better posture, and a sense of poise that teachers notice in the classroom long before parents see it on stage.`,
    highlights: [
      "Sprung floor with full wall mirrors",
      "Indian classical, folk and contemporary forms",
      "Performances at Annual Day and Cultural Fest",
      "Every child participates — not just selected performers",
    ],
  },
  {
    slug: "music-room",
    name: "Music Room",
    scraped: true,
    verificationStatus: "scraped",
    description: `The Music Room houses the instruments and sound equipment our students need to grow from curious beginners into confident performers. Keyboards, tabla, harmonium, guitars and percussion sit alongside a sound system used for voice practice and choral work. Music classes introduce children to Indian and Western traditions — raga, rhythm, notation and song — through weekly timetabled sessions. Younger students sing, clap rhythm patterns and begin to identify notes. From the middle years, students choose an area of focus — vocal, keyboard or percussion — and build real skill through consistent practice. A school choir draws in the strongest singers across classes, representing the school at assemblies, inter-school events and community functions. Music at KPS is taught with structure and patience. We want every student to leave school knowing at least one instrument or a handful of songs, and the best of our musicians to leave with a foundation strong enough to continue formally after school.`,
    highlights: [
      "Keyboards, tabla, harmonium, guitar, percussion",
      "Indian and Western traditions taught weekly",
      "School choir and ensemble performances",
      "Specialisation tracks in vocal, keyboard or percussion",
    ],
  },
  {
    slug: "art-room",
    name: "Fine Art Room",
    scraped: true,
    verificationStatus: "scraped",
    description: `The Fine Art Room is a generous, naturally lit studio with dedicated tables, storage for ongoing work, and materials for drawing, painting, clay modelling, print-making and a range of craft techniques. Art is timetabled for every class from Nursery through middle school, and offered as a full-fledged elective at the senior secondary stage for students who choose Fine Arts. Lessons move children gradually from basic skills — line, shape, colour, texture — into composition, perspective, art history and independent projects. Indian folk and traditional forms feature alongside world art so students develop a grounded, confident visual vocabulary. Student work is displayed through the year on corridor panels and gathered into an annual art exhibition where families see the full range of what the studio produces. For many children the art room is the part of school they remember most warmly; for a few it becomes the beginning of a serious creative pursuit that carries into college and beyond.`,
    highlights: [
      "Dedicated studio with student workstations",
      "Drawing, painting, clay modelling, printmaking, craft",
      "Fine Arts offered as elective at senior secondary",
      "Annual school art exhibition",
    ],
  },
  {
    slug: "activity-room",
    name: "Activity Room",
    scraped: true,
    verificationStatus: "scraped",
    description: `The Activity Room is where the younger classes come for storytelling circles, early learning games, role-play, puppet shows and hands-on projects that do not fit the quiet of a normal classroom. It is a deliberately cheerful space — soft flooring, open shelves of learning materials, low tables and a reading corner — designed around how children actually learn in their earliest school years. Pre-primary and primary teachers use the room for phonics play, number games, craft sessions and small-group work. Older classes use it for club meetings, interactive discussion sessions and creative writing workshops. The Activity Room is also where many whole-school initiatives take shape: birthday celebrations for the month, thematic learning days, festival workshops, and visiting-speaker sessions designed to feel informal rather than lecture-style. It is one of the rooms children ask about when they start at KPS and miss when they move on.`,
    highlights: [
      "Dedicated space for pre-primary and primary learning",
      "Storytelling, role-play, games and hands-on activities",
      "Flexible setup for club meetings and workshops",
      "Thematic learning days and festival sessions",
    ],
  },
  {
    slug: "swimming-pool",
    name: "Swimming Pool",
    scraped: true,
    verificationStatus: "scraped",
    description: `The swimming pool is one of the facilities parents remember most clearly when they visit. Built to safe depths for school use and supervised by trained staff, the pool hosts structured swimming classes across the year for students of different age groups. Beginners start with water confidence and basic floatation, moving on to stroke technique, breathing and distance work as they grow. Strong swimmers join the school's swim team for inter-house and inter-school competition. Swimming teaches children more than a stroke. It builds whole-body fitness, it teaches focus and breath control, and — crucially for any child — it is a life skill. Pool sessions are run only when staff are present; access is never unsupervised; and safety equipment, hygiene protocols and regular water maintenance are taken seriously. For many students the short walk from classroom to poolside is the highlight of the week.`,
    highlights: [
      "Safe school-appropriate depths",
      "Supervised by trained staff at all times",
      "Beginner to competitive swim team progression",
      "Regular water maintenance and hygiene checks",
    ],
  },
  {
    slug: "playground",
    name: "Playground",
    scraped: true,
    verificationStatus: "scraped",
    description: `Our playground is large enough to host football, cricket, athletics, basketball and volleyball — with room to spare for the younger children's games. Separate zones keep pre-primary play safe from senior-school practice. A running track supports sprints, middle-distance running and field-event training. Shaded spaces at the edges give younger classes somewhere to sit during games periods, and watch older students play. Inter-house matches, Annual Sports Day, training sessions with coaches and the daily games period all happen here. A good playground does a lot of quiet work for a school: it gives every child fresh air and hard running every day, it gives teams a real home ground, and it gives the whole community somewhere to gather on Sports Day. We take care of it accordingly, with regular ground maintenance and proper equipment for each sport.`,
    highlights: [
      "Multi-sport ground for football, cricket, basketball, volleyball, athletics",
      "Separate safe zone for pre-primary play",
      "Running track for sprints and field events",
      "Home ground for Annual Sports Day and inter-school matches",
    ],
  },
  {
    slug: "canteen",
    name: "School Canteen",
    scraped: true,
    verificationStatus: "scraped",
    description: `The school canteen serves wholesome, hygienically prepared snacks and meals through the school day. The menu leans deliberately towards home-style Indian food rather than fried fast food — the kind of meal a parent would be glad their child ate. Hygiene standards are strict: food preparation areas are kept clean, staff wear gloves and head covers, utensils are sanitised, and drinking water is safe and available. The seating area is generously sized so children can sit together without crowding. Pricing is kept within reach so no child feels left out at break. For younger classes teachers supervise canteen time; seniors are trusted to use the canteen during designated breaks. We recognise that what children eat at school affects how they learn through the afternoon, so the canteen is treated as part of the school — not as an outsourced convenience.`,
    highlights: [
      "Wholesome home-style Indian menu",
      "Strict hygiene and food-safety protocols",
      "Supervised canteen time for junior classes",
      "Safe drinking water available through the day",
    ],
  },
  {
    slug: "medical-room",
    name: "Medical Room",
    scraped: false,
    verificationStatus: "brief-added",
    description: `A dedicated medical room on campus handles the everyday realities of school life — a headache, a grazed knee, a mid-day fever, a sprain in the middle of a football match. The room is equipped with a first-aid station, a rest bed for children who need to lie down, standard over-the-counter supplies and a stocked emergency kit. Trained staff are available during school hours, and student health records are kept for children with known allergies or long-term conditions so the response to a minor incident is quick and informed. For anything beyond routine first aid, the school has clear protocols: the parent is contacted immediately, and the child is escorted to a nearby hospital if required. A school medical room is not a hospital, and we do not pretend otherwise — but it is the difference between a small scare handled calmly and a small scare that becomes a big one.`,
    highlights: [
      "Trained staff during school hours",
      "First-aid station and rest bed on site",
      "Student health records for known conditions",
      "Clear escalation protocols to a nearby hospital",
    ],
  },
  {
    slug: "transport",
    name: "Transport",
    scraped: false,
    verificationStatus: "brief-added",
    description: `School transport serves families across Meerut through a fleet of school-owned or approved buses running fixed routes at fixed timings. Vehicles are maintained on a regular schedule and checked before each trip. Drivers are verified and experienced with children, and a female attendant travels on each bus to supervise students, maintain discipline on board and help the youngest children at pick-up and drop-off. Every bus carries a basic first-aid kit and a working mobile number that parents can reach during transit hours. Pick-up and drop-off points, timings and route details are confirmed with families at the start of each academic year and updated if roads or residential patterns change. Parents who prefer to arrange their own transport are equally welcome, and drop-off zones at the school gate are marked and supervised at peak hours to keep arrivals and departures orderly and safe.`,
    highlights: [
      "Fixed routes across Meerut with reliable timings",
      "Verified drivers and onboard female attendants",
      "Regular vehicle maintenance and safety checks",
      "Contact numbers shared with parents for each route",
    ],
  },
  {
    slug: "auditorium",
    name: "Auditorium",
    scraped: false,
    verificationStatus: "brief-added",
    description: `The school auditorium is the gathering place for the moments that shape the year — Annual Day performances, Investiture Ceremony, Cultural Fest, guest-speaker sessions, inter-house debates and large assemblies. Sized to seat the full school community, the auditorium is equipped with a proper stage, audio and lighting systems, backstage preparation areas and comfortable seating for students, staff and visiting families. Teachers use the space for rehearsals long before the final performance, so students are used to the stage by the time their family sees them on it. Smaller events — a house meeting, a career-talk session, a workshop — also take place here on quieter days. A school auditorium does practical work: it lets the community come together without improvising a tent in the playground, and it gives student performers a stage that treats their work seriously. That attitude, in our experience, raises the quality of what happens on that stage.`,
    highlights: [
      "Seats the full school community",
      "Stage with audio and lighting systems",
      "Backstage preparation areas",
      "Venue for Annual Day, Investiture, Cultural Fest and guest talks",
    ],
  },
];
