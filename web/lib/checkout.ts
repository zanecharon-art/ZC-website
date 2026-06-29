"use client";

import { showToast } from "@/lib/toast";
import type { ProductKey } from "@/lib/products";

export async function startCheckout(productKey: ProductKey) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productKey }),
  });

  if (res.status === 401) {
    showToast("Bitte melde dich an, um fortzufahren.");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    showToast("Checkout konnte nicht gestartet werden.");
    return;
  }

  const { url } = await res.json();
  if (url) window.location.href = url;
}
