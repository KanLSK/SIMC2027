import { createClient } from "@/utils/supabase/client";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const res = await fetch(`${apiBase}${path}`, { ...init, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(
      typeof err === "object" && err && "error" in err
        ? String((err as { error: string }).error)
        : "API request failed",
    );
  }
  return res.json() as Promise<T>;
}
