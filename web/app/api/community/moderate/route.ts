import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function adminEmail() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase().trim();
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const configured = adminEmail();
  if (!user || !configured || user.email?.toLowerCase() !== configured)
    return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const { action, targetId } = await request.json().catch(() => ({}));
  if (!targetId) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const admin = createAdminClient();

  if (action === "lock" || action === "unlock") {
    const { error } = await admin
      .from("threads")
      .update({ status: action === "lock" ? "locked" : "open" })
      .eq("id", targetId);
    if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
  } else if (action === "remove_thread") {
    const { error } = await admin.from("threads").update({ status: "removed" }).eq("id", targetId);
    if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
    await admin.from("reports").update({ resolved: true }).eq("target_id", targetId);
  } else if (action === "remove_post") {
    const { error } = await admin.from("posts").update({ status: "removed" }).eq("id", targetId);
    if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
    await admin.from("reports").update({ resolved: true }).eq("target_id", targetId);
  } else if (action === "resolve_report") {
    const { error } = await admin.from("reports").update({ resolved: true }).eq("id", targetId);
    if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
  } else {
    return NextResponse.json({ error: "unknown_action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
