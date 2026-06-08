import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-6">
      <main className="w-full max-w-lg text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          SIMC 2027
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900">
          Monorepo starter
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          Next.js + Tailwind on Cloudflare Pages. Hono API on Workers. Supabase
          Auth + Drizzle + Stripe.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        <ul className="mt-12 space-y-2 text-left text-sm text-zinc-500">
          <li>• Frontend: <code className="text-zinc-700">apps/web</code></li>
          <li>• API: <code className="text-zinc-700">apps/api</code> (port 8787)</li>
          <li>• DB schema: <code className="text-zinc-700">packages/db</code></li>
        </ul>
      </main>
    </div>
  );
}
