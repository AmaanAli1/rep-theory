import type { ProgramDetails } from "@/data/catalog";

type Block = NonNullable<ProgramDetails["block"]>;

/**
 * One entry per week, tagged with its segment so squares can be shaded by phase.
 * Training phases alternate grey / chalk (si = phase index); accent weeks
 * (deload, diet break, test) are outlined in orange.
 */
export function blockWeeks(block: Block) {
  const phaseOf = block.segments.map(
    (_, i) =>
      block.segments.slice(0, i + 1).filter((x) => !x.accent).length - 1,
  );
  return block.segments.flatMap((seg, i) =>
    Array.from({ length: seg.weeks }, () => ({ seg, si: phaseOf[i] })),
  );
}

/** Black "program sheet": the training block as week squares, or the coaching steps. */
export default function ProgramSheet({
  code,
  details,
}: {
  code: string;
  details: ProgramDetails;
}) {
  const block = details.block;

  if (!block) {
    // 1:1 coaching has no fixed block: show how it works instead
    return (
      <div className="flex flex-col gap-7 bg-ink p-[clamp(1.25rem,3vw,2.25rem)] text-chalk">
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
          <span>Program sheet · {code}</span>
          <span>{details.scheduleLabel}</span>
        </div>
        <ol className="flex flex-col">
          {details.schedule.map((s) => (
            <li
              key={s.label}
              className="flex items-baseline gap-5 border-b border-[#2a2a2a] py-4 last:border-0"
            >
              <span className="font-mono text-sm text-accent">{s.label}</span>
              <span className="font-display text-4xl font-extrabold uppercase">
                {s.focus}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-[15px] leading-relaxed text-[#d8d5cd]">
          You fill out a short intake form, get a plan written for you, then
          check in every week so it keeps fitting your life.
        </p>
      </div>
    );
  }

  const weekSegments = blockWeeks(block);
  const daysPerWeek = details.schedule.length;

  return (
    <div className="flex flex-col gap-7 bg-ink p-[clamp(1.25rem,3vw,2.25rem)] text-chalk">
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
        <span>Program sheet · {code}</span>
        <span>Block overview</span>
      </div>
      <div className="flex items-end gap-3.5">
        <span className="font-display text-[10rem] font-black leading-[0.75]">
          {block.weeks}
        </span>
        <span className="pb-1.5 font-mono text-sm uppercase tracking-[0.12em]">
          Weeks · {daysPerWeek} days / week
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${block.weeks}, minmax(0, 1fr))`,
          }}
          aria-hidden="true"
        >
          {weekSegments.map(({ seg, si }, i) => (
            <div
              key={i}
              className={`flex h-14 items-end justify-center border-2 pb-1.5 font-mono text-[11px] ${
                seg.accent
                  ? "border-accent text-accent"
                  : si % 2 === 0
                    ? "border-[#3a3a3a] bg-[#3a3a3a]"
                    : "border-chalk bg-chalk text-ink"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
        <div
          className="grid gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
          style={{
            gridTemplateColumns: block.segments
              .map((s) => `${s.weeks}fr`)
              .join(" "),
          }}
        >
          {block.segments.map((s, i) => (
            <span
              key={i}
              className={`border-t-2 pt-1.5 ${
                s.accent ? "border-accent text-accent" : "border-chalk"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[15px] leading-relaxed text-[#d8d5cd]">{block.note}</p>
    </div>
  );
}
