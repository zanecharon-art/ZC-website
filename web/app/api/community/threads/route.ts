import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { violatesPolicy, LIMITS } from "@/lib/community";

function authorName(user: { user_metadata?: { username?: string }; email?: string }) {
  return user.user_metadata?.username || user.email?.split("@")[0] || "Mitglied";
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { title, body } = await request.json().catch(() => ({}));
  const t = typeof title === "string" ? title.trim() : "";
  const b = typeof body === "string" ? body.trim() : "";

  if (!t || !b) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  if (t.length > LIMITS.title || b.length > LIMITS.body)
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  if (violatesPolicy(t, b))
    return NextResponse.json({ error: "policy_violation" }, { status: 422 });

  const { data, error } = await supabase
    .from("threads")
    .insert({ author_id: user.id, author_name: authorName(user), title: t, body: b })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

// Edit own thread (title + body). RLS + author_id scope ensure only the author.
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { threadId, title, body } = await request.json().catch(() => ({}));
  const t = typeof title === "string" ? title.trim() : "";
  const b = typeof body === "string" ? body.trim() : "";
  if (!threadId || !t || !b) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  if (t.length > LIMITS.title || b.length > LIMITS.body)
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  if (violatesPolicy(t, b)) return NextResponse.json({ error: "policy_violation" }, { status: 422 });

  const { error } = await supabase
    .from("threads")
    .update({ title: t, body: b })
    .eq("id", threadId)
    .eq("author_id", user.id);
  if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// Delete own thread (soft: status = 'removed', hidden by RLS).
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // Read the id from the query string (robust across environments); fall back to body.
  let threadId = new URL(request.url).searchParams.get("threadId") || "";
  if (!threadId) {
    const body = await request.json().catch(() => ({}));
    threadId = typeof body?.threadId === "string" ? body.threadId : "";
  }
  if (!threadId) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

  const { error } = await supabase
    .from("threads")
    .update({ status: "removed" })
    .eq("id", threadId)
    .eq("author_id", user.id);
  if (error) return NextResponse.json({ error: "delete_failed", detail: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
