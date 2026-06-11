// Capture a full-page render of each template's home page via the Framer Server API.
// This is the one rich, fully-headless read the Server API beta offers: screenshot()
// returns a fixed-desktop-width (1200px) PNG of the entire scrolling page — the real
// visual reference a design agent builds from. Writes out/<lane>.home.png.
//
// Usage:  node shots.mjs            # all lanes
//         node shots.mjs nouva      # one lane (by lane or template substring)
//
// Note: width is fixed by the API (no breakpoint control); pages other than home need
// their node id (from the Framer editor URL ?node=) or the MCP plugin to enumerate.
import { writeFileSync, mkdirSync } from "node:fs";
import { connect } from "framer-api";
import { PROJECTS } from "./projects.config.mjs";

mkdirSync(new URL("./out/", import.meta.url), { recursive: true });
const filter = (process.argv[2] || "").toLowerCase();

function pngDims(buf) {
  return `${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)}`;
}

for (const p of PROJECTS) {
  if (filter && ![p.lane, p.template].some((v) => v.toLowerCase().includes(filter))) continue;
  if (!p.url || !p.apiKey) { console.log(`SKIP ${p.lane} — missing creds`); continue; }
  let f;
  try {
    f = await connect(p.url, p.apiKey);
    const root = await f.getCanvasRoot();
    const shot = await f.screenshot(root.id);
    const buf = Buffer.from(shot?.data?.data || shot?.data || shot);
    const file = new URL(`./out/${p.lane}.home.png`, import.meta.url);
    writeFileSync(file, buf);
    console.log(`ok ${p.lane.padEnd(12)} ${pngDims(buf)}  ${(buf.length / 1e6).toFixed(1)}MB -> out/${p.lane}.home.png`);
  } catch (e) {
    console.log(`ERR ${p.lane}: ${e?.message || e}`);
  } finally {
    try { await f?.disconnect?.(); } catch {}
  }
}
