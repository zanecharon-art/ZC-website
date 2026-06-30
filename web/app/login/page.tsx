"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOAuth(provider: "google" | "apple") {
    const supabase = createClient();
    showToast(
      provider === "google"
        ? "Google-Anmeldung wird gestartet…"
        : "Apple-Anmeldung wird gestartet…"
    );
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) showToast(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      showToast("Anmeldung fehlgeschlagen: " + error.message);
      return;
    }
    showToast("Anmeldung erfolgreich!");
    router.push("/profil");
    router.refresh();
  }

  return (
    <div className="page">
      <div className="form-box">
        <h2>Willkommen zurück</h2>
        <p className="form-sub">Melde dich an, um auf deine Bibliothek zuzugreifen</p>

        <button className="social-btn" onClick={() => handleOAuth("google")}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4" />
            <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853" />
            <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05" />
            <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.48a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335" />
          </svg>
          Mit Google anmelden
        </button>
        <button className="social-btn" onClick={() => handleOAuth("apple")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--txt)">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.22.74 2.98.8 1.16-.24 2.27-.93 3.51-.84 1.5.12 2.63.72 3.37 1.82-3.08 1.86-2.35 5.94.47 7.09-.56 1.48-1.3 2.96-2.33 4.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Mit Apple anmelden
        </button>

        <div className="form-divider">oder</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-Mail</label>
            <input
              type="email"
              placeholder="name@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Passwort</label>
            <input
              type="password"
              placeholder="Dein Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn" style={{ width: "100%" }} type="submit" disabled={loading}>
            {loading ? "Anmelden…" : "Anmelden"}
          </button>
        </form>
        <div className="form-switch">
          Noch kein Konto? <Link href="/registrieren">Jetzt registrieren</Link>
        </div>
      </div>
    </div>
  );
}
