"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AmbientBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (pathname !== "/") {
      setVisible(false);
      setPlaying(false);
    } else {
      setDismissed(false);
    }
  }

  useEffect(() => {
    function checkTrigger() {
      if (dismissed || pathname !== "/") return;
      const el = document.querySelector(".poems-player-wrap");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) {
        setVisible(true);
      }
    }
    checkTrigger();
    window.addEventListener("scroll", checkTrigger, { passive: true });
    return () => window.removeEventListener("scroll", checkTrigger);
  }, [pathname, dismissed]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          const next = Math.min(p + 0.25, 100);
          if (next >= 100) {
            setPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  function close() {
    setVisible(false);
    setDismissed(true);
    setPlaying(false);
  }

  const classes = ["ambient-bar", visible && "visible", playing && "playing"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} id="ambient-bar">
      <div className="ambient-bar-inner">
        <div className="ambient-waves">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="ambient-info">
          <span className="ambient-label">Poems & Klang</span>
          <span className="ambient-track">Stille vor dem Riss — Poem I</span>
        </div>
        <button className="ambient-play" onClick={() => setPlaying((p) => !p)}>
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="4" height="10" rx="1" fill="currentColor" />
              <rect x="8" y="2" width="4" height="10" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2 L12 7 L3 12 Z" fill="currentColor" />
            </svg>
          )}
          <span>{playing ? "Pausieren" : "Jetzt reinhören"}</span>
        </button>
        <Link href="/poems" className="ambient-goto">
          Alle Poems →
        </Link>
        <button className="ambient-close" onClick={close} aria-label="Schließen">
          ✕
        </button>
      </div>
      <div className="ambient-progress">
        <div className="ambient-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
