// Export each lane's Framer template to React components via unframer, dropping
// the generated code into that lane's worktree at <worktree>/src/framer/.
//
// NOTE: unframer / the Framer "React Export" plugin may require a Google login
// and (for some templates) the React Export subscription — separate from the
// Server API key. The Server API itself reads structure + publishes for free;
// the clean React codegen is the unframer path. If export auth is required, run
// `npx unframer login` once.
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
  const id = (p.url || "").split("/").filter(Boolean).pop();
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
