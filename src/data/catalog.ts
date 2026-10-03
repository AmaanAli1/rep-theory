import type { DrawingKind } from "@/components/ProductDrawing";

// Single source of truth for everything Rep Theory sells.
// The home page, shop page and (in A2) the cart all read from here.

export type Colour = { name: string; hex: string };

export type ProgramDetails = {
  goal: string;
  who: string;
  includes: string[];
  scheduleLabel: string; // "Sample week" or "How it works"
  schedule: { label: string; focus: string }[];
  cta: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number; // CAD
  priceNote?: string; // e.g. "/mo"
  spec: string; // the mono label shown under the name
  description: string;
  options: string[]; // becomes product variants in A2
  custom?: boolean; // shows the CUSTOM tag
  colours?: Colour[];
  drawing?: DrawingKind; // blueprint line drawing used instead of a photo
  details?: ProgramDetails; // programs only
};

export type Category = {
  id: string;
  num: string;
  name: string;
  summary: string;
  products: Product[];
};

// Placeholder colourways until the real products are confirmed
const BLACK: Colour = { name: "Black", hex: "#0e0e0e" };
const CHALK: Colour = { name: "Chalk", hex: "#eceae4" };
const ORANGE: Colour = { name: "Orange", hex: "#ff5a1f" };
const NAVY: Colour = { name: "Navy", hex: "#1f2a44" };
const OLIVE: Colour = { name: "Olive", hex: "#4b5320" };

export const categories: Category[] = [
  {
    id: "straps",
    num: "01",
    name: "Straps",
    summary: "Custom · Figure-8",
    products: [
      {
        slug: "custom-lifting-straps",
        drawing: "straps",
        name: "Custom Lifting Straps",
        price: 34,
        spec: "38 mm · Cotton · Embroidered",
        description:
          "Padded 60 cm cotton straps with your name or initials embroidered.",
        options: ["Colour", "Embroidery"],
        custom: true,
        colours: [BLACK, CHALK, ORANGE, NAVY, OLIVE],
      },
      {
        slug: "figure-8-straps",
        drawing: "figure8",
        name: "Figure-8 Straps",
        price: 30,
        spec: "S / M / L · Heavy cotton",
        description: "A locked grip for heavy deadlifts and shrugs.",
        options: ["Size", "Colour"],
        colours: [BLACK, NAVY, OLIVE],
      },
    ],
  },
  {
    id: "wraps",
    num: "02",
    name: "Wraps",
    summary: "Stiff · Flexible",
    products: [
      {
        slug: "wrist-wraps",
        drawing: "wraps",
        name: "Wrist Wraps",
        price: 28,
        spec: "60 cm · Stiff / Flex · Thumb loop",
        description: "Wrist support for heavy pressing, in two stiffnesses.",
        options: ["Stiffness", "Colour"],
        colours: [BLACK, CHALK, ORANGE],
      },
    ],
  },
  {
    id: "attachments",
    num: "03",
    name: "Attachments",
    summary: "Lat bar · Tricep rope",
    products: [
      {
        slug: "neutral-grip-lat-bar",
        drawing: "latbar",
        name: "Neutral-Grip Lat Bar",
        price: 65,
        spec: "Close / Wide · Rubber grip",
        description:
          "A MAG-style neutral-grip handle that fits any cable machine.",
        options: ["Grip width", "Colour"],
        colours: [BLACK, ORANGE],
      },
      {
        slug: "custom-tricep-rope",
        drawing: "rope",
        name: "Custom Tricep Rope",
        price: 38,
        spec: "70 / 90 cm · Braided nylon",
        description:
          "Braided nylon rope with heavy end stops and a custom tag.",
        options: ["Length", "Colour", "Embroidered tag"],
        custom: true,
        colours: [BLACK, CHALK, ORANGE],
      },
    ],
  },
  {
    id: "clips",
    num: "04",
    name: "Clips",
    summary: "50 mm Olympic",
    products: [
      {
        slug: "barbell-clips",
        drawing: "clips",
        name: "Barbell Clips",
        price: 24,
        spec: "Pair · Quick-lock · 50 mm",
        description: "Quick-lock collars that fit any Olympic bar.",
        options: ["Colour"],
        colours: [BLACK, ORANGE, CHALK],
      },
    ],
  },
  {
    id: "programs",
    num: "05",
    name: "Programs",
    summary: "Hypertrophy · Strength · Cutting · 1:1",
    products: [
      {
        slug: "hypertrophy-program",
        name: "Hypertrophy",
        price: 49,
        spec: "12 wk · 5 d/wk",
        description: "Build muscle with progressive volume.",
        options: [],
        details: {
          goal: "Add muscle across your whole body with progressive volume you can track week to week.",
          who: "Lifters with at least six months of training who want visible size, not just strength.",
          includes: [
            "12-week plan (PDF)",
            "Spreadsheet tracker",
            "Built-in deload weeks",
            "Exercise swap guide",
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
        },
      },
      {
        slug: "strength-program",
        name: "Strength",
        price: 49,
        spec: "12 wk · 4 d/wk",
        description: "A bigger squat, bench and deadlift.",
        options: [],
        details: {
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
        },
      },
      {
        slug: "cutting-program",
        name: "Cutting",
        price: 45,
        spec: "08 wk · 4 d/wk",
        description: "Keep your muscle while you lose fat.",
        options: [],
        details: {
          goal: "Keep your strength and muscle while you lose fat over eight weeks.",
          who: "Anyone starting a fat-loss phase who wants to train hard through it.",
          includes: [
            "8-week training plan (PDF)",
            "General nutrition guidelines",
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
        },
      },
      {
        slug: "one-on-one-coaching",
        name: "1:1 Coaching",
        price: 129,
        priceNote: "/mo",
        spec: "Monthly · 1:1",
        description: "A custom plan, weekly check-ins and video form checks.",
        options: [],
        details: {
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
        },
      },
    ],
  },
];

/** Everything except programs: shown in the "Shop gear" accordion */
export const gearCategories = categories.filter((c) => c.id !== "programs");

export const programs =
  categories.find((c) => c.id === "programs")?.products ?? [];

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function formatPrice(product: Product) {
  return `${cad.format(product.price)}${product.priceNote ?? ""}`;
}
