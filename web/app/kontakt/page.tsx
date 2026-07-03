"use client";

import { useState } from "react";
import { showToast } from "@/lib/toast";

const EMAIL = "zanecharon@gmail.com";
const ANFRAGE_ARTEN = [
  "Allgemeine Nachricht",
  "Presse & Interview",
  "Lesung / Veranstaltung",
  "Kommerzielle Zusammenarbeit / Lizenz",
];

export default function Kontakt() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anfrage, setAnfrage] = useState(ANFRAGE_ARTEN[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // Bot-Falle: unsichtbares Feld ausgefüllt → ignorieren

    setStatus("sending");
    try {
      // Key zur Laufzeit vom Server holen (unabhängig von Build/Variablennamen).
      const { key } = await fetch("/api/contact")
        .then((r) => r.json())
        .catch(() => ({ key: "" }));

      if (!key) {
        setStatus("idle");
        showToast(`Bitte schreib mir direkt an ${EMAIL}.`);
        return;
      }

      // Übermittlung direkt aus dem Browser an Web3Forms.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          from_name: "Zane Charon — Website",
          subject: `[${anfrage}] Nachricht von ${name}`,
          name,
          email,
          message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setAnfrage(ANFRAGE_ARTEN[0]);
        setMessage("");
        return;
      }

      setStatus("idle");
      const detail = data?.message ? ` (${data.message})` : "";
      showToast(`Senden fehlgeschlagen${detail}. Bitte schreib mir an ${EMAIL}.`);
    } catch {
      setStatus("idle");
      showToast(`Senden fehlgeschlagen. Bitte schreib mir an ${EMAIL}.`);
    }
  }

  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 760 }}>
        <span className="section-label">Kontakt</span>
        <h2 className="section-title">Kontakt &amp; Zusammenarbeit</h2>
        <p style={{ maxWidth: 620, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
          Ob ein Wort zu meinen Geschichten, eine Presseanfrage, eine Einladung
          zur Lesung oder eine mögliche Zusammenarbeit — ich freue mich, von dir
          zu hören.
        </p>

        <div className="grid-2" style={{ marginBottom: 40 }}>
          <div className="card">
            <span className="section-label" style={{ marginBottom: 10 }}>Allgemein</span>
            <p style={{ fontSize: 14, color: "var(--txt3)", lineHeight: 1.7, marginBottom: 14 }}>
              Für Nachrichten, Feedback und Leser:innen-Post.
            </p>
            <a href={`mailto:${EMAIL}`} style={{ fontFamily: "var(--serif)", fontSize: 17 }}>
              {EMAIL}
            </a>
          </div>
          <div className="card">
            <span className="section-label" style={{ marginBottom: 10 }}>Zusammenarbeit &amp; Anfragen</span>
            <p style={{ fontSize: 14, color: "var(--txt3)", lineHeight: 1.7, marginBottom: 14 }}>
              Presse, Lesungen, Lizenzen und kommerzielle Kooperationen.
            </p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("Anfrage — Zusammenarbeit")}`}
              style={{ fontFamily: "var(--serif)", fontSize: 17 }}
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 22, marginBottom: 6 }}>Nachricht schreiben</h3>
          <p style={{ fontSize: 13, color: "var(--txt3)", marginBottom: 22, fontWeight: 300 }}>
            Fülle das Formular aus — ich melde mich so bald wie möglich zurück.
          </p>

          {status === "sent" ? (
            <p style={{ fontSize: 15, color: "var(--green)", lineHeight: 1.7 }}>
              Vielen Dank! Deine Nachricht wurde gesendet. Ich melde mich bald bei dir.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px" }}
                aria-hidden="true"
              />
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  placeholder="damit ich dir antworten kann"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Art der Anfrage</label>
                <select value={anfrage} onChange={(e) => setAnfrage(e.target.value)}>
                  {ANFRAGE_ARTEN.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nachricht</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button className="btn" style={{ width: "100%" }} type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
