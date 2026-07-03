import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { targetType, targetId, reason } = await request.json().catch(() => ({}));
  if ((targetType !== "thread" && targetType !== "post") || !targetId)
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    target_type: targetType,
    target_id: targetId,
    reason: typeof reason === "string" ? reason.slice(0, 500) : null,
  });

  if (error) return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
