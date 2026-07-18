import Link from "next/link";

export const metadata = {
  title: "Werke — Zane Charon",
};

export default function Werke() {
  return (
    <div className="page">
      <div className="section">
        <span className="section-label">Alle Werke</span>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          Geschichten von Zane Charon
        </h2>
        <div className="grid-3">
          <Link href="/werke/geteilter-himmel" className="card" style={{ cursor: "pointer", display: "block" }}>
            <div className="book-thumb book-thumb-gh">
              <svg className="kranich" viewBox="0 0 80 80" fill="none">
                <path d="M20 60 Q30 30 50 25 Q65 20 68 35 Q70 45 55 50 Q45 53 40 65" stroke="#dce8ff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M55 50 Q60 55 65 52 Q68 49 65 45" stroke="#dce8ff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="35" cy="68" r="2" fill="#cf8d84" opacity=".7" />
                <circle cx="42" cy="72" r="1.5" fill="#cf8d84" opacity=".5" />
              </svg>
            </div>
            <div className="badge" style={{ marginBottom: 6, fontSize: 10, padding: "3px 9px" }}>
              🏆 Longlist YST Award 2025
            </div>
            <div className="book-title">Geteilter Himmel</div>
            <div className="book-meta" style={{ marginBottom: 6 }}>
              Roman · 14 Kapitel · ab 1,49 €
            </div>
            <div className="book-badge">3 Kapitel gratis</div>
          </Link>

          <div className="card" style={{ opacity: 0.7 }}>
            <div className="book-thumb" style={{ background: "linear-gradient(160deg,#5a3a4a,#2e2028)" }}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity=".6">
                <path d="M10 40 Q20 15 35 12 Q45 10 47 22" stroke="#d4a853" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="book-title">Schattenkorrespondenz</div>
            <div className="book-meta">Novelle · In Arbeit</div>
            <div className="book-badge locked" style={{ marginTop: 8 }}>
              Demnächst
            </div>
          </div>

          <div className="card" style={{ opacity: 0.7 }}>
            <div className="book-thumb" style={{ background: "linear-gradient(160deg,#41402e,#242617)" }}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity=".6">
                <circle cx="25" cy="18" r="8" stroke="#d4a853" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
            <div className="book-title">Nachtgesänge</div>
            <div className="book-meta">Kurzgeschichten · Geplant</div>
            <div className="book-badge locked" style={{ marginTop: 8 }}>
              In Planung
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
