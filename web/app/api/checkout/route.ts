import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS, type ProductKey } from "@/lib/products";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { productKey } = await request.json();
  const product = PRODUCTS[productKey as ProductKey];

  if (!product) {
    return NextResponse.json({ error: "invalid product" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    client_reference_id: user.id,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: product.amount,
          product_data: { name: product.name },
        },
      },
    ],
    metadata: { user_id: user.id, product_key: productKey },
    success_url: `${origin}/profil?checkout=success`,
    cancel_url: `${origin}/profil?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
