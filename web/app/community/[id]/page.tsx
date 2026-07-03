"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

type Thread = {
  id: string;
  title: string;
  body: string;
  author_name: string;
  created_at: string;
  status: string;
};
type Post = {
  id: string;
  body: string;
  author_name: string;
  created_at: string;
};
type ThreadData = { user: User | null; thread: Thread | null; posts: Post[] };

const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function fetchThread(id: string): Promise<ThreadData> {
  const supabase = createClient();
  const [{ data: userData }, { data: t }, { data: p }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("threads").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("posts")
      .select("id, body, author_name, created_at")
      .eq("thread_id", id)
      .order("created_at", { ascending: true }),
  ]);
  return {
    user: userData.user,
    thread: (t as Thread | null) ?? null,
    posts: (p as Post[]) ?? [],
  };
}

export default function ThreadPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(!configured);
  const [reply, setReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!configured) return;
    let active = true;
    fetchThread(id).then((res) => {
      if (!active) return;
      setUser(res.user);
      setThread(res.thread);
      setPosts(res.posts);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [configured, id]);

  async function refresh() {
    const res = await fetchThread(id);
    setUser(res.user);
    setThread(res.thread);
    setPosts(res.posts);
  }

  async function submitReply(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/community/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId: id, body: reply }),
    });
    setSubmitting(false);
    if (res.ok) {
      setReply("");
      refresh();
      return;
    }
    if (res.status === 422) {
      showToast("Dein Beitrag verstößt gegen die Community-Regeln.");
      return;
    }
    if (res.status === 409) {
      showToast("Dieses Thema ist geschlossen.");
      return;
    }
    showToast("Konnte nicht gesendet werden. Bitte versuche es später erneut.");
  }

  async function report(targetType: "thread" | "post", targetId: string) {
    const res = await fetch("/api/community/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, targetId }),
    });
    showToast(res.ok ? "Danke — der Beitrag wurde gemeldet." : "Melden fehlgeschlagen.");
  }

  async function moderate(action: string, targetId: string) {
    const res = await fetch("/api/community/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, targetId }),
    });
    if (res.ok) refresh();
    else showToast("Aktion fehlgeschlagen.");
  }

  const isAdmin = Boolean(ADMIN_EMAIL && user?.email?.toLowerCase() === ADMIN_EMAIL);

  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 760 }}>
        <Link href="/community" style={{ fontSize: 13 }}>
          ← Zurück zur Community
        </Link>

        {!configured && (
          <p style={{ color: "var(--txt3)", marginTop: 24 }}>
            Die Community wird aktiviert, sobald sie online geht.
          </p>
        )}

        {configured && loaded && !thread && (
          <p style={{ color: "var(--txt3)", marginTop: 24 }}>
            Dieses Thema wurde nicht gefunden oder ist nicht mehr verfügbar.
          </p>
        )}

        {configured && thread && (
          <>
            <h1 style={{ fontSize: "clamp(24px,3vw,34px)", margin: "18px 0 8px", lineHeight: 1.2 }}>
              {thread.status === "locked" && "🔒 "}
              {thread.title}
            </h1>
            <div className="topic-meta" style={{ marginBottom: 20 }}>
              von {thread.author_name} · {fmtDate(thread.created_at)}
            </div>

            <div className="card" style={{ marginBottom: 8 }}>
              <p style={{ color: "var(--txt2)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{thread.body}</p>
            </div>
            <div className="post-actions" style={{ marginBottom: 28 }}>
              {user && (
                <button className="link-btn" onClick={() => report("thread", thread.id)}>
                  Melden
                </button>
              )}
              {isAdmin && (
                <>
                  <button
                    className="link-btn"
                    onClick={() => moderate(thread.status === "locked" ? "unlock" : "lock", thread.id)}
                  >
                    {thread.status === "locked" ? "Entsperren" : "Sperren"}
                  </button>
                  <button className="link-btn danger" onClick={() => moderate("remove_thread", thread.id)}>
                    Entfernen
                  </button>
                </>
              )}
            </div>

            <h3 style={{ fontSize: 16, marginBottom: 14 }}>
              {posts.length} {posts.length === 1 ? "Antwort" : "Antworten"}
            </h3>

            {posts.map((post) => (
              <div className="post-item" key={post.id}>
                <div className="topic-meta" style={{ marginBottom: 6 }}>
                  {post.author_name} · {fmtDate(post.created_at)}
                </div>
                <p style={{ color: "var(--txt2)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{post.body}</p>
                <div className="post-actions">
                  {user && (
                    <button className="link-btn" onClick={() => report("post", post.id)}>
                      Melden
                    </button>
                  )}
                  {isAdmin && (
                    <button className="link-btn danger" onClick={() => moderate("remove_post", post.id)}>
                      Entfernen
                    </button>
                  )}
                </div>
              </div>
            ))}

            {!user ? (
              <p style={{ color: "var(--txt3)", marginTop: 24, fontSize: 14 }}>
                <Link href="/login">Melde dich an</Link>, um zu antworten.
              </p>
            ) : thread.status !== "open" ? (
              <p style={{ color: "var(--txt3)", marginTop: 24, fontSize: 14 }}>
                Dieses Thema ist geschlossen — es sind keine weiteren Antworten möglich.
              </p>
            ) : (
              <form onSubmit={submitReply} style={{ marginTop: 24 }}>
                <div className="form-group">
                  <label>Deine Antwort</label>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    maxLength={5000}
                    required
                  />
                </div>
                <button className="btn" type="submit" disabled={submitting}>
                  {submitting ? "Wird gesendet…" : "Antworten"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
