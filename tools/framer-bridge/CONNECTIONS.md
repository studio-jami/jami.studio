# Framer Connections — jami.studio design lanes

Safe connection record. **No secrets here.** API keys + project URLs live only in the repo-root
`.env` (gitignored), under the `## Framer Project Keys` block. This file records which project maps
to which lane and the verified connection status.

## Route

- **Primary (headless): Framer Server API** via the `framer-api` SDK — one per-project API key per
  lane, `connect(projectUrl, apiKey)`. No Framer app needs to be open; can read structure and publish.
- **Interactive alternative: Framer MCP plugin** — open a project → `Cmd-K` → "MCP" → open the MCP
  plugin. One project at a time; hands back the projectId for free. Best for full-canvas XML
  (`getProjectXml` / `getNodeXml`) and `exportReactComponents`.

`connect()` needs **both** the project URL/id **and** the key — the key alone does not identify the
project. Both come from the root `.env`; `projects.config.mjs` parses that block — there is no
separate env file in this tool dir.

## Projects ↔ lanes — FULL STRUCTURE EXTRACTED HEADLESS 2026-06-10

All five templates' **complete design systems** are read headless via the Server API with the
per-project key — no publish, no editor, no MCP plugin, no babysitting. `node inspect.mjs` writes
`out/<lane>.json` (compact design brief) + `out/<lane>.full.json` (full node tree) per template.

| Lane / branch | Template | Root `.env` section | Pages | Frames | Texts | Components | Colors | Type styles | Verified |
|---|---|---|---|---|---|---|---|---|---|
| `design/message-ai` | Message AI | `Message AI` | 2 | 756 | 451 | 19 | 19 | 7 | 2026-06-10 |
| `design/nouva` | Nouva | `Nouva` | 4 | 700 | 338 | 19 | 17 | 12 | 2026-06-10 |
| `design/kirimo` | Kirimo | `Kirimo` | 10 | 1241 | 733 | 22 | 8 | 15 | 2026-06-10 |
| `design/noir` | Noir | `Noir` | 10 | 1956 | 507 | 39 | 19 | 17 | 2026-06-10 |
| `design/synk` | Synk | `Synk` | 8 | 3281 | 848 | 38 | 16 | 8 | 2026-06-10 |

## Live SDK surface (`framer-api@0.1.14`) — what actually works headless

Verified against the real projects. The earlier "shallow read" was a wrong-method-name artifact:
`getNode` alone returns a shallow descriptor, but the typed and style readers return the full thing.

- **Structure (the real win):** `getNodesWithType("WebPageNode"|"FrameNode"|"TextNode"|"ComponentNode"|"SVGNode")`
  returns every node of that type as a rich array — full geometry (position/size/pins), background/border/
  radius, layout, links, and for text the `inlineTextStyle` (tag, font, weight, color, alignment, and
  **per-breakpoint** values). This is the complete page/layout/copy tree.
- **Design tokens:** `getColorStyles()` → the template's named color system (e.g. `/Main/Primary`,
  `/Background/Surface`, each with light/dark values); `getTextStyles()` → the type system (named styles
  → `h1/h2/p` tags, font family/weight, alignment, breakpoints). Maps straight onto our token contract.
- **Also:** `getProjectInfo`, `getCollections` (CMS), `getCustomCode` (head/body), `getFonts` (the full
  ~9k Google Fonts catalog — `inspect.mjs` derives *used* families from the styles instead).
- **Render (complement, not primary):** `screenshot(nodeId)` → a fixed-1200px-wide full-page PNG
  (`shots.mjs` → `out/<lane>.home.png`); `exportSVG(nodeId)` for vector nodes. Width is not adjustable.
- **Not exposed in this client build:** the `*ForAgent` serializers, `getVariables`, `INTERNAL_*`.
- **Lifecycle / write:** `connect`, `reconnect`, `disconnect`; `publish` / `deploy` are available
  (not used by the read path).

## Verify (repro)

1. Credentials already live in root `.env` (`## Framer Project Keys`).
2. `cd tools/framer-bridge && npm install` (once).
3. `node inspect.mjs` → `out/<lane>.json` + `out/<lane>.full.json` for all five (`node inspect.mjs <lane>` for one).
4. Optional visual: `node shots.mjs` → `out/<lane>.home.png` (full-page render).

## Export to React (when a lane needs code)

`node export.mjs <lane>` runs `unframer` to pull the template's React components into
`<worktree>/src/framer/`. Note: `unframer` may require a Google login / React Export subscription —
separate from the Server API key. `inspect`/build do not need it.

## Secret policy

- API keys + project URLs: only in root `.env` (gitignored), Vercel env, or the host secret store —
  never in a tracked file.
- This record holds section/lane names and status only.
