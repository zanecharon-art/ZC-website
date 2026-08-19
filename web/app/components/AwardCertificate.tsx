"use client";

import { useState } from "react";

/**
 * Displays the Young Storyteller Award Longlist certificate as an image.
 * There is no true copy-protection on the web (any screen can be captured),
 * so this relies on a tiled "zanecharon.de" watermark baked into the image
 * plus mild deterrents: no download link, drag disabled, context menu blocked.
 */
export default function AwardCertificate() {
  const [open, setOpen] = useState(false);

  const guard = {
    draggable: false,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };
  const noSelect: React.CSSProperties = {
    userSelect: "none",
    WebkitUserSelect: "none",
    ...({ WebkitUserDrag: "none" } as React.CSSProperties),
  };

  return (
    <div style={{ marginTop: 18 }}>
      <figure style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Urkunde vergrößern"
          style={{
            padding: 0,
            border: "1px solid var(--gold-brd)",
            borderRadius: 12,
            overflow: "hidden",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow)",
            cursor: "zoom-in",
            maxWidth: 300,
            lineHeight: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/auszeichnungen/ysa-2025-longlist.jpg"
            alt="Urkunde: Longlist des Young Storyteller Award 2025 (story.one & Thalia)"
            width={300}
            style={{ display: "block", width: "100%", height: "auto", ...noSelect }}
            {...guard}
          />
        </button>
        <figcaption style={{ fontSize: 12, color: "var(--txt3)", marginTop: 10, textAlign: "center" }}>
          Longlist · Young Storyteller Award 2025 — story.one &amp; Thalia
        </figcaption>
      </figure>

      {open && (
        <div
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Urkunde in voller Größe"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(30,24,16,.82)",
            backdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/auszeichnungen/ysa-2025-longlist.jpg"
            alt="Urkunde: Longlist des Young Storyteller Award 2025 (story.one & Thalia)"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 20px 60px rgba(0,0,0,.5)",
              ...noSelect,
            }}
            {...guard}
          />
        </div>
      )}
    </div>
  );
}
