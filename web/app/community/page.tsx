"use client";

import Link from "next/link";
import { showToast } from "@/lib/toast";

export default function Community() {
  return (
    <div className="page">
      <div className="section">
        <span className="section-label">Community</span>
        <h2 className="section-title">Lesergemeinschaft</h2>
        <p style={{ color: "var(--txt3)", marginBottom: 32, maxWidth: 560 }}>
          Ein Ort für alle, die über Literatur, Schreiben und die Werke von Zane Charon sprechen möchten. Nur für registrierte Mitglieder.
        </p>

        <div className="forum-cat">
          <div className="forum-cat-header">
            <span style={{ fontSize: 18 }}>📖</span>
            <h3>Geteilter Himmel — Diskussionen</h3>
          </div>
          <div className="forum-topic" onClick={() => showToast("Anmelden, um das Thema zu öffnen")}>
            <div>
              <div className="topic-title">Was bedeutet der Titel &quot;Geteilter Himmel&quot; für euch?</div>
              <div className="topic-meta">von leser_42 · vor 2 Tagen</div>
            </div>
            <div className="topic-replies">12 Antworten</div>
          </div>
          <div className="forum-topic" onClick={() => showToast("Anmelden, um das Thema zu öffnen")}>
            <div>
              <div className="topic-title">Der Kranich als Symbol — eure Interpretationen</div>
              <div className="topic-meta">von buchliebhaberin · vor 5 Tagen</div>
            </div>
            <div className="topic-replies">8 Antworten</div>
          </div>
          <div className="forum-topic" onClick={() => showToast("Anmelden, um das Thema zu öffnen")}>
            <div>
              <div className="topic-title">Kapitel 4 hat mich sprachlos gemacht — Spoiler</div>
              <div className="topic-meta">von nachtleser · vor 1 Woche</div>
            </div>
            <div className="topic-replies">5 Antworten</div>
          </div>
        </div>

        <div className="forum-cat">
          <div className="forum-cat-header">
            <span style={{ fontSize: 18 }}>💬</span>
            <h3>Allgemeines</h3>
          </div>
          <div className="forum-topic" onClick={() => showToast("Anmelden, um das Thema zu öffnen")}>
            <div>
              <div className="topic-title">Vorstellungsrunde — wer seid ihr?</div>
              <div className="topic-meta">von zane_charon · vor 3 Tagen</div>
            </div>
            <div className="topic-replies">23 Antworten</div>
          </div>
          <div className="forum-topic" onClick={() => showToast("Anmelden, um das Thema zu öffnen")}>
            <div>
              <div className="topic-title">Welche Bücher lest ihr gerade?</div>
              <div className="topic-meta">von lese_hase · vor 1 Woche</div>
            </div>
            <div className="topic-replies">17 Antworten</div>
          </div>
        </div>

        <div className="forum-cat">
          <div className="forum-cat-header">
            <span style={{ fontSize: 18 }}>💡</span>
            <h3>Feedback & Wünsche</h3>
          </div>
          <div className="forum-topic" onClick={() => showToast("Anmelden, um das Thema zu öffnen")}>
            <div>
              <div className="topic-title">Ideen für neue Inhalte auf der Website</div>
              <div className="topic-meta">von community_team · vor 4 Tagen</div>
            </div>
            <div className="topic-replies">9 Antworten</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <p style={{ fontSize: 14, color: "var(--txt3)", marginBottom: 16 }}>
            Registriere dich, um am Forum teilzunehmen
          </p>
          <Link href="/registrieren" className="btn">
            Jetzt registrieren
          </Link>
        </div>
      </div>
    </div>
  );
}
