import ProductDrawing from "@/components/ProductDrawing";
import SocialIcon from "@/components/SocialIcon";
import { INSTAGRAM, SOCIAL } from "@/lib/site";
import SocialLink from "@/components/SocialLink";

/**
 * "Follow the build" band: our launch posts as designed tiles that link to
 * Instagram. No embed script, so no third-party cookies before consent.
 */
type Kind = "dark" | "straps" | "orange" | "quote" | "week" | "latbar";

const tiles: { kind: Kind; type?: "carousel" | "reel"; caption: string }[] = [
  { kind: "dark", caption: "Launch post. Anyone can do the first rep. We make gear for the one after." },
  { kind: "straps", type: "carousel", caption: "Custom straps, your name stitched on. 38 mm cotton, 12 characters." },
  { kind: "orange", type: "carousel", caption: "New on the journal: why the easiest week of your block makes the next one work." },
  { kind: "quote", caption: "Why we started Rep Theory. Full story on the journal." },
  { kind: "week", type: "reel", caption: "Hypertrophy, Cutting, Strength. 12 weeks, deloads built in." },
  { kind: "latbar", type: "reel", caption: "Neutral grip, full stretch. The MAG-style lat bar, close or wide." },
];

const pillars = ["Form tips", "New gear", "Training", "Behind the build"];

const stats = [
  { v: "06", k: "Posts ready" },
  { v: "3×", k: "Per week", accent: true },
  { v: "04", k: "Content pillars" },
];

function Tile({ kind }: { kind: Kind }) {
  const base = "flex aspect-square flex-col justify-between border-2 p-4";
  switch (kind) {
    case "dark":
      return (
        <div className={`${base} border-[#3a3a3a] bg-[#181818] text-chalk`}>
          <span className="font-mono text-[10px] tracking-[0.14em] text-accent">REP THEORY</span>
          <span className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-black leading-[0.88]">THE LAST REP COUNTS.</span>
        </div>
      );
    case "orange":
      return (
        <div className={`${base} border-ink bg-accent text-ink`}>
          <span className="font-mono text-[10px] tracking-[0.14em]">JOURNAL · POST 03</span>
          <span className="font-display text-[clamp(2rem,3.2vw,2.8rem)] font-black leading-[0.88]">DELOAD ≠ WEAK.</span>
        </div>
      );
    case "quote":
      return (
        <div className={`${base} border-ink bg-chalk text-ink`}>
          <span aria-hidden="true" className="font-serif text-7xl leading-[0.6] text-ember">“</span>
          <span className="font-serif text-[clamp(1.1rem,1.7vw,1.4rem)] italic leading-[1.12]">
            We wanted gear we&apos;d actually use, for the rep we usually skip.
          </span>
        </div>
      );
    case "week":
      return (
        <div className={`${base} border-[#3a3a3a] bg-[#181818] text-chalk`}>
          <span className="font-display text-[clamp(2rem,3.2vw,2.8rem)] font-black leading-[0.88]">12 WEEKS.</span>
          <span className="grid grid-cols-12 gap-[3px]">
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={i}
                className={`h-7 ${i === 5 || i === 11 ? "outline outline-2 -outline-offset-2 outline-accent" : i < 5 ? "bg-[#3a3a3a]" : "bg-chalk"}`}
              />
            ))}
          </span>
        </div>
      );
    default:
      return (
        <div className={`${base} blueprint relative items-center justify-center border-ink`}>
          <span className="absolute left-3 top-2.5 font-mono text-[10px] tracking-[0.14em]">
            {kind === "straps" ? "RT-01" : "RT-04"} · NEW
          </span>
          <ProductDrawing kind={kind} className="size-[62%]" />
        </div>
      );
  }
}

/** Instagram's post-type marker: stacked squares for a carousel, play for a reel. */
function TypeMark({ type }: { type: "carousel" | "reel" }) {
  return (
    <span
      aria-hidden="true"
      className="absolute right-2.5 top-2.5 z-[1] inline-flex size-6 items-center justify-center border border-[#3a3a3a] bg-ink text-chalk"
    >
      <svg viewBox="0 0 16 16" className="size-3.5">
        {type === "carousel" ? (
          <>
            <rect x="4.5" y="1.5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 4.5v10h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </>
        ) : (
          <path d="M5 3.5l8 4.5-8 4.5z" fill="currentColor" />
        )}
      </svg>
    </span>
  );
}

export default function SocialBand() {
  const ig = INSTAGRAM.url;
  const others = SOCIAL.filter((s) => s.name !== "Instagram");
  const followClass =
    "group flex items-center justify-between gap-2.5 bg-chalk px-4.5 py-4 font-mono text-xs uppercase tracking-[0.14em] text-ink";

  return (
    <section aria-labelledby="social-title" className="bg-ink px-4 py-[clamp(3rem,6vw,6rem)] text-chalk sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[84rem] flex-wrap items-stretch gap-[clamp(2rem,5vw,4rem)]">
        {/* Profile card */}
        <div className="@container flex min-w-0 max-w-[26rem] flex-[1_1_18rem] flex-col gap-5 lg:justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Follow the build</span>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex size-[4.75rem] shrink-0 items-center justify-center bg-accent font-display text-[2.4rem] font-black text-ink shadow-[5px_5px_0_var(--color-chalk)]"
            >
              RT
            </span>
            <div className="flex min-w-0 flex-col gap-1.5">
              <h2 id="social-title" className="whitespace-nowrap font-display text-[clamp(1.5rem,calc((100cqw-6rem)/7.4),2.75rem)] font-black leading-[0.85]">
                {INSTAGRAM.handle.toUpperCase()}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
                Rep Theory · Gear + programs · Waterloo, ON
              </span>
            </div>
          </div>
          <p className="font-serif text-[1.625rem] italic leading-[1.15] text-[#d8d5cd]">
            Form tips, new gear and the occasional PR. For the rep you usually skip.
          </p>
          <dl className="grid grid-cols-3 border-y border-[#3a3a3a]">
            {stats.map((st, i) => (
              <div
                key={st.k}
                className={`flex flex-col-reverse gap-1 py-3.5 ${i > 0 ? "pl-3.5" : ""} ${i < 2 ? "border-r border-[#3a3a3a]" : ""}`}
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">{st.k}</dt>
                <dd className={`font-display text-[2.5rem] font-black leading-[0.85] ${st.accent ? "text-accent" : ""}`}>{st.v}</dd>
              </div>
            ))}
          </dl>
          {ig ? (
            <a
              href={ig}
              target="_blank"
              rel="noopener noreferrer"
              className={`${followClass} transition-colors hover:bg-ember hover:text-[#f4f1ea]`}
            >
              <span className="inline-flex items-center gap-2.5">
                <SocialIcon name="Instagram" /> Follow on Instagram
              </span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          ) : (
            <span className={followClass} aria-label={`Instagram ${INSTAGRAM.handle}, launching soon`}>
              <span className="inline-flex items-center gap-2.5">
                <SocialIcon name="Instagram" /> Follow on Instagram
              </span>
              <span className="bg-ink px-2 py-1 text-[10px] text-caution">Soon</span>
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Also on</span>
            {others.map((s) => (
              <SocialLink key={s.name} profile={s} />
            ))}
          </div>
          {!ig && (
            <div role="status" className="hazard-tape flex h-[30px] items-center justify-center">
              <span className="whitespace-nowrap bg-ink px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-caution sm:text-[10px] sm:tracking-[0.16em]">
                <span aria-hidden="true" className="max-sm:hidden">▲ </span>
                Social media presence launching soon
                <span aria-hidden="true" className="max-sm:hidden"> ▲</span>
              </span>
            </div>
          )}
        </div>

        {/* Profile grid */}
        <div className="flex min-w-0 max-w-[54rem] flex-[3_1_32rem] flex-col gap-3.5">
          <div className="flex items-baseline justify-between border-b border-[#3a3a3a] pb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ash">
            <span className="text-chalk">▦ Grid</span>
            <span>First 6 posts · planned</span>
          </div>
          <ul className="grid grid-cols-2 gap-2.5 text-ink sm:grid-cols-3">
            {tiles.map((t) => {
              const inner = (
                <>
                  <Tile kind={t.kind} />
                  {t.type && <TypeMark type={t.type} />}
                  <span className="ig-cap absolute inset-x-0 bottom-0 z-[2] bg-ink px-3 py-2.5 font-mono text-[11px] leading-snug tracking-[0.04em] text-chalk">
                    {t.caption}
                  </span>
                </>
              );
              return (
                <li key={t.kind}>
                  {ig ? (
                    <a
                      href={ig}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram post: ${t.caption} (opens in a new tab)`}
                      className="ig-tile product-card relative block overflow-hidden"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div tabIndex={0} role="figure" className="ig-tile relative block overflow-hidden" aria-label={`Planned post: ${t.caption}`}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Pillars</span>
            {pillars.map((pl) => (
              <span key={pl} className="border border-[#3a3a3a] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                {pl}
              </span>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
              Hover a post for its caption · no tracking scripts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
