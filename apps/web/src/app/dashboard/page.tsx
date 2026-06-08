import Link from "next/link";
import { redirect } from "next/navigation";
import type { Profile } from "@simc/shared";
import { serverApiFetch } from "@/lib/api-server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  let profile: Profile | null = null;
  let profileError: string | null = null;

  try {
    profile = await serverApiFetch<Profile>("/profile/me");
  } catch (e) {
    profileError = e instanceof Error ? e.message : "Could not load profile";
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
      <p className="mt-2 text-zinc-600">Signed in as {user.email}</p>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          API profile
        </h2>
        {profile ? (
          <pre className="mt-3 overflow-auto rounded-lg bg-zinc-50 p-4 text-sm text-zinc-800">
            {JSON.stringify(profile, null, 2)}
          </pre>
        ) : (
          <p className="mt-3 text-sm text-amber-700">
            {profileError ??
              "No profile row yet. Run the Supabase trigger SQL in packages/db/supabase/profile-trigger.sql after migrating."}
          </p>
        )}
      </section>

      <Link
        href="/auth/signout"
        className="mt-8 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        Sign out
      </Link>

      <p className="mt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
    </div>
  );
}
