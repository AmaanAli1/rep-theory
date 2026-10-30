"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

/** Empties the saved cart once an order is confirmed by Stripe. */
export default function ClearCart() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
