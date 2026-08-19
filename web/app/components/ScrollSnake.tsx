"use client";

import { useEffect, useState } from "react";

/**
 * A slender snake on the right edge that glides downward as the page is
 * scrolled — a symbol of the flow of life. It follows scroll progress
 * (0 at top → 1 at bottom) and slithers gently in place.
 */
export default function ScrollSnake() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="scroll-snake"
      aria-hidden="true"
      style={{ top: `calc(14vh + ${progress} * 62vh)`, opacity: progress > 0.985 ? 0 : 0.9 }}
    >
      <svg width="26" height="76" viewBox="0 0 26 76" fill="none">
        <path
          className="scroll-snake-body"
          d="M13 5 C 5 12, 21 18, 13 25 C 5 32, 21 38, 13 45 C 6 50, 20 55, 13 61"
          stroke="var(--gold)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="13" cy="64.5" rx="4.6" ry="4.1" fill="var(--gold)" />
        <circle cx="11.1" cy="64.4" r="0.8" fill="var(--bg)" />
        <circle cx="14.9" cy="64.4" r="0.8" fill="var(--bg)" />
        <path
          className="scroll-snake-tongue"
          d="M13 68.4 L13 71.4 M13 71.4 L11.7 72.9 M13 71.4 L14.3 72.9"
          stroke="var(--pink)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
