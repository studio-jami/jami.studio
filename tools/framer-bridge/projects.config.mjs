// Lane <-> Framer template mapping for the jami.studio design rebuild.
//
// Each design lane (branch/worktree) consumes ONE real Framer template project
// via the Server API. A different real template per lane is the thing that makes
// the 5 lanes genuinely diverge instead of converging on the same defaults.
//
// SOURCE OF TRUTH: the repo-root .env (jami.studio/.env, gitignored). Its
// "## Framer Project Keys" section lists each template as a bare header line
// followed by FRAMER_API_KEY / FRAMER_PROJECT_URL. We parse that block here so
// there is ONE secrets file — no duplicate env in this tool dir.
//
// Owner preference order (all lanes run Opus 4.8):
//   1 message-ai <- Message AI  (Lane A: cinematic dark, the prime)
//   2 nouva      <- Nouva        (bold studio/agency portfolio)
//   3 kirimo     <- Kirimo       (immersive creative portfolio)
//   4 noir       <- Noir         (dark agency-portfolio IA)
//   5 synk       <- Synk         (token-driven / systematized)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));   // .../jami.studio/tools/framer-bridge
export const ROOT_ENV_PATH = resolve(here, "..", "..", ".env"); // .../jami.studio/.env

// Framer template section header (as written in root .env) -> design lane.
const LANE_BY_TEMPLATE = {
  "message ai": "message-ai",
  "nouva": "nouva",
  "kirimo": "kirimo",
  "noir": "noir",
  "synk": "synk",
};

const META = {
  "message-ai": { template: "Message AI", note: "Lane A: cinematic dark (the prime)" },
  "nouva":      { template: "Nouva",      note: "bold studio/agency portfolio" },
  "kirimo":     { template: "Kirimo",     note: "immersive creative portfolio" },
  "noir":       { template: "Noir",       note: "dark agency-portfolio IA" },
  "synk":       { template: "Synk",       note: "token-driven / systematized" },
};

// Parse the root .env. KEY=VALUE lines bind to whatever template header most
// recently appeared; bare unrecognized lines reset the current section so the
// non-Framer secrets above the block are never misattributed.
function parseFramerProjects(text) {
  const byLane = {};
  let lane = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const kv = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      const val = kv[2].replace(/^["']|["']$/g, "").trim();
      if (lane) {
        if (key === "FRAMER_API_KEY") byLane[lane].apiKey = val;
        else if (key === "FRAMER_PROJECT_URL") byLane[lane].url = val;
      }
      continue;
    }
    if (line.startsWith("#")) continue;                 // "## Framer Project Keys"
    const mapped = LANE_BY_TEMPLATE[line.toLowerCase()]; // bare template header
    if (mapped) { lane = mapped; byLane[lane] ??= { lane }; }
    else lane = null;
  }
  return byLane;
}

let parsed = {};
try { parsed = parseFramerProjects(readFileSync(ROOT_ENV_PATH, "utf8")); }
catch { /* root .env not readable — PROJECTS will report missing creds */ }

const ORDER = ["message-ai", "nouva", "kirimo", "noir", "synk"];
export const PROJECTS = ORDER.map((lane) => ({
  lane,
  template: META[lane].template,
  note: META[lane].note,
  url: parsed[lane]?.url || "",
  apiKey: parsed[lane]?.apiKey || "",
}));
