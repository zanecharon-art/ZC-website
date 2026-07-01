# Deploying to Render (free plan, no credit card, works from a phone)

The repo ships a `render.yaml` Blueprint at its root, so Render can deploy the
Next.js app in `web/` with almost no manual settings. Everything below can be
done from a mobile browser.

## Steps

1. Go to **https://render.com** and sign up with your **GitHub** account.
2. Tap **New → Blueprint**.
3. Connect / pick the **`zanecharon-art/zc-website`** repository.
4. Render reads `render.yaml` and shows a service named **zane-charon**
   (Free plan, Frankfurt). Tap **Apply** / **Create**.
5. Wait for the build (a few minutes). Render then gives a URL like
   **`https://zane-charon.onrender.com`**.

Because it is a brand-new domain, your phone's Safari has no old cache for it,
so the site loads fresh.

## Good to know

- The **free plan sleeps after ~15 min of inactivity**; the next visit takes
  ~30 s to wake up, then it's fast again.
- The **full design is viewable without any keys**. Login, registration, and
  checkout activate once you add real credentials under the service's
  **Environment** tab (same variables as in `VERCEL_DEPLOY.md`):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Config reference (`render.yaml`)

- `rootDir: web` — the app lives in the `web/` subfolder.
- `buildCommand: npm install && npm run build`
- `startCommand: npm start` (`next start`, binds to Render's `PORT`).
- `healthCheckPath: /`
