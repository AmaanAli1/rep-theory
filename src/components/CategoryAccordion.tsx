"use client";

import Link from "next/link";
import { useState } from "react";
import { gearCategories } from "@/data/catalog";
import ProductCard from "@/components/ProductCard";

export default function CategoryAccordion() {
  // All rows start closed
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t-[3px] border-ink">
      {gearCategories.map((cat) => {
        const open = openId === cat.id;
        const panelId = `panel-${cat.id}`;
        const buttonId = `button-${cat.id}`;

        return (
          <div key={cat.id} id={cat.id} className="border-b border-ink">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : cat.id)}
                className={`flex w-full flex-wrap items-center justify-between gap-4 px-3 py-4 text-left transition-colors duration-300 ${
                  open ? "bg-ink text-chalk" : "hover:bg-ink hover:text-chalk"
                }`}
              >
                <span className="font-display text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold uppercase leading-none">
                  {cat.num} {cat.name}
                </span>
                <span className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.12em]">
                  <span className="hidden sm:inline">{cat.summary}</span>
                  <span
                    aria-hidden="true"
                    className={`inline-block w-6 text-center text-3xl leading-none transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion-panel"
              data-open={open}
              inert={!open}
            >
              <div>
                <div className="flex flex-col gap-5 px-3 pb-8 pt-6">
                  <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,18.75rem),1fr))] gap-3">
                    {cat.products.map((p) => (
                      <li key={p.slug} className="accordion-card">
                        <ProductCard product={p} />
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products#${cat.id}`}
                    className="self-start font-mono text-xs uppercase tracking-[0.14em] underline-offset-4 hover:underline"
                  >
                    View all {cat.name} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
