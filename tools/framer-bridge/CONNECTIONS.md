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

## Projects ↔ lanes — VERIFIED LIVE 2026-06-10

All five connected headless via the Server API; `getProjectInfo` + `getCanvasRoot` returned real
data for each (`node inspect.mjs` → `out/<lane>.json`).

| Lane / branch | Template | Root `.env` section | Connected | Verified |
|---|---|---|---|---|
| `design/message-ai` | Message AI | `Message AI` | ✅ | 2026-06-10 |
| `design/nouva` | Nouva | `Nouva` | ✅ | 2026-06-10 |
| `design/kirimo` | Kirimo | `Kirimo` | ✅ | 2026-06-10 |
| `design/noir` | Noir | `Noir` | ✅ | 2026-06-10 |
| `design/synk` | Synk | `Synk` | ✅ | 2026-06-10 |

## Live SDK surface (this `framer-api@0.1.14` beta build)

Discovered against the real projects, not docs:

- **Working reads:** `getProjectInfo` (id + name), `getCanvasRoot` (home `WebPageNode`),
  `getNode(id)` (pass a node id string — shallow descriptor), `getCollections` (CMS, where the
  project has any), `getChangedPaths`, `getChangeContributors`, `getPublishInfo`.
- **Node ops:** `exportSVG(nodeId)` (vector/shape nodes only — errors on pages), `screenshot(nodeId)`.
- **Lifecycle:** `connect`, `reconnect`, `disconnect`; publish/deploy supported by the SDK.
- **Present but erroring in this beta:** `getColorStyles` / `getTextStyles` / `getFonts` — for token
  extraction use the MCP plugin (`manageColorStyle` / `manageTextStyle` read paths) or `unframer`.

For deep per-page structure a lane agent walks from `getCanvasRoot().id` with `getNode`, or uses the
MCP-plugin XML route. The Server API guarantees the connection + publish path; the richest read of a
template's full design is the MCP plugin or the React export below.

## Verify (repro)

1. Credentials already live in root `.env` (`## Framer Project Keys`).
2. `cd tools/framer-bridge && npm install` (once).
3. `node inspect.mjs` → writes `out/<lane>.json` for all five, or `node inspect.mjs <lane>` for one.

## Export to React (when a lane needs code)

`node export.mjs <lane>` runs `unframer` to pull the template's React components into
`<worktree>/src/framer/`. Note: `unframer` may require a Google login / React Export subscription —
separate from the Server API key. `inspect`/build do not need it.

## Secret policy

- API keys + project URLs: only in root `.env` (gitignored), Vercel env, or the host secret store —
  never in a tracked file.
- This record holds section/lane names and status only.
