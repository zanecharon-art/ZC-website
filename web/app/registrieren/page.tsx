"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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
  const [loading, setLoading] = useState(false);

  function isAtLeast16(dateStr: string) {
    const birth = new Date(dateStr);
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 16);
    return birth <= cutoff;
  }

  async function handleGoogle() {
    const supabase = createClient();
    showToast("Google-Registrierung wird gestartet…");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) showToast(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAtLeast16(birthdate)) {
      showToast("Du musst mindestens 16 Jahre alt sein, um dich zu registrieren.");
      return;
    }
    if (!communityRules || !agb) {
      showToast("Bitte akzeptiere die Community-Regeln und die AGB.");
      return;
    }
    const supabase = createClient();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, phone, birthdate },
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

        <button className="social-btn" onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4" />
            <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853" />
            <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05" />
            <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.48a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335" />
          </svg>
          Mit Google registrieren
        </button>

        <div className="form-divider">oder</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-Mail</label>
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
            <label>Geburtsdatum</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group">
            <label>Nutzername (öffentlich sichtbar)</label>
            <input
              type="text"
              placeholder="Dein Nutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Passwort</label>
            <input
              type="password"
              placeholder="Mindestens 8 Zeichen"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="community-rules"
              checked={communityRules}
              onChange={(e) => setCommunityRules(e.target.checked)}
            />
            <label htmlFor="community-rules">
              Ich habe die <a href="#">Community-Regeln</a> gelesen und akzeptiere sie. Ich bestätige, dass Beiträge, die gegen die Regeln verstoßen, ohne Vorwarnung entfernt werden.
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
              Ich akzeptiere die <a href="/agb" target="_blank" rel="noopener noreferrer">AGB</a> und habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> gelesen.
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
