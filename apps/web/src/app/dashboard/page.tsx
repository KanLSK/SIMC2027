import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Profile } from "@simc/shared";
import { serverApiFetch } from "@/lib/api-server";
import DashboardClient from "./DashboardClient";

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
  try {
    profile = await serverApiFetch<Profile>("/profile/me");
  } catch {
    // profile may not exist yet — fallback to email
  }

  const displayName = profile?.fullName ?? user.email?.split("@")[0] ?? "ผู้สมัคร";
  const applicantNo = "SIMC27-" + user.id.slice(0, 4).toUpperCase();

  return (
    <DashboardClient
      displayName={displayName}
      applicantNo={applicantNo}
      email={user.email ?? ""}
    />
  );
}
