# zanecharon.de

Author website for Zane Charon. Next.js 16 (App Router) + Tailwind CSS v4,
Supabase for auth/data, and Stripe for checkout.

## Stack

- **Next.js 16** — App Router, TypeScript
- **Tailwind CSS v4**
- **Supabase** — auth (login/registrieren/profil), Postgres (`purchases` table)
- **Stripe** — Checkout Sessions for chapters, the full-book bundle, and the
  poems download package
- **Vercel** — hosting + CI/CD (recommended; any Next.js host works)

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list. Never commit `.env.local` or any file
with real keys.

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API (server-only, used by the Stripe webhook) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks (signing secret of the endpoint below) |

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL migration in `supabase/migrations/0001_purchases.sql` against
   the project (SQL Editor, or `supabase db push` if you use the Supabase
   CLI). It creates the `purchases` table with row-level security so users
   can only read their own purchases.
3. Under Authentication → URL Configuration, set the **Site URL** and add a
   **Redirect URL** for `<your-domain>/auth/callback` (and
   `http://localhost:3000/auth/callback` for local dev).
4. Enable the auth providers you want (Email, Google, Apple — the login and
   registration pages already call `signInWithOAuth` for both).

## Stripe setup

1. Create a Stripe account and grab the **secret key** (test mode is fine
   for development).
2. Add a webhook endpoint pointing to `<your-domain>/api/webhooks/stripe`,
   subscribed to the `checkout.session.completed` event. Copy its signing
   secret into `STRIPE_WEBHOOK_SECRET`.
3. Checkout Sessions are created on the fly from `lib/products.ts` (no Stripe
   Dashboard products/prices need to be pre-created).
4. To test webhooks locally, use the [Stripe CLI](https://stripe.com/docs/stripe-cli):
   `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

## Deploying

1. Push this repo to GitHub and import it in [Vercel](https://vercel.com/new).
2. Set the **Root Directory** to `web/`.
3. Add all variables from `.env.example` as real values in the Vercel
   project's Environment Variables settings.
4. Deploy. Then:
   - Update the Supabase redirect URL to include the production domain.
   - Update (or add) the Stripe webhook endpoint to point at the production
     domain, and update `STRIPE_WEBHOOK_SECRET` if it changes.

## Scripts

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
