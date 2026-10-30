// Journal posts. The intro post (/blog/welcome) has its own hand-built page;
// the content-marketing posts below are rendered by /blog/[slug].

export type Topic = "gear" | "training" | "nutrition" | "brand";

export const TOPICS: { id: Topic; label: string }[] = [
  { id: "gear", label: "How-to · Gear" },
  { id: "training", label: "Training" },
  { id: "nutrition", label: "Nutrition" },
  { id: "brand", label: "Brand" },
];

export type Post = {
  slug: string;
  num: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  readTime: string;
  author: string;
  topics: Topic[];
  topicLabel: string;
  deck: string; // one-line subtitle
  excerpt: string; // card + meta description
  keywords: string[];
  lead?: string;
  sections?: { id: string; title: string; paragraphs: string[]; figure?: "wrap" | "block" }[];
  gear?: string[]; // product slugs shown in "Gear in this post"
  cta?: { eyebrow: string; title: string; href: string; label: string };
};

export const welcomePost = {
  slug: "welcome",
  title: "Built for the last rep",
  date: "2026-10-04",
  dateLabel: "Oct 4, 2026",
  readTime: "4 min",
  author: "The Rep Theory team",
  deck: "Who we are, why we care about the rep you want to skip, and what we're building first.",
  excerpt:
    "Who we are, why we care about the rep you want to skip, and what we're building first: gear for your grip and wrists, and plans that make every rep count.",
  quote: "We wanted gear we'd actually use, for the rep we usually skip.",
  // Same ids the homepage "In this post" links point to
  sections: [
    { id: "who-we-are", title: "Who we are" },
    { id: "why-the-last-rep", title: "Why the last rep" },
    { id: "what-we-sell", title: "What we sell" },
    { id: "whats-next", title: "What's next" },
  ],
};

const AUTHOR = "The Rep Theory team";

export const posts: Post[] = [
  {
    slug: "how-to-set-up-lifting-straps",
    num: "02",
    title: "How to set up lifting straps",
    date: "2026-10-29",
    dateLabel: "Oct 29, 2026",
    readTime: "5 min",
    author: AUTHOR,
    topics: ["gear"],
    topicLabel: "How-to · Gear",
    deck: "Three steps, one common mistake, and when you shouldn't use straps at all.",
    excerpt:
      "How to put on lifting straps in under ten seconds: the three-step setup, the wrap-direction mistake most lifters make, and when to leave straps in your bag.",
    keywords: [
      "how to use lifting straps",
      "lifting straps setup",
      "lifting straps for deadlifts",
      "grip strength",
    ],
    lead: "If your grip quits before your back does, you're leaving reps on the table. Here's how to set up straps properly in under ten seconds.",
    sections: [
      {
        id: "why",
        title: "Why straps",
        paragraphs: [
          "On a heavy row, shrug or deadlift, your grip usually gives out before the muscles you're actually training. The set ends, but your back still had reps left. Straps fix that weak link: they lock your hands to the bar so your lats and upper back decide when the set is over, not your forearms.",
          "That doesn't mean grip doesn't matter. It means you train grip on purpose, with holds and lighter sets, and you use straps when the goal is the bigger muscle.",
        ],
      },
      {
        id: "setup",
        title: "The 3-step setup",
        figure: "wrap",
        paragraphs: [
          "1. Make the cuff. Thread the strap through its own loop so it forms a cuff. Slide your hand through so the tail runs across your palm toward your thumb.",
          "2. Wrap away from you. Lay the tail under the bar and wrap it around, away from your body, once or twice. Wrapping the wrong way is the most common mistake: the strap loosens as you pull instead of tightening.",
          "3. Twist and grip. Roll the bar toward you to cinch the strap tight, then close your hand over the top. Your fingers still grip; the strap simply takes over as they start to fade.",
        ],
      },
      {
        id: "when",
        title: "When not to use them",
        paragraphs: [
          "Skip straps on warm-up sets, so your grip still gets trained. Avoid them on lifts where you may need to drop the bar quickly, like cleans and snatches. If you're new to lifting, build basic grip strength first.",
          "Save straps for the top sets of rows, pull-downs, shrugs and deadlifts, where the last few reps matter most. For very heavy pulls, figure-8 straps lock you in even more securely.",
        ],
      },
    ],
    gear: ["custom-lifting-straps", "figure-8-straps"],
    cta: {
      eyebrow: "Try it on your next pull day",
      title: "Custom Lifting Straps · $34",
      href: "/equipment/custom-lifting-straps",
      label: "Shop straps",
    },
  },
  {
    slug: "deload-weeks-explained",
    num: "03",
    title: "Deload weeks, explained",
    date: "2026-10-29",
    dateLabel: "Oct 29, 2026",
    readTime: "4 min",
    author: AUTHOR,
    topics: ["training"],
    topicLabel: "Training",
    deck: "Why the easiest week of your block is the one that makes the next one work.",
    excerpt:
      "What a deload week is, why it helps you get stronger, how to run one without losing progress, and the signs you're due for one.",
    keywords: [
      "deload week",
      "what is a deload",
      "how to deload",
      "hypertrophy program deload",
    ],
    lead: "A deload looks like a step backwards. It's the week that lets your hard weeks actually pay off.",
    sections: [
      {
        id: "what",
        title: "What a deload is",
        paragraphs: [
          "A deload is a planned lighter week, usually every four to eight weeks of hard training. You still go to the gym and do the same lifts, just with less total work, so your body can catch up on recovery.",
          "In our Hypertrophy program it's week 6 and week 12. In Cutting, week 6 is a diet break instead: food goes back up to maintenance while training eases off.",
        ],
      },
      {
        id: "why",
        title: "Why it works",
        paragraphs: [
          "Training builds fitness and fatigue at the same time. Over a block, fatigue builds faster than you can clear it, and it hides how strong you've actually become. Joints and tendons also recover more slowly than muscle.",
          "A deload drops the fatigue while keeping the skill and strength you built. Most lifters come out of one feeling sharper, and often hit a rep or two more the following week.",
        ],
      },
      {
        id: "how",
        title: "How to run one",
        figure: "block",
        paragraphs: [
          "Keep the same exercises and roughly the same weights, but cut your sets by about a third to a half. Stop each set well short of failure, with three or four reps left in the tank.",
          "Don't use the week to test maxes or try a new program. Sleep, eat normally and treat it as practice. You should leave every session feeling like you could have done more. That's the point.",
        ],
      },
      {
        id: "signs",
        title: "Signs you need one",
        paragraphs: [
          "Your top sets stall or go backwards two sessions in a row, warm-ups feel heavy, your joints ache in a way that isn't normal soreness, or you're dreading sessions you usually enjoy. If your program doesn't have a deload built in, those are your cue to take one.",
        ],
      },
    ],
    gear: ["wrist-wraps", "barbell-clips"],
    cta: {
      eyebrow: "Deloads already built in",
      title: "Hypertrophy · 12-week plan · $49",
      href: "/programs/hypertrophy-program",
      label: "See the program",
    },
  },
  {
    slug: "cutting-without-losing-strength",
    num: "04",
    title: "Cutting without losing strength",
    date: "2026-10-29",
    dateLabel: "Oct 29, 2026",
    readTime: "5 min",
    author: AUTHOR,
    topics: ["nutrition", "training"],
    topicLabel: "Nutrition + Training",
    deck: "Keep the bar heavy, the deficit modest and the protein high. Here's how.",
    excerpt:
      "How to lose fat while keeping your strength and muscle: a modest calorie deficit, high protein, heavy training and a smarter timeline.",
    keywords: [
      "cutting without losing muscle",
      "how to cut and keep strength",
      "fat loss for lifters",
      "cutting program",
    ],
    lead: "Most lifters lose strength on a cut because they cut too fast and train too light. Fix those two things and the bar can stay heavy the whole way down.",
    sections: [
      {
        id: "pace",
        title: "Go slower than you want to",
        paragraphs: [
          "The faster you lose weight, the more of that weight tends to be muscle. A common guideline for lifters is to lose roughly half a percent to one percent of body weight per week. It feels slow, but it's how you keep the muscle you worked for.",
          "That's why our Cutting program runs 12 weeks, not 6, with a diet-break week in the middle to give your training and your head a reset.",
        ],
      },
      {
        id: "protein",
        title: "Keep protein high",
        paragraphs: [
          "Protein is the nutrient that protects muscle in a deficit, and it keeps you fuller on fewer calories. Spread it across three or four meals with a solid source at each one: eggs, Greek yogurt, chicken, fish, tofu, beans, or a shake when you're short on time.",
          "Your exact needs depend on your body, training and health. The program starts with a calorie and intake assessment to set yours.",
        ],
      },
      {
        id: "training",
        title: "Train heavy, trim the volume",
        paragraphs: [
          "Heavy sets are the signal that tells your body the muscle is still needed, so keep your main lifts heavy, in the three to eight rep range. What you can trim is volume: drop an accessory set or two when recovery gets harder late in the cut.",
          "Cardio helps, but walking is your friend. It burns energy without eating into recovery for your lifting sessions.",
        ],
      },
      {
        id: "expect",
        title: "What to expect",
        paragraphs: [
          "Some strength dips in the final weeks are normal as you get leaner, especially on bodyweight-heavy lifts. If your main lifts drop sharply early on, the deficit is probably too aggressive.",
          "This is general guidance, not a personal plan. If you have a medical condition or a history of disordered eating, talk to a doctor or registered dietitian first.",
        ],
      },
    ],
    gear: ["custom-lifting-straps", "wrist-wraps"],
    cta: {
      eyebrow: "12 weeks · diet break built in",
      title: "Cutting program · $45",
      href: "/programs/cutting-program",
      label: "See the program",
    },
  },
];

/** Everything for the journal list, newest first (intro post last) */
export const allPosts: {
  slug: string;
  num: string;
  title: string;
  dateLabel: string;
  date: string;
  readTime: string;
  topics: Topic[];
  topicLabel: string;
  excerpt: string;
}[] = [
  ...posts,
  {
    ...welcomePost,
    num: "01",
    topics: ["brand"],
    topicLabel: "Introductory",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const CONTACT_EMAIL = "hello@reptheory.ca";
export const PRIVACY_EMAIL = "privacy@reptheory.ca";
