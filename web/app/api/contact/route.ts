import { NextResponse } from "next/server";

// Reads the Web3Forms key at request time (not baked into the build), and
// accepts either variable name so an already-set NEXT_PUBLIC_ one keeps working.
function getAccessKey() {
  return (
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    ""
  );
}

export async function POST(request: Request) {
  const accessKey = getAccessKey();
  if (!accessKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: {
    name?: string;
    email?: string;
    anfrage?: string;
    message?: string;
    botcheck?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { name, email, anfrage, message, botcheck } = body;

  // Honeypot: a real user never fills this hidden field.
  if (botcheck) return NextResponse.json({ success: true });

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "Zane Charon — Website",
        subject: `[${anfrage || "Kontakt"}] Nachricht von ${name}`,
        name,
        email,
        message,
      }),
    });
    const data = await res.json();
    if (data.success) return NextResponse.json({ success: true });
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
