#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const envFiles = [".env", ".env.local"]
  .map((file) => path.join(root, file))
  .filter((file) => fs.existsSync(file));

const parseEnvFile = (file) => {
  const entries = {};
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const rawValue = trimmed.slice(index + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    entries[key] = value;
  }

  return entries;
};

const fileEnv = envFiles.reduce(
  (acc, file) => ({ ...acc, ...parseEnvFile(file) }),
  {},
);

const getEnv = (key) => process.env[key] ?? fileEnv[key] ?? "";
const getEnvWithDefault = (key, fallback) => getEnv(key) || fallback;
const hasEnv = (key) => getEnv(key).trim().length > 0;

const vercelEnv = getEnv("VERCEL_ENV") || "local";
const askMode = getEnv("ASK_API_MODE") || "mock";
const rateLimitStore = getEnv("RATE_LIMIT_STORE") || "memory";
const provider = getEnv("LLM_PROVIDER") || "openai";
const rateLimitMaxRequests = getEnvWithDefault("ASK_RATE_LIMIT_MAX_REQUESTS", "20");
const rateLimitWindowMs = getEnvWithDefault("ASK_RATE_LIMIT_WINDOW_MS", "600000");

const checks = [
  {
    label: "Production must stay mock",
    ok: !(vercelEnv === "production" && askMode === "real"),
    detail:
      vercelEnv === "production" && askMode === "real"
        ? "VERCEL_ENV=production with ASK_API_MODE=real is not allowed yet."
        : "Production real mode is not enabled.",
    level: "error",
  },
  {
    label: "Preview real mode has provider config",
    ok: askMode !== "real" || (hasEnv("LLM_MODEL") && hasEnv("LLM_API_KEY")),
    detail:
      askMode === "real"
        ? "Real mode needs LLM_MODEL and LLM_API_KEY."
        : "Mock mode does not need provider credentials.",
    level: "error",
  },
  {
    label: "Preview real mode uses persistent rate limit",
    ok: askMode !== "real" || rateLimitStore === "upstash",
    detail:
      askMode === "real"
        ? "Real mode should use RATE_LIMIT_STORE=upstash."
        : "Mock mode can use memory rate limit.",
    level: "error",
  },
  {
    label: "Upstash credentials exist when selected",
    ok:
      rateLimitStore !== "upstash" ||
      (hasEnv("UPSTASH_REDIS_REST_URL") &&
        hasEnv("UPSTASH_REDIS_REST_TOKEN")),
    detail:
      rateLimitStore === "upstash"
        ? "Upstash store needs UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
        : "Upstash is not selected.",
    level: "error",
  },
  {
    label: "Preview environment is explicit",
    ok: askMode !== "real" || vercelEnv === "preview",
    detail:
      askMode === "real"
        ? "First real mode target should be VERCEL_ENV=preview."
        : "Mock mode can run locally.",
    level: "warning",
  },
  {
    label: "Rate limit values are configured",
    ok: Boolean(rateLimitMaxRequests && rateLimitWindowMs),
    detail: "Uses explicit values when present, otherwise app defaults: 20 / 600000ms.",
    level: "warning",
  },
];

const status = (ok) => (ok ? "ok" : "needs-attention");

const summary = {
  vercelEnv,
  askMode,
  provider,
  modelConfigured: hasEnv("LLM_MODEL"),
  apiKeyConfigured: hasEnv("LLM_API_KEY"),
  rateLimitStore,
  upstashUrlConfigured: hasEnv("UPSTASH_REDIS_REST_URL"),
  upstashTokenConfigured: hasEnv("UPSTASH_REDIS_REST_TOKEN"),
  rateLimitMaxRequests,
  rateLimitWindowMs,
  envFilesLoaded: envFiles.map((file) => path.relative(root, file)),
};

const errors = checks.filter((check) => !check.ok && check.level === "error");
const warnings = checks.filter((check) => !check.ok && check.level === "warning");

console.log("Ask About Me Preview Environment Check");
console.log("======================================");
console.log("");
console.log("Summary");
console.log(JSON.stringify(summary, null, 2));
console.log("");
console.log("Checks");

for (const check of checks) {
  const icon = check.ok ? "✓" : check.level === "error" ? "✗" : "!";
  console.log(`${icon} ${check.label}: ${status(check.ok)}`);
  console.log(`  ${check.detail}`);
}

console.log("");

if (errors.length > 0) {
  console.log(`Result: failed (${errors.length} error${errors.length === 1 ? "" : "s"})`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.log(
    `Result: passed with ${warnings.length} warning${warnings.length === 1 ? "" : "s"}`,
  );
  process.exit(0);
}

console.log("Result: passed");
