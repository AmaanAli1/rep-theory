"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LineThumb from "@/components/LineThumb";
import { onAdded, type AddedEvent } from "@/lib/cart";
import { describeOptions, money, priceCart } from "@/lib/pricing";
import { getProduct } from "@/data/catalog";
import { useCart } from "@/lib/cart";

/** "✓ Added to cart" pop-up under the header's cart link. */
export default function AddedPopup() {
  const [added, setAdded] = useState<AddedEvent | null>(null);
  const [n, setN] = useState(0); // restart the entrance on each add
  const timer = useRef<number | undefined>(undefined);
  const { count } = priceCart(useCart());

  useEffect(() => {
    const off = onAdded((e) => {
      setAdded(e);
      setN((x) => x + 1);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setAdded(null), 6000);
    });
    return () => {
      off();
      window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!added) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAdded(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [added]);

  if (!added) return null;
  const product = getProduct(added.line.slug)?.product;
  if (!product) return null;
  const already = added.addedQty === 0;

  return (
    <div
      key={n}
      role="status"
      className="drop-in absolute right-4 top-full z-50 mt-2 w-[min(25rem,calc(100vw-2rem))] border-2 border-ink bg-paper text-ink shadow-[8px_8px_0_var(--color-accent)] sm:right-8 lg:right-12"
    >
      <div className="flex items-center justify-between border-b border-[#c9c6be] px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
          {already ? "Already in your cart" : "✓ Added to cart"}
        </span>
        <button
          type="button"
          aria-label="Close"
          onClick={() => setAdded(null)}
          className="text-base transition-colors hover:text-ember"
        >
          ✕
        </button>
      </div>
      <div className="flex items-center gap-3.5 px-4 py-3.5">
        <LineThumb product={product} size="size-18" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="font-medium">{product.name}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">
            {[describeOptions(added.line, product), `Qty ${already ? 1 : added.addedQty}`]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
        <span className="font-mono">
          {money(product.price * 100 * Math.max(1, added.addedQty))}
          {product.priceNote ?? ""}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 px-4 pb-4 font-mono text-xs uppercase tracking-[0.14em]">
        <Link
          href="/cart"
          onClick={() => setAdded(null)}
          className="border-2 border-ink py-3 text-center transition-colors hover:bg-ink hover:text-chalk"
        >
          View cart ({count})
        </Link>
        <Link
          href="/cart"
          onClick={() => setAdded(null)}
          className="group border-2 border-ink bg-ink py-3 text-center text-chalk transition-colors hover:border-ember hover:bg-ember"
        >
          Checkout{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
