"use client";

import { useState } from "react";
import { showToast } from "@/lib/toast";

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
        showToast("Das Formular ist gerade nicht verfügbar. Bitte versuche es in Kürze erneut.");
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
      if (data?.message) console.error("Web3Forms:", data.message);
      showToast("Senden fehlgeschlagen. Bitte versuche es in Kürze noch einmal.");
    } catch {
      setStatus("idle");
      showToast("Senden fehlgeschlagen. Bitte versuche es in Kürze noch einmal.");
    }
  }

  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 760 }}>
        <span className="section-label">Kontakt</span>
        <h2 className="section-title">Kontakt &amp; Zusammenarbeit</h2>
        <div style={{ maxWidth: 620, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: 20,
              fontStyle: "italic",
              lineHeight: 1.7,
              color: "var(--txt2)",
              marginBottom: 18,
            }}
          >
            Worte haben mich oft dann gefunden, wenn ich sie am nötigsten
            brauchte. Vielleicht trägst auch du einen Gedanken mit dir, der
            gesagt werden möchte.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
            Ob ein Wort zu meinen Geschichten, eine Presseanfrage, eine Einladung
            zur Lesung oder eine mögliche Zusammenarbeit — schreib mir über das
            Formular und wähle die passende Art der Anfrage. Ich lese jede
            Nachricht selbst und melde mich so bald wie möglich bei dir.
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 22, marginBottom: 6 }}>Nachricht schreiben</h3>
          <p style={{ fontSize: 13, color: "var(--txt3)", marginBottom: 22, fontWeight: 300 }}>
            Alle Felder helfen mir, deine Anfrage richtig einzuordnen.
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
