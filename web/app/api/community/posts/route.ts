import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { violatesPolicy, LIMITS } from "@/lib/community";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { threadId, body } = await request.json().catch(() => ({}));
  const b = typeof body === "string" ? body.trim() : "";
  if (!threadId || !b) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  if (b.length > LIMITS.body) return NextResponse.json({ error: "too_long" }, { status: 400 });
  if (violatesPolicy(b)) return NextResponse.json({ error: "policy_violation" }, { status: 422 });

  // The thread must exist and still be open.
  const { data: thread } = await supabase
    .from("threads")
    .select("status")
    .eq("id", threadId)
    .single();
  if (!thread || thread.status !== "open")
    return NextResponse.json({ error: "thread_closed" }, { status: 409 });

  const author_name = user.user_metadata?.username || user.email?.split("@")[0] || "Mitglied";
  const { data, error } = await supabase
    .from("posts")
    .insert({ thread_id: threadId, author_id: user.id, author_name, body: b })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  return NextResponse.json({ id: data.id });
}

// Edit own post. RLS + author_id scope ensure only the author.
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { postId, body } = await request.json().catch(() => ({}));
  const b = typeof body === "string" ? body.trim() : "";
  if (!postId || !b) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  if (b.length > LIMITS.body) return NextResponse.json({ error: "too_long" }, { status: 400 });
  if (violatesPolicy(b)) return NextResponse.json({ error: "policy_violation" }, { status: 422 });

  const { error } = await supabase
    .from("posts")
    .update({ body: b })
    .eq("id", postId)
    .eq("author_id", user.id);
  if (error) return NextResponse.json({ error: "update_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// Delete own post (soft: status = 'removed', hidden by RLS).
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let postId = new URL(request.url).searchParams.get("postId") || "";
  if (!postId) {
    const body = await request.json().catch(() => ({}));
    postId = typeof body?.postId === "string" ? body.postId : "";
  }
  if (!postId) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

  const { error } = await supabase
    .from("posts")
    .update({ status: "removed" })
    .eq("id", postId)
    .eq("author_id", user.id);
  if (error) return NextResponse.json({ error: "delete_failed", detail: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
