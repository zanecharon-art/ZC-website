import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function adminEmail() {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase().trim();
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const configured = adminEmail();
  if (!user || !configured || user.email?.toLowerCase() !== configured)
    return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const admin = createAdminClient();
  const { data: reports, error } = await admin
    .from("reports")
    .select("id, target_type, target_id, reason, created_at")
    .eq("resolved", false)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "query_failed" }, { status: 500 });
  return NextResponse.json({ reports: reports ?? [] });
}
