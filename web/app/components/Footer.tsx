"use client";

import Link from "next/link";
import { showToast } from "@/lib/toast";
import { InstagramIcon, YouTubeIcon, EnvelopeIcon } from "@/app/components/icons";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="nav-logo">Zane Charon</span>
          <p>Literarische Fiktion — Geschichten über Licht im Schatten.</p>
          <div style={{ marginTop: 14, display: "flex", gap: 14, alignItems: "center", color: "var(--txt2)" }}>
            <span
              style={{ cursor: "pointer", opacity: 0.7, transition: "opacity .2s", display: "inline-flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              onClick={() => showToast("Instagram folgen")}
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </span>
            <span
              style={{ cursor: "pointer", opacity: 0.7, transition: "opacity .2s", display: "inline-flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              onClick={() => showToast("YouTube-Kanal folgen")}
              aria-label="YouTube"
            >
              <YouTubeIcon size={22} />
            </span>
            <span
              style={{ cursor: "pointer", opacity: 0.7, transition: "opacity .2s", display: "inline-flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              onClick={() => showToast("Newsletter abonnieren")}
              aria-label="Newsletter"
            >
              <EnvelopeIcon size={19} />
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
          <Link href="/kontakt">Kontakt</Link>
        </div>
      </div>
    </footer>
  );
}
