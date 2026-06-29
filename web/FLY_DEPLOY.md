# Deploying to Fly.io

The repo is preconfigured for Fly.io: `Dockerfile`, `.dockerignore`, and
`fly.toml` (Next.js `output: "standalone"`). Run everything from the `web/`
directory.

## One-time setup

```bash
# 1. Install the CLI (https://fly.io/docs/flyctl/install/)
curl -L https://fly.io/install.sh | sh

# 2. Log in (opens a browser; creates a free account if you don't have one)
fly auth login

# 3. Create the app from the existing fly.toml (no deploy yet).
#    If the name "zane-charon" is taken, pick another and update fly.toml.
fly launch --no-deploy --copy-config --name zane-charon --region fra
```

## Set the runtime secrets

The site builds and runs with placeholder values, but auth and checkout only
work with real keys. `NEXT_PUBLIC_*` values are baked in **at build time**, so
pass them as build args; the server-only keys are set as Fly secrets.

```bash
# Server-only secrets (runtime)
fly secrets set \
  SUPABASE_SERVICE_ROLE_KEY="..." \
  STRIPE_SECRET_KEY="sk_live_or_test_..." \
  STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Deploy

```bash
# With real public Supabase values inlined into the client bundle:
fly deploy \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://YOUR.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"

# Or, just to see the design live with placeholders (auth/checkout inactive):
fly deploy
```

Fly prints the URL (e.g. `https://zane-charon.fly.dev`). The machine is set to
**scale to zero when idle** (`min_machines_running = 0`), so an unused preview
costs effectively nothing.

## After the first deploy

- Supabase → Authentication → URL Configuration: add
  `https://<app>.fly.dev/auth/callback` as a redirect URL.
- Stripe → Webhooks: point an endpoint at
  `https://<app>.fly.dev/api/webhooks/stripe` and update `STRIPE_WEBHOOK_SECRET`.

## Note on this Claude Code environment

This session's network policy blocks `fly.io` (the egress proxy returns 403),
so `fly deploy` cannot be run from inside the web session. Run the commands
above from your own machine, or recreate the Claude Code environment with a
network policy that allows `fly.io` and `api.fly.io`.
