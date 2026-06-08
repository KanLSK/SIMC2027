import { createMiddleware } from "hono/factory";
import { createClient } from "@supabase/supabase-js";
import type { Env } from "../env";

export type AuthVariables = {
  userId: string;
  accessToken: string;
};

export const requireAuth = createMiddleware<{
  Bindings: Env;
  Variables: AuthVariables;
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.slice(7);
  const supabase = createClient(
    c.env.SUPABASE_URL,
    c.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return c.json({ error: "Invalid token" }, 401);
  }

  c.set("userId", data.user.id);
  c.set("accessToken", token);
  await next();
});
