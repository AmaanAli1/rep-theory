/** Blueprint diagrams used inside journal posts. */
export default function PostFigure({ kind }: { kind: "wrap" | "block" }) {
  if (kind === "wrap") {
    return (
      <figure className="my-6 border-2 border-ink">
        <div className="blueprint relative flex aspect-[16/7] items-center justify-center">
          <span className="absolute left-3 top-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
            Fig. 1 · Wrap direction
          </span>
          <svg
            viewBox="0 0 480 210"
            role="img"
            aria-label="Side view of a barbell with the strap tail passing under the bar and wrapping away from the lifter"
            className="w-[80%]"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="40" y1="105" x2="440" y2="105" strokeWidth="10" />
              <circle cx="240" cy="105" r="34" />
              <path d="M206 105 A34 34 0 0 1 274 105" stroke="var(--color-accent)" strokeWidth="5" />
              <path d="M268 80 l12 -2 l-4 12" stroke="var(--color-accent)" strokeWidth="3" />
              <line x1="240" y1="139" x2="240" y2="190" strokeWidth="10" />
            </g>
            <text x="300" y="60" fontFamily="var(--font-plex-mono), monospace" fontSize="12" fill="currentColor">
              WRAP AWAY FROM YOU
            </text>
            <text x="252" y="196" fontFamily="var(--font-plex-mono), monospace" fontSize="12" fill="currentColor">
              TAIL UNDER THE BAR
            </text>
          </svg>
        </div>
        <figcaption className="border-t-2 border-ink px-3 py-2.5 font-mono text-[11px] tracking-[0.08em]">
          The tail goes under the bar and wraps away from you, so pulling tightens it.
        </figcaption>
      </figure>
    );
  }
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <figure className="my-6 border-2 border-ink">
      <div className="flex flex-col gap-3 bg-ink p-5 text-chalk">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
          Fig. 1 · A 12-week block
        </span>
        <div
          className="grid grid-cols-12 gap-1"
          role="img"
          aria-label="Twelve weeks: weeks 1 to 5 build, week 6 is a deload, weeks 7 to 11 build again, week 12 is a deload"
        >
          {weeks.map((w) => (
            <span
              key={w}
              className={`flex h-12 items-end justify-center pb-1 font-mono text-[10px] ${
                w === 6 || w === 12
                  ? "border-2 border-accent text-accent"
                  : w < 6
                    ? "bg-[#3a3a3a]"
                    : "bg-chalk text-ink"
              }`}
            >
              {String(w).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="border-t-2 border-ink px-3 py-2.5 font-mono text-[11px] tracking-[0.08em]">
        Five hard weeks, one deload, repeat. The outlined weeks are the deloads.
      </figcaption>
    </figure>
  );
}
