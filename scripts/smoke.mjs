import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:3000";
const OUT = "docs/design/evidence/opus-a";

const widths = [
  { name: "1440", w: 1440, h: 900 },
  { name: "1024", w: 1024, h: 820 },
  { name: "768", w: 768, h: 1024 },
  { name: "390", w: 390, h: 844 }
];

const routes = [
  { path: "/", slug: "home" },
  { path: "/projects", slug: "projects" },
  { path: "/projects/harness", slug: "harness" },
  { path: "/projects/registry", slug: "registry" }
];

const themes = ["dark", "light"];

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

const browser = await chromium.launch();
const issues = [];

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
      await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle" });
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

      if (resolvedTheme !== theme) {
        issues.push(`THEME MISMATCH ${route.slug} ${theme} ${vp.name}: got ${resolvedTheme}`);
      }
      if (overflow > 1) {
        issues.push(`H-OVERFLOW ${route.slug} ${theme} ${vp.name}: +${overflow}px`);
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
  console.log("\nAll routes clean: no overflow, no console errors, theme resolves correctly.");
}
