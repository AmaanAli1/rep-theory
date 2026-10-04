"use client";

import { useState } from "react";
import { saveConsent, useConsent, type Consent } from "@/lib/consent";

type Key = "analytics" | "marketing";

const rows: { key: Key | "essential"; name: string; desc: string }[] = [
  {
    key: "essential",
    name: "Essential",
    desc: "Keeps the site working: remembers this choice and, later, your cart.",
  },
  {
    key: "analytics",
    name: "Analytics",
    desc: "Anonymous page-view counts so we know which pages help.",
  },
  {
    key: "marketing",
    name: "Marketing",
    desc: "Would measure social media ads. Not used yet.",
  },
];

function savedLabel(c: Consent | null | undefined) {
  if (!c) return "Not saved yet";
  return `Saved · Analytics ${c.analytics ? "on" : "off"} · Marketing ${c.marketing ? "on" : "off"}`;
}

/** The cookie settings panel at /privacy#cookie-settings */
export default function CookieSettings() {
  const consent = useConsent();
  // Unsaved edits; falls back to the saved choice (or off) when untouched
  const [draft, setDraft] = useState<Partial<Record<Key, boolean>>>({});
  const value = (k: Key) => draft[k] ?? consent?.[k] ?? false;
  const dirty = Object.keys(draft).length > 0;

  const save = (choice: Record<Key, boolean>) => {
    saveConsent(choice);
    setDraft({});
  };

  return (
    <section
      id="cookie-settings"
      aria-labelledby="cookie-settings-title"
      className="mx-4 mb-24 scroll-mt-24 border-2 border-ink bg-paper sm:mx-8 lg:mx-12"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 bg-ink px-6 py-5 text-chalk">
        <h2
          id="cookie-settings-title"
          className="font-display text-[2.75rem] font-black uppercase leading-none"
        >
          Cookie settings
        </h2>
        <span
          aria-live="polite"
          className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
            consent && !dirty ? "text-accent" : "text-ash"
          }`}
        >
          {dirty ? "Unsaved changes" : savedLabel(consent)}
        </span>
      </div>
      <ul className="px-6">
        {rows.map((r) => {
          const locked = r.key === "essential";
          const on = locked ? true : value(r.key as Key);
          const labelId = `cookie-${r.key}`;
          return (
            <li
              key={r.key}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-b border-[#c9c6be] py-5"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  id={labelId}
                  className="font-display text-[1.625rem] font-extrabold uppercase"
                >
                  {r.name}
                  <span className="ml-2 font-mono text-[10px] font-normal tracking-[0.14em] text-stone">
                    {locked ? "Always on" : on ? "On" : "Off"}
                  </span>
                </span>
                <span className="leading-normal text-[#3a3a3a]">{r.desc}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-labelledby={labelId}
                disabled={locked}
                onClick={() =>
                  setDraft((d) => ({ ...d, [r.key]: !on }))
                }
                className={`relative h-7.5 w-13 shrink-0 rounded-full border-2 border-ink transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-55 ${
                  on ? "bg-ink" : "bg-chalk"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[3px] size-5 rounded-full transition-[left,background-color] duration-300 ${
                    on ? "left-[25px] bg-accent" : "left-[3px] bg-ink"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap gap-3 px-6 py-5 font-mono text-xs uppercase tracking-[0.14em]">
        <button
          type="button"
          onClick={() =>
            save({ analytics: value("analytics"), marketing: value("marketing") })
          }
          className="border-2 border-ink bg-ink px-5.5 uppercase py-3.5 text-chalk transition-colors duration-300 hover:border-ember hover:bg-ember"
        >
          Save my choices
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: true, marketing: true })}
          className="border-2 border-ink px-5.5 py-3.5 uppercase transition-colors duration-300 hover:bg-ink hover:text-chalk"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className="border-2 border-ink px-5.5 py-3.5 uppercase transition-colors duration-300 hover:bg-ink hover:text-chalk"
        >
          Reject all
        </button>
      </div>
    </section>
  );
}
