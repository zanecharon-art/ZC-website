export const metadata = {
  title: "Presse — Zane Charon",
};

export default function Presse() {
  return (
    <div className="page">
      <div className="section">
        <span className="section-label">Pressestimmen</span>
        <h2 className="section-title">Was andere über die Werke sagen</h2>

        <div className="award-box">
          <div className="award-icon">🏆</div>
          <div>
            <h3>Longlist · Young Story Teller Award 2025</h3>
            <p>Geteilter Himmel, ausgewählt von einer renommierten Fachjury</p>
          </div>
        </div>

        <div className="grid-2">
          <div className="quote-card">
            <span className="quote-icon" style={{ color: "var(--pink)" }}>❝</span>
            <div className="quote-text">Eine seltene Stimme, die Schwere und Hoffnung im selben Atemzug erzählt.</div>
            <div className="quote-source">— Literaturmagazin · Beispielzitat</div>
          </div>
          <div className="quote-card">
            <span className="quote-icon" style={{ color: "var(--blue)" }}>❝</span>
            <div className="quote-text">Charon schreibt, als würde jeder Satz noch eine zweite Bedeutung tragen.</div>
            <div className="quote-source">— Buchblog · Beispielzitat</div>
          </div>
          <div className="quote-card">
            <span className="quote-icon" style={{ color: "var(--green)" }}>❝</span>
            <div className="quote-text">Ein Debüt mit Tiefgang, das man nicht so schnell vergisst.</div>
            <div className="quote-source">— Regionalzeitung · Beispielzitat</div>
          </div>
          <div
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: 130,
              borderStyle: "dashed",
              opacity: 0.5,
            }}
          >
            <span style={{ fontSize: 20 }}>+</span>
            <p style={{ fontSize: 12, color: "var(--txt4)", marginTop: 6 }}>Weitere Stimmen folgen</p>
          </div>
        </div>

        <div className="media-row">
          <span>Literaturmagazin</span>
          <span>Buchblog</span>
          <span>Regionalzeitung</span>
        </div>

        <div style={{ marginTop: 40 }}>
          <span className="section-label">Leserrezensionen</span>
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

        <div style={{ padding: "24px 0", borderTop: "1px solid var(--brd)", textAlign: "center", marginTop: 32 }}>
          <p style={{ fontSize: 13, color: "var(--txt3)" }}>
            📬 Presseanfragen: <a href="mailto:presse@zanecharon.de">presse@zanecharon.de</a>
          </p>
        </div>
      </div>
    </div>
  );
}
