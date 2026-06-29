# Deploying to Vercel (free Hobby plan, no credit card)

The Next.js app lives in the `web/` subdirectory of this repo. Vercel
auto-detects Next.js — the only thing you must set is the **Root Directory**.

## Steps (≈5 clicks)

1. Go to **https://vercel.com/signup** and sign up with your **GitHub**
   account (the free *Hobby* plan needs no credit card).
2. Click **Add New… → Project** and **Import** the
   `zanecharon-art/zc-website` repository.
3. In the import screen, set:
   - **Root Directory** → `web`  ← important (click *Edit* and pick `web`)
   - **Framework Preset** → *Next.js* (auto-detected)
   - Build/Output settings → leave at defaults
4. *(Optional, see below)* add Environment Variables.
5. Click **Deploy**.

Vercel builds and gives you a live URL like
`https://zc-website-xxxx.vercel.app`. Every push to the deployment branch
redeploys automatically.

## Environment variables

The site **deploys and the full design is viewable without any env vars** —
only login, registration, and checkout stay inactive until real keys are
added. To enable them, add these in **Project → Settings → Environment
Variables** (values from your Supabase/Stripe dashboards) and redeploy:

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | inlined at build time |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | inlined at build time |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only (Stripe webhook) |
| `STRIPE_SECRET_KEY` | server-only |
| `STRIPE_WEBHOOK_SECRET` | server-only |

After adding Supabase, set the redirect URL
`https://<your-app>.vercel.app/auth/callback` in Supabase → Authentication →
URL Configuration. For Stripe, point a webhook at
`https://<your-app>.vercel.app/api/webhooks/stripe`.

## Later: moving to Fly.io

The repo also ships a `Dockerfile` + `fly.toml` (see `FLY_DEPLOY.md`). The
`output: "standalone"` build is gated behind the `BUILD_STANDALONE` env var
(set in the Dockerfile), so it does not affect Vercel builds.
