import Stripe from "stripe";

let client: Stripe | null = null;

// Instantiate lazily so importing this module during the build (Next.js
// "collecting page data") doesn't throw when STRIPE_SECRET_KEY is unset.
// The client is only created when a route handler actually runs at request time.
export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-06-24.dahlia",
    });
  }
  return client;
}
