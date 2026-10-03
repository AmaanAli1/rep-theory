import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryAccordion from "@/components/CategoryAccordion";
import Reveal from "@/components/Reveal";
import ProgramPicker from "@/components/ProgramPicker";

// Sections of the intro post, linked from the journal teaser
const postSections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "why-the-last-rep", title: "Why the last rep" },
  { id: "what-we-sell", title: "What we sell" },
  { id: "whats-next", title: "What's next" },
];

export default function Home() {
  return (
    <>
      {/* Hero: animated demo set, "past the failure line" */}
      <Hero />

      {/* 01 · Shop gear */}
      <section
        aria-labelledby="gear-title"
        className="flex flex-col gap-6 px-4 py-24 sm:px-8 lg:px-12"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="gear-title"
            className="font-display text-[clamp(3rem,7vw,4.5rem)] font-black leading-[0.9]"
          >
            SHOP GEAR
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.12em]">
            Tap a category to open it
          </p>
        </Reveal>
        <CategoryAccordion />
      </section>

      {/* 02 · Brand story */}
      <section
        aria-labelledby="story-title"
        className="bg-ink px-4 py-28 text-chalk sm:px-8 lg:px-12 lg:py-32"
      >
        <Reveal className="flex max-w-5xl flex-col gap-7">
          <h2
            id="story-title"
            className="font-mono text-xs uppercase tracking-[0.14em] text-accent"
          >
            Our theory
          </h2>
          <p className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] italic leading-[1.05]">
            Anyone can do the first rep. We make gear and programs for the one
            after you want to quit.
          </p>
          <Link
            href="/about"
            className="group self-start font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-300 hover:text-accent"
          >
            Read our story{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </section>

      {/* 03 · Programs */}
      <section
        id="programs"
        aria-labelledby="programs-title"
        className="flex scroll-mt-24 flex-col gap-6 px-4 py-24 sm:px-8 lg:px-12"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="programs-title"
            className="font-display text-[clamp(3rem,7vw,4.5rem)] font-black leading-[0.9]"
          >
            PROGRAMS
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.12em]">
            Select a program for details
          </p>
        </Reveal>
        <Reveal>
          <ProgramPicker />
        </Reveal>
      </section>

      {/* 04 · From the journal: only the button and the contents rows are links */}
      <section
        aria-labelledby="journal-title"
        className="px-4 pb-24 sm:px-8 lg:px-12"
      >
        <Reveal className="grid items-end gap-8 border-t-[3px] border-ink pt-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              From the journal · Oct 2026 · 4 min read
            </span>
            <h2
              id="journal-title"
              className="font-display text-[clamp(3rem,6vw,4rem)] font-black leading-[0.9]"
            >
              BUILT FOR THE LAST REP
            </h2>
            <figure className="flex max-w-xl gap-3.5 py-2">
              <span
                aria-hidden="true"
                className="font-serif text-8xl leading-[0.7] text-ember"
              >
                “
              </span>
              <div className="flex flex-col gap-2.5">
                <blockquote className="font-serif text-[2rem] italic leading-[1.1]">
                  We wanted gear we&apos;d actually use, for the rep we usually
                  skip.
                </blockquote>
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em]">
                  — The Rep Theory team
                </figcaption>
              </div>
            </figure>
            <Link
              href="/blog/welcome"
              className="group inline-flex items-center gap-2.5 self-start bg-ink px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-chalk transition-colors duration-300 hover:bg-ember"
            >
              Read the post
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <nav
            aria-label="In this post"
            className="flex aspect-video flex-col justify-between gap-4 bg-ink p-5 text-chalk sm:p-8"
          >
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
              <span>In this post</span>
              <span>4 min</span>
            </div>
            <ol>
              {postSections.map((s, i) => (
                <li
                  key={s.id}
                  className={
                    i < postSections.length - 1
                      ? "border-b border-[#2a2a2a]"
                      : ""
                  }
                >
                  <Link
                    href={`/blog/welcome#${s.id}`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="inline-block font-display text-3xl font-extrabold uppercase transition duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
                      {s.title}
                    </span>
                    <span className="font-mono text-xs text-accent transition-colors duration-300 group-hover:text-chalk">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      </section>
    </>
  );
}
