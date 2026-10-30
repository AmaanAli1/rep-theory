import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  priceCart,
  TAX_RATE,
  validateLine,
  type CartLine,
} from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const TAX_LABEL = `HST (${Math.round(TAX_RATE * 100)}%, Ontario)`;

/** RT-2026-4F8K2: year + 5 characters without look-alikes (0/O, 1/I) */
function orderNumber() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `RT-${new Date().getFullYear()}-${code}`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const raw = (body as { lines?: unknown })?.lines;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) {
    return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
  }

  // Never trust the browser: re-check every line and re-price from the catalog
  const lines = raw
    .map(validateLine)
    .filter((l): l is CartLine => l !== null);
  const totals = priceCart(lines);
  if (totals.lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
  }

  const recurring = { interval: "month" as const };
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = totals.lines.map(
    (l) => ({
      quantity: l.qty,
      price_data: {
        currency: "cad",
        unit_amount: l.unitCents,
        ...(l.kind === "coaching" ? { recurring } : {}),
        product_data: {
          name: l.product.name,
          ...(l.options ? { description: l.options } : {}),
          metadata: { slug: l.slug },
        },
      },
    }),
  );

  // Shipping and tax as their own lines, so Stripe shows the same
  // breakdown as our cart
  if (totals.shippingCents > 0) {
    items.push({
      quantity: 1,
      price_data: {
        currency: "cad",
        unit_amount: totals.shippingCents,
        product_data: { name: "Shipping", description: "Standard, 3–5 business days" },
      },
    });
  }
  const oneTimeTax = totals.taxCents - (totals.monthlyWithTaxCents - totals.monthlyCents);
  if (oneTimeTax > 0) {
    items.push({
      quantity: 1,
      price_data: {
        currency: "cad",
        unit_amount: oneTimeTax,
        product_data: { name: TAX_LABEL, description: "On gear, programs and shipping" },
      },
    });
  }
  if (totals.hasSubscription) {
    items.push({
      quantity: 1,
      price_data: {
        currency: "cad",
        unit_amount: totals.monthlyWithTaxCents - totals.monthlyCents,
        recurring,
        product_data: { name: `${TAX_LABEL} · 1:1 Coaching`, description: "Charged monthly with coaching" },
      },
    });
  }

  const order = orderNumber();
  const origin = req.headers.get("origin") ?? SITE_URL;
  const base = /^https?:\/\/[^/]+$/.test(origin) ? origin : SITE_URL;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: totals.hasSubscription ? "subscription" : "payment",
      line_items: items,
      client_reference_id: order,
      metadata: { order_number: order },
      ...(totals.hasSubscription
        ? { subscription_data: { metadata: { order_number: order } } }
        : { payment_intent_data: { metadata: { order_number: order } } }),
      ...(totals.hasGear
        ? { shipping_address_collection: { allowed_countries: ["CA"] } }
        : {}),
      billing_address_collection: "auto",
      success_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/checkout/cancelled`,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout failed:", err);
    return NextResponse.json(
      { error: "Checkout is unavailable right now. Please try again." },
      { status: 500 },
    );
  }
}
