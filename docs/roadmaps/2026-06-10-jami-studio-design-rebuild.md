# jami.studio Marketing Site — Design Rebuild (5 Opus Lanes)

Date: 2026-06-10
Status: [~] Active — WS0 (connection + repo reset) in progress
Supersedes: `docs/_legacy/roadmaps/2026-06-09-jami-studio-marketing-rebuild.md`
Goal brief: `docs/design-goal.md`
Design guidelines: `docs/design/reference-brief.md`
Connection record: `tools/framer-bridge/CONNECTIONS.md`
Owner: Jamie
Surface: `www.jami.studio` marketing site and OSS project hub

## Purpose

A UI/design rebuild, not a foundation rebuild. The shared site foundation already lives on `main`
(Next.js 16 + React 19, token/dial contract, centralized content registry, route/metadata helpers,
generated `robots`/`sitemap`/`llms` surfaces) and is reused **verbatim**. The entire visual surface is
rebuilt to a world-class, design-studio standard across five parallel lanes.

Each lane is built by an **Opus 4.8** agent on its own synced branch/worktree cut from the same clean
`main` commit, working from **one real Framer reference template** (read via the Framer Server API).
The run ends with all five lanes live on separate local hosts for side-by-side owner review.

## Status legend

- [ ] Not started · [~] In progress · [x] Complete · [!] Blocked / needs owner

## Foundation already landed (reuse, do not rebuild)

- [x] Next.js 16 / React 19 / TS app with `pnpm lint|typecheck|test|build|verify`.
- [x] Token/dial contract: `src/tokens/{schema,presets,css-vars}.ts` (shadcn-compatible CSS vars;
      accents `cyan|green|amber|rose|violet`; dials accent/contrast/warmth/density/radius/surfaceDepth/motion).
- [x] Centralized content: `src/content/{projects,site,links}.ts` (5 Zod-validated projects).
- [x] Route/metadata/AI helpers: `src/lib/*`; generated `robots`/`sitemap`/`llms.txt`/`llms-full.txt`.
- [x] Registry-readiness manifest: `src/registry/manifest.ts`.

## What gets rebuilt (fresh, per lane)

- `src/app/**` presentation (`layout`, `page`, `projects`, `projects/[slug]`).
- All of `src/components/**`.
- `src/styles/globals.css` and each lane's own token preset VALUES (incl. its dark theme).

## Lane mapping (preference order)

| # | Lane / branch | Worktree | Template |
|---|---|---|---|
| 1 | `design/message-ai` | `../jami.studio-message-ai` | Message AI |
| 2 | `design/nouva` | `../jami.studio-nouva` | Nouva |
| 3 | `design/kirimo` | `../jami.studio-kirimo` | Kirimo |
| 4 | `design/noir` | `../jami.studio-noir` | Noir |
| 5 | `design/synk` | `../jami.studio-synk` | Synk |

All five run Opus 4.8.

## Workstreams

### WS0 — Connection + repo reset (this session; owner + agent)

- [x] Stand up headless Framer Server API harness (`tools/framer-bridge/`: `inspect`, `export`, config).
- [x] Write focused `design-goal.md` + this roadmap; retain guideline/standards docs; refresh stale brief language.
- [!] Owner fills the five `*_PROJECT_URL` values in `tools/framer-bridge/.env`. **OPEN.**
- [ ] Verify `inspect.mjs` reads all five real templates; record in `CONNECTIONS.md`.
- [ ] Reset `main` to clean: remove `docs/research/**` + `docs/reports/**` + superseded docs/logs;
      keep guidelines/standards + new docs + tooling; commit; `git push origin main` clean.
- [ ] Archive old design worktrees (`fable`, `opus-a`, `opus-b`) and the `gemini`/`grok` branches to
      `_legacy` — uninstall `node_modules`/`.next` first; branches remain safe on `origin`.
- [ ] Cut five new lane branches + worktrees from the clean `main` commit; `pnpm install` each; push branches.

### WS1 — Five parallel design lanes (the long-running session)

- [ ] Each Opus lane builds its full UI from its assigned real template to the per-lane Definition of
      Done (`design-goal.md`). Two fresh-context passes per lane, gated per the orchestration loop.
      Lanes are independent (disjoint ownership) and run in parallel.

### WS2 — Side-by-side local preview (session end)

- [ ] Orchestrator runs each worktree on its own port (`3001`–`3005`) and prints the five labeled local
      URLs for owner review. The session ends here.

### Later (separate decision — out of this session)

- Owner selects one lane → merge to `main` → harden → deploy to Vercel → map project subdomains
  (`registry.`/`harness.`/`orchestra.`/`intercal.`/`collectiva.jami.studio`).

## Locked decisions

- Reuse the shared data contracts + token schema verbatim; lanes own preset VALUES, visual treatment,
  component styling, and page composition only.
- Build the full intended marketing surface — not a gated launch page, status dashboard, or dev log.
- Two aesthetic lanes available (A: dark/grainy/textured — preferred; B: clean/light editorial); each
  branch picks/blends and executes to a world-class standard.
- Dark **and** light themes, fully responsive across mobile/tablet/desktop.
- Five lanes, all Opus 4.8, from the same clean `main` foundation commit, each on its own pushed branch.
- Keep AI-readability a core build output; keep the token system registry-ready.
- Deploy target is code on Vercel (later); Framer is the design source, not the host.

## Scope boundaries

- **In:** full visual rebuild over the shared foundation; both themes; grain/motion; reusable composable
  components; per-lane verification; five local previews.
- **Out:** implementing any product runtime; selection/merge/deploy (separate); forking the shared
  content/route/metadata/AI/token machinery; secrets in tracked files.

## Dependency map

WS0 (connection verified + clean `main`) → WS1 (five lanes cut from that clean commit, parallel) → WS2
(previews once all lanes meet DoD). Selection/merge/deploy is a later, separate decision.
