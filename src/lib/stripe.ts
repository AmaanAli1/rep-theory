import "server-only";
import Stripe from "stripe";

/** Server-side Stripe client. The secret key never reaches the browser. */
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!key.startsWith("sk_test_")) {
    // This is a student project: refuse to run against a live account
    throw new Error("Only Stripe test keys (sk_test_…) are allowed");
  }
  return new Stripe(key);
}
