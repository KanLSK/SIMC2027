import { Hono } from "hono";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { createDb, profiles } from "@simc/db";
import type { Env } from "../env";
import type { AuthVariables } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";

export const stripeRoutes = new Hono<{
  Bindings: Env;
  Variables: AuthVariables;
}>();

stripeRoutes.post("/checkout", requireAuth, async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });

  const body = await c.req.json<{
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }>();
  const userId = c.get("userId");
  const db = createDb(c.env.DATABASE_URL);

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  let customerId = profile?.stripeCustomerId ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { supabaseUserId: userId },
    });
    customerId = customer.id;
    await db
      .update(profiles)
      .set({ stripeCustomerId: customerId, updatedAt: new Date() })
      .where(eq(profiles.id, userId));
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    line_items: [{ price: body.priceId, quantity: 1 }],
    success_url: body.successUrl,
    cancel_url: body.cancelUrl,
    metadata: { supabaseUserId: userId },
  });

  return c.json({ url: session.url });
});

stripeRoutes.post("/webhook", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });

  const signature = c.req.header("stripe-signature");
  if (!signature) {
    return c.json({ error: "Missing signature" }, 400);
  }

  const rawBody = await c.req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      c.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return c.json({ error: "Invalid signature" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      break;
    default:
      break;
  }

  return c.json({ received: true });
});
