#!/usr/bin/env node

const input = process.argv[2] || process.env.ASK_BASE_URL || process.env.PREVIEW_URL || "";

const usage = `Usage:
  npm run check:ask-url -- http://127.0.0.1:3001
  npm run check:ask-url -- https://your-preview-url.vercel.app

This smoke test only calls safe GET endpoints. It does not send user questions or trigger provider answer generation.`;

if (!input || input === "--help" || input === "-h") {
  console.log(usage);
  process.exit(0);
}

const normalizeBaseUrl = (value) => {
  try {
    const url = new URL(value);
    url.pathname = url.pathname.replace(/\/+$/, "");
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    throw new Error(`Invalid URL: ${value}`);
  }
};

const baseUrl = normalizeBaseUrl(input);
const timeoutMs = Number.parseInt(process.env.SMOKE_TEST_TIMEOUT_MS || "10000", 10);

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "user-agent": "ai-product-studio-smoke-test",
        ...(options.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
};

const checks = [];

const addCheck = (label, ok, detail, level = "error") => {
  checks.push({ label, ok, detail, level });
};

const readTextPreview = async (response) => {
  const text = await response.text();
  return text.replace(/\s+/g, " ").slice(0, 160);
};

console.log("Ask About Me URL Smoke Test");
console.log("===========================");
console.log("");
console.log(`Base URL: ${baseUrl}`);
console.log("");

let apiJson = null;

try {
  const response = await fetchWithTimeout(`${baseUrl}/api/ask`);
  addCheck("GET /api/ask returns 200", response.ok, `HTTP ${response.status}`);

  if (response.ok) {
    apiJson = await response.json();
    addCheck(
      "API exposes mode metadata",
      typeof apiJson.mode === "string",
      `mode=${apiJson.mode ?? "(missing)"}`,
    );
    addCheck(
      "API exposes rate limit store metadata",
      typeof apiJson.limits?.rateLimitStore === "string",
      `rateLimitStore=${apiJson.limits?.rateLimitStore ?? "(missing)"}`,
    );
    addCheck(
      "Real mode does not use memory rate limit",
      apiJson.mode !== "real" || apiJson.limits?.rateLimitStore === "upstash",
      `mode=${apiJson.mode}, rateLimitStore=${apiJson.limits?.rateLimitStore}`,
    );
    addCheck(
      "Real mode reports production-ready rate limit",
      apiJson.mode !== "real" || apiJson.limits?.rateLimitProductionReady === true,
      `rateLimitProductionReady=${apiJson.limits?.rateLimitProductionReady}`,
    );
  }
} catch (error) {
  addCheck("GET /api/ask returns 200", false, error.message);
}

for (const page of ["/ask/eval", "/wiki/vercel-preview-readiness-checklist"]) {
  try {
    const response = await fetchWithTimeout(`${baseUrl}${page}`);
    const preview = response.ok ? await readTextPreview(response) : "";
    addCheck(`${page} returns 200`, response.ok, `HTTP ${response.status}`);
    addCheck(
      `${page} has HTML content`,
      response.ok && preview.includes("<!DOCTYPE html"),
      preview || "No HTML preview.",
      "warning",
    );
  } catch (error) {
    addCheck(`${page} returns 200`, false, error.message);
  }
}

console.log("Checks");

for (const check of checks) {
  const icon = check.ok ? "✓" : check.level === "error" ? "✗" : "!";
  console.log(`${icon} ${check.label}`);
  console.log(`  ${check.detail}`);
}

console.log("");

if (apiJson) {
  console.log("API Metadata");
  console.log(
    JSON.stringify(
      {
        mode: apiJson.mode,
        provider: apiJson.provider,
        model: apiJson.model,
        realModeReady: apiJson.realModeReady,
        rateLimitStore: apiJson.limits?.rateLimitStore,
        rateLimitProductionReady: apiJson.limits?.rateLimitProductionReady,
      },
      null,
      2,
    ),
  );
  console.log("");
}

const errors = checks.filter((check) => !check.ok && check.level === "error");
const warnings = checks.filter((check) => !check.ok && check.level === "warning");

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
