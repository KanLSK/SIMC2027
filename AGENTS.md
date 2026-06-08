<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SIMC 2027 monorepo

## Layout

| Path | Stack |
|------|--------|
| `apps/web` | Next.js 16, TypeScript, Tailwind 4, Supabase Auth, Cloudflare Pages (OpenNext) |
| `apps/api` | Hono, Cloudflare Workers, Stripe, Drizzle |
| `packages/db` | Drizzle ORM schema + migrations (Supabase Postgres) |
| `packages/shared` | Shared TypeScript types |

## Commands

```bash
pnpm install
pnpm dev              # web :3000 + api :8787 (turbo)
pnpm --filter @simc/api dev
pnpm --filter @simc/web dev
```

Copy `.env.example` → `apps/web/.env.local` and `apps/api/.dev.vars`.

## Database

1. Set `DATABASE_URL` in root `.env` (or export for drizzle-kit).
2. `pnpm db:generate` then `pnpm db:migrate`
3. Run `packages/db/supabase/profile-trigger.sql` in Supabase SQL Editor.
