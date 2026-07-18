"use client";

import { showToast } from "@/lib/toast";
import { startCheckout } from "@/lib/checkout";

export default function GeteilterHimmel() {
  return (
    <div className="page">
      <div className="section">
        <div className="badge">🏆 Longlist · Young Story Teller Award 2025</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: 36,
            alignItems: "start",
            marginBottom: 32,
          }}
        >
          <div
            className="book-thumb book-thumb-gh"
            role="img"
            aria-label="Cover: Geteilter Himmel"
          ></div>
          <div>
            <span className="eyebrow" style={{ marginBottom: 8 }}>
              Roman · Literarische Fiktion
            </span>
            <h1 style={{ fontSize: "clamp(26px,3.5vw,40px)", marginBottom: 8 }}>Geteilter Himmel</h1>
            <p style={{ fontSize: 13, color: "var(--txt3)", marginBottom: 16 }}>
              von Zane Charon · 14 Kapitel
            </p>
            <p style={{ fontSize: 14, color: "var(--txt2)", lineHeight: 1.8, maxWidth: 500, marginBottom: 20 }}>
              Zwischen zerbrochenem Papier und einem Himmel, der sich nicht entscheiden kann — eine Geschichte über das, was bleibt, wenn alles andere fällt.
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "rgba(90,184,138,.12)",
                  color: "var(--green)",
                  fontSize: 12,
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "1px solid rgba(90,184,138,.25)",
                }}
              >
                3 Kapitel gratis
              </span>
              <span style={{ fontSize: 13, color: "var(--txt3)" }}>·</span>
              <span style={{ fontSize: 13, color: "var(--txt3)" }}>ab 1,49 € pro Kapitel</span>
            </div>
          </div>
        </div>

        <div className="print-section">
          <p>Lieber gedruckt lesen? Als Hardcover erhältlich bei:</p>
          <div className="print-btns">
            <button className="btn-ghost btn-sm" onClick={() => showToast("Öffnet Thalia in neuem Tab")}>
              Bei Thalia ↗
            </button>
            <button className="btn-ghost btn-sm" onClick={() => showToast("Öffnet Amazon in neuem Tab")}>
              Bei Amazon ↗
            </button>
          </div>
        </div>

        <h3 style={{ fontSize: 13, color: "var(--txt3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>
          Digital lesen — einzelne Kapitel
        </h3>
        <ul className="chapter-list">
          <li className="chapter-item free-ch" onClick={() => showToast("Kapitel 1 wird geöffnet…")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--green)" }}>👁</span>
              1. Der erste Riss
            </div>
            <span className="ch-free">Gratis lesen</span>
          </li>
          <li className="chapter-item free-ch" onClick={() => showToast("Kapitel 2 wird geöffnet…")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--green)" }}>👁</span>
              2. Was der Kranich wusste
            </div>
            <span className="ch-free">Gratis lesen</span>
          </li>
          <li className="chapter-item free-ch" onClick={() => showToast("Kapitel 3 wird geöffnet…")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--green)" }}>👁</span>
              3. Blütenfall
            </div>
            <span className="ch-free">Gratis lesen</span>
          </li>
          <li className="chapter-item" onClick={() => startCheckout("chapter:geteilter-himmel:4")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--gold)" }}>🔒</span>
              4. Geteilter Himmel
            </div>
            <span className="ch-price">1,49 €</span>
          </li>
          <li className="chapter-item" onClick={() => startCheckout("chapter:geteilter-himmel:5")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--gold)" }}>🔒</span>
              5. Schattenwurf
            </div>
            <span className="ch-price">1,49 €</span>
          </li>
          <li className="chapter-item" onClick={() => startCheckout("chapter:geteilter-himmel:6")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--gold)" }}>🔒</span>
              6. Die Stimme im Papier
            </div>
            <span className="ch-price">1,49 €</span>
          </li>
          <li className="chapter-item" onClick={() => startCheckout("chapter:geteilter-himmel:7")}>
            <div className="ch-left">
              <span className="ch-icon" style={{ color: "var(--gold)" }}>🔒</span>
              7. Zwischen den Zeilen
            </div>
            <span className="ch-price">1,49 €</span>
          </li>
          <li className="chapter-item" style={{ justifyContent: "center", color: "var(--txt4)", fontSize: 13, cursor: "default" }}>
            ⋯ 7 weitere Kapitel ⋯
          </li>
        </ul>

        <button
          className="btn"
          style={{ width: "100%", marginTop: 16, padding: 14 }}
          onClick={() => startCheckout("bundle:geteilter-himmel")}
        >
          Alle Kapitel freischalten · 14,99 €
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--txt4)", marginTop: 10 }}>
          Oder einzelne Kapitel nach Wahl freischalten
        </p>

        <div style={{ marginTop: 48 }}>
          <span className="section-label">Was Leser:innen sagen</span>
          <div className="grid-2" style={{ marginTop: 16 }}>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <div className="review-text">Hat mich tagelang nicht losgelassen, im besten Sinne.</div>
              <div className="reviewer">— Mara K., verifizierte Leserin</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★☆</div>
              <div className="review-text">Sprache, bei der man jeden Satz zweimal lesen will.</div>
              <div className="reviewer">— J. Brenner, verifizierter Leser</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button className="btn-ghost btn-sm" onClick={() => showToast("Anmelden, um eine Rezension zu schreiben")}>
              Rezension schreiben
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
