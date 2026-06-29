"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function subscribeNoop() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

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
          {user ? (
            <>
              <Link href="/profil" className={isActive(pathname, "/profil") ? "active" : ""}>
                Profil
              </Link>
              <button onClick={handleSignOut} className="nav-cta">
                Abmelden
              </button>
            </>
          ) : (
            <Link href="/login" className="nav-cta">
              Anmelden
            </Link>
          )}
        </div>
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mounted &&
        createPortal(
          <div className={`nav-mobile-overlay${menuOpen ? " open" : ""}`}>
            <div className="nav-mobile-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(pathname, link.href) ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/profil"
                    className={isActive(pathname, "/profil") ? "active" : ""}
                    onClick={() => setMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <button onClick={handleSignOut} className="nav-cta">
                    Abmelden
                  </button>
                </>
              ) : (
                <Link href="/login" className="nav-cta" onClick={() => setMenuOpen(false)}>
                  Anmelden
                </Link>
              )}
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
}
