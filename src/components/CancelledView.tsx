"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { priceCart } from "@/lib/pricing";

export default function CancelledView() {
  const { count } = priceCart(useCart());
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-5 px-4 py-24 sm:px-8 lg:px-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        Checkout cancelled
      </span>
      <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-black uppercase leading-[0.82]">
        No charge made.
      </h1>
      <p className="max-w-2xl font-serif text-[1.75rem] italic leading-[1.15]">
        You left the payment page, so nothing was charged. Your cart is saved
        right where you left it.
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
        <Link
          href="/cart"
          className="group border-2 border-ink bg-ink px-5 py-3.5 text-chalk transition-colors hover:border-ember hover:bg-ember"
        >
          Back to cart ({count}){" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href="/equipment"
          className="border-2 border-ink px-5 py-3.5 transition-colors hover:bg-ink hover:text-chalk"
        >
          Keep shopping
        </Link>
      </div>
    </section>
  );
}
