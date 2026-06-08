import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiHealth } from "@simc/shared";
import type { Env } from "./env";
import { profileRoutes } from "./routes/profile";
import { stripeRoutes } from "./routes/stripe";

const app = new Hono<{ Bindings: Env }>();

app.use(
  "*",
  cors({
    origin: (origin) => origin ?? "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.get("/health", (c) => {
  const body: ApiHealth = {
    ok: true,
    service: "simc-api",
    timestamp: new Date().toISOString(),
  };
  return c.json(body);
});

app.route("/profile", profileRoutes);
app.route("/stripe", stripeRoutes);

export default app;
