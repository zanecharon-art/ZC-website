import { createBrowserClient } from "@supabase/ssr";

function clean(value: string | undefined) {
  return (value ?? "").trim();
}

function supabaseUrl() {
  return clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

function supabaseAnonKey() {
  return clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// True only when both public Supabase values are present AND the URL is valid.
// Trimming + validating here means a stray space or newline from copy-paste
// can't crash the browser client (which would take the whole page down).
export function isSupabaseConfigured() {
  const url = supabaseUrl();
  if (!url || !supabaseAnonKey()) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function createClient() {
  return createBrowserClient(supabaseUrl(), supabaseAnonKey());
}
