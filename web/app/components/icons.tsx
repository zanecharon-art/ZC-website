"use client";

import { useId } from "react";
import type { CSSProperties } from "react";

type IconProps = {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

/* ── Gold line icons ── */

export function BookIcon({ size = 30, stroke = "var(--gold)", strokeWidth = 1.5, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M16 8.5C13.5 6.8 10.4 6.2 6.5 6.5 5.7 6.56 5 7.24 5 8.05V22.9c0 .86.78 1.5 1.6 1.42C10.3 24 13.6 24.6 16 26.2" />
      <path d="M16 8.5c2.5-1.7 5.6-2.3 9.5-2 .8.06 1.5.74 1.5 1.55V22.9c0 .86-.78 1.5-1.6 1.42C21.7 24 18.4 24.6 16 26.2" />
      <path d="M16 8.5V26.2" />
    </svg>
  );
}

export function MedalIcon({ size = 30, stroke = "var(--gold)", strokeWidth = 1.5, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="16" cy="12" r="7.5" />
      <path d="M16 8.3l1.35 2.9 3.15.35-2.35 2.15.65 3.1L16 17.2l-2.8 1.6.65-3.1-2.35-2.15 3.15-.35z" />
      <path d="M13 18.8 11 28 16 25 21 28 19 18.8" />
    </svg>
  );
}

export function CraneIcon({ size = 35, stroke = "var(--gold)", strokeWidth = 1.7, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 8.5 12.5 15 17 5 21.5 16 30 11 18.5 18 16 27 11.5 15.8Z" />
      <path d="M12.5 15 16 20" opacity={0.5} />
    </svg>
  );
}

/* ── Brand icons ── */

export function AppleMusicIcon({ size = 15, className, style }: IconProps) {
  const gid = "am-" + useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style}>
      <defs>
        <linearGradient id={gid} x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FA233B" />
          <stop offset="1" stopColor="#FB5C74" />
        </linearGradient>
      </defs>
      <path fill={`url(#${gid})`} d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
    </svg>
  );
}

export function InstagramIcon({ size = 15, className, style }: IconProps) {
  const gid = "ig-" + useId().replace(/:/g, "");
  const stroke = `url(#${gid})`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <defs>
        <linearGradient id={gid} x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke={stroke} strokeWidth="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke={stroke} strokeWidth="2" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function YouTubeIcon({ size = 22, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style}>
      <path fill="#FF0000" d="M23.498 6.186a2.97 2.97 0 0 0-2.088-2.088C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.41.598A2.97 2.97 0 0 0 .502 6.186 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .502 5.814 2.97 2.97 0 0 0 2.088 2.088C4.308 20.5 12 20.5 12 20.5s7.692 0 9.41-.598a2.97 2.97 0 0 0 2.088-2.088A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.502-5.814z" />
      <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* X (Twitter) — inherits color via currentColor */
export function XIcon({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* Envelope (newsletter) — line, inherits color via currentColor */
export function EnvelopeIcon({ size = 19, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13 20.5 6.5" />
    </svg>
  );
}
