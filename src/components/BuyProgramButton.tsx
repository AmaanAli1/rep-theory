"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { addToCart, useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/data/catalog";
import { kindOf } from "@/lib/pricing";

/** Buy (programs) or Subscribe (coaching) button on a program page. */
export default function BuyProgramButton({ product }: { product: Product }) {
  const isCoaching = kindOf(product) === "coaching";
  const inCart = useCart().some((l) => l.slug === product.slug);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const add = () => {
    addToCart({ slug: product.slug }, 1);
    setJustAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 2000);
  };

  const label = isCoaching ? "Subscribe" : "Add to cart";

  return (
    <>
      {isCoaching && inCart && !justAdded ? (
        <Link
          href="/cart"
          className="group flex items-center justify-between border-2 border-ink px-7 py-4.5 font-display text-2xl font-extrabold uppercase tracking-wide transition-colors hover:bg-ink hover:text-chalk"
        >
          ✓ In your cart · View cart
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={add}
          className="flex items-center justify-between border-2 border-ink bg-ink px-7 py-4.5 text-left font-display text-2xl font-extrabold uppercase tracking-wide text-chalk transition-colors duration-300 hover:border-ember hover:bg-ember"
        >
          {justAdded ? "✓ Added" : label}
          <span className="font-mono text-base">{formatPrice(product)}</span>
        </button>
      )}
      <p className="-mt-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
        {isCoaching
          ? "Billed monthly · Cancel anytime · Test mode, no real charges"
          : "One-time purchase · Instant download · Test mode, no real charges"}
      </p>
    </>
  );
}
