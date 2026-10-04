/** Big page header used on Equipment-style pages: meta row, huge title, pull-quote. */
export default function PageIntro({
  metaLeft,
  metaRight,
  title,
  tag,
  quote,
  sub,
}: {
  metaLeft: string;
  metaRight: string;
  title: string;
  tag: string;
  quote: string;
  sub: string;
}) {
  return (
    <section className="flex flex-col gap-5 px-4 pb-8 pt-10 sm:px-8 md:pt-16 lg:px-12">
      <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em]">
        <span>{metaLeft}</span>
        <span>{metaRight}</span>
      </div>
      <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
        <h1 className="font-display text-[clamp(3rem,13.5vw,11rem)] font-black uppercase leading-[0.8] tracking-tight">
          {title}
        </h1>
        <div className="mb-2.5 flex max-w-md flex-col gap-3 border-t-2 border-ink pt-3.5 lg:justify-self-end">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
            {tag}
          </span>
          <p className="font-serif text-[2.125rem] italic leading-[1.08]">
            {quote}
          </p>
          <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.08em]">
            {sub}
          </p>
        </div>
      </div>
    </section>
  );
}
