"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

export default function Registrieren() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [communityRules, setCommunityRules] = useState(false);
  const [agb, setAgb] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const pwChecks = [
    { label: "Mindestens 8 Zeichen", ok: password.length >= 8 },
    { label: "Enthält Buchstaben", ok: /[A-Za-z]/.test(password) },
    { label: "Enthält Zahlen", ok: /[0-9]/.test(password) },
  ];

  function isAtLeast16(dateStr: string) {
    const birth = new Date(dateStr);
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 16);
    return birth <= cutoff;
  }

  function isValidPassword(pw: string) {
    return pw.length >= 8 && /[A-Za-z]/.test(pw) && /[0-9]/.test(pw);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAtLeast16(birthdate)) {
      showToast("Du musst mindestens 16 Jahre alt sein, um dich zu registrieren.");
      return;
    }
    if (!isValidPassword(password)) {
      showToast("Das Passwort braucht mindestens 8 Zeichen mit Buchstaben und Zahlen.");
      return;
    }
    if (!communityRules || !agb) {
      showToast("Bitte akzeptiere die Community-Regeln und die AGB.");
      return;
    }
    if (!isSupabaseConfigured()) {
      showToast("Registrierung ist noch nicht konfiguriert.");
      return;
    }
    const supabase = createClient();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          phone,
          birthdate,
          newsletter: updates,
          birthday_greetings: updates,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      showToast("Registrierung fehlgeschlagen: " + error.message);
      return;
    }
    showToast("Registrierung erfolgreich! Bitte E-Mail bestätigen.");
    router.push("/login");
  }

  return (
    <div className="page">
      <div className="form-box">
        <h2>Konto erstellen</h2>
        <p className="form-sub">Kaufe Kapitel, schreibe Rezensionen, tritt der Community bei</p>

        <form onSubmit={handleSubmit}>
          <p style={{ fontSize: 11, color: "var(--txt4)", marginBottom: 14 }}>
            Mit <span style={{ color: "var(--gold)" }}>*</span> markierte Felder sind
            Pflichtfelder.
          </p>
          <div className="form-group">
            <label>
              E-Mail <span style={{ color: "var(--gold)" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Handynummer (optional, für SMS-Verifizierung)</label>
            <input
              type="tel"
              placeholder="+49 …"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              Geburtsdatum <span style={{ color: "var(--gold)" }}>*</span>
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Nutzername (öffentlich sichtbar) <span style={{ color: "var(--gold)" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Dein Nutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Passwort <span style={{ color: "var(--gold)" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Passwort wählen"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: 6,
                  cursor: "pointer",
                  color: "var(--txt3)",
                  display: "inline-flex",
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
              {pwChecks.map((c) => (
                <li
                  key={c.label}
                  style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: c.ok ? "var(--green)" : "var(--txt4)", transition: "color .2s" }}
                >
                  <span aria-hidden="true" style={{ display: "inline-flex", width: 14 }}>
                    {c.ok ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                    )}
                  </span>
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="community-rules"
              checked={communityRules}
              onChange={(e) => setCommunityRules(e.target.checked)}
            />
            <label htmlFor="community-rules">
              <span style={{ color: "var(--gold)" }}>*</span> Ich habe die{" "}
              <a href="#">Community-Regeln</a> gelesen und akzeptiere sie. Ich bestätige, dass Beiträge, die gegen die Regeln verstoßen, ohne Vorwarnung entfernt werden.
            </label>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="agb"
              checked={agb}
              onChange={(e) => setAgb(e.target.checked)}
            />
            <label htmlFor="agb">
              <span style={{ color: "var(--gold)" }}>*</span> Ich akzeptiere die{" "}
              <a href="/agb" target="_blank" rel="noopener noreferrer">AGB</a> und habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> gelesen.
            </label>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="updates"
              checked={updates}
              onChange={(e) => setUpdates(e.target.checked)}
            />
            <label htmlFor="updates">
              Ja, ich möchte den Newsletter mit Neuigkeiten zu Werken und
              Veröffentlichungen sowie eine Glückwunsch-E-Mail zu meinem
              Geburtstag erhalten. (freiwillig, jederzeit abbestellbar)
            </label>
          </div>

          <button
            className="btn"
            style={{ width: "100%", marginTop: 8 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Konto wird erstellt…" : "Konto erstellen"}
          </button>
        </form>
        <div className="form-switch">
          Bereits ein Konto? <Link href="/login">Anmelden</Link>
        </div>
      </div>
    </div>
  );
}
