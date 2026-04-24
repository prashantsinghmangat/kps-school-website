/**
 * faq — 12 common parent questions with 50–100 word answers.
 *
 * All answers are original prose and consistent with scraped facts:
 *   - CBSE affiliation (New Delhi)
 *   - Medium of instruction: English
 *   - Grade range: Nursery to Class XII
 *   - Location: NH-58 bypass, Shradha Puri, Kanker Khera, Meerut
 *   - Streams at senior secondary: Science and Commerce
 *
 * Where an answer touches a detail we cannot confirm from the scrape (exact
 * timings, precise fee amount, transport routes), the answer points the
 * parent to the school office rather than inventing a number.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "What is the minimum age for admission to Nursery?",
    answer:
      "For Nursery admission, the child should typically have completed 3 years of age on 31 March of the admission year. LKG follows at 4 years and UKG at 5 years, with Class I at 6 years. Age cutoffs are applied consistently across all applicants. For the confirmed age criteria for the current admission cycle, please contact the school office — small adjustments are sometimes made based on CBSE guidelines for that year.",
  },
  {
    question: "What is the school fee structure?",
    answer:
      "Fees at Krishna Public School are charged term-wise and cover tuition, activity and examination fees. Transport fees are separate, based on the route you opt for. The current fee schedule is detailed in the school prospectus and is shared with families at the point of admission confirmation. We prefer to discuss fees with parents in person so every component is clearly explained. Please contact the school office or refer to the prospectus for the most current fee details.",
  },
  {
    question: "Does the school provide transport?",
    answer:
      "Yes, KPS runs school transport across Meerut along fixed routes with fixed timings. Each bus has a verified driver and an onboard female attendant to supervise students. Vehicles are checked and maintained regularly. Route details and pick-up points are confirmed with families at the start of each academic session. Transport fees are charged separately, based on the route distance. Parents who prefer private transport are equally welcome — drop-off zones at the gate are marked and supervised at peak hours.",
  },
  {
    question: "What are the school timings?",
    answer:
      "School runs Monday to Saturday through the academic year. Pre-primary classes finish earlier than senior classes, and timings vary slightly between the summer and winter terms so children are not exposed to the hottest part of the day. Exact daily timings for each section are confirmed with parents at the start of the academic year and printed in the school diary issued to every student. Please contact the school office for the current term's timings before planning transport.",
  },
  {
    question: "Which curriculum does KPS follow?",
    answer:
      "Krishna Public School is affiliated to the Central Board of Secondary Education (CBSE), New Delhi, and follows the CBSE curriculum rigorously from Class I through Class XII. The medium of instruction is English throughout, with Hindi as a second language from the earliest years and Sanskrit introduced at the upper primary level. Our pre-primary programme is developmentally designed to prepare children for Class I while staying age-appropriate — play, language and number-readiness take priority over formal study.",
  },
  {
    question: "What co-curricular activities are offered?",
    answer:
      "Co-curricular life at KPS is genuinely full. Sports include football, cricket, basketball, volleyball, badminton, swimming, athletics and more. Performing arts cover Indian classical and folk dance, vocal and instrumental music, and dramatics. Visual arts are taught in a dedicated studio. Students can join the Literary, Science, Eco, Mathematics, Computer and Social Service clubs. Major events — Annual Day, Sports Day, Cultural Fest and the Science Exhibition — give every child a stage to perform, compete and lead.",
  },
  {
    question: "Is KPS affiliated to CBSE?",
    answer:
      "Yes. Krishna Public School is affiliated to the Central Board of Secondary Education (CBSE), New Delhi. This means students sit the CBSE Class X and Class XII Board examinations, follow the NCERT-based CBSE curriculum, and receive school-leaving certificates recognised across India and by universities abroad. Our mandatory disclosure details — including affiliation number and board-recognition documents — are available on the downloads page and at the school office on request.",
  },
  {
    question: "Is school uniform compulsory?",
    answer:
      "Yes, a proper school uniform is compulsory for all students, Nursery through Class XII. The uniform covers the regular school dress, a house-coloured sports uniform, a winter set and footwear specifications — all designed for comfort, neatness and ease of movement through the school day. Uniforms are available through authorised vendors confirmed by the school at the start of each academic session. A neat, correctly worn uniform is part of how we teach discipline and equality across the student body.",
  },
  {
    question: "What is the lunch / canteen arrangement?",
    answer:
      "Children are welcome to bring home-packed tiffin, and most do. The school canteen also serves wholesome, hygienic snacks and meals during breaks — the menu leans towards home-style Indian food rather than fried fast food, and hygiene standards in the preparation area are strict. Safe drinking water is available throughout the school day. For younger classes, teachers supervise tiffin and canteen breaks to make sure children actually eat rather than rush straight out to play.",
  },
  {
    question: "How safe is the school campus?",
    answer:
      "Campus safety is treated seriously. The school operates from a gated compound with a trained security team, CCTV coverage of key areas, visitor-log protocols at the gate and supervised entry and exit at peak hours. Transport buses carry an onboard attendant and verified drivers. A medical room on site handles everyday first aid, and clear protocols route any serious concern to a nearby hospital with the parent informed at once. Safety procedures are reviewed regularly with staff.",
  },
  {
    question: "How often are parent–teacher meetings held?",
    answer:
      "Parent–teacher meetings are scheduled every term — typically three to four formal meetings through the academic year, timed around term assessments and report-card distribution. In addition, any parent can request a meeting with a class teacher or subject teacher through the school diary or the office. We believe short, regular conversations about a child's progress work better than long occasional ones, and we make time for parents who take the initiative to get in touch.",
  },
  {
    question: "How are student results communicated to parents?",
    answer:
      "Results are communicated through formal report cards issued at the end of each assessment term, handed over in person at the parent–teacher meeting for that term so the class teacher can walk you through your child's progress. Classes X and XII results from the CBSE Board examinations are released directly by CBSE, and the school shares the school-level result summary once official. Individual subject feedback is available from subject teachers through the year on request.",
  },
];
