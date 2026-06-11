// Read the REAL structure of each Framer template project via the Server API.
//
// This is the step that was missing last time: the reference brief (§13) noted
// the Framer MCP plugin "was not connected during research," so the lanes were
// built from synthesized DNA (screenshots/marketplace listings), not exported
// project XML. This script connects headless with your per-project API keys and
// dumps whatever the SDK exposes (project info + canvas/CMS/style readers) to
// out/<lane>.json so an agent can build from the actual template, not a guess.
//
// Usage:
//   node inspect.mjs            # all configured projects
//   node inspect.mjs messageai  # filter by lane or template substring
//
// Read-only: this script never publishes, deploys, or edits your projects.

import { mkdirSync, writeFileSync } from "node:fs";
import { connect } from "framer-api";
import { PROJECTS } from "./projects.config.mjs";
// Credentials come from the repo-root .env, parsed in projects.config.mjs.

// The quick-start confirms getProjectInfo / getChangedPaths / publish / deploy.
// The reference says the Server API "is based on our Plugin API and shares most
// methods" but doesn't enumerate the canvas/CMS readers, so we feature-detect:
// call any candidate reader that actually exists on the client and capture it.
const CANDIDATE_READERS = [
  "getProjectInfo", "getChangedPaths", "getChangeContributors",
  "getNodes", "getNode", "getCanvasRoot", "getRoot",
  "getPages", "getWebPages", "getComponents", "getComponentNodes",
  "getCMSCollections", "getCollections", "getCMSItems",
  "getStyles", "getColorStyles", "getTextStyles", "getFonts",
  "getPublishInfo",
];

mkdirSync(new URL("./out/", import.meta.url), { recursive: true });

const filter = (process.argv[2] || "").toLowerCase();
let anyConnected = false;

for (const p of PROJECTS) {
  if (filter && ![p.lane, p.template].some((v) => v.toLowerCase().includes(filter))) continue;
  if (!p.url || !p.apiKey) {
    console.log(`SKIP ${p.lane} (${p.template}) — missing ${!p.url ? "PROJECT_URL" : "API_KEY"} in .env`);
    continue;
  }
  console.log(`\n=== ${p.lane} <- ${p.template} ===`);
  let framer;
  try {
    framer = await connect(p.url, p.apiKey);
    anyConnected = true;
    const dump = { lane: p.lane, template: p.template, url: p.url, ranAt: process.env.RUN_STAMP || null, readers: {}, used: [] };
    for (const name of CANDIDATE_READERS) {
      if (typeof framer[name] !== "function") continue;
      dump.used.push(name);
      try { dump.readers[name] = await framer[name](); }
      catch (e) { dump.readers[name] = { __error: String(e?.message || e) }; }
    }
    // Self-document the real SDK surface for whichever beta build is installed.
    dump.allClientMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(framer))
      .filter((n) => n !== "constructor" && typeof framer[n] === "function")
      .sort();
    writeFileSync(new URL(`./out/${p.lane}.json`, import.meta.url), JSON.stringify(dump, null, 2));
    console.log(`  ok -> out/${p.lane}.json  (readers used: ${dump.used.join(", ") || "none"})`);
    console.log(`  client methods: ${dump.allClientMethods.join(", ")}`);
  } catch (e) {
    console.error(`  FAILED to connect/read: ${e?.message || e}`);
  } finally {
    try { await framer?.disconnect?.(); } catch {}
  }
}

if (!anyConnected) {
  console.log("\nNothing connected. Check the '## Framer Project Keys' block in the repo-root .env.");
  process.exitCode = 1;
}
