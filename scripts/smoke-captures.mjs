/**
 * Headless visual smoke captures for the Nocturne design branch (design/grok).
 * Starts its own production server, then captures every public route in dark +
 * light at all four required breakpoints (1440 / 1024 / 768 / 390), flags any
 * horizontal overflow, and writes full-page JPEGs (quality 80, scale 1) named
 * `<route>-<width>-<theme>.jpg` to docs/design/evidence/grok.
 *
 * Run after `pnpm build`:  node scripts/smoke-captures.mjs
 *
 * Playwright is resolved from the pnpm store directly so this works even when
 * the package is only present transitively.
 */
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pwPath = resolve(root, "node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/index.js");
const pw = await import(pathToFileURL(pwPath).href);
const chromium = pw.chromium ?? pw.default?.chromium;

const PORT = Number(process.env.PORT ?? 4399);
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = resolve(root, "docs/design/evidence/grok");

const widths = [1440, 1024, 768, 390];
const themes = ["dark", "light"];
const pages = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "projects-harness", path: "/projects/harness" },
  { name: "projects-registry", path: "/projects/registry" },
  { name: "projects-orchestra", path: "/projects/orchestra" },
  { name: "projects-intercal", path: "/projects/intercal" },
  { name: "projects-collectiva", path: "/projects/collectiva" }
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForReady() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return true;
    } catch {}
    await wait(500);
  }
  return false;
}

async function startServer() {
  const proc = spawn(
    process.execPath,
    [resolve(root, "node_modules/next/dist/bin/next"), "start", "-p", String(PORT)],
    { cwd: root, stdio: ["ignore", "ignore", "inherit"], shell: false }
  );
  const ready = await waitForReady();
  if (!ready) {
    proc.kill("SIGTERM");
    throw new Error("server did not become ready");
  }
  return proc;
}

await mkdir(OUT, { recursive: true });
const server = await startServer();
const browser = await chromium.launch();
let overflowCount = 0;

try {
  for (const theme of themes) {
    const context = await browser.newContext({
      deviceScaleFactor: 1,
      colorScheme: theme === "light" ? "light" : "dark"
    });
    await context.addInitScript((t) => {
      try {
        localStorage.setItem("jami-theme", t);
      } catch {}
    }, theme);

    const page = await context.newPage();
    for (const p of pages) {
      for (const w of widths) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(`${BASE}${p.path}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(300);
        const m = await page.evaluate(() => {
          const de = document.documentElement;
          return { scrollW: de.scrollWidth, clientW: de.clientWidth, theme: de.dataset.theme };
        });
        const tag = `${p.name}-${w}-${theme}`;
        if (m.scrollW > m.clientW + 1) {
          overflowCount++;
          console.log(`  OVERFLOW ${tag}: scrollW=${m.scrollW} clientW=${m.clientW}`);
        }
        await page.screenshot({
          path: resolve(OUT, `${tag}.jpg`),
          fullPage: true,
          type: "jpeg",
          quality: 80
        });
        console.log(`captured ${tag} (theme=${m.theme})`);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.kill("SIGTERM");
  await wait(200);
}

console.log(`\nDONE — ${overflowCount === 0 ? "no overflow detected" : overflowCount + " overflow issue(s)"}; screenshots in ${OUT}`);
