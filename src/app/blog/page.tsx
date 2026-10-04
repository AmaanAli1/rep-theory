import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { drafts, welcomePost as post } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on training and gear from Rep Theory, starting with our introductory post.",
};

export default function JournalPage() {
  return (
    <>
      <PageIntro
        metaLeft="Journal · 01 post"
        metaRight="Notes on training + gear"
        title="Journal"
        tag="The notes"
        quote="What we're learning about the last rep, written down."
        sub="New posts as we build ↓"
      />

      <section
        aria-labelledby="latest-title"
        className="flex flex-col gap-4 px-4 pb-16 pt-4 sm:px-8 lg:px-12"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
          <h2
            id="latest-title"
            className="font-display text-5xl font-black uppercase"
          >
            Latest
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            01 of 01
          </span>
        </div>

        {/* The card lifts on hover, but only the button is a link */}
        <article className="product-card mt-2 grid border-2 border-ink bg-paper lg:grid-cols-2">
          <div className="flex min-h-[21rem] flex-col justify-between gap-8 bg-ink p-[clamp(1.25rem,3vw,2.25rem)] text-chalk">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
              <span>Post 01 · Introductory</span>
              <span>{post.readTime}</span>
            </div>
            <figure className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="font-serif text-[7.5rem] leading-[0.7] text-accent"
              >
                “
              </span>
              <blockquote className="font-serif text-4xl italic leading-[1.1]">
                {post.quote}
              </blockquote>
            </figure>
            <ol className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
              {post.sections.map((s, i) => (
                <li key={s.id}>
                  0{i + 1} {s.title}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-4 p-[clamp(1.25rem,3vw,2.25rem)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
              <time dateTime={post.date}>{post.dateLabel}</time> · By{" "}
              {post.author}
            </span>
            <h3 className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85]">
              {post.title}
            </h3>
            <p className="max-w-lg text-lg leading-relaxed">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="group mt-auto inline-flex items-center gap-2.5 self-start border-2 border-ink bg-ink px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-chalk transition-colors duration-300 hover:border-ember hover:bg-ember"
            >
              Read the post
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </article>
      </section>

      <section
        aria-labelledby="drafts-title"
        className="flex flex-col gap-2 px-4 pb-24 sm:px-8 lg:px-12"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
          <h2
            id="drafts-title"
            className="font-display text-5xl font-black uppercase"
          >
            Coming up
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            In draft · Not linked yet
          </span>
        </div>
        <ul>
          {drafts.map((d, i) => (
            <li
              key={d}
              className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-[#c9c6be] py-4.5 text-stone sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-6"
            >
              <span className="font-mono text-xs">0{i + 2}</span>
              <span className="font-display text-[clamp(1.5rem,4vw,2rem)] font-extrabold uppercase">
                {d}
              </span>
              <span className="border border-stone px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                In draft
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
