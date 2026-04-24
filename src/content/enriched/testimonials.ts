// PLACEHOLDER — replace with real testimonials.
//
// These six testimonials are generic placeholders written to match the tone
// and demographic of a CBSE school in western UP. They are NOT attributed to
// real parents, students or alumni. Before go-live the school office must
// collect consented testimonials and replace this file entirely. Only use
// attributed quotes with explicit consent — do not ship these to production.

export interface Testimonial {
  quote: string;
  author: string;
  role: "parent" | "student" | "alumni";
  /** Sub-role detail, e.g. "Parent of Class V student" or "Class of 2022". */
  detail: string;
  /** Optional image URL — leave null for placeholders. */
  image: string | null;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "What we value most is how well the teachers know our daughter. At parent–teacher meetings we hear specifics — what she did well, what she's working on, how she treats her classmates. That level of attention is rare and it has made a real difference to her confidence.",
    author: "PLACEHOLDER — Parent, Class V",
    role: "parent",
    detail: "Parent of a Class V student",
    image: null,
  },
  {
    quote:
      "I came to KPS for Class VI and I still remember how quickly it felt like my school. The co-curricular life is what surprised me — art, music and the playground are as serious here as the classroom, and that balance is exactly what I needed at that age.",
    author: "PLACEHOLDER — Alumnus, Class of 2022",
    role: "alumni",
    detail: "Alumnus, Class of 2022",
    image: null,
  },
  {
    quote:
      "Both my children study here and the consistency across sections is what I appreciate. The school doesn't run a 'star section' and a 'rest'. Every classroom has the same standards, the same discipline and the same teachers invested in the children.",
    author: "PLACEHOLDER — Parent of two KPS students",
    role: "parent",
    detail: "Parent of two KPS students",
    image: null,
  },
  {
    quote:
      "I joined the swim team in Class IV and it changed how I saw myself. I wasn't the child anyone expected to compete — but the coaching and the support meant I walked out of school with medals and, more importantly, with real fitness and discipline that I carry today.",
    author: "PLACEHOLDER — Alumna, Class of 2020",
    role: "alumni",
    detail: "Alumna, Class of 2020",
    image: null,
  },
  {
    quote:
      "Class XI and XII were demanding, but our teachers went above the syllabus whenever we needed it. I could walk into the staff room with a doubt and walk out with a clear answer. That made the difference between scraping through boards and actually understanding the subjects.",
    author: "PLACEHOLDER — Student, Class XII",
    role: "student",
    detail: "Class XII — Science stream",
    image: null,
  },
  {
    quote:
      "We moved to Meerut from another city and were anxious about the transition. The school office was patient with our endless questions, the class teacher met our son on day one, and within a month he was asking to stay late for his club. That welcome mattered.",
    author: "PLACEHOLDER — Parent, Class VII",
    role: "parent",
    detail: "Parent of a Class VII student",
    image: null,
  },
];
