import { createClient } from "@supabase/supabase-js";

// Service-role client for trusted server contexts only (e.g. the Stripe
// webhook), where there is no end-user session to authenticate as.
export function createAdminClient() {
  return createClient(
    (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim(),
    (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim(),
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
