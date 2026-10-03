"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Lift = {
  tab: string;
  name: string;
  load: string;
  target: number; // reps in the set
  failAt: number; // where most sets end
  gear: string;
  shopLabel: string;
  shopHref: string;
  going: string; // message just before failure
  holds: string; // message past failure
};

const LIFTS: Lift[] = [
  {
    tab: "Bench press",
    name: "Barbell bench press",
    load: "100 kg",
    target: 8,
    failAt: 6,
    gear: "Wrist wraps",
    shopLabel: "Shop wraps",
    shopHref: "/equipment#wraps",
    going: "Wrists are going.",
    holds: "Wraps hold.",
  },
  {
    tab: "Deadlift",
    name: "Conventional deadlift",
    load: "180 kg",
    target: 6,
    failAt: 4,
    gear: "Lifting straps",
    shopLabel: "Shop straps",
    shopHref: "/equipment#straps",
    going: "Grip is going.",
    holds: "Straps hold.",
  },
  {
    tab: "Lat pulldown",
    name: "Neutral-grip pulldown",
    load: "80 kg",
    target: 10,
    failAt: 8,
    gear: "MAG-style lat bar",
    shopLabel: "Shop attachments",
    shopHref: "/equipment#attachments",
    going: "Grip is going.",
    holds: "The bar locks in.",
  },
];

const SEGMENTS = 20;

const pillars = [
  {
    num: "01 · Grip",
    title: "Your grip quits first.",
    body: "Straps take grip out of the equation, so your back and lats decide when the set ends.",
    cta: "Shop straps",
    href: "/equipment#straps",
  },
  {
    num: "02 · Stability",
    title: "Stacked wrists. Heavier presses.",
    body: "Wrist wraps keep your joints locked in under heavy bench and overhead work.",
    cta: "Shop wraps",
    href: "/equipment#wraps",
  },
  {
    num: "03 · Range",
    title: "Full stretch. Every rep.",
    body: "A neutral-grip lat bar and custom rope let you train through a fuller range of motion.",
    cta: "Shop attachments",
    href: "/equipment#attachments",
  },
  {
    num: "04 · The plan",
    // TODO: replace the placeholder with a real coach's name and credential
    title: "Programs by coaches.",
    body: "Hypertrophy, strength and cutting plans written by [Coach name, credential], or 1:1 coaching.",
    cta: "Find a program",
    href: "#programs", // same page: scrolls to the Programs section below
    featured: true,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

function segmentColour(i: number, filled: number, past: boolean) {
  if (i > filled) return "#2a2a2a";
  if (past) return "var(--color-accent)";
  if (i <= 8) return "var(--color-chalk)";
  if (i <= 15) return "var(--color-caution)";
  return "var(--color-danger)";
}

export default function Hero() {
  const [liftIndex, setLiftIndex] = useState(0);
  const [rep, setRep] = useState(0);
  const [run, setRun] = useState(0); // bumping this replays the set
  const lift = LIFTS[liftIndex];

  // Play the set once: slower near failure, a pause at the failure rep
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timers: number[] = [];

    if (reduce) {
      timers.push(window.setTimeout(() => setRep(lift.target), 0));
    } else {
      let at = 600;
      for (let r = 1; r <= lift.target; r++) {
        timers.push(window.setTimeout(() => setRep(r), at));
        at += r === lift.failAt ? 1800 : r >= lift.failAt - 2 ? 1100 : 800;
      }
    }
    return () => timers.forEach(clearTimeout);
  }, [lift, run]);

  const startSet = (index: number) => {
    setRep(0);
    setLiftIndex(index);
    setRun((n) => n + 1);
  };

  const past = rep > lift.failAt;
  const atFail = rep === lift.failAt;
  const fatigue = Math.min(100, Math.round((rep / lift.failAt) * 100));
  const filled = Math.round(fatigue / 5);

  const fatigueLabel = past
    ? "100% · Past failure"
    : `${fatigue}% · ${
        fatigue < 40
          ? "Fresh"
          : fatigue < 75
            ? "Working"
            : fatigue < 100
              ? "Near failure"
              : "Failure"
      }`;
  const fatigueColour = past
    ? "text-accent"
    : fatigue >= 75
      ? "text-danger"
      : fatigue >= 40
        ? "text-caution"
        : "text-chalk";

  let message = {
    title: "Top set. Heavy.",
    sub: "Ready",
    colour: "text-chalk",
  };
  if (rep === lift.target)
    message = {
      title: "The last rep counts.",
      sub: `Set complete · ${lift.target} / ${lift.target}`,
      colour: "text-accent",
    };
  else if (past)
    message = {
      title: lift.holds,
      sub: "Past the failure line",
      colour: "text-accent",
    };
  else if (rep >= lift.failAt - 1)
    message = {
      title: lift.going,
      sub: "Most sets end here",
      colour: atFail ? "text-danger" : "text-chalk",
    };
  else if (rep > 0)
    message = {
      title: "Clean reps.",
      sub: "In progress",
      colour: "text-chalk",
    };

  const repColour = past
    ? "text-accent"
    : atFail
      ? "text-danger"
      : "text-chalk";

  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col gap-6 px-4 pb-16 pt-10 sm:px-8 md:pt-16 lg:px-12"
    >
      <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em]">
        <span>Gear + programs · CAD</span>
        <span>Est. 2026</span>
      </div>

      <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
        <h1
          id="hero-title"
          className="font-display text-[clamp(5rem,12vw,12rem)] font-black leading-[0.8] tracking-tight"
        >
          <span className="line-mask">
            <span>THE LAST</span>
          </span>
          <span className="line-mask">
            <span>
              REP <span className="text-accent">COUNTS.</span>
            </span>
          </span>
        </h1>
        <div className="mb-2.5 flex max-w-md flex-col gap-3 border-t-2 border-ink pt-3.5 lg:justify-self-end">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
            The theory
          </span>
          <p className="font-serif text-[2.125rem] italic leading-[1.08]">
            Most sets end where your grip or wrists give out, not your muscles.
          </p>
          <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.08em]">
            Rep Theory gear and programs are built to get you past that line ↓
          </p>
        </div>
      </div>

      {/* The black rule between the headline and the scoreboard */}
      <div className="mt-2 flex flex-wrap justify-between gap-4 border-t-[6px] border-ink pt-3.5 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span>Fig. 01 · Past the failure line</span>
        <span>Set 4 of 4</span>
      </div>

      {/* Scoreboard: an animated demo set */}
      <div className="grid bg-ink text-chalk lg:grid-cols-2">
        <p className="sr-only">
          Animated demo: a heavy set where most lifters fail at rep{" "}
          {lift.failAt}, and Rep Theory gear gets you to rep {lift.target}.
        </p>

        <div
          aria-hidden="true"
          className="flex min-h-[25rem] flex-col justify-between gap-6 border-[#2a2a2a] p-6 sm:p-10 lg:border-r"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-ash">
            <span>Rep</span>
          </div>
          <div className="flex items-end gap-4">
            <span
              className={`font-display text-[clamp(10rem,22vw,16rem)] font-black leading-[0.75] tabular-nums transition-colors duration-300 ${repColour}`}
            >
              {pad(rep)}
            </span>
            <span className="pb-2 font-mono text-lg text-ash">
              / {pad(lift.target)}
            </span>
          </div>
          <div
            key={message.title}
            className="panel-in flex min-h-14 flex-col gap-1.5"
          >
            <span
              className={`font-display text-3xl font-extrabold uppercase leading-none ${message.colour}`}
            >
              {message.title}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
              {message.sub}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-7 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Choose a lift"
              className="flex flex-wrap gap-2"
            >
              {LIFTS.map((l, i) => {
                const on = i === liftIndex;
                return (
                  <button
                    key={l.tab}
                    type="button"
                    aria-pressed={on}
                    onClick={() => startSet(i)}
                    className={`min-h-10 border px-3.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      on
                        ? "border-chalk bg-chalk text-ink"
                        : "border-[#4a4a4a] hover:border-chalk"
                    }`}
                  >
                    {l.tab}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => startSet(liftIndex)}
              className="min-h-10 border border-[#4a4a4a] px-3 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-chalk"
            >
              ↻ Replay set
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
              Exercise
            </span>
            <span className="font-display text-5xl font-black uppercase leading-[0.9]">
              {lift.name}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ash">
              Top set · Target {lift.target} reps · {lift.load}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#2a2a2a] py-3.5">
            <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em]">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full bg-accent"
              />
              Gear: {lift.gear} · On
            </span>
            <Link
              href={lift.shopHref}
              className="font-mono text-[11px] uppercase tracking-[0.14em] underline-offset-4 hover:text-accent hover:underline"
            >
              {lift.shopLabel} →
            </Link>
          </div>

          <div aria-hidden="true" className="flex flex-col gap-3">
            <div className="flex justify-between font-mono text-xs uppercase tracking-[0.12em]">
              <span className="text-ash">Fatigue</span>
              <span className={fatigueColour}>{fatigueLabel}</span>
            </div>
            <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
              {Array.from({ length: SEGMENTS }, (_, k) => (
                <span
                  key={k}
                  className="h-7 transition-colors duration-300"
                  style={{
                    backgroundColor: segmentColour(k + 1, filled, past),
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 font-mono text-[10px] uppercase tracking-[0.12em]">
              <span className="text-chalk">Fresh</span>
              <span className="text-caution">Working</span>
              <span className="text-danger">Failure</span>
              <span className="text-right text-accent">Past it</span>
            </div>
          </div>
        </div>
      </div>

      {/* Four reasons, each linking to what it sells */}
      <ul className="grid border-l-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <li key={p.num} className="border-b-2 border-r-2 border-ink">
            {p.href.startsWith("#") ? (
              // Plain anchor + scrollIntoView so it scrolls every time, not
              // just the first (Next's Link ignores a hash the URL already has)
              <a
                href={p.href}
                onClick={(e) => {
                  const target = document.getElementById(p.href.slice(1));
                  if (!target) return;
                  e.preventDefault();
                  const reduce = window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches;
                  target.scrollIntoView({
                    behavior: reduce ? "auto" : "smooth",
                    block: "start",
                  });
                }}
                className={`group flex h-full flex-col gap-3.5 p-6 transition-colors duration-300 ${
                  p.featured
                    ? "bg-ember text-[#f4f1ea] hover:bg-rust"
                    : "hover:bg-ink hover:text-chalk"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
                  {p.num}
                </span>
                <span className="font-display text-4xl font-black uppercase leading-[0.9]">
                  {p.title}
                </span>
                <span className="text-[15px] leading-normal">{p.body}</span>
                <span
                  className={`mt-auto inline-block font-mono text-[11px] uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1 ${
                    p.featured ? "" : "group-hover:text-accent"
                  }`}
                >
                  {p.cta} →
                </span>
              </a>
            ) : (
              <Link
                href={p.href}
                className={`group flex h-full flex-col gap-3.5 p-6 transition-colors duration-300 ${
                  p.featured
                    ? "bg-ember text-[#f4f1ea] hover:bg-rust"
                    : "hover:bg-ink hover:text-chalk"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
                  {p.num}
                </span>
                <span className="font-display text-4xl font-black uppercase leading-[0.9]">
                  {p.title}
                </span>
                <span className="text-[15px] leading-normal">{p.body}</span>
                <span
                  className={`mt-auto inline-block font-mono text-[11px] uppercase tracking-[0.14em] transition-transform duration-300 group-hover:translate-x-1 ${
                    p.featured ? "" : "group-hover:text-accent"
                  }`}
                >
                  {p.cta} →
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
