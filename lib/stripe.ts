import Stripe from "stripe";
import { env } from "./env";

// Use a dummy key during build time if STRIPE_SECRET_KEY is not set
const stripeSecretKey = env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
});
