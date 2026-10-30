import type { Metadata } from "next";
import Link from "next/link";
import { blockWeeks } from "@/components/ProgramSheet";
import { formatPrice, programs, productHref } from "@/data/catalog";

export const metadata: Metadata = {
  title: "12-Week Training Programs & 1:1 Coaching",
  keywords: ["hypertrophy program", "cutting program", "strength program", "12 week workout plan", "online coaching"],
  alternates: { canonical: "/programs" },
  description:
    "12-week hypertrophy, cutting and strength plans, plus 1:1 coaching from Rep Theory.",
};

const plans = programs.filter((p) => p.details?.block);
const coaching = programs.find((p) => !p.details?.block);

// Side-by-side comparison, in the same order as the plan cards
const compare: { label: string; values: Record<string, string> }[] = [
  {
    label: "Goal",
    values: {
      "hypertrophy-program": "Build muscle",
      "cutting-program": "Lose fat, keep muscle",
      "strength-program": "Lift heavier",
    },
  },
  {
    label: "Best for",
    values: {
      "hypertrophy-program": "6+ months of training",
      "cutting-program": "Solid base, starting a cut",
      "strength-program": "Know the big three lifts",
    },
  },
  {
    label: "Extras",
    values: {
      "hypertrophy-program": "Exercise swap guide",
      "cutting-program": "Calorie + intake assessment",
      "strength-program": "Percentage calculator",
    },
  },
];

const assessment = [
  "What's your main goal right now?",
  "How long have you been lifting consistently?",
  "How many days a week can you train?",
  "Roughly how much do you eat in a day?",
  "Want a coach checking in, or run it yourself?",
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProgramsPage() {
  return (
    <>
      <section className="flex flex-col gap-5 px-4 pb-8 pt-10 sm:px-8 md:pt-16 lg:px-12">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em]">
          <span>
            Programs · {pad(plans.length)} plans · 01 coaching
          </span>
          <span>Prices in CAD</span>
        </div>
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <h1 className="font-display text-[clamp(3rem,13.5vw,11rem)] font-black leading-[0.8] tracking-tight">
            PROGRAMS
          </h1>
          <div className="mb-2.5 flex max-w-md flex-col gap-3 border-t-2 border-ink pt-3.5 lg:justify-self-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
              The plan
            </span>
            <p className="font-serif text-[2.125rem] italic leading-[1.08]">
              Gear gets you past the last rep. A plan makes every rep count.
            </p>
            <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.08em]">
              Written by [Coach name, credential] ↓
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-4 border-t-[6px] border-ink pt-3.5 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span>Digital plans · One-time purchase</span>
          <span>PDF + spreadsheet tracker</span>
        </div>
      </section>

      {/* The three 12-week plans */}
      <section aria-label="Digital plans" className="px-4 pb-16 sm:px-8 lg:px-12">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,21rem),1fr))] gap-6">
          {plans.map((p) => {
            const block = p.details!.block!;
            const weeks = blockWeeks(block);
            const phases = block.segments
              .map((s) => s.label.replace(/^Phase \d · /, ""))
              .join(" → ");
            return (
              <li key={p.slug}>
                <Link
                  href={productHref(p)}
                  className="program-card group @container flex h-full flex-col border-2 border-ink bg-paper"
                >
                  <div className="flex flex-col gap-3.5 bg-ink p-5 text-chalk">
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                      <span>{p.code}</span>
                      <span>{block.weeks} weeks</span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="grid gap-1"
                      style={{
                        gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {weeks.map(({ seg, si }, i) => (
                        <div
                          key={i}
                          className={`h-7 border-2 ${
                            seg.accent
                              ? "border-accent"
                              : si % 2 === 0
                                ? "border-[#3a3a3a] bg-[#3a3a3a]"
                                : "border-chalk bg-chalk"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
                      {phases}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5.5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                      {p.spec}
                    </span>
                    <h2 className="font-display text-[min(3.25rem,12.5cqi)] font-black uppercase leading-[0.9]">
                      {p.name}
                    </h2>
                    <p className="font-serif text-[1.375rem] italic leading-[1.2]">
                      {p.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#c9c6be] pt-3">
                      <span className="font-mono text-lg">{formatPrice(p)}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
                        View program{" "}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 1:1 coaching band */}
      {coaching?.details && (
        <section
          aria-labelledby="coaching-title"
          className="bg-ink px-4 py-[clamp(3rem,6vw,6rem)] text-chalk sm:px-8 lg:px-12"
        >
          <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-10 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {coaching.code} · {coaching.details.format}
              </span>
              <h2
                id="coaching-title"
                className="font-display text-[clamp(4rem,8vw,7.5rem)] font-black uppercase leading-[0.82]"
              >
                {coaching.name}
              </h2>
              <p className="max-w-xl font-serif text-3xl italic leading-[1.12]">
                {coaching.details.goal}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-5">
                <Link
                  href={productHref(coaching)}
                  className="group bg-chalk px-6.5 py-4 font-display text-[1.375rem] font-extrabold uppercase tracking-wide text-ink transition-colors duration-300 hover:bg-accent"
                >
                  See coaching{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <span className="font-mono text-lg uppercase">
                  {formatPrice(coaching)}
                </span>
              </div>
            </div>
            <ol className="grid grid-cols-2 border-t border-[#3a3a3a]">
              {coaching.details.schedule.map((s, i) => (
                <li
                  key={s.label}
                  className={`flex flex-col gap-1.5 py-5 ${
                    i % 2 === 0 ? "pr-4" : "border-l border-[#3a3a3a] pl-4"
                  } ${i < 2 ? "border-b border-[#3a3a3a]" : ""}`}
                >
                  <span className="font-mono text-xs text-accent">{s.label}</span>
                  <span className="font-display text-[1.75rem] font-extrabold uppercase leading-none">
                    {s.focus}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Comparison + free assessment */}
      <section
        aria-labelledby="compare-title"
        className="flex flex-col gap-4 px-4 pb-24 pt-20 sm:px-8 lg:px-12"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
          <h2
            id="compare-title"
            className="font-display text-5xl font-black uppercase"
          >
            Which plan is for you?
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em]">
            Compare the three digital plans
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[45rem] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-ink">
                <td className="w-44" />
                {plans.map((p) => (
                  <th key={p.slug} scope="col" className="py-3 pr-4">
                    <Link
                      href={productHref(p)}
                      className="font-display text-3xl font-black uppercase transition-colors duration-300 hover:text-ember"
                    >
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Length",
                  get: (slug: string) =>
                    `${plans.find((p) => p.slug === slug)?.details?.block?.weeks} weeks`,
                },
                {
                  label: "Days / week",
                  get: (slug: string) =>
                    String(
                      plans.find((p) => p.slug === slug)?.details?.schedule
                        .length,
                    ),
                },
                ...compare.map((row) => ({
                  label: row.label,
                  get: (slug: string) => row.values[slug] ?? "",
                })),
                {
                  label: "Price",
                  get: (slug: string) => {
                    const p = plans.find((x) => x.slug === slug);
                    return p ? formatPrice(p) : "";
                  },
                },
              ].map((row) => (
                <tr key={row.label} className="border-b border-[#c9c6be]">
                  <th
                    scope="row"
                    className="py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-stone"
                  >
                    {row.label}
                  </th>
                  {plans.map((p) => (
                    <td key={p.slug} className="py-3.5 pr-4">
                      {row.get(p.slug)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
          General fitness guidance, not medical or dietitian advice.
        </p>

        <div className="blueprint mt-10 grid items-center gap-8 border-2 border-dashed border-ink p-[clamp(1.25rem,3vw,2.25rem)] [background-size:24px_24px] lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="self-start bg-caution px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink">
              In development
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.85]">
              Not sure? Take the free assessment.
            </h2>
            <p className="max-w-lg font-serif text-2xl italic leading-[1.15]">
              Five quick questions about your goal, experience and week. We
              point you to the plan that fits.
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                disabled
                className="cursor-not-allowed bg-ink px-6.5 py-4 font-display text-[1.375rem] font-extrabold uppercase tracking-wide text-ash"
              >
                Start the assessment →
              </button>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
                Coming soon · Free · ~2 min
              </span>
            </div>
          </div>
          <ol className="border-t border-ink">
            {assessment.map((q, i) => (
              <li
                key={q}
                className="flex gap-4 border-b border-[#c9c6be] py-3 last:border-0"
              >
                <span className="font-mono text-xs text-ember">Q{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
