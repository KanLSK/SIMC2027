# SIMC 2027

Monorepo starter for the stack below.

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend API | Hono on Cloudflare Workers |
| Auth | Supabase Auth |
| ORM | Drizzle → Supabase Postgres |
| Hosting | Cloudflare Pages (web) + Workers (api) |
| Payments | Stripe |

## Structure

```
apps/
  web/     # Next.js frontend
  api/     # Hono worker (Wrangler)
packages/
  db/      # Drizzle schema & migrations
  shared/  # Shared types
```

## Quick start

### 1. Install

```bash
pnpm install
```

### 2. Environment

```bash
cp .env.example apps/web/.env.local
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

Fill in values from [Supabase](https://supabase.com/dashboard) (Project Settings → API & Database) and [Stripe](https://dashboard.stripe.com/apikeys).

| Variable | Where |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → API |
| `DATABASE_URL` | Supabase → Database → Connection string (Transaction pooler) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → API (server only) |
| `STRIPE_SECRET_KEY` / webhook secret | Stripe dashboard |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8787` in dev |

### 3. Database

```bash
# from repo root, with DATABASE_URL set
pnpm db:generate
pnpm db:migrate
```

In the Supabase SQL editor, run [`packages/db/supabase/profile-trigger.sql`](packages/db/supabase/profile-trigger.sql) so new sign-ups get a `profiles` row.

### 4. Run locally

```bash
pnpm dev
```

- Web: http://localhost:3000  
- API: http://localhost:8787/health  

### 5. Deploy

**API (Worker)**

```bash
cd apps/api
pnpm wrangler secret put DATABASE_URL
pnpm wrangler secret put SUPABASE_URL
pnpm wrangler secret put SUPABASE_SERVICE_ROLE_KEY
pnpm wrangler secret put STRIPE_SECRET_KEY
pnpm wrangler secret put STRIPE_WEBHOOK_SECRET
pnpm deploy
```

**Web (Cloudflare Pages via OpenNext)**

```bash
cd apps/web
pnpm deploy
```

Point `NEXT_PUBLIC_API_URL` at your deployed Worker URL in Cloudflare Pages environment variables.

## Stripe checkout (example)

Authenticated client:

```ts
import { apiFetch } from "@/lib/api";

const { url } = await apiFetch<{ url: string }>("/stripe/checkout", {
  method: "POST",
  body: JSON.stringify({
    priceId: "price_xxx",
    successUrl: "https://yoursite.com/success",
    cancelUrl: "https://yoursite.com/cancel",
  }),
});
window.location.href = url!;
```

Register the webhook URL `https://<worker>/stripe/webhook` in Stripe.
