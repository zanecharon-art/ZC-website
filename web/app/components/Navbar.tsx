"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/werke", label: "Werke" },
  { href: "/poems", label: "Poems & Klang" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/blog", label: "Blog" },
  { href: "/presse", label: "Presse" },
  { href: "/news", label: "News" },
  { href: "/community", label: "Community" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Zane Charon
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(pathname, link.href) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="nav-cta">
            Anmelden
          </Link>
        </div>
      </div>
    </nav>
  );
}
