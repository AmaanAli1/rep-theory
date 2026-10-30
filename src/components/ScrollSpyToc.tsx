"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string; num?: string };

/**
 * Sticky contents list that highlights the section you're reading.
 * A section is "current" once its heading passes ~35% down the screen;
 * at the very bottom of the page the last heading on screen wins, so short
 * final sections still light up.
 */
export default function ScrollSpyToc({
  label,
  items,
  size = "text-[1.375rem]",
  sticky = true,
}: {
  label: string;
  items: Item[];
  size?: string;
  /** Turn off when a parent column is already sticky (nested sticky overlaps siblings). */
  sticky?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top < window.innerHeight)
            current = item.id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label={label}
      className={`flex flex-col gap-2 ${sticky ? "lg:sticky lg:top-24" : ""}`}
    >
      <span className="border-b-2 border-ink pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        {label}
      </span>
      <ol>
        {items.map((item, i) => {
          const on = item.id === active;
          return (
            <li key={item.id} className="border-b border-[#c9c6be] last:border-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                aria-current={on ? "location" : undefined}
                className={`group flex items-baseline justify-between gap-3 border-l-[3px] py-2.5 transition-[padding,color,border-color] duration-300 hover:text-ember ${
                  on
                    ? "border-accent pl-3 text-ember"
                    : "border-transparent pl-0"
                }`}
              >
                <span
                  className={`inline-block font-display font-extrabold uppercase transition-transform duration-300 group-hover:translate-x-1 ${size}`}
                >
                  {item.title}
                </span>
                <span className="font-mono text-[11px] text-ember">
                  {item.num ?? String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
