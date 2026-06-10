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
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9444;
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
  { path: "/projects/registry", name: "registry" }
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
      pending.set(id, { resolve, reject });
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
      await send(
        "Emulation.setDeviceMetricsOverride",
        { width: view.w, height: view.h, deviceScaleFactor: 2, mobile: view.w <= 480 },
        sessionId
      );
      for (const page of pages) {
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
        const { data } = await send(
          "Page.captureScreenshot",
          { format: "png", captureBeyondViewport: true },
          sessionId
        );
        writeFileSync(
          join(outDir, `${page.name}-${theme}-${view.tag}.png`),
          Buffer.from(data, "base64")
        );
        count++;
        console.log(`shot ${count}/${themes.length * widths.length * pages.length}: ${page.name}-${theme}-${view.tag}`);
      }
    }
  }
  console.log("DONE", count);
  ws.close();
  cleanup(0);
}

main().catch((err) => {
  console.error("ERR", err.message);
  cleanup(1);
});
