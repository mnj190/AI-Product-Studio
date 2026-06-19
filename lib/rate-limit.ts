type RateLimitInput = {
  key: string;
  limit: number;
  windowMs: number;
  store?: string;
  productionReady?: boolean;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  store: string;
  productionReady: boolean;
};

const store = new Map<string, RateLimitBucket>();

const getNow = () => Date.now();

export const checkRateLimit = ({
  key,
  limit,
  windowMs,
  store: storeName = "memory",
  productionReady = false,
}: RateLimitInput): RateLimitResult => {
  const now = getNow();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt,
      store: storeName,
      productionReady,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
      store: storeName,
      productionReady,
    };
  }

  current.count += 1;

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
    store: storeName,
    productionReady,
  };
};

export const getClientRateLimitKey = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "anonymous";
};
