// OPTIONAL tool — NOT part of the lane workflow. Exports a lane's Framer
// template to React components via unframer, dropping the generated code into
// that lane's worktree at <worktree>/src/framer/.
//
// HARD PRECONDITION (verified 2026-06-11 — without it this fails with
// "Project with id <id> not found. Please ensure you've exported components
// from Framer first." / HTTP 404): unframer reads the *published* JS modules
// that Framer's "React Export" marketplace plugin generates. An operator must,
// in the Framer editor for that project: (1) install the React Export plugin,
// (2) select the components to export in the plugin, (3) publish the site.
// None of the five template projects has this set up. The design lanes do NOT
// depend on it — inspect.mjs + shots.mjs provide everything the agents read.
//
// Usage:
//   node export.mjs            # all lanes with a project id + existing worktree
//   node export.mjs nouva      # filter by lane or template substring
//
// Worktrees are resolved as `jami.studio-<lane>` siblings of the repo root.

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { PROJECTS } from "./projects.config.mjs";

const here = dirname(fileURLToPath(import.meta.url));   // .../jami.studio/tools/framer-bridge
const siblings = resolve(here, "..", "..", "..");        // .../oss

const filter = (process.argv[2] || "").toLowerCase();

for (const p of PROJECTS) {
  if (filter && ![p.lane, p.template].some((v) => v.toLowerCase().includes(filter))) continue;
  // Project id = last path segment of the project URL, with any ?query/#hash
  // stripped (the stored URLs carry a ?node=... suffix).
  const id = (p.url || "").split("/").filter(Boolean).pop()?.split(/[?#]/)[0] ?? "";
  const worktree = resolve(siblings, `jami.studio-${p.lane}`);
  if (!id) { console.log(`SKIP ${p.lane} (${p.template}) — no project id (set *_PROJECT_URL)`); continue; }
  if (!existsSync(worktree)) { console.log(`SKIP ${p.lane} — worktree ${worktree} not found`); continue; }
  const out = resolve(worktree, "src", "framer");
  console.log(`\n=== unframer ${p.template} (${id}) -> ${out} ===`);
  try {
    execSync(`npx -y unframer ${id} --outDir "${out}"`, { stdio: "inherit" });
  } catch (e) {
    console.error(`  export failed: ${e?.message || e}`);
  }
}
