import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT ?? 3000);
const URL = `http://localhost:${PORT}`;

const routes = [
  "/",
  "/projects",
  "/projects/harness",
  "/projects/registry",
  "/projects/orchestra",
  "/projects/intercal",
  "/projects/collectiva"
];
const viewports = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 }
];

const evidenceDir = path.join(__dirname, "..", "docs", "design", "evidence", "gemini");
fs.mkdirSync(evidenceDir, { recursive: true });

async function takeScreenshots() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const consoleErrors = [];

  for (const theme of ["dark", "light"]) {
    for (const route of routes) {
      for (const viewport of viewports) {
        const context = await browser.newContext({
          viewport,
          colorScheme: theme
        });
        const page = await context.newPage();
        page.on("console", (message) => {
          if (message.type() === "error") {
            consoleErrors.push(`${route} ${viewport.width} ${theme}: ${message.text()}`);
          }
        });
        page.on("pageerror", (error) => {
          consoleErrors.push(`${route} ${viewport.width} ${theme}: ${error.message}`);
        });

        console.log(
          `Taking screenshot for ${route} at ${viewport.width}x${viewport.height} in ${theme} mode`
        );
        await page.goto(`${URL}${route}`);

        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        if (overflow > 0) {
          consoleErrors.push(`${route} ${viewport.width} ${theme}: horizontal overflow ${overflow}px`);
        }

        const routeName = route === "/" ? "home" : route.replace(/\//g, "-").slice(1);
        const filename = `${routeName}-${viewport.width}-${theme}.png`;

        await page.screenshot({ path: path.join(evidenceDir, filename), fullPage: true });
        await context.close();
      }
    }
  }

  await browser.close();

  if (consoleErrors.length > 0) {
    console.error("Issues detected:");
    for (const entry of consoleErrors) {
      console.error(`  ${entry}`);
    }
    process.exit(1);
  }

  console.log("Screenshots saved.");
  process.exit(0);
}

takeScreenshots().catch((error) => {
  console.error(error);
  process.exit(1);
});
