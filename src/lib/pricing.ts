import { getProduct, type Product } from "@/data/catalog";

/**
 * Shared cart pricing. The cart page uses it to show totals, and the
 * checkout API runs the *same* code on the server so the browser can never
 * set its own prices. All money is handled in cents to avoid rounding drift.
 */

export const TAX_RATE = 0.13; // Ontario HST
export const SHIPPING_CENTS = 999;
export const FREE_SHIPPING_OVER_CENTS = 7500; // on gear
export const MAX_QTY = 10;
export const MAX_TEXT = 12;

export type CartLine = {
  key: string; // slug + options, so the same item in two colours is two lines
  slug: string;
  qty: number;
  colour?: string;
  choice?: string; // size / stiffness / grip / length
  text?: string; // embroidery or tag text
};

export type LineKind = "gear" | "program" | "coaching";

export type PricedLine = CartLine & {
  product: Product;
  kind: LineKind;
  unitCents: number;
  totalCents: number;
  options: string; // human label, e.g. "Black · “AMAAN”"
};

export type Totals = {
  lines: PricedLine[];
  count: number;
  subtotalCents: number; // everything due today before shipping + tax
  shippingCents: number;
  hasGear: boolean;
  taxCents: number;
  totalCents: number; // due today
  hasSubscription: boolean;
  monthlyCents: number; // coaching per month, before tax
  monthlyWithTaxCents: number;
};

export function kindOf(p: Product): LineKind {
  if (p.priceNote) return "coaching";
  if (p.details) return "program";
  return "gear";
}

export function lineKey(l: Omit<CartLine, "key" | "qty">) {
  return [l.slug, l.colour ?? "", l.choice ?? "", l.text ?? ""].join("|");
}

export function cleanText(s: string) {
  return s.toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, MAX_TEXT);
}

const tax = (cents: number) => Math.round(cents * TAX_RATE);

/**
 * Check one line against the catalog. Returns null for anything that
 * doesn't exist (unknown product, colour or option), so tampered carts
 * are dropped rather than trusted.
 */
export function validateLine(raw: unknown): CartLine | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.slug !== "string") return null;
  const found = getProduct(r.slug);
  if (!found) return null;
  const p = found.product;
  const kind = kindOf(p);

  const qtyNum = Number(r.qty);
  if (!Number.isInteger(qtyNum) || qtyNum < 1) return null;
  const qty = kind === "coaching" ? 1 : Math.min(qtyNum, MAX_QTY);

  let colour: string | undefined;
  if (p.colours?.length) {
    colour = p.colours.find((c) => c.name === r.colour)?.name;
    if (!colour) return null;
  }
  let choice: string | undefined;
  if (p.choices?.length) {
    choice = p.choices[0].options.find((o) => o === r.choice);
    if (!choice) return null;
  }
  let text: string | undefined;
  if (p.custom && typeof r.text === "string") {
    text = cleanText(r.text).trim() || undefined;
  }

  const base = { slug: p.slug, colour, choice, text };
  return { ...base, key: lineKey(base), qty };
}

export function describeOptions(l: CartLine, p: Product) {
  const parts: string[] = [];
  if (l.colour) parts.push(l.colour);
  if (l.choice) parts.push(l.choice);
  if (l.text) parts.push(`“${l.text}”`);
  if (!parts.length) {
    const kind = kindOf(p);
    if (kind === "program") parts.push("Digital · PDF + tracker");
    if (kind === "coaching") parts.push("Monthly · Cancel anytime");
  }
  return parts.join(" · ");
}

export function priceCart(cart: CartLine[]): Totals {
  const lines: PricedLine[] = [];
  let coachingSeen = false;
  for (const l of cart) {
    const found = getProduct(l.slug);
    if (!found) continue;
    const p = found.product;
    const kind = kindOf(p);
    if (kind === "coaching") {
      if (coachingSeen) continue; // one subscription per order
      coachingSeen = true;
    }
    const unitCents = p.price * 100;
    lines.push({
      ...l,
      product: p,
      kind,
      unitCents,
      totalCents: unitCents * l.qty,
      options: describeOptions(l, p),
    });
  }

  const gearCents = lines
    .filter((l) => l.kind === "gear")
    .reduce((s, l) => s + l.totalCents, 0);
  const hasGear = gearCents > 0;
  const subtotalCents = lines.reduce((s, l) => s + l.totalCents, 0);
  const shippingCents =
    !hasGear || gearCents >= FREE_SHIPPING_OVER_CENTS ? 0 : SHIPPING_CENTS;
  const taxCents = tax(subtotalCents + shippingCents);
  const monthlyCents = lines
    .filter((l) => l.kind === "coaching")
    .reduce((s, l) => s + l.unitCents, 0);

  return {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotalCents,
    shippingCents,
    hasGear,
    taxCents,
    totalCents: subtotalCents + shippingCents + taxCents,
    hasSubscription: monthlyCents > 0,
    monthlyCents,
    monthlyWithTaxCents: monthlyCents + tax(monthlyCents),
  };
}

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export const money = (cents: number) => cad.format(cents / 100);
