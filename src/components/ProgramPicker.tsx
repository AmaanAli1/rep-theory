"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, programs } from "@/data/catalog";

/** Program cards that lift on hover; clicking one opens its details below. */
export default function ProgramPicker() {
  const [selected, setSelected] = useState<string | null>(null);
  // The last program opened stays rendered while the panel folds closed
  const [shown, setShown] = useState<string | null>(null);
  const program = programs.find((p) => p.slug === shown);
  const details = program?.details;
  const open = selected !== null;

  const toggle = (slug: string) => {
    if (slug === selected) {
      setSelected(null);
    } else {
      setSelected(slug);
      setShown(slug);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
        {programs.map((p) => {
          const on = p.slug === selected;
          return (
            <li key={p.slug}>
              <button
                type="button"
                aria-expanded={on}
                aria-controls="program-details"
                onClick={() => toggle(p.slug)}
                className={`program-card @container flex h-full w-full flex-col gap-8 border-2 border-ink p-6 text-left ${
                  on ? "bg-ink text-chalk" : ""
                }`}
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                    on ? "text-accent" : ""
                  }`}
                >
                  {p.spec}
                </span>
                <span className="font-display text-[min(2.75rem,12.5cqi)] font-black uppercase leading-[0.9]">
                  {p.name}
                </span>
                <span className="mt-auto flex w-full items-center justify-between gap-3">
                  <span className="font-mono">{formatPrice(p)}</span>
                  <span className="card-arrow font-mono text-[11px] uppercase tracking-[0.12em]">
                    {on ? "Selected" : "View details →"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id="program-details"
        className="accordion-panel"
        data-open={open}
        inert={!open}
      >
        <div>
          {program && details && (
            <div
              key={program.slug}
              className="panel-in flex flex-col gap-10 bg-ink p-6 text-chalk sm:p-10 lg:p-12"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex max-w-3xl flex-col gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {program.spec}
                  </span>
                  <h3 className="font-display text-[clamp(3.5rem,7vw,6rem)] font-black uppercase leading-[0.85]">
                    {program.name}
                  </h3>
                  <p className="font-serif text-[1.875rem] italic leading-[1.15]">
                    {details.goal}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="min-h-11 border border-chalk px-4 font-mono text-xs uppercase tracking-[0.14em] hover:bg-chalk hover:text-ink"
                >
                  Close ×
                </button>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-8 border-t border-[#3a3a3a] pt-7">
                <div className="flex flex-col gap-3">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                    Who it&apos;s for
                  </h4>
                  <p className="leading-relaxed">{details.who}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                    What&apos;s included
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {details.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 leading-snug">
                        <span aria-hidden="true" className="text-accent">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                    {details.scheduleLabel}
                  </h4>
                  <ol>
                    {details.schedule.map((row) => (
                      <li
                        key={row.label}
                        className="flex justify-between gap-3 border-b border-[#2a2a2a] py-2 font-mono text-[13px]"
                      >
                        <span className="uppercase text-ash">{row.label}</span>
                        <span>{row.focus}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3a3a3a] pt-6">
                <p className="max-w-xl font-mono text-[11px] tracking-[0.08em] text-ash">
                  General fitness guidance, not medical or dietitian advice.
                </p>
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xl">
                    {formatPrice(program)}
                  </span>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="bg-accent px-7 py-4 font-display text-2xl font-extrabold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
                  >
                    {details.cta}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
