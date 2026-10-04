// Journal posts. Only the welcome post is written; drafts are listed but not linked.

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

export const drafts = [
  "How to set up lifting straps",
  "Deload weeks, explained",
  "Cutting without losing strength",
];

export const CONTACT_EMAIL = "hello@reptheory.ca";
export const PRIVACY_EMAIL = "privacy@reptheory.ca";
