import type { Metadata } from "next";
import Link from "next/link";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { money } from "@/lib/pricing";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

// Always read the live session from Stripe; never cache an order page
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ session_id?: string }> };

const MONTHS = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function cardLabel(pm: Stripe.PaymentMethod | string | null | undefined) {
  if (!pm || typeof pm === "string" || !pm.card) return null;
  const brand = pm.card.brand.charAt(0).toUpperCase() + pm.card.brand.slice(1);
  return `${brand} ending ${pm.card.last4}`;
}

async function loadOrder(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: [
      "line_items",
      "payment_intent.payment_method",
      "subscription.default_payment_method",
    ],
  });
  if (session.payment_status !== "paid") return null;

  const pi =
    session.payment_intent && typeof session.payment_intent !== "string"
      ? session.payment_intent
      : null;
  const sub =
    session.subscription && typeof session.subscription !== "string"
      ? session.subscription
      : null;

  const shipping = session.collected_information?.shipping_details ?? null;
  const name =
    shipping?.name ?? session.customer_details?.name ?? null;
  const firstName = name?.trim().split(/\s+/)[0] ?? null;

  const all = session.line_items?.data ?? [];
  const isTax = (d: string) => d.startsWith("HST");
  const products = all.filter(
    (l) => !isTax(l.description ?? "") && l.description !== "Shipping",
  );
  const sum = (ls: Stripe.LineItem[]) =>
    ls.reduce((s, l) => s + (l.amount_total ?? 0), 0);

  const nextCharge = sub?.items.data[0]?.current_period_end ?? null;

  return {
    order: session.metadata?.order_number ?? session.client_reference_id ?? "—",
    firstName,
    email: session.customer_details?.email ?? null,
    shipTo: shipping?.address
      ? `${shipping.address.city ?? ""}${shipping.address.state ? `, ${shipping.address.state}` : ""}`
      : null,
    card:
      cardLabel(pi?.payment_method) ??
      cardLabel(sub?.default_payment_method) ??
      null,
    products: products.map((l) => ({
      id: l.id,
      name: l.description ?? "Item",
      qty: l.quantity ?? 1,
      total: l.amount_total ?? 0,
      monthly: Boolean(l.price?.recurring),
    })),
    subtotal: sum(products),
    shipping: sum(all.filter((l) => l.description === "Shipping")),
    tax: sum(all.filter((l) => isTax(l.description ?? ""))),
    total: session.amount_total ?? 0,
    hasGear: Boolean(shipping),
    hasProgram: products.some((l) => /program/i.test(l.description ?? "") || /^(Hypertrophy|Cutting|Strength)$/.test(l.description ?? "")),
    hasCoaching: products.some((l) => l.price?.recurring),
    monthly: sub
      ? sub.items.data.reduce((s, i) => s + (i.price.unit_amount ?? 0) * (i.quantity ?? 1), 0)
      : 0,
    nextCharge: nextCharge ? MONTHS.format(new Date(nextCharge * 1000)) : null,
    created: MONTHS.format(new Date(session.created * 1000)),
  };
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  let order: Awaited<ReturnType<typeof loadOrder>> = null;
  if (session_id && /^cs_test_[A-Za-z0-9]+$/.test(session_id)) {
    try {
      order = await loadOrder(session_id);
    } catch (err) {
      console.error("Could not load order:", err);
    }
  }

  if (!order) {
    return (
      <section className="page-enter flex min-h-[60vh] flex-col justify-center gap-5 px-4 py-24 sm:px-8 lg:px-12">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-stone">
          Order not found
        </span>
        <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-black uppercase leading-[0.85]">
          We couldn&apos;t confirm this order.
        </h1>
        <p className="max-w-xl font-serif text-2xl italic leading-snug">
          If you just paid, refresh in a moment. Otherwise your cart is still
          saved.
        </p>
        <Link
          href="/cart"
          className="group self-start border-2 border-ink bg-ink px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-chalk transition-colors hover:border-ember hover:bg-ember"
        >
          Back to cart <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>
    );
  }

  const steps = [
    order.hasGear && {
      t: "Gear",
      d: "ships in 3–5 business days. Custom embroidery adds 2 days.",
    },
    order.hasProgram && {
      t: "Programs",
      d: "your download link is in your receipt email.",
    },
    order.hasCoaching && {
      t: "1:1 Coaching",
      d: "your coach emails the intake form within 24 hours.",
    },
  ].filter(Boolean) as { t: string; d: string }[];

  return (
    <section className="grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] px-4 pb-24 pt-[clamp(2rem,5vw,4rem)] sm:px-8 lg:grid-cols-2 lg:px-12">
      <ClearCart />
      <div className="flex flex-col gap-4.5">
        <span className="self-start bg-accent px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
          ✓ Payment received · Test mode
        </span>
        <h1 className="font-display text-[clamp(3.5rem,7vw,6.75rem)] font-black uppercase leading-[0.82]">
          Order confirmed.
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
            Order number
          </span>
          <span className="bg-ink px-3 py-1.5 font-mono text-2xl font-medium tracking-[0.06em] text-chalk">
            #{order.order}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
            Keep this for any questions
          </span>
        </div>
        <p className="font-serif text-3xl italic leading-[1.12]">
          Thanks{order.firstName ? `, ${order.firstName}` : ""}. Your kit is on
          the way to the last rep.
        </p>
        <dl className="mt-2 grid grid-cols-[9.5rem_1fr] border-t-2 border-ink">
          {[
            ["Confirmation for", order.email],
            ["Shipping to", order.shipTo && `${order.shipTo} · 3–5 business days`],
            ["Paid with", order.card && `${order.card} (test)`],
          ]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="border-b border-[#c9c6be] py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
                  {k}
                </dt>
                <dd className="border-b border-[#c9c6be] py-3">{v}</dd>
              </div>
            ))}
        </dl>
        {steps.length > 0 && (
          <>
            <h2 className="mt-4 font-display text-4xl font-black uppercase">
              What happens next
            </h2>
            <ol>
              {steps.map((s, i) => (
                <li key={s.t} className="flex gap-3.5 border-b border-[#c9c6be] py-2.5">
                  <span className="font-mono text-ember">0{i + 1}</span>
                  <span>
                    <strong className="font-medium">{s.t}</strong>: {s.d}
                  </span>
                </li>
              ))}
            </ol>
          </>
        )}
        <div className="mt-2 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
          <Link
            href="/equipment"
            className="group border-2 border-ink bg-ink px-5 py-3.5 text-chalk transition-colors hover:border-ember hover:bg-ember"
          >
            Keep shopping <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/blog"
            className="border-2 border-ink px-5 py-3.5 transition-colors hover:bg-ink hover:text-chalk"
          >
            Read the journal
          </Link>
        </div>
      </div>

      <aside className="flex flex-col gap-1.5 border-2 border-ink bg-paper p-5.5">
        <div className="flex justify-between border-b-2 border-ink pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
          <span>Receipt · {order.order}</span>
          <span>{order.created}</span>
        </div>
        <ul>
          {order.products.map((p) => (
            <li key={p.id} className="flex justify-between gap-4 border-b border-[#c9c6be] py-3">
              <span>
                <span className="font-medium">{p.name}</span>
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.1em] text-stone">
                  Qty {p.qty}
                </span>
              </span>
              <span className="font-mono">
                {money(p.total)}
                {p.monthly ? "/mo" : ""}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between pt-2"><span>Subtotal</span><span className="font-mono">{money(order.subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span className="font-mono">{order.shipping ? money(order.shipping) : order.hasGear ? "FREE" : "—"}</span></div>
        <div className="flex justify-between"><span>HST (13%)</span><span className="font-mono">{money(order.tax)}</span></div>
        <div className="mt-1.5 flex items-baseline justify-between border-t-2 border-ink pt-2.5">
          <span className="font-display text-3xl font-black uppercase">Paid</span>
          <span className="font-mono text-2xl">{money(order.total)}</span>
        </div>
        {order.hasCoaching && order.nextCharge && (
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ember">
            Next charge: {money(order.monthly)} on {order.nextCharge}
          </span>
        )}
      </aside>
    </section>
  );
}
