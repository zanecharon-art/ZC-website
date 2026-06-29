export const metadata = {
  title: "Datenschutz — Zane Charon",
};

export default function Datenschutz() {
  return (
    <div className="page">
      <div className="section" style={{ maxWidth: 720 }}>
        <span className="section-label">Rechtliches</span>
        <h2 className="section-title">Datenschutzerklärung</h2>

        <p style={{ fontSize: 13, color: "var(--txt4)", marginBottom: 24 }}>
          Platzhaltertext — ersetzt keine Rechtsberatung. Vor Veröffentlichung
          bitte mit den tatsächlichen Angaben befüllen und rechtlich prüfen
          lassen.
        </p>

        <h3>1. Verantwortlicher</h3>
        <p>
          [Vor- und Nachname]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ und Ort]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>

        <h3 style={{ marginTop: 28 }}>2. Hosting</h3>
        <p>
          Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Seite
          verarbeitet Vercel technische Zugriffsdaten (z. B. IP-Adresse,
          Zeitpunkt des Zugriffs) zur Bereitstellung und Absicherung des
          Dienstes.
        </p>

        <h3 style={{ marginTop: 28 }}>3. Registrierung und Nutzerkonto</h3>
        <p>
          Für die Erstellung eines Nutzerkontos verarbeiten wir E-Mail-Adresse,
          Nutzername, Geburtsdatum und die von dir angegebenen
          Profilinformationen. Das Geburtsdatum dient ausschließlich der
          Altersverifizierung (Mindestalter 16 Jahre gemäß Art. 8 DSGVO) und
          wird nicht veröffentlicht. Die Authentifizierung und Speicherung
          dieser Daten erfolgt über Supabase (Supabase Inc.) als
          Auftragsverarbeiter.
        </p>

        <h3 style={{ marginTop: 28 }}>4. Zahlungsabwicklung</h3>
        <p>
          Käufe (einzelne Kapitel, Bundles, Download-Pakete) werden über
          Stripe Payments Europe, Ltd. abgewickelt. Im Rahmen des Kaufs
          übermitteln wir die zur Zahlungsabwicklung erforderlichen Daten
          (z. B. E-Mail-Adresse, Kaufbetrag) an Stripe als Auftragsverarbeiter.
          Zahlungsdaten (z. B. Kartennummern) werden ausschließlich von Stripe
          verarbeitet und erreichen unsere Server nicht.
        </p>

        <h3 style={{ marginTop: 28 }}>5. Cookies</h3>
        <p>
          Wir setzen technisch notwendige Cookies ein, um deine Anmeldesitzung
          aufrechtzuerhalten. Diese Cookies werden nicht zu Werbe- oder
          Trackingzwecken verwendet.
        </p>

        <h3 style={{ marginTop: 28 }}>6. Deine Rechte</h3>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung und
          Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie
          ein Recht auf Datenübertragbarkeit. Wende dich dazu an die oben
          genannte E-Mail-Adresse.
        </p>
      </div>
    </div>
  );
}
