#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const productionUrl =
  process.argv[2] ||
  process.env.PRODUCTION_URL ||
  "https://ai-product-studio-psi.vercel.app/";

const run = (cmd, args, options = {}) => {
  try {
    const stdout = execFileSync(cmd, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      ...options,
    });

    return { ok: true, stdout, stderr: "", output: stdout };
  } catch (error) {
    const stdout = error.stdout?.toString() ?? "";
    const stderr = error.stderr?.toString() ?? error.message;

    return {
      ok: false,
      stdout,
      stderr,
      output: `${stdout}\n${stderr}`.trim(),
    };
  }
};

const checks = [];

const addCheck = (label, ok, detail, level = "error") => {
  checks.push({ label, ok, detail, level });
};

const printCommandOutput = (title, output) => {
  console.log(title);
  console.log(output.trim() || "(no output)");
  console.log("");
};

console.log("Vercel Project Safety Check");
console.log("===========================");
console.log("");

const vercelRepoPath = path.join(process.cwd(), ".vercel", "repo.json");
let linkedProject = null;

try {
  const repoJson = JSON.parse(fs.readFileSync(vercelRepoPath, "utf8"));
  linkedProject = repoJson.projects?.find((project) => project.name === "ai-product-studio");
} catch {
  linkedProject = null;
}

const whoami = run("vercel", ["whoami"]);
addCheck("Vercel CLI is authenticated", whoami.ok, whoami.ok ? whoami.output.trim() : whoami.output);

addCheck(
  "Local Vercel link points to ai-product-studio",
  Boolean(linkedProject),
  linkedProject
    ? `${linkedProject.name} at ${linkedProject.directory || "."}`
    : ".vercel/repo.json does not include ai-product-studio.",
);

const projectList = run("vercel", ["project", "ls"]);
addCheck(
  "Vercel project list command is callable",
  projectList.ok,
  projectList.ok ? "vercel project ls completed." : projectList.output,
  "warning",
);

const productionEnv = run("vercel", ["env", "ls", "production"]);
addCheck(
  "Production env does not expose real mode markers",
  productionEnv.ok &&
    !productionEnv.output.includes("ASK_API_MODE") &&
    !productionEnv.output.includes("LLM_API_KEY"),
  productionEnv.ok
    ? "No ASK_API_MODE or LLM_API_KEY entry found in production env list."
    : productionEnv.output,
);

const previewEnv = run("vercel", ["env", "ls", "preview"]);
addCheck(
  "Preview env list is readable",
  previewEnv.ok,
  previewEnv.ok ? "Preview env list retrieved without printing secret values." : previewEnv.stderr,
);

const askUrl = run("npm", ["run", "check:ask-url", "--", productionUrl], {
  env: {
    ...process.env,
    PATH: process.env.PATH,
  },
});
addCheck(
  "Production public URL passes Ask smoke test",
  askUrl.ok,
  askUrl.ok ? `Smoke test passed for ${productionUrl}` : askUrl.stdout || askUrl.stderr,
);

console.log("Checks");

for (const check of checks) {
  const icon = check.ok ? "✓" : check.level === "error" ? "✗" : "!";
  console.log(`${icon} ${check.label}`);
  console.log(`  ${check.detail}`);
}

console.log("");

if (projectList.ok) {
  printCommandOutput("Project List", projectList.output);
}

if (productionEnv.ok) {
  printCommandOutput("Production Env Names", productionEnv.output);
}

if (previewEnv.ok) {
  printCommandOutput("Preview Env Names", previewEnv.output);
}

if (askUrl.ok) {
  console.log("Ask Smoke Test");
  console.log("passed");
  console.log("");
}

const errors = checks.filter((check) => !check.ok && check.level === "error");

if (errors.length > 0) {
  console.log(`Result: failed (${errors.length} error${errors.length === 1 ? "" : "s"})`);
  process.exit(1);
}

console.log("Result: passed");
