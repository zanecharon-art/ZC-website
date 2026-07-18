"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";
import { startCheckout } from "@/lib/checkout";

const TABS = [
  { id: "bibliothek", label: "📚 Bibliothek" },
  { id: "merkliste", label: "🔖 Merkliste" },
  { id: "warenkorb", label: "🛒 Warenkorb" },
  { id: "einstellungen", label: "⚙️ Einstellungen" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProfileTabs({ user }: { user: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<TabId>("bibliothek");
  const [username, setUsername] = useState(user.user_metadata?.username ?? "");
  const [status, setStatus] = useState(user.user_metadata?.status ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkout = searchParams.get("checkout");
    if (checkout === "success") {
      showToast("Kauf erfolgreich! Viel Freude beim Lesen.");
      router.replace("/profil");
    } else if (checkout === "cancelled") {
      showToast("Checkout abgebrochen.");
      router.replace("/profil");
    }
  }, [searchParams, router]);

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      email,
      data: { username, status },
    });
    setSaving(false);
    if (error) {
      showToast("Speichern fehlgeschlagen: " + error.message);
      return;
    }
    showToast("Änderungen gespeichert!");
    router.refresh();
  }

  return (
    <>
      <div className="profile-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`profile-tab${activeTab === tab.id ? " active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "bibliothek" && (
        <div>
          <span className="section-label">Meine Bibliothek</span>
          <Link
            href="/werke/geteilter-himmel"
            className="card"
            style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 14, cursor: "pointer", textDecoration: "none" }}
          >
            <div
              className="book-thumb book-thumb-gh"
              style={{ width: 60, height: 90, minWidth: 60, aspectRatio: "auto" }}
              role="img"
              aria-label="Cover: Geteilter Himmel"
            ></div>
            <div>
              <div className="book-title">Geteilter Himmel</div>
              <div className="book-meta">Kapitel 1–3 freigeschaltet · 11 Kapitel verfügbar</div>
              <div style={{ marginTop: 8 }}>
                <button
                  className="btn btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showToast("Kapitel 1 öffnet sich…");
                  }}
                >
                  Weiterlesen
                </button>
              </div>
            </div>
          </Link>
        </div>
      )}

      {activeTab === "merkliste" && (
        <div>
          <span className="section-label">Merkliste</span>
          <div className="card" style={{ marginTop: 14, textAlign: "center", padding: 40 }}>
            <p style={{ color: "var(--txt4)" }}>
              Deine Merkliste ist noch leer.
              <br />
              Füge Werke hinzu, um sie später zu kaufen.
            </p>
            <Link href="/werke" className="btn btn-sm" style={{ marginTop: 16, display: "inline-block" }}>
              Werke entdecken
            </Link>
          </div>
        </div>
      )}

      {activeTab === "warenkorb" && (
        <div>
          <span className="section-label">Warenkorb</span>
          <div className="card" style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--brd)" }}>
              <div>
                <div style={{ fontSize: 14, color: "var(--txt)" }}>Geteilter Himmel — Kapitel 4</div>
                <div style={{ fontSize: 12, color: "var(--txt3)" }}>Digitaler Lesezugang</div>
              </div>
              <div style={{ fontSize: 14, color: "var(--gold)", fontWeight: 500 }}>1,49 €</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14 }}>
              <div style={{ fontSize: 14, color: "var(--txt2)" }}>Gesamt</div>
              <div style={{ fontSize: 16, color: "var(--txt)", fontWeight: 600 }}>1,49 €</div>
            </div>
            <button
              className="btn"
              style={{ width: "100%", marginTop: 16 }}
              onClick={() => startCheckout("chapter:geteilter-himmel:4")}
            >
              Zur Kasse
            </button>
          </div>
        </div>
      )}

      {activeTab === "einstellungen" && (
        <div>
          <span className="section-label">Einstellungen</span>
          <div className="card" style={{ marginTop: 14 }}>
            <div className="form-group">
              <label>Nutzername</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Dein persönlicher Status"
              />
            </div>
            <div className="form-group">
              <label>E-Mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="btn btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? "Speichert…" : "Speichern"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
