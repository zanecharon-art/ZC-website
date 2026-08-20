"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      showToast("Anmeldung ist noch nicht konfiguriert.");
      return;
    }
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
