"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

type Report = {
  id: string;
  target_type: "thread" | "post";
  target_id: string;
  reason: string | null;
  created_at: string;
};

async function fetchReports(): Promise<{ ok: boolean; reports: Report[] }> {
  const res = await fetch("/api/community/reports");
  if (!res.ok) return { ok: false, reports: [] };
  const data = await res.json();
  return { ok: true, reports: (data.reports ?? []) as Report[] };
}

export default function CommunityAdmin() {
  const configured = isSupabaseConfigured();
  const [reports, setReports] = useState<Report[]>([]);
  const [view, setView] = useState<"loading" | "ok" | "forbidden">(
    configured ? "loading" : "forbidden"
  );

  useEffect(() => {
    if (!configured) return;
    let active = true;
    fetchReports().then((res) => {
      if (!active) return;
      if (!res.ok) {
        setView("forbidden");
        return;
      }
      setReports(res.reports);
      setView("ok");
    });
    return () => {
      active = false;
    };
  }, [configured]);

  async function moderate(action: string, targetId: string) {
    const res = await fetch("/api/community/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, targetId }),
    });
    if (res.ok) {
      showToast("Erledigt.");
      const next = await fetchReports();
      if (next.ok) setReports(next.reports);
    } else {
      showToast("Aktion fehlgeschlagen.");
    }
  }

  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 760 }}>
        <Link href="/community" style={{ fontSize: 13 }}>
          ← Zurück zur Community
        </Link>
        <span className="section-label" style={{ marginTop: 18 }}>
          Moderation
        </span>
        <h2 className="section-title">Gemeldete Beiträge</h2>

        {view === "forbidden" && (
          <p style={{ color: "var(--txt3)" }}>Kein Zugriff auf diesen Bereich.</p>
        )}

        {view === "ok" && reports.length === 0 && (
          <p style={{ color: "var(--txt3)" }}>Keine offenen Meldungen. Alles ruhig. 🕊️</p>
        )}

        {view === "ok" &&
          reports.map((r) => (
            <div className="card" key={r.id} style={{ marginBottom: 12 }}>
              <div className="topic-meta" style={{ marginBottom: 8 }}>
                {r.target_type === "thread" ? "Thema" : "Antwort"} · gemeldet am{" "}
                {new Date(r.created_at).toLocaleDateString("de-DE")}
              </div>
              {r.reason && (
                <p style={{ color: "var(--txt2)", marginBottom: 12, fontSize: 14 }}>Grund: {r.reason}</p>
              )}
              <div className="post-actions">
                {r.target_type === "thread" && (
                  <Link href={`/community/${r.target_id}`} className="link-btn">
                    Ansehen
                  </Link>
                )}
                <button
                  className="link-btn danger"
                  onClick={() =>
                    moderate(r.target_type === "thread" ? "remove_thread" : "remove_post", r.target_id)
                  }
                >
                  Beitrag entfernen
                </button>
                <button className="link-btn" onClick={() => moderate("resolve_report", r.id)}>
                  Als erledigt markieren
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
