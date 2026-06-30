import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileTabs from "./ProfileTabs";

export const metadata = {
  title: "Profil — Zane Charon",
};

export default async function Profil() {
  // No Supabase credentials configured → no session possible; send to login
  // instead of crashing the server client (e.g. a preview deploy without keys).
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const username = user.user_metadata?.username || "leser_beispiel";
  const status = user.user_metadata?.status || "„Lesen ist Reisen ohne Koffer.“";

  return (
    <div className="page">
      <div className="section">
        <div className="profile-header">
          <div className="profile-avatar">🕊️</div>
          <div>
            <div className="profile-name">{username}</div>
            <div className="profile-status">{status}</div>
            <div className="profile-badge">✓ Verifiziertes Mitglied</div>
          </div>
        </div>

        <Suspense>
          <ProfileTabs user={user} />
        </Suspense>
      </div>
    </div>
  );
}
