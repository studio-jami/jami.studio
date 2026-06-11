# Design Goal — jami.studio Marketing Rebuild (Orchestrator Brief)

Date: 2026-06-10
Status: [~] Active — connection verified; lane goal sessions not yet started
Active roadmap: `docs/roadmaps/2026-06-10-jami-studio-design-rebuild.md`
Design guidelines: `docs/design/reference-brief.md`
Connection record: `tools/framer-bridge/CONNECTIONS.md`
Orchestration reliability: `docs/engineering/agents/orchestration-reliability.md`
Owner: Jamie

> **This is the ORCHESTRATOR's document. Agents never see it.** The owner points the orchestrator (an
> Opus 4.8 coordinator) at this file to run the session. Each lane agent instead receives only: (1) its
> lane's roadmap in the worktree (`docs/roadmaps/2026-06-10-jami-studio-design-rebuild.md`), (2)
> `AGENTS.md`, and (3) the pasted goal-session prompt from the bottom of this file. Keep this file as the
> deterministic operating contract; keep the roadmap as the work.

## Mission

The shared site foundation lives on `main`: a Next.js 16 / React 19 app with a frozen token contract
(`schema.ts` + `css-vars.ts`), a centralized content registry, route/metadata helpers, and generated
`robots`/`sitemap`/`llms` surfaces. The foundation is reused **verbatim**. The current visual design is
not acceptable. This session rebuilds the landing + marketing + project pages to a world-class,
production-grade, design-studio standard across **five lanes**, each an Opus 4.8 build on its own
branch/worktree, each assigned one real Framer reference template (read headless via the Server API).
Heterogeneous models were tried before and did not beat Opus — all five lanes run **Opus 4.8**.

## Execution model — goal sessions, always audit/execute

This rebuild does **not** fan a lane out into many parallel workstream subagents. Each lane is one
worktree owned end-to-end by a full goal session. Per lane, the orchestrator runs goal sessions **in
sequence**:

1. **Pass 1 — EXECUTE.** One fresh Opus 4.8 goal session builds the lane end-to-end against its roadmap
   (WS1→WS7), verifies, commits, and pushes the lane branch.
2. **Pass 2 — AUDIT / FIX.** A fresh Opus 4.8 goal session audits the lane against the roadmap
   Acceptance Criteria + `reference-brief.md` §14 + the Definition of Done, and **fixes every gap in the
   same session**. Verifies, commits, pushes.
3. **Repeat** the audit/fix pass until one lands with **no substantial changes** (a quiet pass). Run at
   least two passes total; run more whenever the prior pass changed real work. This repeated
   audit/execute loop is what catches and fixes lazy or incomplete work — it is the point, not overhead.

**Always audit/execute. Never dispatch a read-only or audit-only agent.** An auditor that cannot fix is
not used. Every pass leaves the branch better, verified, and committed. The orchestrator's only real
judgment call comes **after the pass-2 (and each later) commit lands**: ship the lane to review, or run
another audit/fix pass.

**Determinism over choice.** Every pass follows the same roadmap, `reference-brief.md`, and Definition
of Done. The plan, contracts, and acceptance criteria are fixed so work stays cohesive and is not
refactored in circles. Agents get craft latitude inside the locked direction (per-lane accent + aesthetic
lane), not freedom to redesign the plan.

**Parallelism.** The five lanes are independent (disjoint worktrees) and run in parallel. Never run two
goal sessions on the same lane at once.

## Hard prerequisite — NO BLOCKERS (satisfied)

Lane work does not begin until the Framer connection is verified and documented — **done 2026-06-10**:
all five templates connect headless via the Server API and `tools/framer-bridge/CONNECTIONS.md` records
verified status. Before a lane's pass-1, the orchestrator (working from `main`, where the root `.env`
lives) runs `node tools/framer-bridge/inspect.mjs <lane>` and deposits `out/<lane>.json` into that
worktree (best-effort `export.mjs` → `src/framer/` too). The lane agent reads those artifacts and never
needs `.env` in its worktree.

## Lane mapping (locked direction per lane)

| # | Lane / branch | Worktree | Template | Primary lane | Accent |
|---|---|---|---|---|---|
| 1 | `design/message-ai` | `../jami.studio-message-ai` | Message AI | A — cinematic dark (prime) | `cyan` |
| 2 | `design/nouva` | `../jami.studio-nouva` | Nouva | B — bold light editorial | `violet` |
| 3 | `design/kirimo` | `../jami.studio-kirimo` | Kirimo | A — immersive dark creative | `rose` |
| 4 | `design/noir` | `../jami.studio-noir` | Noir | A — high-contrast dark agency | `amber` |
| 5 | `design/synk` | `../jami.studio-synk` | Synk | B — systematized light | `green` |

Differentiation is assigned, not left to chance: distinct template + aesthetic lane + accent per branch
guarantees five distinct results that all clear the same bar. Each branch's roadmap carries its own
"Active lane" block.

## Definition of Done — per lane

The lane's full Definition of Done is the roadmap's **Acceptance Criteria**. In short: every page,
every component (`reference-brief.md` §10), every CTA resolving through the content layer, both themes,
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

Paste one of these to the lane agent, with `<BRANCH>`, `<TEMPLATE>`, `<WORKTREE>`, `<LANE-KEY>` filled.
Both reference the lane's own roadmap; neither shows this orchestrator brief.

### Pass 1 — EXECUTE

```text
You own ONE lane only: <BRANCH> (<TEMPLATE>) in worktree <WORKTREE>. Do not touch any other lane, any
other worktree, or `main`.

Work from, in this order: `docs/roadmaps/2026-06-10-jami-studio-design-rebuild.md` (your end-to-end work
order — read the "Active lane" block at the top for your locked accent + aesthetic lane), `AGENTS.md`
(repo operating rules), and `docs/design/reference-brief.md` (art direction). The LIVE worktree is the
source of truth, not roadmap claims.

Use the real template: read `tools/framer-bridge/out/<LANE-KEY>.json` and any `src/framer/` export
already in your worktree. Borrow the template's DNA (structure, rhythm, type, craft) and translate it
into our content + token system; never ship a reskinned clone.

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

Authority documents: `docs/roadmaps/2026-06-10-jami-studio-design-rebuild.md` (Acceptance Criteria +
"Active lane" block), `docs/design/reference-brief.md` (§14 anti-slop checklist + art direction),
`AGENTS.md`. The LIVE worktree is the source of truth.

Audit the whole lane against the roadmap Acceptance Criteria and `reference-brief.md` §14, page by page
(`/`, `/projects`, every `/projects/[slug]`), component by component (§10 inventory), in BOTH themes at
ALL four breakpoints (1440/1024/768/390). For every gap — missing/half-styled section, dead or
hand-built href, hardcoded value where a token role exists, broken breakpoint, weak/inverted light
theme, missing focus ring or AA failure, anti-slop hit, §10 component missing, AI-surface regression —
FIX it in this session. Do not relax the bar; do not refactor the contracts; keep within the lane's
locked accent + aesthetic.

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
