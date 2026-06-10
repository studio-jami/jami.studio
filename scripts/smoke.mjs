import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.SMOKE_BASE ?? "http://localhost:3000";
const OUT = "docs/design/evidence/opus-a";

const widths = [
  { name: "1440", w: 1440, h: 900 },
  { name: "1024", w: 1024, h: 820 },
  { name: "768", w: 768, h: 1024 },
  { name: "390", w: 390, h: 844 }
];

// Full public surface: home, the gallery, every project page, and the branded
// 404 (an unknown route must land on studio chrome, not framework default).
const routes = [
  { path: "/", slug: "home" },
  { path: "/projects", slug: "projects" },
  { path: "/projects/harness", slug: "harness" },
  { path: "/projects/registry", slug: "registry" },
  { path: "/projects/orchestra", slug: "orchestra" },
  { path: "/projects/intercal", slug: "intercal" },
  { path: "/projects/collectiva", slug: "collectiva" },
  { path: "/this-route-does-not-exist", slug: "not-found", expectStatus: 404 }
];

const themes = ["dark", "light"];

// Generated machine-readable files that must keep rendering.
const generatedFiles = [
  { path: "/robots.txt", mustContain: "Sitemap:" },
  { path: "/sitemap.xml", mustContain: "<urlset" },
  { path: "/llms.txt", mustContain: "# jami.studio" },
  { path: "/llms-full.txt", mustContain: "Repository:" }
];

// The representative set committed as branch evidence.
const keep = new Set([
  "home-dark-1440",
  "home-light-1440",
  "home-dark-390",
  "harness-dark-1440",
  "registry-light-1024",
  "projects-dark-768"
]);

await mkdir(OUT, { recursive: true });

const issues = [];

for (const file of generatedFiles) {
  const response = await fetch(`${BASE}${file.path}`);
  const body = await response.text();
  if (!response.ok) {
    issues.push(`FILE ${file.path}: HTTP ${response.status}`);
  } else if (!body.includes(file.mustContain)) {
    issues.push(`FILE ${file.path}: missing expected content "${file.mustContain}"`);
  } else {
    console.log(`ok ${file.path}`);
  }
}

const browser = await chromium.launch();

for (const theme of themes) {
  for (const vp of widths) {
    const context = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 2
    });
    await context.addInitScript((t) => {
      try {
        localStorage.setItem("jami-theme", t);
      } catch {}
    }, theme);

    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    for (const route of routes) {
      const expected = route.expectStatus ?? 200;
      const response = await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle" });
      if (response && response.status() !== expected) {
        issues.push(
          `STATUS ${route.slug} ${theme} ${vp.name}: ${response.status()} != ${expected}`
        );
      }
      if (expected !== 200) {
        // The document itself loading with a non-200 status logs a resource
        // error; that is the expected behavior under test, not a defect.
        consoleErrors.length = 0;
      }
      await page.waitForTimeout(250);

      // Walk the page so every scroll-reveal fires, then return to the top so
      // the full-page screenshot shows fully-revealed content.
      for (let step = 0; step <= 6; step++) {
        await page.evaluate((i) => {
          window.scrollTo(0, (document.body.scrollHeight * i) / 6);
        }, step);
        await page.waitForTimeout(180);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const resolvedTheme = await page.evaluate(() =>
        document.documentElement.getAttribute("data-theme")
      );
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return de.scrollWidth - de.clientWidth;
      });
      const brokenImages = await page.evaluate(() =>
        Array.from(document.images)
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src)
      );

      if (resolvedTheme !== theme) {
        issues.push(`THEME MISMATCH ${route.slug} ${theme} ${vp.name}: got ${resolvedTheme}`);
      }
      if (overflow > 1) {
        issues.push(`H-OVERFLOW ${route.slug} ${theme} ${vp.name}: +${overflow}px`);
      }
      if (brokenImages.length) {
        issues.push(`BROKEN IMG ${route.slug} ${theme} ${vp.name}: ${brokenImages.join(" | ")}`);
      }
      if (consoleErrors.length) {
        issues.push(`CONSOLE ${route.slug} ${theme} ${vp.name}: ${consoleErrors.join(" | ")}`);
        consoleErrors.length = 0;
      }

      const key = `${route.slug}-${theme}-${vp.name}`;
      if (keep.has(key)) {
        await page.screenshot({ path: `${OUT}/${key}.png`, fullPage: true });
        console.log(`saved ${key}.png`);
      }
    }

    await context.close();
  }
}

await browser.close();

if (issues.length) {
  console.log("\n--- ISSUES ---");
  for (const i of issues) console.log(i);
  process.exitCode = 1;
} else {
  console.log(
    "\nAll routes clean: generated files render; no overflow, broken images, or console errors; theme resolves correctly."
  );
}
