"use client";

import Link from "next/link";
import { showToast } from "@/lib/toast";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="nav-logo">Zane Charon</span>
          <p>Literarische Fiktion — Geschichten über Licht im Schatten.</p>
          <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
            <span
              style={{ cursor: "pointer", opacity: 0.6, transition: "opacity .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
              onClick={() => showToast("Instagram folgen")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="1.8" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="1.8" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ fontSize: 18, cursor: "pointer" }} onClick={() => showToast("Twitter/X folgen")}>
              🐦
            </span>
            <span style={{ fontSize: 18, cursor: "pointer" }} onClick={() => showToast("Newsletter abonnieren")}>
              📬
            </span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Werke</h4>
          <Link href="/werke/geteilter-himmel">Geteilter Himmel</Link>
          <Link href="/werke">Alle Werke</Link>
        </div>
        <div className="footer-col">
          <h4>Seiten</h4>
          <Link href="/ueber-mich">Über mich</Link>
          <Link href="/presse">Presse</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/news">News</Link>
          <Link href="/community">Community</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Zane Charon. Alle Rechte vorbehalten.</p>
        <div className="footer-legal">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); showToast("Widerruf [Platzhalter]"); }}>
            Widerruf
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); showToast("Kontakt"); }}>
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
