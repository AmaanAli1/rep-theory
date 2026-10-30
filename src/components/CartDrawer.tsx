"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import LineThumb from "@/components/LineThumb";
import QtyStepper from "@/components/QtyStepper";
import TestCards from "@/components/TestCards";
import UndoToast from "@/components/UndoToast";
import GuestNote from "@/components/GuestNote";
import { setQty, useCart } from "@/lib/cart";
import { FREE_SHIPPING_OVER_CENTS, money, priceCart } from "@/lib/pricing";
import { useCheckout, useRemoveWithUndo } from "@/lib/useCartActions";
import { productHref } from "@/data/catalog";

/** Slide-in mini cart opened from the header's CART link. */
export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useCart();
  const totals = priceCart(cart);
  const { leaving, remove, undo, restore } = useRemoveWithUndo(cart);
  const { checkout, checkingOut, error } = useCheckout(cart);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  // Portal to <body>: the header uses a transform, which would trap a fixed panel inside it
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const gearCents = totals.lines.filter((l) => l.kind === "gear").reduce((s, l) => s + l.totalCents, 0);
  const toFree = Math.max(0, FREE_SHIPPING_OVER_CENTS - gearCents);

  // Close on navigation (e.g. "View full cart" or a product link)
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname && open) onClose();
    lastPath.current = pathname;
  }, [pathname, open, onClose]);

  // Esc to close, lock page scroll, move focus in and back out
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        data-open={open}
        onClick={onClose}
        aria-hidden="true"
        className="cart-drawer-back fixed inset-0 z-[55] bg-ink/50"
      />
      <aside
        id="mini-cart"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        inert={!open}
        className="cart-drawer fixed inset-y-0 right-0 z-[56] flex w-[min(27.5rem,92vw)] flex-col border-l-2 border-ink bg-chalk text-ink shadow-[-8px_0_0_var(--color-accent)]"
      >
        <div className="flex items-center justify-between bg-ink px-5.5 py-4.5 text-chalk">
          <span className="font-display text-3xl font-black uppercase">
            Your cart <span className="text-accent">({totals.count})</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="size-10 border border-chalk transition-colors hover:bg-chalk hover:text-ink"
          >
            ✕
          </button>
        </div>

        {totals.count === 0 ? (
          <div className="flex flex-col gap-3.5 px-5.5 py-8">
            <span className="font-display text-[2.75rem] font-black uppercase leading-[0.9]">Nothing here yet.</span>
            <span className="font-serif text-[1.375rem] italic">The last rep starts with the right kit.</span>
            <Link
              href="/equipment"
              onClick={onClose}
              className="group border-2 border-ink bg-ink px-4 py-3.5 text-center font-mono text-xs uppercase tracking-[0.14em] text-chalk transition-colors hover:border-ember hover:bg-ember"
            >
              Browse equipment <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            {totals.hasGear && (
              <div className="flex flex-col gap-2 border-b border-[#c9c6be] px-5.5 py-3.5">
                <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${toFree ? "" : "text-ember"}`}>
                  {toFree ? `${money(toFree)} away from free shipping` : "✓ Free shipping unlocked"}
                </span>
                <div className="h-1.5 bg-[#d8d5cd]" aria-hidden="true">
                  <div
                    className="ship-bar h-full bg-accent"
                    style={{ width: `${Math.min(100, Math.round((gearCents / FREE_SHIPPING_OVER_CENTS) * 100))}%` }}
                  />
                </div>
              </div>
            )}

            <ul className="flex-1 px-5.5">
              {totals.lines.map((l) => (
                <li
                  key={l.key}
                  data-leave={leaving[l.key] ? "true" : undefined}
                  className="drawer-item cart-line grid grid-cols-[4rem_minmax(0,1fr)_auto] items-start gap-3.5 border-b border-[#c9c6be] py-3.5"
                >
                  <LineThumb product={l.product} size="size-16" />
                  <div className="flex min-w-0 flex-col gap-1">
                    <Link href={productHref(l.product)} onClick={onClose} className="font-medium transition-colors hover:text-ember">
                      {l.product.name}
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-stone">{l.options}</span>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      {l.kind === "coaching" ? (
                        <span className="border border-ink px-1.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                          Monthly · Qty 1
                        </span>
                      ) : (
                        <QtyStepper
                          size="sm"
                          qty={l.qty}
                          onChange={(n) => setQty(l.key, n)}
                          floorMessage="Can't go below 1. Use Remove."
                          label={`Quantity of ${l.product.name}`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => remove(l.key, l.product.name)}
                        disabled={Boolean(leaving[l.key])}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] underline underline-offset-[3px] transition-colors hover:text-ember"
                      >
                        Remove<span className="sr-only"> {l.product.name}</span>
                      </button>
                    </div>
                  </div>
                  <span className="text-right font-mono text-sm">
                    {money(l.totalCents)}
                    {l.kind === "coaching" ? "/mo" : ""}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1.5 border-t-2 border-ink bg-paper px-5.5 pb-5 pt-4">
              <SumRow label="Subtotal" value={money(totals.subtotalCents)} />
              <SumRow
                label="Shipping"
                value={!totals.hasGear ? "—" : totals.shippingCents ? money(totals.shippingCents) : "FREE"}
              />
              <SumRow label="HST (13%)" value={money(totals.taxCents)} muted />
              <div className="mt-1 flex items-baseline justify-between border-t border-ink pt-2.5">
                <span className="font-display text-[1.625rem] font-black uppercase">Due today</span>
                <span className="font-mono text-xl">{money(totals.totalCents)}</span>
              </div>
              {totals.hasSubscription && (
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ember">
                  Then {money(totals.monthlyWithTaxCents)} / month for 1:1 coaching
                </span>
              )}
              <GuestNote className="mt-1.5 text-stone" />
              <button
                type="button"
                onClick={checkout}
                disabled={checkingOut}
                className="group mt-1 flex items-center justify-between border-2 border-ink bg-ink px-4.5 py-4 font-display text-[1.375rem] font-extrabold uppercase tracking-wide text-chalk transition-colors hover:border-ember hover:bg-ember disabled:cursor-wait disabled:opacity-70"
              >
                {checkingOut ? "Opening Stripe…" : `Checkout · ${money(totals.totalCents)}`}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
              {error && (
                <p role="alert" className="font-mono text-[11px] uppercase tracking-[0.08em] text-danger">
                  {error}
                </p>
              )}
              <Link
                href="/cart"
                onClick={onClose}
                className="border-2 border-ink py-3 text-center font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-chalk"
              >
                View full cart
              </Link>
              <div className="mt-3 bg-ink p-2 text-chalk">
                <TestCards />
              </div>
            </div>
          </div>
        )}
      </aside>
      {undo && <UndoToast name={undo.name} onUndo={restore} className="bottom-6" />}
    </>,
    document.body,
  );
}

function SumRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between text-[15px] ${muted ? "text-stone" : ""}`}>
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}
