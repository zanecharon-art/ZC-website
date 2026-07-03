"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

type Thread = {
  id: string;
  title: string;
  author_name: string;
  created_at: string;
  status: string;
  posts?: { count: number }[];
};

const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase();

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function fetchThreads(): Promise<Thread[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("threads")
    .select("id, title, author_name, created_at, status, posts(count)")
    .order("created_at", { ascending: false });
  return (data ?? []) as Thread[];
}

export default function Community() {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!configured);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!configured) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
  }, [configured]);

  useEffect(() => {
    if (!(configured && user)) return;
    let active = true;
    fetchThreads().then((d) => {
      if (active) setThreads(d);
    });
    return () => {
      active = false;
    };
  }, [configured, user]);

  async function createThread(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/community/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    setSubmitting(false);
    if (res.ok) {
      setTitle("");
      setBody("");
      setShowForm(false);
      showToast("Thema erstellt.");
      setThreads(await fetchThreads());
      return;
    }
    if (res.status === 422) {
      showToast("Dein Beitrag verstößt gegen die Community-Regeln.");
      return;
    }
    showToast("Konnte nicht erstellt werden. Bitte versuche es später erneut.");
  }

  const isAdmin = Boolean(ADMIN_EMAIL && user?.email?.toLowerCase() === ADMIN_EMAIL);

  return (
    <div className="page">
      <div className="section">
        <span className="section-label">Community</span>
        <h2 className="section-title">Lesergemeinschaft</h2>
        <p style={{ color: "var(--txt3)", marginBottom: 32, maxWidth: 560 }}>
          Ein Ort für alle, die über Literatur, Schreiben und die Werke von Zane
          Charon sprechen möchten. Mitglieder können eigene Themen eröffnen — es
          gelten unsere Community-Regeln, Beiträge werden moderiert.
        </p>

        {!configured && (
          <div className="card">
            <p style={{ color: "var(--txt2)", lineHeight: 1.8 }}>
              Die Diskussionen werden aktiviert, sobald die Community online geht.
              Schau bald wieder vorbei.
            </p>
          </div>
        )}

        {configured && ready && !user && (
          <div className="card" style={{ textAlign: "center" }}>
            <p style={{ color: "var(--txt2)", marginBottom: 18 }}>
              Melde dich an, um Themen zu lesen und eigene Diskussionen zu starten.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/login" className="btn">
                Anmelden
              </Link>
              <Link href="/registrieren" className="btn-ghost">
                Registrieren
              </Link>
            </div>
          </div>
        )}

        {configured && user && (
          <>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => setShowForm((s) => !s)}>
                {showForm ? "Abbrechen" : "+ Neues Thema"}
              </button>
              {isAdmin && (
                <Link href="/community/admin" className="btn-ghost">
                  Moderation
                </Link>
              )}
            </div>

            {showForm && (
              <div className="card" style={{ marginBottom: 24 }}>
                <form onSubmit={createThread}>
                  <div className="form-group">
                    <label>Titel</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={140}
                      placeholder="Worüber möchtest du sprechen?"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Dein Beitrag</label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      maxLength={5000}
                      required
                    />
                  </div>
                  <button className="btn" type="submit" disabled={submitting}>
                    {submitting ? "Wird erstellt…" : "Thema veröffentlichen"}
                  </button>
                </form>
              </div>
            )}

            <div className="forum-cat">
              <div className="forum-cat-header">
                <span style={{ fontSize: 18 }}>💬</span>
                <h3>Mitglieder-Diskussionen</h3>
              </div>
              {threads.length === 0 ? (
                <div style={{ padding: "18px 20px", color: "var(--txt3)", fontSize: 14 }}>
                  Noch keine Themen — sei die erste Stimme.
                </div>
              ) : (
                threads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/community/${thread.id}`}
                    className="forum-topic"
                    style={{ textDecoration: "none" }}
                  >
                    <div>
                      <div className="topic-title">
                        {thread.status === "locked" && "🔒 "}
                        {thread.title}
                      </div>
                      <div className="topic-meta">
                        von {thread.author_name} · {fmtDate(thread.created_at)}
                      </div>
                    </div>
                    <div className="topic-replies">
                      {thread.posts?.[0]?.count ?? 0} Antworten
                    </div>
                  </Link>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
