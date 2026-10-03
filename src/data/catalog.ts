import type { DrawingKind } from "@/components/ProductDrawing";

// Single source of truth for everything Rep Theory sells.
// The home page, Equipment and Programs pages, detail pages and (in A2) the cart all read from here.

export type Colour = { name: string; hex: string };

/** A non-colour choice shown as buttons on the detail page (size, stiffness…) */
export type Choice = { label: string; options: string[] };

export type ProgramDetails = {
  format: string; // tag above the name, e.g. "Digital · PDF + tracker"
  goal: string;
  who: string;
  includes: string[];
  scheduleLabel: string; // "Sample week" or "How it works"
  schedule: { label: string; focus: string }[]; // short version for the homepage panel
  cta: string;
  /** 12-week style block shown on the program sheet (not used for coaching) */
  block?: {
    weeks: number;
    segments: { label: string; weeks: number; accent?: boolean }[];
    note: string;
  };
  /** Full sample week with exercises and the gear that helps on each day */
  week?: { day: string; focus: string; lifts: string; gear: string[] }[];
  /** Example day of eating (hypertrophy and cutting only) */
  meals?: {
    note: string;
    day: { time: string; meal: string; food: string; why: string }[];
  };
  faqs: { q: string; a: string }[];
};

export type Product = {
  slug: string;
  code: string; // drawing label, e.g. "RT-01"
  name: string;
  price: number; // CAD
  priceNote?: string; // e.g. "/mo"
  spec: string; // the mono label shown under the name
  description: string; // one line, used on cards
  longDescription?: string; // paragraph on the detail page
  options: string[]; // becomes product variants in A2
  custom?: boolean; // shows the CUSTOM tag and the embroidery field
  customLabel?: string; // label for the embroidery field
  colours?: Colour[];
  choices?: Choice[];
  drawing?: DrawingKind; // blueprint line drawing used instead of a photo
  specs?: { label: string; value: string }[];
  howTo?: string[];
  related?: string[]; // slugs
  details?: ProgramDetails; // programs only
};

export type Category = {
  id: string;
  num: string;
  name: string;
  summary: string;
  pitch: string;
  products: Product[];
};

// Placeholder colourways until the real products are confirmed
const BLACK: Colour = { name: "Black", hex: "#0e0e0e" };
const CHALK: Colour = { name: "Chalk", hex: "#eceae4" };
const ORANGE: Colour = { name: "Orange", hex: "#ff5a1f" };
const NAVY: Colour = { name: "Navy", hex: "#1f2a44" };
const OLIVE: Colour = { name: "Olive", hex: "#4b5320" };

const CARE = "Hand wash cold, air dry";

export const categories: Category[] = [
  {
    id: "straps",
    num: "01",
    name: "Straps",
    summary: "Custom · Figure-8",
    pitch: "Take grip out of the equation.",
    products: [
      {
        slug: "custom-lifting-straps",
        code: "RT-01",
        drawing: "straps",
        name: "Custom Lifting Straps",
        price: 34,
        spec: "38 mm · Cotton · Embroidered",
        description:
          "Padded 60 cm cotton straps with your name or initials embroidered.",
        longDescription:
          "Padded 60 cm cotton straps that take grip out of the equation on heavy pulls, so your back and lats decide when the set ends. Add your name or initials and they're yours.",
        options: ["Colour", "Embroidery"],
        custom: true,
        customLabel: "Embroidery text",
        colours: [BLACK, CHALK, ORANGE, NAVY, OLIVE],
        specs: [
          { label: "Width", value: "38 mm" },
          { label: "Length", value: "60 cm" },
          { label: "Material", value: "Heavy cotton, padded wrist section" },
          { label: "Embroidery", value: "Up to 12 letters, numbers or spaces" },
          { label: "Colours", value: "Black, Chalk, Orange, Navy, Olive" },
          { label: "Care", value: CARE },
        ],
        howTo: [
          "Thread the strap through its loop to make a cuff around your wrist.",
          "Wrap the tail under and around the bar, away from you.",
          "Twist to tighten, grip over the strap, and pull.",
        ],
        related: ["figure-8-straps", "wrist-wraps", "barbell-clips"],
      },
      {
        slug: "figure-8-straps",
        code: "RT-02",
        drawing: "figure8",
        name: "Figure-8 Straps",
        price: 30,
        spec: "S / M / L · Heavy cotton",
        description: "A locked grip for heavy deadlifts and shrugs.",
        longDescription:
          "Two loops, one locked grip. Figure-8 straps hold the bar for you on your heaviest pulls, so you can take deadlifts, rack pulls and shrugs past where your hands would give out.",
        options: ["Size", "Colour"],
        colours: [BLACK, NAVY, OLIVE],
        choices: [{ label: "Size", options: ["S", "M", "L"] }],
        specs: [
          { label: "Sizes", value: "S, M, L (sized by wrist)" },
          { label: "Material", value: "Heavy cotton" },
          { label: "Stitching", value: "Box-stitched centre" },
          { label: "Best for", value: "Deadlifts, rack pulls, shrugs" },
          { label: "Colours", value: "Black, Navy, Olive" },
          { label: "Care", value: CARE },
        ],
        howTo: [
          "Slide one loop over your hand onto your wrist.",
          "Pass the other loop under the bar and back over your hand.",
          "Close your grip over both loops and lift.",
        ],
        related: ["custom-lifting-straps", "barbell-clips", "wrist-wraps"],
      },
    ],
  },
  {
    id: "wraps",
    num: "02",
    name: "Wraps",
    summary: "Stiff · Flexible",
    pitch: "Stacked wrists under heavy presses.",
    products: [
      {
        slug: "wrist-wraps",
        code: "RT-03",
        drawing: "wraps",
        name: "Wrist Wraps",
        price: 28,
        spec: "60 cm · Stiff / Flex · Thumb loop",
        description: "Wrist support for heavy pressing, in two stiffnesses.",
        longDescription:
          "Wraps keep your wrists stacked over your forearms under heavy bench and overhead work. Pick stiff for maximum support on top sets, or flexible for volume days.",
        options: ["Stiffness", "Colour"],
        colours: [BLACK, CHALK, ORANGE],
        choices: [{ label: "Stiffness", options: ["Stiff", "Flexible"] }],
        specs: [
          { label: "Length", value: "60 cm" },
          { label: "Stiffness", value: "Stiff or flexible" },
          { label: "Closure", value: "Hook-and-loop with thumb loop" },
          { label: "Best for", value: "Bench, overhead press, dips" },
          { label: "Colours", value: "Black, Chalk, Orange" },
          { label: "Care", value: CARE },
        ],
        howTo: [
          "Put your thumb through the loop and line the wrap up with your wrist joint.",
          "Wrap tightly, working up from the joint toward your hand.",
          "Close the hook-and-loop, then slip your thumb out before you lift.",
        ],
        related: [
          "custom-lifting-straps",
          "custom-tricep-rope",
          "barbell-clips",
        ],
      },
    ],
  },
  {
    id: "attachments",
    num: "03",
    name: "Attachments",
    summary: "Lat bar · Tricep rope",
    pitch: "Full stretch on every cable rep.",
    products: [
      {
        slug: "neutral-grip-lat-bar",
        code: "RT-04",
        drawing: "latbar",
        name: "Neutral-Grip Lat Bar",
        price: 65,
        spec: "Close / Wide · Rubber grip",
        description:
          "A MAG-style neutral-grip handle that fits any cable machine.",
        longDescription:
          "A MAG-style handle with palms-facing grips that lets you pull through a fuller range of motion on pulldowns and rows. Choose close for lower lats or wide for upper back.",
        options: ["Grip width", "Colour"],
        colours: [BLACK, ORANGE],
        choices: [{ label: "Grip width", options: ["Close", "Wide"] }],
        specs: [
          { label: "Grip", value: "Neutral (palms facing), close or wide" },
          { label: "Handles", value: "Rubber-coated" },
          { label: "Fits", value: "Any standard cable carabiner" },
          { label: "Frame", value: "Powder-coated steel" },
          { label: "Best for", value: "Pulldowns, seated rows" },
          { label: "Colours", value: "Black, Orange" },
        ],
        howTo: [
          "Clip the bar to the cable and pick close or wide grip.",
          "Sit tall with your chest up and arms fully stretched.",
          "Pull to your upper chest, then control it all the way back up.",
        ],
        related: [
          "custom-tricep-rope",
          "custom-lifting-straps",
          "figure-8-straps",
        ],
      },
      {
        slug: "custom-tricep-rope",
        code: "RT-05",
        drawing: "rope",
        name: "Custom Tricep Rope",
        price: 38,
        spec: "70 / 90 cm · Braided nylon",
        description:
          "Braided nylon rope with heavy end stops and a custom tag.",
        longDescription:
          "A braided nylon rope with heavy end stops that let you split the rope wide at the bottom of every pushdown. The 90 cm length gives extra room for overhead extensions and face pulls. Add your name to the tag.",
        options: ["Length", "Colour", "Embroidered tag"],
        custom: true,
        customLabel: "Tag text",
        colours: [BLACK, CHALK, ORANGE],
        choices: [{ label: "Length", options: ["70 cm", "90 cm"] }],
        specs: [
          { label: "Length", value: "70 cm or 90 cm" },
          { label: "Material", value: "Braided nylon" },
          { label: "Ends", value: "Heavy rubber stops" },
          { label: "Tag", value: "Embroidered, up to 12 characters" },
          {
            label: "Best for",
            value: "Pushdowns, face pulls, overhead extensions",
          },
          { label: "Colours", value: "Black, Chalk, Orange" },
        ],
        howTo: [
          "Clip the rope to the cable at chest height.",
          "Push down and split the ends apart at the bottom.",
          "Control the rope back up until your forearms pass parallel.",
        ],
        related: [
          "neutral-grip-lat-bar",
          "wrist-wraps",
          "custom-lifting-straps",
        ],
      },
    ],
  },
  {
    id: "clips",
    num: "04",
    name: "Clips",
    summary: "50 mm Olympic",
    pitch: "Plates stay put.",
    products: [
      {
        slug: "barbell-clips",
        code: "RT-06",
        drawing: "clips",
        name: "Barbell Clips",
        price: 24,
        spec: "Pair · Quick-lock · 50 mm",
        description: "Quick-lock collars that fit any Olympic bar.",
        longDescription:
          "Quick-lock collars that snap on in a second and keep plates tight against each other, so nothing shifts on your top set.",
        options: ["Colour"],
        colours: [BLACK, ORANGE, CHALK],
        specs: [
          { label: "Fits", value: "50 mm Olympic bar sleeves" },
          { label: "Sold as", value: "A pair" },
          { label: "Lock", value: "Quick-lock lever" },
          { label: "Lining", value: "Rubber-lined grip" },
          { label: "Colours", value: "Black, Orange, Chalk" },
        ],
        howTo: [
          "Open the lever and slide the clip onto the sleeve.",
          "Push it flush against your outside plate.",
          "Snap the lever closed. Repeat on the other side.",
        ],
        related: ["custom-lifting-straps", "figure-8-straps", "wrist-wraps"],
      },
    ],
  },
  {
    id: "programs",
    num: "05",
    name: "Programs",
    summary: "Hypertrophy · Cutting · Strength · 1:1",
    pitch: "Digital plans + 1:1 coaching.",
    products: [
      {
        slug: "hypertrophy-program",
        code: "RT-P01",
        name: "Hypertrophy",
        price: 49,
        spec: "12 wk · 5 d/wk",
        description: "Build muscle with progressive volume.",
        options: [],
        related: ["one-on-one-coaching", "wrist-wraps", "custom-tricep-rope"],
        details: {
          format: "Digital · PDF + tracker",
          goal: "Add muscle across your whole body with progressive volume you can track week to week.",
          who: "Lifters with at least six months of training who want visible size, not just strength.",
          includes: [
            "12-week plan (PDF)",
            "Spreadsheet tracker",
            "Built-in deload weeks",
            "Exercise swap guide",
            "Calorie + intake assessment",
            "Nutrition guidelines + sample day",
          ],
          scheduleLabel: "Sample week",
          schedule: [
            { label: "Mon", focus: "Push" },
            { label: "Tue", focus: "Pull" },
            { label: "Wed", focus: "Legs" },
            { label: "Thu", focus: "Upper" },
            { label: "Fri", focus: "Lower" },
          ],
          cta: "Buy program",
          block: {
            weeks: 12,
            segments: [
              { label: "Phase 1 · Base volume", weeks: 5 },
              { label: "Deload", weeks: 1, accent: true },
              { label: "Phase 2 · Overload", weeks: 5 },
              { label: "Deload", weeks: 1, accent: true },
            ],
            note: "Volume climbs week to week in each phase, then a lighter deload week lets you recover before the next push.",
          },
          week: [
            {
              day: "Mon",
              focus: "Push",
              lifts:
                "Bench press · Incline dumbbell press · Overhead press · Lateral raise · Rope pushdown",
              gear: ["wrist-wraps", "custom-tricep-rope"],
            },
            {
              day: "Tue",
              focus: "Pull",
              lifts:
                "Barbell row · Neutral-grip pulldown · Seated cable row · Rear-delt fly · Curls",
              gear: ["custom-lifting-straps", "neutral-grip-lat-bar"],
            },
            {
              day: "Wed",
              focus: "Legs",
              lifts:
                "Back squat · Romanian deadlift · Leg press · Leg curl · Calf raise",
              gear: ["custom-lifting-straps", "barbell-clips"],
            },
            {
              day: "Thu",
              focus: "Upper",
              lifts:
                "Incline bench · Chin-up · Dumbbell shoulder press · Cable row · Arms",
              gear: ["wrist-wraps"],
            },
            {
              day: "Fri",
              focus: "Lower",
              lifts:
                "Deadlift · Front squat · Walking lunge · Hamstring curl · Core",
              gear: ["custom-lifting-straps", "barbell-clips"],
            },
          ],
          meals: {
            note: "Eat in a small surplus with protein at every meal, so the extra energy goes toward building muscle.",
            day: [
              { time: "07:30", meal: "Breakfast", food: "Oats with milk, berries and a scoop of whey; two eggs", why: "Protein + slow carbs to start the day" },
              { time: "12:30", meal: "Lunch", food: "Chicken, rice and roasted vegetables", why: "A balanced plate: protein, carbs, fibre" },
              { time: "16:00", meal: "Pre-workout", food: "Greek yogurt with honey and a banana", why: "Easy carbs for energy, a little protein" },
              { time: "19:00", meal: "Dinner", food: "Salmon or lean beef, potatoes, salad", why: "Protein + carbs to recover from training" },
              { time: "21:30", meal: "Snack", food: "Cottage cheese or a protein shake, a handful of nuts", why: "Slow protein before bed" },
            ],
          },
          faqs: [
            {
              q: "Do I need a full gym?",
              a: "Yes. The plan uses barbells, dumbbells and cable machines. The exercise swap guide covers alternatives if your gym is missing something.",
            },
            {
              q: "Can a beginner run this?",
              a: "It's built for lifters with about six months of consistent training. If you're newer, start with 1:1 coaching so the volume is set for you.",
            },
            {
              q: "What if I miss a session?",
              a: "Pick up where you left off. The tracker counts sessions, not calendar days, so the plan simply moves back a day.",
            },
            {
              q: "How do I get the program?",
              a: "Right after checkout you get a download link for the PDF and the spreadsheet tracker. Checkout opens with our next update.",
            },
          ],
        },
      },
      {
        slug: "cutting-program",
        code: "RT-P02",
        name: "Cutting",
        price: 45,
        spec: "12 wk · 4 d/wk",
        description: "Keep your muscle while you lose fat.",
        options: [],
        related: [
          "one-on-one-coaching",
          "custom-lifting-straps",
          "wrist-wraps",
        ],
        details: {
          format: "Digital · PDF + tracker",
          goal: "Keep your strength and muscle while you lose fat, with twelve weeks to do it properly.",
          who: "Lifters with a solid training base, about six months or more, starting a fat-loss phase.",
          includes: [
            "12-week training plan (PDF)",
            "Calorie + intake assessment",
            "Nutrition guidelines + sample day",
            "Weekly check-in template",
            "Spreadsheet tracker",
          ],
          scheduleLabel: "Sample week",
          schedule: [
            { label: "Mon", focus: "Upper" },
            { label: "Tue", focus: "Lower" },
            { label: "Thu", focus: "Upper" },
            { label: "Fri", focus: "Lower" },
          ],
          cta: "Buy program",
          block: {
            weeks: 12,
            segments: [
              { label: "Phase 1 · Hold strength", weeks: 5 },
              { label: "Diet break", weeks: 1, accent: true },
              { label: "Phase 2 · Hold the line", weeks: 5 },
              { label: "Review", weeks: 1, accent: true },
            ],
            note: "A slow, steady cut keeps the signal to hold muscle. A diet-break week at maintenance halfway through gives your body a reset before phase two.",
          },
          week: [
            {
              day: "Mon",
              focus: "Upper",
              lifts:
                "Bench press · Barbell row · Overhead press · Pulldown · Rope pushdown",
              gear: ["wrist-wraps", "custom-tricep-rope"],
            },
            {
              day: "Tue",
              focus: "Lower",
              lifts: "Back squat · Romanian deadlift · Leg press · Calf raise",
              gear: ["barbell-clips", "custom-lifting-straps"],
            },
            {
              day: "Thu",
              focus: "Upper",
              lifts:
                "Incline bench · Chin-up · Seated cable row · Lateral raise",
              gear: ["neutral-grip-lat-bar"],
            },
            {
              day: "Fri",
              focus: "Lower",
              lifts: "Deadlift · Split squat · Hamstring curl · Core",
              gear: ["custom-lifting-straps", "barbell-clips"],
            },
          ],
          meals: {
            note: "Eat in a moderate deficit while keeping protein high, so you lose fat without giving up muscle.",
            day: [
              { time: "07:30", meal: "Breakfast", food: "Egg-white omelette with spinach, one slice of whole-grain toast", why: "High protein, lighter on calories" },
              { time: "12:30", meal: "Lunch", food: "Grilled chicken salad with chickpeas and a light dressing", why: "Protein + fibre to stay full" },
              { time: "16:00", meal: "Pre-workout", food: "Greek yogurt with berries", why: "A little carbs and protein before lifting" },
              { time: "19:00", meal: "Dinner", food: "White fish or turkey, rice, lots of vegetables", why: "Most of the day's carbs around training" },
              { time: "21:30", meal: "Snack", food: "Cottage cheese or a protein shake", why: "Protein to protect muscle overnight" },
            ],
          },
          faqs: [
            {
              q: "Why 12 weeks and not less?",
              a: "Cutting well takes time. A slower rate of loss over twelve weeks gives your body the best chance to hold on to muscle and strength, and it works best when you already have a solid base of muscle to protect.",
            },
            {
              q: "Does it include a meal plan?",
              a: "It starts with a calorie and intake assessment to set your own targets, plus nutrition guidelines and a sample day. For allergies or medical conditions, talk to a registered dietitian.",
            },
            {
              q: "Will I lose strength while cutting?",
              a: "The plan keeps the main lifts heavy so you hold on to as much strength as possible. Some dips late in a cut are normal.",
            },
            {
              q: "Can I add cardio?",
              a: "Yes. The guide explains how to add walking or easy cardio without cutting into your recovery for lifting.",
            },
            {
              q: "How do I get the program?",
              a: "Right after checkout you get a download link for the PDF and tracker. Checkout opens with our next update.",
            },
          ],
        },
      },
      {
        slug: "strength-program",
        code: "RT-P03",
        name: "Strength",
        price: 49,
        spec: "12 wk · 4 d/wk",
        description: "A bigger squat, bench and deadlift.",
        options: [],
        related: ["one-on-one-coaching", "barbell-clips", "wrist-wraps"],
        details: {
          format: "Digital · PDF + tracker",
          goal: "Raise your squat, bench and deadlift with percentage-based blocks and a test week at the end.",
          who: "Lifters who know the three main lifts and want a bigger total.",
          includes: [
            "12-week plan (PDF)",
            "Percentage calculator",
            "Warm-up templates",
            "Test-week guide",
          ],
          scheduleLabel: "Sample week",
          schedule: [
            { label: "Mon", focus: "Squat" },
            { label: "Tue", focus: "Bench" },
            { label: "Thu", focus: "Deadlift" },
            { label: "Fri", focus: "Bench + accessories" },
          ],
          cta: "Buy program",
          block: {
            weeks: 12,
            segments: [
              { label: "Volume", weeks: 4 },
              { label: "Strength", weeks: 4 },
              { label: "Peak", weeks: 3 },
              { label: "Test", weeks: 1, accent: true },
            ],
            note: "Each block gets heavier and lower-rep than the last, so you arrive at test week ready to hit new maxes.",
          },
          week: [
            {
              day: "Mon",
              focus: "Squat",
              lifts:
                "Back squat · Paused squat · Romanian deadlift · Leg press",
              gear: ["barbell-clips", "custom-lifting-straps"],
            },
            {
              day: "Tue",
              focus: "Bench",
              lifts:
                "Bench press · Close-grip bench · Barbell row · Overhead press",
              gear: ["wrist-wraps"],
            },
            {
              day: "Thu",
              focus: "Deadlift",
              lifts: "Deadlift · Front squat · Neutral-grip pulldown · Core",
              gear: [
                "figure-8-straps",
                "barbell-clips",
                "neutral-grip-lat-bar",
              ],
            },
            {
              day: "Fri",
              focus: "Bench +",
              lifts:
                "Paused bench · Incline dumbbell press · Rope pushdown · Curls",
              gear: ["wrist-wraps", "custom-tricep-rope"],
            },
          ],
          faqs: [
            {
              q: "How do I set my working weights?",
              a: "Enter a recent best for each lift into the percentage calculator and it fills in every set for all 12 weeks.",
            },
            {
              q: "Do I need to max out at the end?",
              a: "Test week is optional. You can test a heavy single, a triple, or simply repeat week 11 and start a new block.",
            },
            {
              q: "Is it only the big three?",
              a: "The main lifts lead every session, followed by two or three accessories for the muscles that hold your lifts back.",
            },
            {
              q: "How do I get the program?",
              a: "Right after checkout you get a download link for the PDF, calculator and tracker. Checkout opens with our next update.",
            },
          ],
        },
      },
      {
        slug: "one-on-one-coaching",
        code: "RT-P04",
        name: "1:1 Coaching",
        price: 129,
        priceNote: "/mo",
        spec: "Monthly · 1:1",
        description: "A custom plan, weekly check-ins and video form checks.",
        options: [],
        related: ["custom-lifting-straps", "wrist-wraps", "custom-tricep-rope"],
        details: {
          format: "Monthly · Cancel anytime",
          goal: "A plan built around your schedule, equipment and goal, adjusted every week by a coach.",
          who: "Anyone who wants accountability and feedback, at any level.",
          includes: [
            "Custom program",
            "Weekly check-ins",
            "Video form checks",
            "Message support",
          ],
          scheduleLabel: "How it works",
          schedule: [
            { label: "01", focus: "Intake form" },
            { label: "02", focus: "Your custom plan" },
            { label: "03", focus: "Weekly check-ins" },
            { label: "04", focus: "Form checks" },
          ],
          cta: "Apply now",
          faqs: [
            {
              q: "Who is the coach?",
              a: "[Coach name, credential]. Every plan is written and reviewed by a real person, not generated.",
            },
            {
              q: "How do check-ins work?",
              a: "Once a week you send your training log, a few notes and any form videos. Your coach replies with feedback and adjusts the next week.",
            },
            {
              q: "Can I cancel?",
              a: "Yes, it's month to month. Cancel before your next billing date and you won't be charged again.",
            },
            {
              q: "When can I start?",
              a: "Applications open with our next update. Until then, the digital programs are a great place to begin.",
            },
          ],
        },
      },
    ],
  },
];

/** Everything except programs: the Equipment page and homepage accordion */
export const gearCategories = categories.filter((c) => c.id !== "programs");

export const programs =
  categories.find((c) => c.id === "programs")?.products ?? [];

export const allProducts = categories.flatMap((c) =>
  c.products.map((p) => ({ product: p, category: c })),
);

export function getProduct(slug: string) {
  return allProducts.find((x) => x.product.slug === slug);
}

/** Where a product's detail page lives: programs and gear have separate sections */
export function productHref(product: Product) {
  return product.details
    ? `/programs/${product.slug}`
    : `/equipment/${product.slug}`;
}

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function formatCad(amount: number) {
  return cad.format(amount);
}

export function formatPrice(product: Product) {
  return `${cad.format(product.price)}${product.priceNote ?? ""}`;
}
