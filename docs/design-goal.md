# Design Goal — jami.studio Marketing Site Rebuild (5 Opus Lanes)

Date: 2026-06-10
Status: [~] Active — connection + repo setup (WS0) in progress; long-running design session not yet started.
Active roadmap: `docs/roadmaps/2026-06-10-jami-studio-design-rebuild.md`
Design guidelines: `docs/design/reference-brief.md`
Connection record: `tools/framer-bridge/CONNECTIONS.md`
Orchestration reliability: `docs/engineering/agents/orchestration-reliability.md`
Owner: Jamie

This is the single standing brief for the long-running design session. Subagents work from the active
roadmap and the reference brief; this file is the coordinator's mission and the acceptance bar.

## Mission

The shared site foundation lives on `main`: a Next.js 16 / React 19 app with a token/dial contract, a
centralized content registry, route/metadata helpers, and generated `robots`/`sitemap`/`llms` surfaces.
The foundation is good and is reused **verbatim**. The current visual design is not acceptable. This
session rebuilds the landing + marketing + project pages to a world-class, production-grade,
design-studio standard.

The rebuild runs as **five complete, parallel design lanes**. Each lane is built by an **Opus 4.8**
agent on its own synced branch/worktree cut from the same clean `main` commit, and each is assigned
**one real Framer reference template** to build that visual direction. Heterogeneous models (Fable,
Gemini, Grok) were tried in the prior run and did not beat Opus, so all five lanes run Opus 4.8 — spend
the credits where they pay off.

Why this run is different from the last: the prior lanes were built from *synthesized DNA*
(screenshots + marketplace listings) because no real template was reachable (old reference-brief §13).
Now each template is live in a dedicated Framer project, read headless via the Framer Server API, so
every lane builds from the **real exported structure** of its template — not a guess.

## Hard prerequisite — NO BLOCKERS

WS1 (the design lanes) does not begin until the Framer connection is **verified and documented in the
repo**:

- Each lane's template is in a dedicated Framer project, reachable via the Framer Server API with a
  per-project key in `tools/framer-bridge/.env` (gitignored).
- `node tools/framer-bridge/inspect.mjs` returns real structure for **all five** projects.
- `tools/framer-bridge/CONNECTIONS.md` records project ↔ lane, verification status, and date — no secrets.

Owner + agent connect and verify together before work begins. **Open item:** the five `*_PROJECT_URL`
values in `.env` (the API keys are already in place).

## Lane mapping (owner preference order)

| # | Lane / branch | Worktree | Template | Character |
|---|---|---|---|---|
| 1 | `design/message-ai` | `../jami.studio-message-ai` | Message AI | Lane A — cinematic dark (prime) |
| 2 | `design/nouva` | `../jami.studio-nouva` | Nouva | bold studio/agency portfolio |
| 3 | `design/kirimo` | `../jami.studio-kirimo` | Kirimo | immersive creative portfolio |
| 4 | `design/noir` | `../jami.studio-noir` | Noir | dark agency-portfolio IA |
| 5 | `design/synk` | `../jami.studio-synk` | Synk | token-driven / systematized |

A different real template per lane is the mechanism that makes the five genuinely diverge instead of
converging on the same defaults. All five clear the same bar; the visual system differs.

## Definition of Done — per lane (the qualification bar)

This is a major credit spend. It is **not** a throwaway, a prototype, or a 90% sketch. The point is to
see exactly how our site looks and feels in each visual direction, fully realized. A lane is "done"
only when it is built into a shape appropriate for our codebase and **completely designed, top to
bottom**:

- **Every page**, fully designed: `/` (home), `/projects` (index), and `/projects/[slug]` for all five
  products. No stub pages, no half-styled sections.
- **Every link and CTA** resolves through the content layer (`project.ctas`, `site.*`) — never a
  hand-built href, nothing dead.
- **Every component** from reference-brief §10 — global, composable, token-driven. Zero one-off styling.
- **Both themes** (dark + light) fully designed; **all four breakpoints** (1440 / 1024 / 768 / 390) clean.
- Grain/atmosphere + restrained motion per the brief; `prefers-reduced-motion` honored.
- Token-driven only: author your own preset VALUES through `src/tokens/*`; no hardcoded hex/px where a
  token role belongs.
- AI surfaces intact: metadata, `sitemap.xml`, `robots.txt`, `llms.txt`, clean heading order, static-first.
- `pnpm verify` green (lint + typecheck + test + build).
- Reference-brief §14 anti-slop checklist passes. Nothing reads "fine" — it reads world-class.

Drive each lane **all the way home**. Do not stop at 90%, do not hand off mid-section, do not leave a
page or breakpoint for later. A lane that stops short is not done and does not close.

## End state of this session

When all five lanes are complete and polished, the orchestrator brings them up for side-by-side review:

- Run each lane's worktree on its **own local port** (e.g. `3001`–`3005`, one `next dev` per worktree).
- Print the five live local URLs in the response, labeled by lane + template, for the owner to compare.

The session's scope **ends** at "five lanes live on separate local hosts, ready to review."
**Selection, merge to `main`, hardening, and Vercel deploy are a separate, later decision** — not part
of this session.

## Orchestration (retained workflow)

The coordinator is not an implementation worker. It protects the main context, sequences work,
dispatches focused subagents, collects results, and keeps the roadmap/status coherent. It does not
personally write lane code, comb the repo, or run verification as the primary worker.

Per lane:

1. Dispatch a fresh-context Opus subagent with the reusable lane prompt below.
2. Immediately checkpoint the dispatch in the active roadmap (agent id, lane, pass, ownership boundary,
   dispatch time, next coordinator action).
3. Poll in short intervals (60–120s) per `orchestration-reliability.md`. A timed-out poll is **not** a
   stopping point — keep polling until every dispatched subagent returns a terminal result, is closed,
   or is replaced by a new checkpointed dispatch.
4. On return, checkpoint the result and gate it. Run each lane through **at least two fresh-context
   passes**; a quiet second pass means likely ready, substantial changes mean dispatch another.
5. Never leave the only source of orchestration state in the coordinator's context window.

Lanes are independent and have **disjoint ownership** (each owns only its own branch/worktree), so they
run in parallel. Never run two agents on the same lane simultaneously.

### Source-truth & secret rules

- The roadmap is a guide, not proof. Check the live repo/worktree before marking a lane done.
- Keep route, repo, subdomain, docs, API, CTA, social, metadata, and project-card data centralized.
- Do not implement any product runtime (Harness, UI Registry, Orchestra, Intercal, Collectiva).
- **Two secret lanes, kept separate:** (1) operator/automation scope — GitHub, Vercel, Framer Server
  API keys the agent uses to build/deploy; (2) app runtime secrets — only in gitignored `.env`, Vercel
  env, or the host store. Never write any secret into a tracked file. Framer keys live only in
  `tools/framer-bridge/.env`.

### Reusable lane prompt

```text
Working from: `docs/roadmaps/2026-06-10-jami-studio-design-rebuild.md` (active roadmap),
`docs/design-goal.md` (acceptance bar), and `docs/design/reference-brief.md` (design guidelines).
The live worktree is the source of truth, not roadmap claims.

You own ONE lane only: <BRANCH> (<TEMPLATE>) in worktree <WORKTREE>. Do not touch any other lane.

<APPEND PER-LANE STEERING HERE>

Build the complete jami.studio marketing site for this lane, in the <TEMPLATE> visual direction, to the
per-lane Definition of Done in `docs/design-goal.md`. Use the REAL template structure:
- Read `tools/framer-bridge/out/<lane>.json` (exported Framer structure for your template) and, if
  helpful, run `node tools/framer-bridge/inspect.mjs <lane>` for fresh structure, and
  `node tools/framer-bridge/export.mjs <lane>` to pull React components into `src/framer/`.
- Borrow the template's DNA (structure, rhythm, type, craft); never ship a reskinned clone. Translate
  it into our content and token system.

Reuse VERBATIM (do not fork): `src/content/*`, `src/lib/*`, `src/tokens/{schema,presets,css-vars}.ts`,
`src/registry/manifest.ts`. Build entirely fresh: all of `src/components/*`, all `src/app/**`
presentation, `globals.css`, and your own token preset VALUES (incl. your dark theme).

Standards: Windows dev host (PowerShell / git-bash; `rg` for search). Token-driven only — no hardcoded
hex/px where a token role belongs. Hrefs come from the content layer, never hand-assembled. Keep public
copy polished and developer-credible — no placeholder/"coming soon"/status-apology language. Keep the
AI surfaces (metadata, sitemap, robots, llms.txt) wired and correct. No mocks, fake metrics, fake
logos, or secrets.

Verify before returning: `pnpm verify` (lint + typecheck + test + build) green; smoke `/`, `/projects`,
and a `/projects/[slug]` at desktop + mobile in both themes; reference-brief §14 anti-slop checklist
passes.

Before final response: stop any helper processes; stage only intentional changes; conventional-style
commit subject with a HEREDOC body; `git push origin <BRANCH>` (your lane branch — NOT main). Summarize
changed files, verification result, remaining gaps, and commit SHA + push result. Do not stop at 90% —
if anything in the Definition of Done is incomplete, keep going.
```

## Closeout (session)

- All five lanes meet the per-lane Definition of Done and are pushed to their branches.
- `CONNECTIONS.md` shows all five verified.
- Orchestrator prints the five local preview URLs for review.
- No secrets in tracked files; no stray helper processes left running.
