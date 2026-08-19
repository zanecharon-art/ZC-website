"use client";

import { useState } from "react";
import { MedalIcon } from "@/app/components/icons";

/**
 * The Longlist award box doubles as a toggle: clicking it reveals the
 * certificate inline, right below. There is no true copy-protection on the
 * web (any screen can be captured), so this relies on a tiled "zanecharon.de"
 * watermark baked into the image plus mild deterrents: no download link,
 * drag disabled, context menu blocked, and the image is hidden until opened.
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
    <div style={{ marginBottom: 28 }}>
      <div
        className="award-box is-toggle"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        style={{ marginBottom: 0 }}
      >
        <div className="award-icon">
          <MedalIcon size={28} />
        </div>
        <div>
          <h3>Longlist · Young Story Teller Award 2025</h3>
          <p>Geteilter Himmel, ausgewählt von einer renommierten Fachjury</p>
        </div>
        <svg
          className={`award-chevron${open ? " open" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {open && (
        <div style={{ animation: "certReveal .3s ease", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/auszeichnungen/ysa-2025-longlist.jpg"
            alt="Urkunde: Longlist des Young Storyteller Award 2025 (story.one & Thalia)"
            style={{
              display: "block",
              width: "100%",
              maxWidth: 340,
              height: "auto",
              borderRadius: 12,
              border: "1px solid var(--gold-brd)",
              boxShadow: "var(--shadow)",
              ...noSelect,
            }}
            {...guard}
          />
          <p style={{ fontSize: 12, color: "var(--txt3)", marginTop: 10, textAlign: "center" }}>
            Urkunde · story.one &amp; Thalia
          </p>
        </div>
      )}
    </div>
  );
}
