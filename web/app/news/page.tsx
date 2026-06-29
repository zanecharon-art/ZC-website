export const metadata = {
  title: "News — Zane Charon",
};

export default function News() {
  return (
    <div className="page">
      <div className="section-narrow">
        <span className="section-label">Newsflash</span>
        <h2 className="section-title">Aktuelles</h2>

        <div className="card">
          <div className="news-item">
            <div className="news-dot"></div>
            <div>
              <h4>Geteilter Himmel auf der Longlist des Young Story Teller Awards 2025</h4>
              <p>Eine wunderbare Nachricht: Das Buch wurde von einer renommierten Fachjury für die Longlist ausgewählt. Ein großes Dankeschön an alle Leser:innen!</p>
              <span className="news-date">Juni 2025</span>
            </div>
          </div>
          <div className="news-item">
            <div className="news-dot" style={{ background: "var(--blue)" }}></div>
            <div>
              <h4>Neue Website online</h4>
              <p>Herzlich willkommen auf zanecharon.de — der offiziellen Autorenseite. Hier findet ihr alle Werke, News und bald auch eine Community.</p>
              <span className="news-date">2025</span>
            </div>
          </div>
          <div className="news-item">
            <div className="news-dot" style={{ background: "var(--pink)" }}></div>
            <div>
              <h4>Geteilter Himmel jetzt als Hardcover erhältlich</h4>
              <p>Das Buch ist bei Thalia und Amazon bestellbar. Ideal als Geschenk oder für die eigene Bibliothek.</p>
              <span className="news-date">2024</span>
            </div>
          </div>
          <div className="news-item">
            <div className="news-dot" style={{ background: "var(--green)" }}></div>
            <div>
              <h4>Community-Forum in Planung</h4>
              <p>Bald öffnet ein eigenes Forum für alle, die über Literatur, Schreiben und die Werke von Zane Charon sprechen möchten.</p>
              <span className="news-date">Demnächst</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
