// Self-contained CDP screenshot driver (no external deps). Launches its own
// headless Chrome, drives it over the DevTools Protocol via the global
// WebSocket, captures light + dark at four widths for the key pages, and
// cleans up. Usage: node scripts/shoot.mjs <baseUrl> <outDir>
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , baseUrl, outDir] = process.argv;
mkdirSync(outDir, { recursive: true });

const CHROME =
  process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
// Unique per-run debug port so parallel CDP/Playwright sessions on this host
// can never collide with (or wedge) this run.
const PORT = process.env.CDP_PORT ? Number(process.env.CDP_PORT) : 9500 + (process.pid % 400);
const USER_DIR = join(process.env.TEMP || "/tmp", `cdp-shoot-${Date.now()}`);

const widths = [
  { w: 1440, h: 900, tag: "1440" },
  { w: 1024, h: 768, tag: "1024" },
  { w: 768, h: 1024, tag: "768" },
  { w: 390, h: 844, tag: "390" }
];
const pages = [
  { path: "/", name: "home" },
  { path: "/projects", name: "projects" },
  { path: "/projects/harness", name: "harness" },
  { path: "/projects/registry", name: "registry" },
  { path: "/projects/orchestra", name: "orchestra" },
  { path: "/projects/intercal", name: "intercal" },
  { path: "/projects/collectiva", name: "collectiva" }
];
const themes = ["light", "dark"];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DIR}`,
    "about:blank"
  ],
  { stdio: "ignore" }
);

async function browserWs() {
  for (let i = 0; i < 30; i++) {
    if (chrome.exitCode !== null) {
      throw new Error(`Chrome exited early (code ${chrome.exitCode}) — port ${PORT} may be in use`);
    }
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      const json = await res.json();
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch {
      /* not ready */
    }
    await wait(300);
  }
  throw new Error("Chrome devtools endpoint never came up");
}

function cleanup(code) {
  try {
    chrome.kill("SIGKILL");
  } catch {
    /* ignore */
  }
  process.exit(code);
}

async function main() {
  const wsUrl = await browserWs();
  const ws = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const eventHandlers = new Map();

  ws.addEventListener("error", () => {
    /* non-fatal */
  });
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method && eventHandlers.has(msg.method)) {
      eventHandlers.get(msg.method)(msg.params);
    }
  });

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    setTimeout(() => reject(new Error("WS open timeout")), 8000);
  });

  const send = (method, params = {}, sessionId) => {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      // Watchdog: never hang forever on a wedged devtools connection.
      const timeoutMs = method === "Page.captureScreenshot" ? 90000 : 30000;
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`CDP ${method} timed out after ${timeoutMs / 1000}s`));
      }, timeoutMs);
      pending.set(id, {
        resolve: (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        }
      });
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  };
  const once = (method) =>
    new Promise((resolve) => {
      eventHandlers.set(method, (p) => {
        eventHandlers.delete(method);
        resolve(p);
      });
    });

  // Collect console errors / uncaught exceptions per page so the smoke run
  // fails loudly instead of only producing pretty screenshots.
  const consoleProblems = [];
  let currentShot = "(startup)";
  const persistentHandlers = new Map();
  const onEvent = (method, handler) => persistentHandlers.set(method, handler);
  const prevDispatch = eventHandlers;
  // Wrap: route events to one-shot handlers first, then persistent ones.
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (
      !msg.id &&
      msg.method &&
      persistentHandlers.has(msg.method) &&
      !prevDispatch.has(msg.method)
    ) {
      persistentHandlers.get(msg.method)(msg.params);
    }
  });
  onEvent("Runtime.consoleAPICalled", (p) => {
    if (p.type === "error" || p.type === "assert") {
      const text = (p.args || []).map((a) => a.value ?? a.description ?? "").join(" ");
      consoleProblems.push(`[console.${p.type}] ${currentShot}: ${text}`);
    }
  });
  onEvent("Runtime.exceptionThrown", (p) => {
    const detail = p.exceptionDetails || {};
    const text = detail.exception?.description || detail.text || "unknown exception";
    consoleProblems.push(`[exception] ${currentShot}: ${text}`);
  });

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send(
    "Emulation.setEmulatedMedia",
    { features: [{ name: "prefers-reduced-motion", value: "reduce" }] },
    sessionId
  );

  let count = 0;
  for (const theme of themes) {
    for (const view of widths) {
      // deviceScaleFactor 1: full-page captures at 2x of long pages (with the
      // fixed grain/glow compositing layers) are pathologically slow in
      // headless Chrome; 1x keeps every capture fast and review-accurate.
      await send(
        "Emulation.setDeviceMetricsOverride",
        { width: view.w, height: view.h, deviceScaleFactor: 1, mobile: view.w <= 480 },
        sessionId
      );
      for (const page of pages) {
        currentShot = `${page.name}-${theme}-${view.tag}`;
        await send("Page.navigate", { url: `${baseUrl}/__seed` }, sessionId);
        await wait(180);
        await send(
          "Runtime.evaluate",
          { expression: `try{localStorage.setItem('atelier-theme','${theme}')}catch(e){}` },
          sessionId
        );
        const load = once("Page.loadEventFired");
        await send("Page.navigate", { url: `${baseUrl}${page.path}` }, sessionId);
        await Promise.race([load, wait(9000)]);
        await wait(650);
        await send(
          "Runtime.evaluate",
          {
            expression: "document.fonts ? document.fonts.ready.then(()=>true) : true",
            awaitPromise: true
          },
          sessionId
        );
        await wait(250);
        // Horizontal-overflow guard: any page wider than the viewport is a
        // layout failure, recorded alongside console problems.
        const widthCheck = await send(
          "Runtime.evaluate",
          { expression: "document.documentElement.scrollWidth", returnByValue: true },
          sessionId
        );
        const scrollWidth = widthCheck?.result?.value;
        if (typeof scrollWidth === "number" && scrollWidth > view.w) {
          consoleProblems.push(
            `[overflow] ${currentShot}: scrollWidth ${scrollWidth} > viewport ${view.w}`
          );
        }
        const { data } = await send(
          "Page.captureScreenshot",
          { format: "jpeg", quality: 92, captureBeyondViewport: true },
          sessionId
        );
        writeFileSync(
          join(outDir, `${page.name}-${view.tag}-${theme}.jpg`),
          Buffer.from(data, "base64")
        );
        count++;
        console.log(
          `shot ${count}/${themes.length * widths.length * pages.length}: ${page.name}-${theme}-${view.tag}`
        );
      }
    }
  }
  if (consoleProblems.length > 0) {
    console.error(`CONSOLE PROBLEMS (${consoleProblems.length}):`);
    for (const problem of consoleProblems) console.error(`  ${problem}`);
  } else {
    console.log("CONSOLE CLEAN");
  }
  console.log("DONE", count);
  ws.close();
  cleanup(consoleProblems.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("ERR", err.message);
  cleanup(1);
});
