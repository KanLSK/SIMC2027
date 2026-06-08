import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { createDb, profiles } from "@simc/db";
import type { Env } from "../env";
import type { AuthVariables } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";

export const profileRoutes = new Hono<{
  Bindings: Env;
  Variables: AuthVariables;
}>();

profileRoutes.get("/me", requireAuth, async (c) => {
  const userId = c.get("userId");
  const db = createDb(c.env.DATABASE_URL);

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  if (!profile) {
    return c.json({ error: "Profile not found" }, 404);
  }

  return c.json({
    id: profile.id,
    email: profile.email,
    fullName: profile.fullName,
    stripeCustomerId: profile.stripeCustomerId,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
  });
});
