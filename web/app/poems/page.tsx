"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { showToast } from "@/lib/toast";
import { startCheckout } from "@/lib/checkout";

const VIDEOS = [
  {
    id: "stille-vor-dem-riss",
    title: "Stille vor dem Riss",
    meta: "Video-Poem I · 2:34 · Frei",
    locked: false,
    gradient: "linear-gradient(135deg,#0d1f4a 0%,#1a0d3a 55%,#0d1730 100%)",
  },
  {
    id: "kranichflug",
    title: "Kranichflug",
    meta: "Video-Poem II · 3:12 · Frei",
    locked: false,
    gradient: "linear-gradient(135deg,#1a0d3a 0%,#3a1030 50%,#0d1730 100%)",
  },
  {
    id: "geteilter-himmel",
    title: "Geteilter Himmel — Visual Poem",
    meta: "Video-Poem III · 5:22 · Mitglieder",
    locked: true,
    gradient: "linear-gradient(135deg,#0d2a4a 0%,#0d1730 60%,#1a0d3a 100%)",
  },
];

export default function Poems() {
  const [user, setUser] = useState<User | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <div className="page">
      <div className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: 20,
            marginBottom: 48,
          }}
        >
          <div>
            <span className="section-label">Poems & Klang</span>
            <h1 style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, marginBottom: 12 }}>
              Worte, die <em style={{ color: "var(--gold)" }}>klingen</em>
            </h1>
            <p style={{ maxWidth: 520, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Musikalische Poems von Zane Charon — Stimme, Klang und Sprache als eine Einheit. Hörproben frei zugänglich. Vollständige Poems und eigene Playlists für Community-Mitglieder.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <button className="platform-btn spotify" onClick={() => showToast("Öffnet Spotify")}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#1ED760" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify ↗
            </button>
            <button className="platform-btn apple" onClick={() => showToast("Öffnet Apple Music")}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#fff" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c.828 0 1.5.672 1.5 1.5v6.586l1.793-1.793a1.5 1.5 0 1 1 2.121 2.121l-4.5 4.5a1.5 1.5 0 0 1-2.121 0l-4.5-4.5a1.5 1.5 0 1 1 2.121-2.121L10.5 12.586V6c0-.828.672-1.5 1.5-1.5z" />
              </svg>
              Apple Music ↗
            </button>
            <button className="platform-btn youtube" onClick={() => showToast("Öffnet YouTube")}>
              <svg width="17" height="12" viewBox="0 0 24 17">
                <path fill="#FF0000" d="M23.495 2.205a3.02 3.02 0 0 0-2.122-2.136C19.505 0 12 0 12 0S4.495 0 2.627.069a3.02 3.02 0 0 0-2.122 2.136C0 4.066 0 8.2 0 8.2s0 4.133.505 5.995a3.02 3.02 0 0 0 2.122 2.136C4.495 16.4 12 16.4 12 16.4s7.505 0 9.373-.069a3.02 3.02 0 0 0 2.122-2.136C24 12.333 24 8.2 24 8.2s0-4.133-.505-5.995z" />
                <path fill="white" d="M9.545 11.68l6.255-3.48-6.255-3.48v6.96z" />
              </svg>
              YouTube ↗
            </button>
            <button className="platform-btn instagram" onClick={() => showToast("Öffnet Instagram")}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="2" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Instagram ↗
            </button>
          </div>
        </div>

        <div className="poems-featured">
          <div className="poems-featured-visual" onClick={() => showToast("Poem wird abgespielt…")}>
            <div className="poems-featured-bg"></div>
            <svg className="poems-featured-deco" viewBox="0 0 400 300" fill="none">
              <g opacity=".12" transform="translate(200,80) scale(2.2)">
                <path d="M10 80 Q20 42 38 34 Q52 27 54 44 Q55 56 42 60 Q33 63 29 76" stroke="#d4a853" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M42 60 Q48 66 54 62 Q57 59 54 52" stroke="#d4a853" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </g>
              <circle cx="60" cy="50" r="4" fill="#d4567e" opacity=".3" />
              <circle cx="88" cy="35" r="3" fill="#d4567e" opacity=".25" />
              <circle cx="340" cy="240" r="5" fill="#d4567e" opacity=".25" />
              <circle cx="365" cy="220" r="3.5" fill="#d4567e" opacity=".2" />
            </svg>
            <div className="poems-featured-play">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M8 5 L23 14 L8 23 Z" fill="var(--bg)" />
              </svg>
            </div>
            <div className="poems-featured-badge">Hörprobe — Kostenlos</div>
            <div className="poems-wave" style={{ bottom: 20, opacity: 0.5 }}>
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="poems-featured-info">
            <span className="section-label" style={{ marginBottom: 6 }}>
              Neueste Veröffentlichung
            </span>
            <h2 style={{ fontSize: "clamp(22px,2.8vw,32px)", marginBottom: 10, lineHeight: 1.15 }}>
              Stille vor dem Riss
            </h2>
            <p style={{ fontSize: 14, color: "var(--txt3)", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
              <em style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--txt2)" }}>
                &quot;Was bleibt, wenn der Lärm aufhört — ist nicht Stille. Es ist der Raum, in dem du endlich hörst, was du dir selbst sagst.&quot;
              </em>
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <span className="tag">Poem I</span>
              <span className="tag">2:34</span>
              <span className="tag">Atmosph. Klang</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => showToast("Hörprobe wird abgespielt…")}>
                ▶ Hörprobe abspielen
              </button>
              <Link href="/registrieren" className="btn-ghost">
                🔒 Vollständig anhören
              </Link>
            </div>
          </div>
        </div>

        <hr className="divider" style={{ margin: "40px 0" }} />

        <div style={{ marginBottom: 40 }}>
          <span className="section-label">Video-Poems</span>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,32px)", marginBottom: 8, lineHeight: 1.15 }}>
            Zum <em style={{ color: "var(--gold)" }}>Ansehen</em>
          </h2>
          <p
            style={{
              maxWidth: 520,
              fontSize: 14,
              color: "var(--txt3)",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            Bewegte Poems — Bild, Stimme und Klang in einem. Tippe ein Video an, um die Wiedergabe zu starten.
          </p>

          <div className="video-gallery">
            {VIDEOS.map((video) => {
              const active = activeVideo === video.id;
              return (
                <div
                  key={video.id}
                  className={`video-tile${active ? " active" : ""}`}
                  style={{ background: video.gradient }}
                  onClick={() => setActiveVideo(active ? null : video.id)}
                >
                  <div className="video-tile-bg" />
                  <div className="video-tile-play" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                      <path d="M9 6 L22 14 L9 22 Z" fill="var(--gold-lt)" />
                    </svg>
                  </div>
                  {video.locked && <div className="video-tile-badge">🔒 Mitglieder</div>}
                  <div className="video-tile-overlay">
                    <div className="video-tile-info">
                      <div className="video-tile-title">{video.title}</div>
                      <div className="video-tile-meta">{video.meta}</div>
                    </div>
                    {video.locked ? (
                      <Link
                        href="/registrieren"
                        className="video-tile-watch"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Freischalten
                        <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                          <path d="M9 6 L22 14 L9 22 Z" fill="currentColor" />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        className="video-tile-watch"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Video wird abgespielt: ${video.title}`);
                        }}
                      >
                        Ansehen
                        <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                          <path d="M9 6 L22 14 L9 22 Z" fill="currentColor" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="divider" style={{ margin: "40px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          <div className="poems-track-card" onClick={() => showToast("Hörprobe: Stille vor dem Riss")}>
            <div className="ptc-num">01</div>
            <div className="ptc-info">
              <div className="ptc-title">Stille vor dem Riss</div>
              <div className="ptc-meta">Poem I · 2:34 · Hörprobe frei</div>
            </div>
            <div className="ptc-right">
              <span className="ptc-free">▶ Frei</span>
            </div>
          </div>

          <div className="poems-track-card" onClick={() => showToast("Hörprobe: Kranichflug")}>
            <div className="ptc-num">02</div>
            <div className="ptc-info">
              <div className="ptc-title">Kranichflug</div>
              <div className="ptc-meta">Poem II · 3:12 · Hörprobe frei</div>
            </div>
            <div className="ptc-right">
              <span className="ptc-free">▶ Frei</span>
            </div>
          </div>

          <Link href="/registrieren" className="poems-track-card locked-track" style={{ textDecoration: "none" }}>
            <div className="ptc-num" style={{ color: "var(--txt4)" }}>03</div>
            <div className="ptc-info">
              <div className="ptc-title">Papierwände</div>
              <div className="ptc-meta">Poem III · 4:01 · Community</div>
            </div>
            <div className="ptc-right">
              <span className="ptc-lock">🔒</span>
            </div>
          </Link>

          <Link href="/registrieren" className="poems-track-card locked-track" style={{ textDecoration: "none" }}>
            <div className="ptc-num" style={{ color: "var(--txt4)" }}>04</div>
            <div className="ptc-info">
              <div className="ptc-title">Aschemeer</div>
              <div className="ptc-meta">Poem IV · 3:48 · Community</div>
            </div>
            <div className="ptc-right">
              <span className="ptc-lock">🔒</span>
            </div>
          </Link>

          <Link href="/registrieren" className="poems-track-card locked-track" style={{ textDecoration: "none" }}>
            <div className="ptc-num" style={{ color: "var(--txt4)" }}>05</div>
            <div className="ptc-info">
              <div className="ptc-title">Wenn Licht lügt</div>
              <div className="ptc-meta">Poem V · 2:58 · Community</div>
            </div>
            <div className="ptc-right">
              <span className="ptc-lock">🔒</span>
            </div>
          </Link>

          <Link href="/registrieren" className="poems-track-card locked-track" style={{ textDecoration: "none" }}>
            <div className="ptc-num" style={{ color: "var(--txt4)" }}>06</div>
            <div className="ptc-info">
              <div className="ptc-title">Geteilter Himmel — Das Poem</div>
              <div className="ptc-meta">Poem VI · 5:22 · Community · Premium</div>
            </div>
            <div className="ptc-right">
              <span className="ptc-lock" style={{ color: "var(--gold)" }}>⭐</span>
            </div>
          </Link>
        </div>

        <div className="poems-community-box">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              <span className="section-label" style={{ marginBottom: 8 }}>
                Nur für Mitglieder
              </span>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,28px)", marginBottom: 12, lineHeight: 1.2 }}>
                Deine eigene
                <br />
                <em style={{ color: "var(--gold)" }}>Zane Charon Playlist</em>
              </h3>
              <p style={{ fontSize: 14, color: "var(--txt3)", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
                Stelle dir aus allen Poems eine persönliche Playlist zusammen, höre sie direkt im Browser oder lade sie als Premium-Paket herunter — mit Textheft als PDF inklusive.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--txt2)" }}>
                  <span style={{ color: "var(--green)", fontSize: 16 }}>✓</span> Alle Poems vollständig streamen
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--txt2)" }}>
                  <span style={{ color: "var(--green)", fontSize: 16 }}>✓</span> Eigene Playlist erstellen & speichern
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--txt2)" }}>
                  <span style={{ color: "var(--gold)", fontSize: 16 }}>★</span> Premium-Download: MP3 + FLAC + Text-PDF
                </div>
              </div>
              <Link href="/registrieren" className="btn">
                Jetzt Mitglied werden
              </Link>
            </div>

            <div className="poems-playlist-preview">
              <div className="ppp-header">
                <span style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--txt3)", fontFamily: "var(--sans)" }}>
                  Meine Playlist
                </span>
                <span style={{ fontSize: 11, color: "var(--txt4)", fontFamily: "var(--sans)" }}>🔒 Anmelden</span>
              </div>
              <div className="ppp-item ppp-locked">
                <span className="ppp-idx">1</span>
                <span className="ppp-name">Stille vor dem Riss</span>
                <span className="ppp-dur">2:34</span>
              </div>
              <div className="ppp-item ppp-locked">
                <span className="ppp-idx">2</span>
                <span className="ppp-name">Kranichflug</span>
                <span className="ppp-dur">3:12</span>
              </div>
              <div className="ppp-item ppp-locked" style={{ opacity: 0.6 }}>
                <span className="ppp-idx">3</span>
                <span className="ppp-name">Papierwände</span>
                <span className="ppp-dur">4:01</span>
              </div>
              <Link href="/registrieren" className="ppp-add" style={{ display: "block" }}>
                + Poem hinzufügen
              </Link>
              {user ? (
                <button
                  className="ppp-download"
                  style={{ border: "none" }}
                  onClick={() => startCheckout("poems:download-paket")}
                >
                  <span>⬇ Download-Paket</span>
                  <span style={{ color: "var(--gold)", fontWeight: 600 }}>2,99 €</span>
                </button>
              ) : (
                <Link href="/registrieren" className="ppp-download" style={{ textDecoration: "none" }}>
                  <span>⬇ Download-Paket</span>
                  <span style={{ color: "var(--gold)", fontWeight: 600 }}>2,99 €</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
