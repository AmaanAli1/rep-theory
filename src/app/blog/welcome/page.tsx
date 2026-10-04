import type { Metadata } from "next";
import Link from "next/link";
import ScrollSpyToc from "@/components/ScrollSpyToc";
import { CONTACT_EMAIL, welcomePost as post } from "@/data/journal";

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  openGraph: { type: "article", publishedTime: post.date },
};

function SectionHeading({ index }: { index: number }) {
  const s = post.sections[index];
  return (
    <h2
      id={s.id}
      className="mb-4 mt-10 flex scroll-mt-24 items-baseline gap-3.5 font-display text-[2.75rem] font-black uppercase leading-[0.95] first:mt-0"
    >
      <span className="font-mono text-[13px] font-normal text-ember">
        0{index + 1}
      </span>
      {s.title}
    </h2>
  );
}

export default function WelcomePost() {
  return (
    <article>
      <header className="mx-4 flex flex-col gap-5 border-b-[3px] border-ink pb-10 pt-7 sm:mx-8 lg:mx-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-ember"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Journal
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone">
            {post.title}
          </span>
        </nav>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
          Introductory post · <time dateTime={post.date}>{post.dateLabel}</time>{" "}
          · {post.readTime} read · By {post.author}
        </p>
        <h1 className="max-w-6xl font-display text-[clamp(3.5rem,10vw,9.5rem)] font-black uppercase leading-[0.82]">
          {post.title}
        </h1>
        <p className="max-w-3xl font-serif text-[clamp(1.5rem,3vw,2rem)] italic leading-[1.15]">
          {post.deck}
        </p>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(2rem,6vw,6rem)] px-4 pb-24 pt-10 sm:px-8 lg:grid-cols-[minmax(13rem,18rem)_minmax(0,45rem)] lg:px-12">
        <ScrollSpyToc label="In this post" items={post.sections} />

        <div className="text-lg leading-[1.7] [&_p]:mb-4.5">
          <SectionHeading index={0} />
          <p>
            Rep Theory is a small team of students and lifters at Wilfrid
            Laurier University in Waterloo, Ontario. We started it as a class
            project in fall 2026, and built it the way we&apos;d want a gym
            brand to work: simple gear, honest programs and no hype.
          </p>
          <p>
            Between us we&apos;ve spent a lot of hours under a bar, and a lot of
            those hours ended the same way: not because the muscle we were
            training gave out, but because something else did first. You can
            meet everyone on the{" "}
            <Link
              href="/about#team"
              className="underline decoration-1 underline-offset-[3px] transition-colors hover:text-ember"
            >
              About page
            </Link>
            .
          </p>

          <SectionHeading index={1} />
          <p>
            Anyone can do the first rep. The rep that changes things is the one
            after you want to stop. It&apos;s where most of the progress is, and
            it&apos;s where most sets end early.
          </p>
          <p>
            Usually it&apos;s not your back or lats that quit on a heavy row.
            It&apos;s your grip. On a heavy bench, it&apos;s often your wrists
            folding before your chest is done. Fix the weak link and you get to
            train the muscle you actually came for.
          </p>
          <figure className="my-8 flex gap-4 border-y-2 border-ink py-7">
            <span
              aria-hidden="true"
              className="font-serif text-[6.875rem] leading-[0.7] text-ember"
            >
              “
            </span>
            <div className="flex flex-col gap-2.5">
              <blockquote className="font-serif text-[clamp(1.75rem,3.5vw,2.375rem)] italic leading-[1.1]">
                {post.quote}
              </blockquote>
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em]">
                — {post.author}
              </figcaption>
            </div>
          </figure>

          <SectionHeading index={2} />
          <p>Two things, built to work together.</p>
          <p>
            <strong className="font-medium">Equipment.</strong> Lifting straps
            you can put your name on, figure-8 straps, wrist wraps, a
            neutral-grip lat bar, a custom tricep rope and barbell clips. Each
            one fixes a specific weak link.
          </p>
          <p>
            <strong className="font-medium">Programs.</strong> Twelve-week
            Hypertrophy, Cutting and Strength plans, plus 1:1 coaching if you
            want a plan adjusted to you every week.
          </p>
          <div className="mb-4.5 mt-2 grid gap-3 sm:grid-cols-2">
            <Link
              href="/equipment"
              className="product-card group flex flex-col gap-2 border-2 border-ink bg-paper p-4.5"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                06 items · 04 categories
              </span>
              <span className="font-display text-4xl font-black uppercase">
                Equipment{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
            <Link
              href="/programs"
              className="product-card group flex flex-col gap-2 border-2 border-ink bg-ink p-4.5 text-chalk"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                03 plans · 1:1 coaching
              </span>
              <span className="font-display text-4xl font-black uppercase">
                Programs{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>

          <SectionHeading index={3} />
          <p>
            Checkout isn&apos;t open yet. Next we&apos;re adding a working cart
            and secure checkout, the free program assessment, and more posts
            here: how to set up lifting straps, why deload weeks matter, and how
            to run a cut without losing strength.
          </p>
          <p>
            Got a question or an idea for a post? Write to us at {CONTACT_EMAIL}.
            We read everything.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              — {post.author}
            </span>
            <Link
              href="/blog"
              className="border-2 border-ink px-4.5 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-ink hover:text-chalk"
            >
              ← Back to journal
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
