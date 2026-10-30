"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { allPosts, TOPICS, type Topic } from "@/data/journal";

type Filter = Topic | "all";

/**
 * Post cards with topic filters. Filtering never hides a post: matching
 * cards pop forward and the rest step back. The topic is kept in the URL
 * (/blog?topic=training) so a filtered view can be shared.
 */
export default function JournalList() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("topic");
  const active: Filter = TOPICS.some((t) => t.id === raw) ? (raw as Topic) : "all";

  const pick = (f: Filter) => {
    const q = f === "all" ? "" : `?topic=${f}`;
    router.replace(`${pathname}${q}`, { scroll: false });
  };

  const filters: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All", n: allPosts.length },
    ...TOPICS.map((t) => ({
      id: t.id,
      label: t.label,
      n: allPosts.filter((p) => p.topics.includes(t.id)).length,
    })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Filter posts by topic" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = f.id === active;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => pick(f.id)}
              className={`border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-accent)] ${
                on ? "bg-ink text-chalk" : "hover:bg-ink hover:text-chalk"
              }`}
            >
              {f.label} ({f.n})
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {active === "all"
          ? "Showing all posts"
          : `Highlighting ${allPosts.filter((p) => p.topics.includes(active)).length} posts`}
      </p>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4">
        {allPosts.map((p, i) => {
          const dark = i === 0;
          const match = active === "all" ? "all" : p.topics.includes(active) ? "yes" : "no";
          return (
            <li key={p.slug} className="flex">
              <article
                data-match={match}
                className={`filter-card flex flex-1 flex-col gap-3.5 border-2 border-ink p-5.5 ${
                  dark ? "bg-ink text-chalk" : "bg-paper"
                } ${match === "all" ? "product-card" : ""}`}
              >
                <div
                  className={`flex justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] ${dark ? "text-ash" : "text-stone"}`}
                >
                  <span>
                    Post {p.num} · {p.topicLabel}
                  </span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="font-display text-[2.5rem] font-black uppercase leading-[0.9]">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed">{p.excerpt}</p>
                <div
                  className={`mt-auto flex items-center justify-between border-t pt-2.5 ${dark ? "border-[#3a3a3a]" : "border-[#c9c6be]"}`}
                >
                  <time
                    dateTime={p.date}
                    className={`font-mono text-[11px] uppercase tracking-[0.12em] ${dark ? "text-ash" : "text-stone"}`}
                  >
                    {p.dateLabel}
                  </time>
                  <Link
                    href={`/blog/${p.slug}`}
                    className={`group px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-ember hover:text-[#f4f1ea] ${
                      dark ? "bg-chalk text-ink" : "bg-ink text-chalk"
                    }`}
                  >
                    Read<span className="sr-only">: {p.title}</span>{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
