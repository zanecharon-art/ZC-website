"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

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

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
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
      </div>
    </nav>
  );
}
