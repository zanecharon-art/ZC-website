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
    <div style={{ marginTop: 12 }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "none",
          border: "none",
          padding: "4px 0",
          font: "inherit",
          fontSize: 13,
          color: "var(--gold)",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: 3,
        }}
      >
        <span aria-hidden="true">🔍</span>
        Urkunde der Longlist-Nominierung ansehen
      </button>

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
