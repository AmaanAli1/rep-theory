"use client";

import { useSyncExternalStore } from "react";
import {
  kindOf,
  lineKey,
  MAX_QTY,
  validateLine,
  type CartLine,
} from "@/lib/pricing";
import { getProduct } from "@/data/catalog";

/**
 * Shopping cart stored in this browser (localStorage), so it survives page
 * navigation and reloads. Essential storage under the privacy policy: it
 * only holds what's in the cart, nothing about the visitor.
 */

const KEY = "rt-cart";
const EVENT = "rt-cart-change";

export type AddedEvent = { line: CartLine; addedQty: number };
const ADDED = "rt-cart-added";

let cachedRaw: string | null | undefined;
let cached: CartLine[] = [];

function readRaw() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): CartLine[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      // Re-validate on read so stale or edited data can't break the page
      cached = Array.isArray(parsed)
        ? parsed
            .map(validateLine)
            .filter((l): l is CartLine => l !== null)
        : [];
    } catch {
      cached = [];
    }
  }
  return cached;
}

const EMPTY: CartLine[] = [];

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage); // other tabs
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function write(lines: CartLine[]) {
  const raw = JSON.stringify(lines);
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    // Storage blocked: keep the cart in memory for this page view
  }
  cachedRaw = raw;
  cached = lines;
  window.dispatchEvent(new Event(EVENT));
}

/** The cart. Empty during server rendering, then the saved cart once hydrated. */
export function useCart(): CartLine[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

/** True once we're in the browser and know the real cart. */
export function useCartReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function addToCart(item: Omit<CartLine, "key" | "qty">, qty: number) {
  const found = getProduct(item.slug);
  if (!found) return;
  const isCoaching = kindOf(found.product) === "coaching";
  const key = lineKey(item);
  const lines = [...getSnapshot()];
  const i = lines.findIndex((l) => l.key === key);
  let addedQty = qty;

  if (isCoaching) {
    // One subscription per order
    if (i >= 0) addedQty = 0;
    else lines.push({ ...item, key, qty: 1 });
    addedQty = Math.min(addedQty, 1);
  } else if (i >= 0) {
    const next = Math.min(MAX_QTY, lines[i].qty + qty);
    addedQty = next - lines[i].qty;
    lines[i] = { ...lines[i], qty: next };
  } else {
    lines.push({ ...item, key, qty: Math.min(MAX_QTY, qty) });
  }
  write(lines);
  const line = lines.find((l) => l.key === key)!;
  window.dispatchEvent(
    new CustomEvent<AddedEvent>(ADDED, { detail: { line, addedQty } }),
  );
}

export function setQty(key: string, qty: number) {
  write(
    getSnapshot().map((l) =>
      l.key === key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l,
    ),
  );
}

export function removeLine(key: string) {
  write(getSnapshot().filter((l) => l.key !== key));
}

/** Put a removed line back where it was (Undo) */
export function restoreLine(line: CartLine, index: number) {
  const lines = getSnapshot().filter((l) => l.key !== line.key);
  lines.splice(Math.min(index, lines.length), 0, line);
  write(lines);
}

export function clearCart() {
  write([]);
}

/** Listen for "added to cart" so the header can show the pop-up */
export function onAdded(fn: (e: AddedEvent) => void) {
  const h = (e: Event) => fn((e as CustomEvent<AddedEvent>).detail);
  window.addEventListener(ADDED, h);
  return () => window.removeEventListener(ADDED, h);
}
