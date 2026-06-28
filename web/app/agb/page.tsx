export const metadata = {
  title: "AGB — Zane Charon",
};

export default function AGB() {
  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 720 }}>
        <span className="section-label">Rechtliches</span>
        <h2 className="section-title">Allgemeine Geschäftsbedingungen</h2>

        <p style={{ fontSize: 13, color: "var(--txt4)", marginBottom: 24 }}>
          Platzhaltertext — ersetzt keine Rechtsberatung. Vor Veröffentlichung
          bitte mit den tatsächlichen Angaben befüllen und rechtlich prüfen
          lassen.
        </p>

        <h3>1. Geltungsbereich</h3>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für den Erwerb
          digitaler Inhalte (einzelne Kapitel, Kapitel-Bundles,
          Download-Pakete) über diese Website durch registrierte Nutzer.
        </p>

        <h3 style={{ marginTop: 28 }}>2. Vertragsgegenstand</h3>
        <p>
          Vertragsgegenstand ist die Bereitstellung digitaler Leseinhalte und
          Audiodateien zum dauerhaften Abruf über das Nutzerkonto. Es handelt
          sich nicht um den Verkauf physischer Datenträger.
        </p>

        <h3 style={{ marginTop: 28 }}>3. Preise und Zahlung</h3>
        <p>
          Alle Preise verstehen sich in Euro. Die Zahlungsabwicklung erfolgt
          über Stripe. Mit Abschluss des Checkouts wird der Kaufpreis fällig.
        </p>

        <h3 style={{ marginTop: 28 }}>4. Widerrufsrecht</h3>
        <p>
          Bei Verträgen über digitale Inhalte, die nicht auf einem
          körperlichen Datenträger geliefert werden, erlischt das
          Widerrufsrecht, wenn du ausdrücklich zugestimmt hast, dass wir mit
          der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnen,
          und du deine Kenntnis davon bestätigt hast, dass du durch deine
          Zustimmung dein Widerrufsrecht verlierst (§ 356 Abs. 5 BGB).
        </p>

        <h3 style={{ marginTop: 28 }}>5. Nutzungsrechte</h3>
        <p>
          Mit dem Kauf erhältst du ein einfaches, nicht übertragbares Recht
          zur privaten Nutzung der erworbenen Inhalte. Eine Weitergabe,
          öffentliche Wiedergabe oder gewerbliche Nutzung ist nicht gestattet.
        </p>

        <h3 style={{ marginTop: 28 }}>6. Haftung</h3>
        <p>
          Wir haften unbeschränkt für Schäden aus der Verletzung des Lebens,
          des Körpers oder der Gesundheit sowie bei Vorsatz und grober
          Fahrlässigkeit. Für leicht fahrlässig verursachte Schäden haften
          wir nur bei Verletzung einer wesentlichen Vertragspflicht und
          begrenzt auf den vorhersehbaren Schaden.
        </p>

        <h3 style={{ marginTop: 28 }}>7. Schlussbestimmungen</h3>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine
          Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der
          übrigen Bestimmungen unberührt.
        </p>
      </div>
    </div>
  );
}
