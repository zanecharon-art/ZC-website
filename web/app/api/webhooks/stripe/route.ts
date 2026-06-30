import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const productKey = session.metadata?.product_key;

    if (userId && productKey) {
      const supabase = createAdminClient();
      await supabase.from("purchases").insert({
        user_id: userId,
        product_key: productKey,
        stripe_session_id: session.id,
        amount_total: session.amount_total,
      });
    }
  }

  return NextResponse.json({ received: true });
}
