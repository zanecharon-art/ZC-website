export const metadata = {
  title: "Über mich — Zane Charon",
};

export default function UeberMich() {
  return (
    <div className="page">
      <div className="section">
        <div className="about-banner">
          <div className="about-banner-bg"></div>
          <div className="about-banner-overlay"></div>
          <div className="about-banner-deco">✦</div>
          <div className="about-banner-flowers">🌸 🌸 🌸</div>
          <div className="about-banner-content">
            <span className="eyebrow">Über mich</span>
            <h1>Zane Charon</h1>
            <p>
              Ich schreibe über das, was zwischen Licht und Schatten liegt — über Risse, die nicht ausschließlich zerstören, sondern manchmal auch Raum für etwas Neues schaffen. Meine Geschichten sind selten leicht, aber sie wollen niemals hoffnungslos sein.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8.5C13.5 6.8 10.4 6.2 6.5 6.5 5.7 6.56 5 7.24 5 8.05V22.9c0 .86.78 1.5 1.6 1.42C10.3 24 13.6 24.6 16 26.2" />
                <path d="M16 8.5c2.5-1.7 5.6-2.3 9.5-2 .8.06 1.5.74 1.5 1.55V22.9c0 .86-.78 1.5-1.6 1.42C21.7 24 18.4 24.6 16 26.2" />
                <path d="M16 8.5V26.2" />
              </svg>
            </span>
            <span className="stat-value">1</span>
            <span className="stat-label">Veröffentlichter Roman</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="12" r="7.5" />
                <path d="M16 8.3l1.35 2.9 3.15.35-2.35 2.15.65 3.1L16 17.2l-2.8 1.6.65-3.1-2.35-2.15 3.15-.35z" />
                <path d="M13 18.8 11 28l5-3 5 3-2-9.2" />
              </svg>
            </span>
            <span className="stat-value" style={{ fontSize: 15 }}>Longlist 2025</span>
            <span className="stat-label">Young Story Teller Award</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" aria-hidden="true">
              <svg width="35" height="35" viewBox="0 0 32 32" fill="none" stroke="var(--gold)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8.5 12.5 15 17 5 21.5 16 30 11 18.5 18 16 27 11.5 15.8Z" />
                <path d="M12.5 15 16 20" opacity="0.5" />
              </svg>
            </span>
            <span className="stat-value" style={{ fontSize: 15 }}>Seit 2023</span>
            <span className="stat-label">Auf der Suche nach Worten</span>
          </div>
        </div>

        <div className="card" style={{ marginTop: 0 }}>
          <p style={{ lineHeight: 1.9, fontSize: 15, color: "var(--txt2)" }}>
            Literarische Fiktion ist für mich kein Genre, sondern eine Haltung. Eine Weigerung, die Dinge einfacher zu machen, als sie sind. In meinen Texten darf es eng werden, still, manchmal auch dunkel — aber immer mit der leisen Überzeugung, dass das Schreiben selbst schon ein Akt der Hoffnung ist.
          </p>
          <p style={{ lineHeight: 1.9, fontSize: 15, color: "var(--txt2)", marginTop: 16 }}>
            <em style={{ color: "var(--txt)", fontFamily: "var(--serif)" }}>&quot;Geteilter Himmel&quot;</em> war mein erstes Buch. Es war auch das ehrlichste. Und ich bin froh, dass es seinen Weg in die Welt gefunden hat.
          </p>
        </div>

        <div style={{ marginTop: 40 }}>
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
        </div>
      </div>
    </div>
  );
}
