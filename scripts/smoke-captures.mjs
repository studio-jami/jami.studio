/**
 * Headless visual smoke captures for the Nocturne design branch.
 * Captures representative views in dark + light at the required breakpoints.
 * Run after `pnpm build`.
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const PORT = 3456;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = "docs/design/evidence/grok";

const BREAKPOINTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 768 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 }
];

const PAGES = [
  { path: "/", label: "home" },
  { path: "/projects", label: "projects" },
  { path: "/projects/harness", label: "harness" },
  { path: "/projects/registry", label: "registry" }
];

mkdirSync(OUT, { recursive: true });

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function startServer() {
  const proc = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false
  });

  let ready = false;
  proc.stdout.on("data", (d) => {
    if (d.toString().includes("Ready")) ready = true;
  });
  proc.stderr.on("data", () => {});

  // Give it time
  for (let i = 0; i < 40; i++) {
    if (ready) break;
    await wait(250);
  }
  await wait(600);
  return proc;
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });

  const server = await startServer();

  try {
    for (const theme of ["dark", "light"]) {
      for (const bp of BREAKPOINTS) {
        for (const page of PAGES) {
          // Only capture a focused representative set to keep output small and useful:
          // - home at 1440 dark/light
          // - home at 390 dark
          // - projects at 1024 dark
          // - harness + registry at 1440 dark + light, and one at 768
          const isKey =
            (page.label === "home" && bp.name === "1440") ||
            (page.label === "home" && bp.name === "390" && theme === "dark") ||
            (page.label === "projects" && bp.name === "1024" && theme === "dark") ||
            (page.label === "harness" && (bp.name === "1440" || bp.name === "768")) ||
            (page.label === "registry" && bp.name === "1440");

          if (!isKey) continue;

          const viewport = { width: bp.width, height: bp.height };
          const pageInst = await context.newPage();
          await pageInst.setViewportSize(viewport);

          // Visit, set theme, reload to ensure no flash state
          await pageInst.goto(`${BASE}${page.path}`, { waitUntil: "networkidle" });
          await pageInst.evaluate((t) => {
            try {
              localStorage.setItem("jami-theme", t);
            } catch {}
          }, theme);
          await pageInst.reload({ waitUntil: "networkidle" });
          // Give grain + layout one frame
          await wait(120);

          const safePath = page.path.replace(/\//g, "-").replace(/^-/, "") || "home";
          const filename = `${OUT}/${safePath}-${theme}-${bp.name}.png`;
          await pageInst.screenshot({ path: filename, fullPage: true });
          console.log("captured", filename);

          await pageInst.close();
        }
      }
    }
  } finally {
    await context.close();
    await browser.close();
    server.kill("SIGTERM");
    await wait(200);
  }
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
