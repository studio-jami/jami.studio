# Design Goal — jami.studio Marketing Rebuild (Orchestrator Brief)

Date: 2026-06-11
Status: [ ] Active — re-scaffolded 2026-06-11 with five **per-lane** roadmaps (each carries its template's
baked-in IA) and fresh `design/<lane>-2` branches; prior run + its single shared roadmap retired to
`docs/_legacy/`; lane goal sessions not yet started
Active roadmaps (one per lane): `docs/roadmaps/2026-06-11-design-rebuild-{message-ai,nouva,kirimo,noir,synk}.md`
Design guidelines: `docs/design/reference-brief.md`
Connection record: `tools/framer-bridge/CONNECTIONS.md`
Orchestration reliability: `docs/engineering/agents/orchestration-reliability.md`
Owner: Jamie

> **This is the ORCHESTRATOR's document. Agents never see it.** The owner points the orchestrator at this file to run the session. Each lane agent instead receives only: (1) its
> own lane roadmap (`docs/roadmaps/2026-06-11-design-rebuild-<lane>.md` — which carries that lane's
> baked-in template IA), (2) `AGENTS.md`, and (3) the pasted goal-session prompt from the bottom of this
> file. Keep this file as the deterministic operating contract; keep the per-lane roadmap as the work.

## Mission

The shared site foundation lives on `main`: a Next.js 16 / React 19 app with a frozen token contract
(`schema.ts` + `css-vars.ts`), a centralized content registry, route/metadata helpers, and generated
`robots`/`sitemap`/`llms` surfaces. The foundation is reused **verbatim**. The current visual design is
not acceptable. This session rebuilds the landing + marketing + project pages to a world-class,
production-grade, design-studio standard across **five lanes**, each a build on its own
branch/worktree, each assigned one real Framer reference template (read headless via the Server API).
The model/provider running the lanes is not assumed here — it is chosen at dispatch time.

## Execution model — goal sessions, always audit/execute

This rebuild does **not** fan a lane out into many parallel workstream subagents. Each lane is one
worktree owned end-to-end by a full goal session. Per lane, the orchestrator runs goal sessions **in
sequence**:

1. **Pass 1 — EXECUTE.** One fresh goal session builds the lane end-to-end against its roadmap
   (WS1→WS7), verifies, commits, and pushes the lane branch.
2. **Pass 2 — AUDIT / FIX.** A fresh goal session audits the lane against the roadmap
   Acceptance Criteria + `reference-brief.md` §14 + the Definition of Done, and **fixes every gap in the
   same session**. Verifies, commits, pushes.
3. **Repeat** the audit/fix pass until one lands with **no substantial changes** (a quiet pass). Run at
   least two passes total; run more whenever the prior pass changed real work. This repeated
   audit/execute loop is what catches and fixes lazy or incomplete work — it is the point, not overhead.

**Always audit/execute. Never dispatch a read-only or audit-only agent.** An auditor that cannot fix is
not used. Every pass leaves the branch better, verified, and committed. The orchestrator's only real
judgment call comes **after the pass-2 (and each later) commit lands**: ship the lane to review, or run
another audit/fix pass.

**Determinism of contracts, divergence of design.** What is fixed across every lane and every pass: the
contracts (content data, token `schema.ts`/`css-vars.ts`, route/metadata layer), the quality bar (roadmap
Acceptance Criteria + `reference-brief.md` §14), and the process (WS1→WS7, verify, commit, push). What is
**NOT** fixed — and **must differ per lane** — is the entire visible design: information architecture, the
set and order of sections, hero treatment, grids, component decomposition, layout, type, and theme
character, each derived from that lane's template. Structural divergence is the deliverable, not a side
effect. **A lane that reproduces another lane's section skeleton has failed, even if it verifies green.**
Agents do not redesign the *contracts*; they absolutely design their own *structure*.

**Parallelism.** The five lanes are independent (disjoint worktrees) and run in parallel. Never run two
goal sessions on the same lane at once.

## Hard prerequisite — NO BLOCKERS (satisfied)

Done 2026-06-10, re-verified + deepened 2026-06-11: each template's **full design system is extracted
headless** via the Server API (`getColorStyles` + `getTextStyles` + `getNodesWithType` +
`framer.agent.getNode`/`getContext`) — `CONNECTIONS.md` has the verified per-template counts. The
artifacts are already deposited in every worktree: `out/<lane>.json` (design brief incl. agent
context), `out/<lane>.full.json` (hierarchical `pageTrees` + flat node arrays), and
`out/<lane>.home.png` (render). If re-extraction is ever needed, the orchestrator (from `main`, where
the root `.env` lives) runs `node tools/framer-bridge/inspect.mjs <lane>` and re-deposits — the `out/`
dir is gitignored, so deposits are file copies, not commits. The lane agent reads those artifacts and
never needs `.env` or the bridge in its worktree. The baseline is proven: `pnpm verify` green on
`main`, worktree `pnpm install` + `next dev -p <port>` smoke-tested (2026-06-11).

## Lane mapping (per-lane roadmap + assigned accent + aesthetic; STRUCTURE is baked into each roadmap)

Each lane's STRUCTURE is no longer left to chance or to the agent's interpretation — it is **extracted from
that template's real `pageTrees` and baked into the lane's own roadmap** (Home IA, detail composition,
component decomposition, anti-fabrication mapping). The agent builds to its roadmap's blueprint; it cannot
collapse to a shared skeleton.

| # | Branch | Worktree | Template | Per-lane roadmap | Primary lane | Primary accent |
|---|---|---|---|---|---|---|
| 1 | `design/message-ai-2` | `../jami.studio-message-ai-2` | Message AI | `…/2026-06-11-design-rebuild-message-ai.md` | A — cinematic dark (prime) | `#175d5e` deep teal (dial `cyan`) |
| 2 | `design/nouva-2` | `../jami.studio-nouva-2` | Nouva | `…/2026-06-11-design-rebuild-nouva.md` | B — bold light editorial | `#854780` magenta (dial `violet`) |
| 3 | `design/kirimo-2` | `../jami.studio-kirimo-2` | Kirimo | `…/2026-06-11-design-rebuild-kirimo.md` | A — immersive dark creative | `#854c63` wine-rose (dial `rose`) |
| 4 | `design/noir-2` | `../jami.studio-noir-2` | Noir | `…/2026-06-11-design-rebuild-noir.md` | A — high-contrast dark agency | `#a1704f` copper (dial `amber`) |
| 5 | `design/synk-2` | `../jami.studio-synk-2` | Synk | `…/2026-06-11-design-rebuild-synk.md` | B — systematized light | `#2b4173` indigo (dial `green` slot) |

Differentiation is assigned, not left to chance — but it is **structural first**, not just palette: each
branch builds its own information architecture and section composition from its distinct template, then
carries its own aesthetic lane + accent. Template + structure + lane + accent together must yield five
sites that read as five different studios. Accent alone is not differentiation. The five accents are the locked brand
palette — `#175d5e` teal, `#854780` magenta, `#854c63` wine-rose, `#a1704f` copper, `#2b4173` indigo —
each authored as a `color.accent` token (→ `--accent`/`--primary`), never a component literal, so every
lane stays swappable/retunable on the token system. Each branch's roadmap carries its own "Active lane"
block.

## Definition of Done — per lane

The lane's full Definition of Done is the roadmap's **Acceptance Criteria**. In short: every page,
every §10 content job expressed in the lane's own structure, every CTA resolving through the content layer, both themes,
all four breakpoints (1440/1024/768/390), token-driven only, grain/motion + reduced-motion, AA contrast
+ focus rings, AI surfaces intact, `pnpm verify` green, §14 anti-slop clean. This is a major credit
spend — not a throwaway, not a prototype, not 90%. Drive each lane all the way home.

## End state of this session

When all five lanes pass their audit/fix gate, the orchestrator brings them up for side-by-side review:

- Run each worktree on its own local port (`3001`–`3005`, one `next dev` per worktree).
- Print the five labeled local URLs (lane + template) in the response for the owner to compare.

Scope **ends** at "five lanes live on separate local hosts, ready to review." Selection, merge to
`main`, hardening, and Vercel deploy are a separate, later decision.

## Orchestration guardrails (retained)

- The coordinator protects the main context; it is **not** the implementation worker. It sequences
  passes, dispatches goal sessions, collects results, and keeps state coherent.
- **Never leave orchestration state only in the context window.** Checkpoint every dispatch and every
  returned result (agent id, lane, pass, ownership boundary, dispatch time, next action) in a tracking
  doc. Poll in short intervals (60–120s) per `orchestration-reliability.md`; a timed-out poll is not a
  stopping point — keep polling until every session returns a terminal result or is re-dispatched.
- **Source truth is the live worktree, not roadmap claims.** Verify before declaring a lane done.
- Keep route/repo/subdomain/docs/API/CTA/social/metadata/project data centralized.
- Do not implement any product runtime (Harness, UI Registry, Orchestra, Intercal, Collectiva).
- **Two secret lanes, kept separate:** (1) operator/automation scope — GitHub, Vercel, Framer Server API
  keys the orchestrator uses to build/deploy/read; (2) app runtime secrets. Both live only in the
  gitignored root `.env`, Vercel env, or the host store — never in a tracked file.

---

## Reusable goal-session prompts

Paste one of these to the lane agent, with `<BRANCH>` (e.g. `design/synk-2`), `<TEMPLATE>`, `<WORKTREE>`
(e.g. `../jami.studio-synk-2`), `<LANE-KEY>` (e.g. `synk`), and `<ROADMAP>` (that lane's
`docs/roadmaps/2026-06-11-design-rebuild-<lane>.md`) filled. Both reference the lane's own roadmap; neither
shows this orchestrator brief.

### Pass 1 — EXECUTE

```text
You own ONE lane only: <BRANCH> (<TEMPLATE>) in worktree <WORKTREE>. Do not touch any other lane, any
other worktree, or `main`.

Work from, in this order: `<ROADMAP>` (your end-to-end work order — read the "Active lane (locked)" block
and the "Home IA — build THIS" blueprint for your baked-in section structure, accent + aesthetic lane),
`AGENTS.md` (repo operating rules), and `docs/design/reference-brief.md` (art direction). The LIVE worktree
is the source of truth, not roadmap claims.

Use the real template — its STRUCTURE, not just its palette: read `tools/framer-bridge/out/<LANE-KEY>.json`
(design brief — tokens, type, fonts, components, agent context), `out/<LANE-KEY>.full.json` (`pageTrees`
= the template's real section structure/rhythm — THIS drives your page composition; flat node arrays =
exact values), and `out/<LANE-KEY>.home.png` (visual anchor) in your worktree. **Build YOUR lane's
information architecture from this template:** its own set and order of sections, its own hero treatment,
its own grids and rhythm, its own component decomposition and naming. Do NOT default to a generic
`Hero → Pillars → Showcase → Proof → FAQ → CTA` skeleton — that uniform skeleton is the exact failure
this rebuild exists to fix, and two lanes must not share a `page.tsx` composition. The `reference-brief.md`
§10 list is a menu of content jobs, not a required structure or order. The ONLY things you reuse verbatim
are the contracts (next paragraph). Translate the template's DNA into our content + token system; never a
reskinned clone, and never a clone of another lane's structure.

Reuse VERBATIM (do not fork): `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`,
`src/tokens/css-vars.ts`, `src/registry/manifest.ts`. Build entirely fresh: `src/tokens/theme.ts` (your
dark + light preset VALUES), all `src/components/*`, all `src/app/**` presentation, and
`src/styles/globals.css`.

Execute the roadmap WS1→WS7 to its Acceptance Criteria. Token-driven only (no hardcoded hex/px where a
token role exists). Hrefs only from the content/route layer. Both themes, all four breakpoints
(1440/1024/768/390). Keep the AI surfaces wired. No placeholder/"coming soon"/status copy, no fake
metrics/logos, no secrets.

Verify before returning: `pnpm verify` green; smoke `/`, `/projects`, a `/projects/[slug]` at desktop +
mobile in both themes; `reference-brief.md` §14 anti-slop passes. Then: stop helper processes; stage only
intentional changes; conventional-style commit subject with a HEREDOC body; `git push origin <BRANCH>`
(your lane branch — NEVER main). Report changed files, verification result, remaining gaps, commit SHA +
push result. Do not stop at 90% — if any Acceptance Criterion is unmet, keep going until it is.
```

### Pass 2+ — AUDIT / FIX (always fixes; never read-only)

```text
You own ONE lane only: <BRANCH> (<TEMPLATE>) in worktree <WORKTREE>. Do not touch any other lane or
`main`. A prior pass built this lane; your job is to AUDIT it against the bar and FIX every gap in this
same session. This is not a report — you leave the branch better, verified, and pushed.

Authority documents: `<ROADMAP>` (Acceptance Criteria + "Active lane (locked)" block + the "Home IA — build
THIS" blueprint), `docs/design/reference-brief.md` (§14 anti-slop checklist + art direction), `AGENTS.md`.
The LIVE worktree is the source of truth.

Audit the whole lane against the roadmap Acceptance Criteria and `reference-brief.md` §14, page by page
(`/`, `/projects`, every `/projects/[slug]`), component by component (§10 inventory), in BOTH themes at
ALL four breakpoints (1440/1024/768/390). For every gap — missing/half-styled section, dead or
hand-built href, hardcoded value where a token role exists, broken breakpoint, weak/inverted light
theme, missing focus ring or AA failure, anti-slop hit, a §10 content job with no home, AI-surface
regression, **structure that has collapsed toward a generic `Hero→Pillars→Showcase→Proof→FAQ→CTA`
skeleton instead of this template's own information architecture** — FIX it in this session. Do not
relax the bar; do not refactor the contracts; keep the lane's accent + aesthetic, but make its
structure unmistakably its template's, not another lane's.

Verify before returning: `pnpm verify` green; smoke the full route × theme × breakpoint matrix; §14
passes with zero true items. Then: stop helper processes; stage only intentional changes;
conventional-style commit + HEREDOC body; `git push origin <BRANCH>` (NEVER main). Report: what you
audited, every fix you made, what (if anything) still falls short, verification result, commit SHA +
push result. If you found and fixed substantial work, say so plainly — the orchestrator will run another
audit/fix pass. The lane closes only when a pass finds nothing substantial left to fix.
```

## Closeout (session)

- All five lanes meet the roadmap Acceptance Criteria and are pushed to their branches.
- Each lane went through execute → audit/fix until a quiet pass.
- `CONNECTIONS.md` shows all five verified.
- Orchestrator prints the five local preview URLs for review.
- No secrets in tracked files; no stray helper processes left running.
