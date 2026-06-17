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

## Projects ↔ lanes — FULL STRUCTURE EXTRACTED HEADLESS (re-verified 2026-06-11)

All five templates' **complete design systems** are read headless via the Server API with the
per-project key — no publish, no editor, no MCP plugin, no babysitting. `node inspect.mjs` writes
`out/<lane>.json` (compact design brief) + `out/<lane>.full.json` (hierarchical page trees + flat
node arrays) per template.

| Lane / branch | Template | Root `.env` section | Pages | Page trees | Frames | Texts | Instances | Components | Colors | Type styles | Verified |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `design/message-ai-2` | Message AI | `Message AI` | 2 | 2 | 756 | 451 | 338 | 19 | 19 | 7 | 2026-06-11 |
| `design/nouva-2` | Nouva | `Nouva` | 4 | 3 | 700 | 338 | 280 | 19 | 17 | 12 | 2026-06-11 |
| `design/kirimo-2` | Kirimo | `Kirimo` | 10 | 9 | 1241 | 733 | 230 | 22 | 8 | 15 | 2026-06-11 |
| `design/noir-2` | Noir | `Noir` | 10 | 7 | 1956 | 507 | 609 | 39 | 19 | 17 | 2026-06-11 |
| `design/synk-2` | Synk | `Synk` | 8 | 8 | 3281 | 848 | 654 | 38 | 16 | 8 | 2026-06-11 |

Page trees < pages where a path is a CMS detail template (`/blogs/:slug`, `/collection/:slug`,
`/legal/:slug`, …): `agent.getNode` resolves concrete paths only. Those pages' nodes still appear in
the flat arrays, and the CMS content is reachable via `getCollections`.

## Live SDK surface (`framer-api@0.1.14`, npm latest as of 2026-06) — what actually works headless

Verified by running against the real projects (2026-06-11). The earlier "shallow read" was a
wrong-method-name artifact: `getNode` alone returns a shallow descriptor, but the typed readers,
style readers, and the agent namespace return the full thing.

- **Hierarchy (structure/rhythm):** `framer.agent.getNode({ id: pageId }, { pagePath })` → the whole
  page as ONE nested tree: named sections, `htmlTag`, stack/grid layout, `gap`, `padding`,
  per-breakpoint frames, children. `framer.agent.getContext()` → the project's own summary string
  (fonts, components + ids, color tokens, text-style presets, site map). The `framer.agent.*`
  namespace (the `*ForAgent` wire methods) **is exposed and works over the Server API** — the earlier
  note that it wasn't available was wrong.
- **Flat typed reads (exact values):** `getNodesWithType("WebPageNode"|"FrameNode"|"TextNode"|
  "ComponentNode"|"ComponentInstanceNode"|"SVGNode"|"DesignPageNode")` returns every node of that
  type as a rich array — full geometry (position/size/pins), background/border/radius (incl.
  `backgroundImage` asset URLs on `framerusercontent.com`), layout, links, and for text the
  `inlineTextStyle` (tag, font, weight, color, alignment, **per-breakpoint** values). Flat = no
  parent/child links; the page trees above carry the hierarchy. `ComponentInstanceNode` carries
  `componentName` + `controls` (the actual per-instance overrides).
- **Design tokens:** `getColorStyles()` → the template's named color system (e.g. `/Main/Primary`,
  `/Background/Surface`; `light`/`dark` slots — many templates fill only `light` even when the design
  is dark); `getTextStyles()` → the type system (named styles → `h1/h2/p` tags, font family/weight,
  alignment, per-breakpoint sizes). Maps straight onto our token contract.
- **Also:** `getProjectInfo`, `getCollections` (CMS), `getCustomCode` (head/body), `getFonts` (the full
  ~9k Google Fonts catalog — `inspect.mjs` derives *used* families from the styles instead).
- **Render (complement, not primary):** `screenshot(nodeId, options?)` → full-page PNG/JPEG of the
  node (`shots.mjs` → `out/<lane>.home.png`). Options: `format` (`png`|`jpeg`), `quality`, `scale`
  (0.5–4 pixel-density multiplier), `clip`. Base width is the page's desktop-breakpoint frame width
  (1200px in these templates) — there is no viewport/breakpoint width option, only `scale`.
  `exportSVG(nodeId)` for vector nodes.
- **Per-node extras:** `ComponentNode.getVariables()` (component variables — not project-level design
  tokens; the project tokens are the color/text styles above), `getText`/`getHTML` on text nodes,
  `getChildren(nodeId)` for manual tree walks.
- **Lifecycle / write:** `connect`, `disconnect` (plus `withConnection`); publish/deploy run through
  `framer.agent.publish(...)` — not used by the read path.

## Verify (repro)

1. Credentials already live in root `.env` (`## Framer Project Keys`).
2. `cd tools/framer-bridge && npm install` (once).
3. `node inspect.mjs` → `out/<lane>.json` + `out/<lane>.full.json` for all five (`node inspect.mjs <lane>` for one).
4. Optional visual: `node shots.mjs` → `out/<lane>.home.png` (full-page render).

## Export to React (optional — NOT part of the lane workflow)

`node export.mjs <lane>` runs `unframer` to pull the template's React components into
`<worktree>/src/framer/`. **Hard precondition (verified against the unframer docs):** the **React
Export plugin** must be installed in that Framer project, the components must be **selected for
export in the plugin**, and the project must be **published** — unframer reads the published JS
modules. None of our five template projects has this set up, so `export.mjs` will fail with
"ensure you've exported components from Framer first" until an operator does that in-editor setup.
The lanes do **not** depend on it: `inspect.mjs` + `shots.mjs` provide everything the design agents
read, and the build never needs `src/framer/`.

## Secret policy

- API keys + project URLs: only in root `.env` (gitignored), Vercel env, or the host secret store —
  never in a tracked file.
- This record holds section/lane names and status only.
