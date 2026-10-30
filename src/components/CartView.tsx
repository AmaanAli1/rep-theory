"use client";

import Link from "next/link";
import LineThumb from "@/components/LineThumb";
import QtyStepper from "@/components/QtyStepper";
import TestCards from "@/components/TestCards";
import UndoToast from "@/components/UndoToast";
import GuestNote from "@/components/GuestNote";
import { setQty, useCart, useCartReady } from "@/lib/cart";
import { FREE_SHIPPING_OVER_CENTS, money, priceCart } from "@/lib/pricing";
import { useCheckout, useRemoveWithUndo } from "@/lib/useCartActions";
import { productHref } from "@/data/catalog";

export default function CartView() {
  const cart = useCart();
  const ready = useCartReady();
  const totals = priceCart(cart);
  const { leaving, remove, undo, restore } = useRemoveWithUndo(cart);
  const { checkout, checkingOut, error } = useCheckout(cart);

  if (!ready) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  const gearCents = totals.lines
    .filter((l) => l.kind === "gear")
    .reduce((s, l) => s + l.totalCents, 0);

  return (
    <>
      {totals.count === 0 ? (
        <section className="px-4 pb-28 pt-4 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start gap-4.5 border-2 border-dashed border-ink p-[clamp(2rem,6vw,4.5rem)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
              0 items
            </span>
            <h2 className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-black uppercase leading-[0.85]">
              Your cart is empty.
            </h2>
            <p className="font-serif text-[1.625rem] italic">
              The last rep starts with the right kit.
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
              <Link
                href="/equipment"
                className="group border-2 border-ink bg-ink px-5 py-3.5 text-chalk transition-colors hover:border-ember hover:bg-ember"
              >
                Browse equipment{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/programs"
                className="border-2 border-ink px-5 py-3.5 transition-colors hover:bg-ink hover:text-chalk"
              >
                See programs
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] px-4 pb-32 pt-2 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,25rem)] lg:px-12 lg:pb-24">
          <div>
            <div className="flex items-baseline justify-between border-b-[3px] border-ink pb-2.5">
              <h2 className="font-display text-[2.5rem] font-black uppercase">
                Items ({totals.count})
              </h2>
              <Link
                href="/equipment"
                className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-ember"
              >
                ← Keep shopping
              </Link>
            </div>
            <ul>
              {totals.lines.map((l) => (
                <li
                  key={l.key}
                  data-leave={leaving[l.key] ? "true" : undefined}
                  className="cart-line grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-start gap-4 border-b border-[#c9c6be] py-4.5 sm:grid-cols-[6rem_minmax(0,1fr)_auto]"
                >
                  <LineThumb product={l.product} size="size-18 sm:size-24" />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <Link
                      href={productHref(l.product)}
                      className="text-lg font-medium transition-colors hover:text-ember"
                    >
                      {l.product.name}
                    </Link>
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">
                      {l.options}
                    </span>
                    <span className="font-mono text-xs">
                      {l.kind === "coaching"
                        ? `${money(l.unitCents)} / month`
                        : `${money(l.unitCents)} each`}
                    </span>
                    <div className="mt-1.5 flex flex-wrap items-center gap-4">
                      {l.kind === "coaching" ? (
                        <span className="border border-ink px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                          Subscription · Qty 1
                        </span>
                      ) : (
                        <QtyStepper
                          size="sm"
                          qty={l.qty}
                          onChange={(n) => setQty(l.key, n)}
                          floorMessage="Can't go below 1. Use Remove instead."
                          label={`Quantity of ${l.product.name}`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => remove(l.key, l.product.name)}
                        disabled={Boolean(leaving[l.key])}
                        className="font-mono text-[11px] uppercase tracking-[0.14em] underline underline-offset-[3px] transition-colors hover:text-ember"
                      >
                        Remove<span className="sr-only"> {l.product.name}</span>
                      </button>
                    </div>
                  </div>
                  <span className="text-right font-mono text-[17px]">
                    {money(l.totalCents)}
                    {l.kind === "coaching" ? "/mo" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Order summary"
            className="flex flex-col gap-1 bg-ink p-6 text-chalk lg:sticky lg:top-24"
          >
            <span className="pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
              Order summary
            </span>
            <Row label="Subtotal" value={money(totals.subtotalCents)} />
            <Row
              label={
                <>
                  Shipping{" "}
                  <span className="text-[13px] text-ash">
                    {!totals.hasGear
                      ? "(digital only)"
                      : totals.shippingCents === 0
                        ? "(over $75)"
                        : `(free over $75 · ${money(FREE_SHIPPING_OVER_CENTS - gearCents)} to go)`}
                  </span>
                </>
              }
              value={
                !totals.hasGear ? "—" : totals.shippingCents ? money(totals.shippingCents) : "FREE"
              }
            />
            <Row label="HST (13%, Ontario)" value={money(totals.taxCents)} />
            <div className="flex items-baseline justify-between pb-1.5 pt-4">
              <span className="font-display text-3xl font-black uppercase">Due today</span>
              <span className="font-mono text-2xl">{money(totals.totalCents)}</span>
            </div>
            {totals.hasSubscription && (
              <span className="pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                Then {money(totals.monthlyWithTaxCents)} / month for 1:1 coaching ·
                Cancel anytime
              </span>
            )}
            <GuestNote className="mt-2 text-ash" />
            <button
              type="button"
              onClick={checkout}
              disabled={checkingOut}
              className="group mt-2.5 flex items-center justify-between bg-chalk px-5 py-4.5 font-display text-2xl font-extrabold uppercase tracking-wide text-ink transition-colors hover:bg-ember hover:text-[#f4f1ea] disabled:cursor-wait disabled:opacity-70"
            >
              {checkingOut ? "Opening Stripe…" : "Checkout"}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            {error && (
              <p role="alert" className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-danger">
                {error}
              </p>
            )}
            <p className="mt-2.5 text-[13px] leading-normal text-[#d8d5cd]">
              Secure payment on Stripe&apos;s checkout page. We never see or store
              your card. Your receipt and any subscription are linked to the email
              you enter there.
            </p>
            <TestCards className="mt-4" />
          </aside>

          {/* Phones: due today + checkout always within reach */}
          <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t-2 border-chalk bg-ink px-4 py-3 text-chalk lg:hidden">
            <span className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Due today</span>
              <span className="font-mono text-lg">{money(totals.totalCents)}</span>
            </span>
            <button
              type="button"
              onClick={checkout}
              disabled={checkingOut}
              className="bg-chalk px-5 py-3 font-display text-xl font-extrabold uppercase text-ink"
            >
              {checkingOut ? "Opening…" : "Checkout →"}
            </button>
          </div>
        </section>
      )}

      {undo && <UndoToast name={undo.name} onUndo={restore} className="bottom-20 lg:bottom-6" />}
    </>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-[#3a3a3a] py-2.5">
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}
