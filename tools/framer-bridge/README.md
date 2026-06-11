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

The **React → repo** code export (clean JSX/CSS) is a third tool, `unframer`
(`npx unframer <projectId>`), used by `export.mjs`. It may require a Google login
and, for some templates, the React Export subscription — separate from the API key.

## Setup

1. `cd tools/framer-bridge && npm install` (installs `framer-api`).
2. Credentials already live in the repo-root `.env` (`## Framer Project Keys`
   block). `projects.config.mjs` parses it — there is **no** local `.env` here.

## Use

```bash
npm run inspect            # read all configured projects -> out/<lane>.json
node inspect.mjs messageai # just one (lane or template substring)
npm run export             # unframer each lane's template -> <worktree>/src/framer
node export.mjs fable      # just one lane
```

`inspect.mjs` is read-only (never publishes/edits). It also self-documents the
real SDK surface of whatever `framer-api` beta build is installed, into
`out/<lane>.json` under `allClientMethods`.

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
