"use client";

import { useEffect, useRef, useState } from "react";
import { removeLine, restoreLine, type useCart } from "@/lib/cart";
import type { CartLine } from "@/lib/pricing";

const LEAVE_MS = 1150; // stamp (0.45s) + slide out (0.65s)

/** Remove with the stamp-then-slide animation, then a 5-second Undo. */
export function useRemoveWithUndo(cart: ReturnType<typeof useCart>) {
  const [leaving, setLeaving] = useState<Record<string, true>>({});
  const [undo, setUndo] = useState<{ line: CartLine; index: number; name: string } | null>(null);
  const undoTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(undoTimer.current), []);

  const remove = (key: string, name: string) => {
    const index = cart.findIndex((l) => l.key === key);
    const line = cart[index];
    if (!line) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLeaving((s) => ({ ...s, [key]: true }));
    window.setTimeout(
      () => {
        removeLine(key);
        setLeaving((s) => {
          const next = { ...s };
          delete next[key];
          return next;
        });
        setUndo({ line, index, name });
        window.clearTimeout(undoTimer.current);
        undoTimer.current = window.setTimeout(() => setUndo(null), 5000);
      },
      reduce ? 0 : LEAVE_MS,
    );
  };

  const restore = () => {
    if (!undo) return;
    restoreLine(undo.line, undo.index);
    setUndo(null);
  };

  return { leaving, remove, undo, restore };
}

/** Sends the cart to our API, which re-prices it and returns a Stripe Checkout URL. */
export function useCheckout(cart: ReturnType<typeof useCart>) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async () => {
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.assign(data.url); // Stripe's hosted checkout page
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setCheckingOut(false);
    }
  };

  return { checkout, checkingOut, error };
}
