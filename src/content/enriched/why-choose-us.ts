/**
 * why-choose-us — 6 original parent-facing differentiators for the homepage.
 *
 * Each item carries the name of a lucide-react icon (see https://lucide.dev).
 * The frontend imports icons by name at render time so this file stays a pure
 * content module.
 */

export interface WhyChooseUsItem {
  /** Name of a lucide-react icon. Must exist in the installed lucide-react version. */
  icon: string;
  title: string;
  /** 40–60 word blurb, parent-facing. */
  description: string;
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    icon: "GraduationCap",
    title: "CBSE Curriculum, Taught with Depth",
    description:
      "Every class follows the Central Board of Secondary Education framework, delivered by teachers who have the time and training to teach for understanding. Concepts are built up gradually, revisited across years, and connected to real contexts — so children carry forward not just marks but working knowledge.",
  },
  {
    icon: "Users",
    title: "Experienced, Committed Faculty",
    description:
      "Our teachers are chosen for two qualities: subject mastery and patience with children. They mentor small sections, know each student's strengths, and meet parents regularly. Continuous in-house training keeps teaching practice current with CBSE guidelines, pedagogy research and the evolving needs of school-age learners.",
  },
  {
    icon: "Laptop",
    title: "Smart Classrooms & Digital Learning",
    description:
      "Digi-classrooms supplement the blackboard with interactive visuals, audio, video and simulations. A well-equipped computer centre gives every student hands-on coding and digital-literacy time from the primary years. Technology supports learning; it does not replace the teacher or the conversation between teacher and child.",
  },
  {
    icon: "Trophy",
    title: "Sports, Fitness & the Swimming Pool",
    description:
      "Daily physical education, a wide playground, a swimming pool and coaches for individual and team sports give every child a genuine chance to move, compete and grow stronger. We believe fitness, teamwork and the lessons of winning and losing belong as firmly in school life as any textbook.",
  },
  {
    icon: "Palette",
    title: "Arts, Music, Dance & Culture",
    description:
      "Dedicated art, music and dance rooms mean creative learning is timetabled, not optional. Students explore visual art, classical and folk music, dance forms and dramatics as part of their school week, culminating in annual productions, exhibitions and cultural events the whole community looks forward to.",
  },
  {
    icon: "ShieldCheck",
    title: "Safety, Transport & Peace of Mind",
    description:
      "A secure, gated campus, trained support staff, CCTV coverage and verified drivers on school transport routes let parents send their children with confidence. A medical room on site and clear drop-off and pick-up protocols mean small incidents are handled calmly and promptly, the moment they arise.",
  },
];
