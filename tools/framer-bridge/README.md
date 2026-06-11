# framer-bridge

Headless bridge between your 5 Framer template projects and the `jami.studio`
design lanes. Dev tooling only — it is **not** part of the Next.js build and does
not touch `src/`, so it is merge-neutral across every design branch.

## Why this exists

The first design pass failed the same way five times because the agents never had
the real templates — the reference brief (§13) built lanes from *synthesized DNA*
(screenshots + marketplace listings), not exported project structure. Now the real
templates live in 5 Framer projects with Server API keys, so an agent can read the
**actual** canvas/components/CMS and build from it.

## Two connection routes (test both, keep the smoother one)

| | Server API (this harness) | MCP plugin (in-editor) |
|---|---|---|
| Auth | per-project API key (`.env`) | plugin open in one project |
| Scope | all 5 projects, headless | one open project at a time |
| Babysitting | none — scriptable / cron / agent | must keep Framer open |
| Can publish | yes (`publish` / `deploy`) | no (you click Publish) |
| Gives projectId | you supply it | returns it for free |
| Best for | batch, parallel lanes, automation | hand-editing one canvas |

The **React → repo** code export (clean JSX/CSS) is a third, **optional** tool,
`unframer` (`npx unframer <projectId>`), used by `export.mjs`. Hard precondition
(verified): the project must have the Framer **React Export plugin** installed,
components selected for export in that plugin, and the site **published** —
otherwise unframer 404s with "ensure you've exported components from Framer
first". None of the five template projects has this set up; the lanes do not
depend on it.

## Setup

1. `cd tools/framer-bridge && npm install` (installs `framer-api`).
2. Credentials already live in the repo-root `.env` (`## Framer Project Keys`
   block). `projects.config.mjs` parses it — there is **no** local `.env` here.

## Use

```bash
npm run inspect             # extract all projects -> out/<lane>.json + out/<lane>.full.json
node inspect.mjs message-ai # just one (lane or template substring)
node shots.mjs              # optional full-page render -> out/<lane>.home.png
node export.mjs nouva       # optional unframer React export -> <worktree>/src/framer
```

`inspect.mjs` is read-only (never publishes/edits). It extracts the template's
real design system headless — `getColorStyles` / `getTextStyles` (the color +
type token systems), `getNodesWithType` (every page/frame/text/component/
instance node with geometry + per-breakpoint styling, flat), and
`framer.agent.getNode` per page (the **hierarchical** page tree: nested
sections, layout, gap/padding — the structure and rhythm) plus
`framer.agent.getContext` (the project's own fonts/components/tokens summary).
`out/<lane>.json` is the compact brief; read it top to bottom.
`out/<lane>.full.json` holds `pageTrees` (start here for layout) + the flat
node arrays (exact values). See `CONNECTIONS.md` for the verified per-template
counts and the live SDK surface.

## Lane <-> template mapping (owner preference order; all Opus 4.8)

| # | Lane / branch | Template | Character |
|---|---|---|---|
| 1 | `design/message-ai` | Message AI | Lane A — cinematic dark (the prime) |
| 2 | `design/nouva` | Nouva | bold studio/agency portfolio |
| 3 | `design/kirimo` | Kirimo | immersive creative portfolio |
| 4 | `design/noir` | Noir | dark agency-portfolio IA |
| 5 | `design/synk` | Synk | token-driven / systematized |

See `CONNECTIONS.md` for the project ↔ lane ↔ key record and verification status.

## Boundaries

- Reads templates, exports code, and (optionally) publishes Framer projects.
- Does **not** modify `src/tokens`, `src/content`, `src/lib`, `src/registry` —
  those are the shared, merge-safe contracts every lane reuses verbatim.
