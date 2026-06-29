"use client";

import { showToast } from "@/lib/toast";

export default function Blog() {
  return (
    <div className="page">
      <div className="section-narrow">
        <span className="section-label">Blog</span>
        <h2 className="section-title">Gedanken, Werkstatt, Einblicke</h2>

        <div className="blog-card">
          <span className="blog-tag">Werkstattbericht</span>
          <h3>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast("Blog-Artikel öffnet sich…");
              }}
            >
              Warum ich über das Scheitern schreibe
            </a>
          </h3>
          <p className="blog-excerpt">
            Jeder gute Satz beginnt mit einem schlechten. Oder mit zehn. Über die Notwendigkeit des Durcharbeitens, das Vertrauen in den Prozess und warum ich meine ersten Entwürfe nie wegwerfe.
          </p>
          <div className="blog-meta">12. Juni 2025 · 5 Min. Lesezeit</div>
        </div>

        <div className="blog-card">
          <span className="blog-tag">Über das Schreiben</span>
          <h3>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast("Blog-Artikel öffnet sich…");
              }}
            >
              Der Kranich als Motiv — was Origami mit Hoffnung zu tun hat
            </a>
          </h3>
          <p className="blog-excerpt">
            Ein gefalteter Kranich ist ein Versprechen. In der japanischen Mythologie bringt er Wünsche in Erfüllung — wenn man tausend davon faltet. Mein Roman ist kein Wunsch, aber er ist ein Versuch.
          </p>
          <div className="blog-meta">3. Mai 2025 · 7 Min. Lesezeit</div>
        </div>

        <div className="blog-card">
          <span className="blog-tag">Lesestoff</span>
          <h3>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showToast("Blog-Artikel öffnet sich…");
              }}
            >
              5 Bücher, die mich als Autor geformt haben
            </a>
          </h3>
          <p className="blog-excerpt">
            Nicht die berühmtesten, nicht die meistgelobten. Aber die, bei denen ich nach dem Lesen dachte: So will ich auch schreiben. Oder: So werde ich niemals schreiben. Beides lehrreich.
          </p>
          <div className="blog-meta">18. März 2025 · 6 Min. Lesezeit</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button className="btn-ghost" onClick={() => showToast("Weitere Artikel werden geladen…")}>
            Weitere Artikel laden
          </button>
        </div>
      </div>
    </div>
  );
}
