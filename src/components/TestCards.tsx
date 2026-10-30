"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Stripe's official test card numbers: https://docs.stripe.com/testing */
const CARDS = [
  { label: "Approved", num: "4242 4242 4242 4242", note: "Payment goes through → Order confirmed.", dot: "bg-[#5fd08a]" },
  { label: "Declined", num: "4000 0000 0000 0002", note: "Generic decline. Stripe asks for another card; nothing is charged.", dot: "bg-danger" },
  { label: "Insufficient funds", num: "4000 0000 0000 9995", note: "Declined with an “insufficient funds” message.", dot: "bg-danger" },
  { label: "3D Secure", num: "4000 0025 0000 3155", note: "Shows the bank check pop-up. Approve or fail it.", dot: "bg-caution" },
];

const SEEN_KEY = "rt-testcards-seen";

/**
 * Expandable list of test cards shown next to Checkout. A bobbing
 * "Read before you pay" callout draws the eye until it's opened once.
 */
export default function TestCards({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(true); // assume seen until storage says otherwise (no flash)
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  useEffect(() => {
    let wasSeen = false;
    try {
      wasSeen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser storage after hydration
    setSeen(wasSeen);
    return () => window.clearTimeout(timer.current);
  }, []);

  const toggle = () => {
    setOpen((o) => !o);
    if (!seen) {
      setSeen(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
    }
  };

  const copy = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num.replace(/ /g, ""));
    } catch {}
    setCopied(num);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div
      data-open={open}
      className={`test-cards relative border border-dashed border-caution text-caution ${className}`}
    >
      {!seen && (
        <span aria-hidden="true" className="test-cards-callout">
          Read before you pay ↓
        </span>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] transition-colors hover:bg-caution/10"
      >
        <span>
          Test mode · No real charges
          <br />
          <span className="text-chalk">See test cards</span>
        </span>
        <span aria-hidden="true" className="test-cards-chev text-sm">
          ▾
        </span>
      </button>
      <div id={id} className="test-cards-body" inert={!open}>
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-2 px-3 pb-3">
            {CARDS.map((c) => (
              <li
                key={c.num}
                className="grid grid-cols-[1fr_auto] items-center gap-x-2.5 gap-y-1 border-t border-[#3a3a3a] pt-2"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
                  <span aria-hidden="true" className={`size-2 ${c.dot}`} />
                  {c.label}
                </span>
                <button
                  type="button"
                  onClick={() => copy(c.num)}
                  aria-label={`Copy ${c.label} test card number`}
                  className="row-span-2 border border-chalk px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-chalk transition-colors hover:bg-chalk hover:text-ink"
                >
                  {copied === c.num ? "✓ Copied" : "Copy"}
                </button>
                <span className="font-mono text-sm tracking-[0.08em] text-chalk">{c.num}</span>
                <span className="col-span-2 text-xs text-ash">{c.note}</span>
              </li>
            ))}
            <li className="border-t border-[#3a3a3a] pt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
              Any future expiry · Any 3-digit CVC · Any postal code
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
