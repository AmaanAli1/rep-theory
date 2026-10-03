"use client";

import { useEffect, useState } from "react";

type Tab = { id: string; label: string; count: number };

/** Sticky category bar: jumps to a section on click and follows you as you scroll. */
export default function ShopNav({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section counts as "current" when it crosses the upper third of the screen
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const t of tabs) {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav
      aria-label="Equipment categories"
      className="sticky top-0 z-30 border-y border-ink border-t-[6px] bg-chalk px-4 sm:px-8 lg:px-12"
    >
      <ul className="flex gap-x-8 overflow-x-auto font-mono text-xs uppercase tracking-[0.14em]">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <li key={t.id} className="shrink-0">
              <a
                href={`#${t.id}`}
                onClick={() => setActive(t.id)}
                aria-current={on ? "true" : undefined}
                className={`block border-b-4 pb-3.5 pt-4.5 transition-colors duration-300 hover:text-accent ${
                  on
                    ? "border-accent text-ink"
                    : "border-transparent text-stone"
                }`}
              >
                {t.label} <span className="text-stone">({t.count})</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
