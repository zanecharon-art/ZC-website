"use client";

import Link from "next/link";
import { useState } from "react";
import { showToast } from "@/lib/toast";

function MiniPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  function toggle() {
    setPlaying((prev) => {
      const next = !prev;
      if (next) {
        const interval = setInterval(() => {
          setProgress((p) => {
            const nextP = Math.min(p + 0.3, 100);
            if (nextP >= 100) {
              clearInterval(interval);
              setPlaying(false);
              return 0;
            }
            return nextP;
          });
        }, 100);
      }
      return next;
    });
  }

  return (
    <div className="poems-mini-player">
      <button className="poems-play-btn" onClick={toggle}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="3" width="4" height="10" rx="1" fill="currentColor" />
            <rect x="9" y="3" width="4" height="10" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 3 L13 8 L4 13 Z" fill="currentColor" />
          </svg>
        )}
      </button>
      <div className="poems-progress-wrap">
        <div className="poems-track-name">Stille vor dem Riss — Poem I</div>
        <div className="poems-progress-bar">
          <div className="poems-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <span className="poems-duration">2:34</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="page">
      <section className="lp-hero">
        <div className="lp-bg"></div>

        <svg
          className="lp-deco-svg"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.07" transform="translate(680,60) scale(3.4)">
            <path d="M20 90 Q35 45 62 35 Q82 28 86 50 Q88 65 68 72 Q55 76 48 95" stroke="#d4a853" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M68 72 Q76 80 84 75 Q88 70 84 62" stroke="#d4a853" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M48 95 Q44 105 38 102" stroke="#d4a853" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
          <g opacity="0.13" transform="translate(55,30) scale(1.5)">
            <path d="M10 55 Q20 25 38 20 Q50 16 52 30 Q53 39 41 43 Q33 46 29 58" stroke="#e0c47e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M41 43 Q46 48 51 45 Q53 42 51 37" stroke="#e0c47e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>
          <g opacity="0.22">
            <circle cx="975" cy="55" r="5.5" fill="#cf8d84" />
            <circle cx="1008" cy="38" r="4" fill="#cf8d84" />
            <circle cx="1042" cy="70" r="4.5" fill="#cf8d84" />
            <circle cx="955" cy="85" r="3.5" fill="#e87aaa" />
            <circle cx="1072" cy="50" r="3" fill="#cf8d84" />
            <circle cx="1025" cy="88" r="3" fill="#e87aaa" />
            <line x1="975" y1="58" x2="1008" y2="42" stroke="#cf8d84" strokeWidth="0.8" opacity="0.35" />
            <line x1="1008" y1="42" x2="1042" y2="73" stroke="#cf8d84" strokeWidth="0.8" opacity="0.35" />
            <line x1="1042" y1="73" x2="1072" y2="53" stroke="#cf8d84" strokeWidth="0.8" opacity="0.35" />
          </g>
          <g opacity="0.18">
            <path d="M1060 640 Q1110 590 1165 558" stroke="#5a3040" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M1085 615 Q1098 595 1110 588" stroke="#5a3040" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="1110" cy="588" r="5" fill="#cf8d84" opacity="0.7" />
            <circle cx="1165" cy="558" r="6" fill="#cf8d84" opacity="0.6" />
            <circle cx="1135" cy="573" r="3.5" fill="#e87aaa" opacity="0.6" />
            <circle cx="1150" cy="600" r="3" fill="#cf8d84" opacity="0.5" />
          </g>
          <g opacity="0.16">
            <circle cx="72" cy="555" r="4" fill="#cf8d84" />
            <circle cx="105" cy="575" r="3" fill="#e87aaa" />
            <circle cx="48" cy="585" r="3.5" fill="#cf8d84" />
            <circle cx="125" cy="548" r="2.5" fill="#cf8d84" />
            <line x1="72" y1="558" x2="105" y2="578" stroke="#cf8d84" strokeWidth="0.7" opacity="0.4" />
            <line x1="48" y1="588" x2="72" y2="558" stroke="#cf8d84" strokeWidth="0.7" opacity="0.4" />
          </g>
          <line x1="0" y1="350" x2="280" y2="290" stroke="#d4a853" strokeWidth="0.6" opacity="0.07" />
          <line x1="900" y1="700" x2="1200" y2="420" stroke="#d4a853" strokeWidth="0.6" opacity="0.07" />
          <g opacity="0.05" fill="#d4a853">
            <circle cx="195" cy="145" r="2.5" />
            <circle cx="258" cy="198" r="1.8" />
            <circle cx="318" cy="128" r="2.2" />
            <circle cx="158" cy="218" r="1.8" />
            <circle cx="895" cy="495" r="2.2" />
            <circle cx="958" cy="558" r="1.8" />
            <circle cx="838" cy="578" r="2.2" />
          </g>
        </svg>

        <div className="lp-photo-area">
          <div className="lp-photo-placeholder">
            <div className="lp-photo-inner">
              <svg viewBox="0 0 160 280" width="160" height="280" fill="none">
                <ellipse cx="80" cy="60" rx="30" ry="34" fill="rgba(212,168,83,0.10)" stroke="rgba(212,168,83,0.22)" strokeWidth="1" />
                <path
                  d="M40 150 Q46 108 80 103 Q114 108 120 150 L124 248 Q102 256 80 256 Q58 256 36 248 Z"
                  fill="rgba(212,168,83,0.07)"
                  stroke="rgba(212,168,83,0.18)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="lp-photo-hint">Dein Foto hier</div>
          </div>
        </div>

        <div className="lp-name-block">
          <div className="lp-name-top">ZANE</div>
          <div className="lp-name-bottom">CHARON</div>
        </div>

        <div className="lp-subline">
          <span className="lp-genre">Literarische Fiktion</span>
          <p className="lp-tagline">
            Geschichten über das, was zerbricht —<br />
            und das, was trotzdem trägt.
          </p>
          <div className="lp-ctas">
            <Link href="/werke" className="btn">
              Werke entdecken
            </Link>
            <Link href="/ueber-mich" className="btn-ghost">
              Über mich
            </Link>
          </div>
        </div>

        <div className="lp-award">
          <span>🏆</span>
          <span>Longlist · Young Story Teller Award 2025</span>
        </div>

        <div className="lp-scroll">
          <div className="lp-scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      <hr className="divider" />

      <div className="section">
        <span className="section-label">Aktuelle Werke</span>
        <div className="grid-3">
          <Link href="/werke/geteilter-himmel" className="card" style={{ cursor: "pointer", display: "block" }}>
            <div className="book-thumb book-thumb-gh" role="img" aria-label="Cover: Geteilter Himmel"></div>
            <div>
              <div className="badge" style={{ marginBottom: 8, fontSize: 10, padding: "3px 9px" }}>
                🏆 Longlist Young Story Teller Award 2025
              </div>
              <div className="book-title">Geteilter Himmel</div>
              <div className="book-meta">Roman · 14 Kapitel</div>
              <div className="book-badge">3 Kapitel gratis</div>
            </div>
          </Link>

          <div className="card">
            <div className="book-thumb" style={{ background: "linear-gradient(160deg,#5a3a4a,#2e2028)" }}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity=".6">
                <path d="M10 40 Q20 15 35 12 Q45 10 47 22" stroke="#d4a853" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M25 8 Q28 4 32 6" stroke="#d4a853" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="book-title">Schattenkorrespondenz</div>
            <div className="book-meta">Novelle · In Arbeit</div>
            <div className="book-badge locked">Demnächst</div>
          </div>

          <div className="card">
            <div className="book-thumb" style={{ background: "linear-gradient(160deg,#41402e,#242617)" }}>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity=".6">
                <circle cx="25" cy="18" r="8" stroke="#d4a853" strokeWidth="1.2" fill="none" />
                <path d="M17 18 Q10 28 14 38 M33 18 Q40 28 36 38" stroke="#d4a853" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="book-title">Nachtgesänge</div>
            <div className="book-meta">Kurzgeschichten · Geplant</div>
            <div className="book-badge locked">In Planung</div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="section">
        <Link
          href="/ueber-mich"
          className="card"
          style={{ display: "flex", gap: 24, alignItems: "center", cursor: "pointer", padding: 28 }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#4a3a2c,#5a3a3f)",
              border: "1px solid var(--gold-brd)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            🕊️
          </div>
          <div>
            <span className="section-label" style={{ marginBottom: 4 }}>
              Über mich
            </span>
            <div style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--txt)", marginBottom: 4 }}>
              Wer hinter Zane Charon steht
            </div>
            <p style={{ fontSize: 13, color: "var(--txt3)", margin: 0 }}>
              Eine kurze Geschichte über Schatten, Hoffnung und das Schreiben dazwischen →
            </p>
          </div>
        </Link>
      </div>

      <hr className="divider" />

      <div className="section">
        <span className="section-label">Pressestimmen</span>
        <div className="award-box">
          <div className="award-icon">🏆</div>
          <div>
            <h3>Longlist · Young Story Teller Award 2025</h3>
            <p>Geteilter Himmel, ausgewählt von einer renommierten Fachjury</p>
          </div>
        </div>
        <div className="grid-2">
          <div className="quote-card">
            <span className="quote-icon" style={{ color: "var(--pink)" }}>
              ❝
            </span>
            <div className="quote-text">Eine seltene Stimme, die Schwere und Hoffnung im selben Atemzug erzählt.</div>
            <div className="quote-source">— Literaturmagazin · Beispielzitat</div>
          </div>
          <div className="quote-card">
            <span className="quote-icon" style={{ color: "var(--blue)" }}>
              ❝
            </span>
            <div className="quote-text">Charon schreibt, als würde jeder Satz noch eine zweite Bedeutung tragen.</div>
            <div className="quote-source">— Buchblog · Beispielzitat</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/presse" className="btn-ghost">
            Alle Pressestimmen →
          </Link>
        </div>
      </div>

      <hr className="divider" />

      <div className="section">
        <div className="responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
          <div className="poems-player-wrap">
            <div className="poems-video-placeholder">
              <div className="poems-video-inner">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="31" stroke="rgba(212,168,83,0.3)" strokeWidth="1" />
                  <circle cx="32" cy="32" r="20" fill="rgba(212,168,83,0.08)" stroke="rgba(212,168,83,0.2)" strokeWidth="1" />
                  <path d="M27 22 L27 42 L46 32 Z" fill="var(--gold)" opacity=".85" />
                </svg>
              </div>
              <div className="poems-video-label">
                <span className="poems-video-title">Vorschau · Musikalisches Poem</span>
                <span className="poems-video-sub">Dein Video / Hörprobe hier</span>
              </div>
              <div className="poems-wave">
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>

            <MiniPlayer />
          </div>

          <div>
            <span className="section-label">Poems & Klang</span>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", marginBottom: 16, lineHeight: 1.15 }}>
              Worte, die
              <br />
              <em style={{ color: "var(--gold)" }}>klingen</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--txt2)", marginBottom: 20, fontWeight: 300 }}>
              Musikalische Poems — Stimme und Klang als eine Einheit. Auf Spotify, Apple Music und hier, wo die Community
              eigene Playlists zusammenstellt.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <button className="platform-btn spotify" onClick={() => showToast("Öffnet Spotify")}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="#1ED760"
                    d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                  />
                </svg>
                Spotify
              </button>
              <button className="platform-btn apple" onClick={() => showToast("Öffnet Apple Music")}>
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c.828 0 1.5.672 1.5 1.5v6.586l1.793-1.793a1.5 1.5 0 1 1 2.121 2.121l-4.5 4.5a1.5 1.5 0 0 1-2.121 0l-4.5-4.5a1.5 1.5 0 1 1 2.121-2.121L10.5 12.586V6c0-.828.672-1.5 1.5-1.5z"
                  />
                </svg>
                Apple Music
              </button>
              <button className="platform-btn youtube" onClick={() => showToast("Öffnet YouTube")}>
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#FF0000"
                    d="M23.498 6.186a2.97 2.97 0 0 0-2.088-2.088C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.41.598A2.97 2.97 0 0 0 .502 6.186 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.088 2.088C4.308 20.5 12 20.5 12 20.5s7.692 0 9.41-.598a2.97 2.97 0 0 0 2.088-2.088A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.502-5.814z"
                  />
                  <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </button>
              <button className="platform-btn instagram" onClick={() => showToast("Öffnet Instagram")}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" strokeWidth="2" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Instagram
              </button>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/poems" className="btn">
                Alle Poems entdecken
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="section">
        <span className="section-label">Newsflash</span>
        <div className="card">
          <div className="news-item">
            <div className="news-dot"></div>
            <div>
              <h4>Geteilter Himmel auf der Longlist des Young Story Teller Awards 2025</h4>
              <p>Eine großartige Neuigkeit – herzlichen Dank an die Jury!</p>
              <span className="news-date">Juni 2025</span>
            </div>
          </div>
          <div className="news-item">
            <div className="news-dot" style={{ background: "var(--pink)" }}></div>
            <div>
              <h4>Website jetzt online</h4>
              <p>Herzlich willkommen auf zanecharon.de – hier entstehen Geschichten.</p>
              <span className="news-date">2025</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link href="/news" className="btn-ghost">
            Alle News →
          </Link>
        </div>
      </div>
    </div>
  );
}
