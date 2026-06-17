// Capture a full-page render of each template's home page via the Framer Server API.
// screenshot(nodeId, options?) returns a PNG/JPEG of the entire scrolling page at the
// page's desktop-breakpoint width (1200px in these templates) — the visual reference a
// design agent builds from. Writes out/<lane>.home.png.
//
// Usage:  node shots.mjs            # all lanes
//         node shots.mjs nouva      # one lane (by lane or template substring)
//
// Options exist for format ("png"|"jpeg"), quality, scale (0.5–4 pixel-density
// multiplier), and clip — but there is no viewport/breakpoint width control; tablet/
// phone renders are not available headless. Other pages' ids are in out/<lane>.json
// (`pages[]`) — pass one to screenshot() for a non-home render.
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
