import { BookIcon, MedalIcon, CraneIcon } from "@/app/components/icons";

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
              <BookIcon size={30} />
            </span>
            <span className="stat-value">1</span>
            <span className="stat-label">Veröffentlichter Roman</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" aria-hidden="true">
              <MedalIcon size={30} />
            </span>
            <span className="stat-value" style={{ fontSize: 15 }}>Longlist 2025</span>
            <span className="stat-label">Young Story Teller Award</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon" aria-hidden="true">
              <CraneIcon size={35} />
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
