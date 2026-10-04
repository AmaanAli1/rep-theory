import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { CONTACT_EMAIL } from "@/data/journal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rep Theory is a CP340-B group project from Wilfrid Laurier University: gear and programs built for the last rep.",
};

const facts = [
  { v: "06", k: "Pieces of gear" },
  { v: "04", k: "Categories" },
  { v: "03", k: "12-week plans + 1:1" },
  { v: "01", k: "Goal: the last rep", accent: true },
];

const timeline = [
  { when: "Sep 2026", what: "The idea, in CP340-B (E-commerce) at Laurier." },
  {
    when: "Oct 2026",
    what: "Assignment 1: the store goes live, gear and programs first.",
    now: true,
  },
  { when: "Next", what: "A working cart, secure checkout and the free assessment.", future: true },
];

const beliefs = [
  {
    t: "Gear that earns its place",
    d: "If it doesn't help you finish a set, we don't make it. Six products, each fixing one weak link.",
  },
  {
    t: "Plans, not hype",
    d: "Programs built on progressive overload and recovery. No shortcuts, no miracle claims, no before-and-after photos.",
  },
  {
    t: "Honest by default",
    d: "Prices in CAD, no fake reviews, and a plain-language privacy policy that says exactly what we collect.",
  },
];

const team = [
  { name: "Amaan Ali", initials: "A.A.", role: "Developer · Front end + design" },
  { name: "Ronnie Abed", initials: "R.A.", role: "Developer · Back end" },
  { name: "Harsh Shekhar", initials: "H.S.", role: "Developer · Full stack" },
];

const promises = [
  "No accounts needed to browse",
  "No payment details stored, ever",
  "Optional cookies stay off until you say yes",
  "Ask to see or delete your data anytime",
];

/** Anonymous blueprint-style portrait, matching the gear drawings */
function BlueprintAvatar() {
  return (
    <svg
      viewBox="0 0 200 150"
      aria-hidden="true"
      className="h-auto w-[70%] transition-transform duration-500"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="100" cy="58" r="26" />
        <path d="M52 138 C54 106 74 92 100 92 C126 92 146 106 148 138" />
        <path d="M88 92 L100 108 L112 92" stroke="var(--color-accent)" strokeWidth="3" />
        <circle cx="100" cy="58" r="34" strokeDasharray="3 4" strokeWidth="1" />
        <g strokeWidth="1">
          <line x1="160" y1="24" x2="160" y2="138" />
          <line x1="154" y1="24" x2="166" y2="24" />
          <line x1="154" y1="138" x2="166" y2="138" />
          <line x1="40" y1="58" x2="64" y2="58" />
          <line x1="136" y1="58" x2="150" y2="58" />
        </g>
      </g>
    </svg>
  );
}

function SectionTitle({ children, right }: { children: React.ReactNode; right?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
      <h2 className="font-display text-5xl font-black uppercase">{children}</h2>
      {right && (
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">{right}</span>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageIntro
        metaLeft="About · Est. 2026"
        metaRight="Waterloo, Ontario"
        title="About"
        tag="The theory"
        quote="Anyone can do the first rep. We make gear and programs for the one after you want to quit."
        sub="CP340-B group project ↓"
      />

      {/* Our story: heading on top, story + file card side by side */}
      <section className="mx-4 flex flex-col gap-8 border-t-[6px] border-ink pb-20 pt-8 sm:mx-8 lg:mx-12">
        <h2 className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85]">
          Our story
        </h2>
        <div className="grid items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-2">
          <div className="max-w-2xl border-t border-ink pt-4.5 text-lg leading-[1.7] [&_p]:mb-4.5">
            <p className="font-serif text-3xl! italic leading-[1.15]! mb-5.5!">
              Rep Theory started in a university course on e-commerce, with a
              simple question: what would we actually buy for our own training?
            </p>
            <p>
              The answer wasn&apos;t another shaker bottle. It was the small
              things that decide when a set ends: straps for when your grip goes
              first, wraps for when your wrists fold, attachments that let you
              reach a full stretch, and clips so the plates don&apos;t creep.
              Then the plans to use them properly.
            </p>
            <p>
              So that&apos;s what we built. Everything here is designed by us,
              priced in Canadian dollars, and explained plainly. Read more in our{" "}
              <Link
                href="/blog/welcome"
                className="underline decoration-1 underline-offset-[3px] transition-colors hover:text-ember"
              >
                introductory post
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-4.5 bg-ink px-5.5 py-5 text-chalk">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
              <span>File · RT-00 · The brand</span>
              <span>Est. 2026</span>
            </div>
            <dl className="grid grid-cols-2 border-t border-[#3a3a3a]">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="flex flex-col-reverse gap-1 border-b border-[#3a3a3a] py-3.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                    {f.k}
                  </dt>
                  <dd
                    className={`font-display text-[3.5rem] font-black leading-[0.85] ${
                      f.accent ? "text-accent" : ""
                    }`}
                  >
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
            <ol>
              {timeline.map((t) => (
                <li
                  key={t.when}
                  className="grid grid-cols-[4.5rem_0.875rem_minmax(0,1fr)] items-baseline gap-3 py-2"
                >
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                      t.now ? "text-accent" : "text-ash"
                    }`}
                  >
                    {t.when}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`size-2.5 border-2 ${
                      t.now
                        ? "border-accent bg-accent"
                        : t.future
                          ? "border-ash"
                          : "border-ash bg-ash"
                    }`}
                  />
                  <span className="text-[15px] leading-snug">{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 px-4 pb-20 sm:px-8 lg:px-12">
        <SectionTitle>What we believe</SectionTitle>
        <ol className="mt-4 grid border-l-2 border-t-2 border-ink md:grid-cols-3">
          {beliefs.map((b, i) => (
            <li
              key={b.t}
              className="flex flex-col gap-3 border-b-2 border-r-2 border-ink p-6"
            >
              <span className="font-mono text-xs text-ember">0{i + 1}</span>
              <h3 className="font-display text-[2.5rem] font-black uppercase leading-[0.9]">
                {b.t}
              </h3>
              <p className="leading-relaxed">{b.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="team"
        aria-labelledby="team-title"
        className="flex scroll-mt-24 flex-col gap-2 px-4 pb-20 sm:px-8 lg:px-12"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
          <h2 id="team-title" className="font-display text-5xl font-black uppercase">
            The team
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            03 developers · Wilfrid Laurier University
          </span>
        </div>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {team.map((m, i) => (
            <li key={m.name} className="product-card flex flex-col border-2 border-ink bg-paper">
              <div className="blueprint relative flex aspect-[4/3] items-center justify-center [background-size:16px_16px]">
                <span className="absolute left-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                  {m.initials}
                </span>
                <span className="absolute right-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                  Fig. 0{i + 1}
                </span>
                <BlueprintAvatar />
              </div>
              <div className="flex flex-col gap-1.5 p-4.5">
                <h3 className="font-display text-[2.125rem] font-black uppercase leading-[0.95]">
                  {m.name}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                  {m.role}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
                  BSc Computer Science
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink px-4 py-[clamp(3rem,6vw,6rem)] text-chalk sm:px-8 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Your data
            </span>
            <h2 className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-black uppercase leading-[0.85]">
              We collect as little as we can.
            </h2>
            <div className="mt-2 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
              <Link
                href="/privacy"
                className="group bg-chalk px-5 py-3.5 text-ink transition-colors duration-300 hover:bg-ember hover:text-[#f4f1ea]"
              >
                Read the privacy policy{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/privacy#cookie-settings"
                className="border-2 border-chalk px-4.5 py-3 transition-colors duration-300 hover:bg-chalk hover:text-ink"
              >
                Cookie settings
              </Link>
            </div>
          </div>
          <ul className="border-t border-[#3a3a3a]">
            {promises.map((p) => (
              <li key={p} className="flex gap-4 border-b border-[#3a3a3a] py-4 text-[17px]">
                <span aria-hidden="true" className="text-accent">
                  +
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid items-end gap-8 px-4 pb-24 pt-20 sm:px-8 lg:grid-cols-2 lg:px-12">
        <h2 className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85]">
          Say hi.
        </h2>
        <dl className="grid grid-cols-[8rem_1fr] text-[17px] sm:grid-cols-[10rem_1fr]">
          {[
            ["Email", CONTACT_EMAIL],
            ["Social", "Instagram + TikTok · coming soon"],
            ["Based in", "Waterloo, Ontario · prices in CAD"],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="border-b border-[#c9c6be] py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
                {k}
              </dt>
              <dd className="border-b border-[#c9c6be] py-3.5">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
