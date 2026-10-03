"use client";

import { useState } from "react";

/** Question list that folds open and closed smoothly, one at a time. */
export default function FaqList({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-ink">
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className="border-b border-ink">
            <h3>
              <button
                type="button"
                id={`faq-${i}`}
                aria-expanded={on}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(on ? null : i)}
                className={`flex w-full items-center justify-between gap-4 px-2.5 py-4 text-left text-lg font-medium transition-colors duration-300 ${
                  on ? "bg-ink text-chalk" : "hover:bg-ink hover:text-chalk"
                }`}
              >
                {f.q}
                <span
                  aria-hidden="true"
                  className={`text-2xl leading-none transition-transform duration-300 ${
                    on ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-${i}`}
              className="accordion-panel"
              data-open={on}
              inert={!on}
            >
              <div>
                <p className="max-w-3xl px-2.5 pb-5 pt-3 leading-relaxed">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
