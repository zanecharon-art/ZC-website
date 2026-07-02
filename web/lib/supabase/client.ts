import { createBrowserClient } from "@supabase/ssr";

// True only when the public Supabase env vars were present at build time
// (they are inlined into the client bundle). Guards client-side callers so a
// keyless preview deploy doesn't crash in the browser.
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
