export type RateLimitStore = "memory" | "upstash";

export type RateLimitConfig = {
  store: RateLimitStore;
  limit: number;
  windowMs: number;
  productionReady: boolean;
  reason: string;
};

const tenMinutes = 10 * 60 * 1000;

const toPositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? "", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getRateLimitConfig = (): RateLimitConfig => {
  const requestedStore = process.env.RATE_LIMIT_STORE === "upstash" ? "upstash" : "memory";
  const hasUpstashCredentials = Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );

  if (requestedStore === "upstash") {
    return {
      store: "upstash",
      limit: toPositiveInt(process.env.ASK_RATE_LIMIT_MAX_REQUESTS, 20),
      windowMs: toPositiveInt(process.env.ASK_RATE_LIMIT_WINDOW_MS, tenMinutes),
      productionReady: hasUpstashCredentials,
      reason: hasUpstashCredentials
        ? "Upstash Redis credentials are configured."
        : "RATE_LIMIT_STORE=upstash requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
    };
  }

  return {
    store: "memory",
    limit: toPositiveInt(process.env.ASK_RATE_LIMIT_MAX_REQUESTS, 20),
    windowMs: toPositiveInt(process.env.ASK_RATE_LIMIT_WINDOW_MS, tenMinutes),
    productionReady: false,
    reason: "In-memory rate limit is for local development and early mock mode only.",
  };
};
