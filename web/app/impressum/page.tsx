export const metadata = {
  title: "Impressum — Zane Charon",
};

export default function Impressum() {
  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 720 }}>
        <span className="section-label">Rechtliches</span>
        <h2 className="section-title">Impressum</h2>

        <p style={{ fontSize: 13, color: "var(--txt4)", marginBottom: 24 }}>
          Platzhaltertext — ersetzt keine Rechtsberatung. Vor Veröffentlichung
          bitte mit den tatsächlichen Angaben befüllen und rechtlich prüfen
          lassen.
        </p>

        <h3>Angaben gemäß § 5 TMG</h3>
        <p>
          [Vor- und Nachname]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ und Ort]
          <br />
          [Land]
        </p>

        <h3 style={{ marginTop: 28 }}>Kontakt</h3>
        <p>
          E-Mail: [E-Mail-Adresse]
          <br />
          Telefon: [Telefonnummer]
        </p>

        <h3 style={{ marginTop: 28 }}>Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV</h3>
        <p>
          [Vor- und Nachname]
          <br />
          [Anschrift wie oben]
        </p>

        <h3 style={{ marginTop: 28 }}>Streitschlichtung</h3>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle nicht verpflichtet und nicht
          bereit.
        </p>
      </div>
    </div>
  );
}
