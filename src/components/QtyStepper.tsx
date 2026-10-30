"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_QTY } from "@/lib/pricing";

/**
 * − / qty / + control. Going below 1 is refused with a shake and an inline
 * message ("use Remove instead" in the cart).
 */
export default function QtyStepper({
  qty,
  onChange,
  size = "md",
  floorMessage = "Quantity can't be less than 1.",
  label = "Quantity",
}: {
  qty: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
  floorMessage?: string;
  label?: string;
}) {
  const [error, setError] = useState(0); // bump to restart the shake
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const dec = () => {
    if (qty <= 1) {
      setError((n) => n + 1);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setError(0), 2600);
      return;
    }
    onChange(qty - 1);
  };

  const btn = size === "sm" ? "size-9 text-lg" : "w-12 text-xl";
  const mid = size === "sm" ? "min-w-9" : "min-w-12 text-lg";

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div
        key={error}
        role="group"
        aria-label={label}
        className={`flex border-2 ${error ? "animate-shake border-danger" : "border-ink"}`}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={dec}
          className={`${btn} transition-colors hover:bg-ink hover:text-chalk`}
        >
          −
        </button>
        <span
          aria-live="polite"
          className={`flex items-center justify-center border-x-2 border-ink font-mono ${mid}`}
        >
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={qty >= MAX_QTY}
          onClick={() => onChange(Math.min(MAX_QTY, qty + 1))}
          className={`${btn} transition-colors hover:bg-ink hover:text-chalk disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink`}
        >
          +
        </button>
      </div>
      {error > 0 && (
        <span
          role="alert"
          className="animate-fade-in font-mono text-[11px] uppercase tracking-[0.08em] text-danger"
        >
          ✕ {floorMessage}
        </span>
      )}
    </div>
  );
}
