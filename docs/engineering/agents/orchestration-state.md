# Orchestration State — jami.studio design rebuild (RUN 4)

> **CLOSED — DECIDED 2026-06-12: Kirimo** is the chosen direction for the OSS hub (Synk runner-up, earmarked
> for per-product pages). Decision + pending tweaks + resume plan: `docs/decisions/2026-06-12-design-direction-kirimo.md`.
> Branch sprawl pruned locally to `main` + `design/kirimo-2` (GitHub branches left intact for now); loser
> worktrees removed; Kirimo worktree kept. Kirimo not yet merged to `main` — that's resume step 1.

## RUN 4 (2026-06-12) — owner directive: image-rich faithful reproduction

Run 3 failed: builds were empty dark text-boxes (section names without visual surfaces), nouva-2
`bbd6e4f` REJECTED. Root cause: roadmaps mandated CSS-only atmosphere; nothing forced the template's
actual visual content; the orchestrator gated nouva against prose, not the render.

Run-4 fixes (all in effect):
1. **Generated photography.** All photo surfaces filled with ORIGINAL Grok/Gemini images
   (`agent-tools/assets/MANIFEST.md`; 38 images QA'd by orchestrator; deposited per-lane at
   `public/assets/`). Grok CLI + Gemini CLI verified engines (codex hung; not needed for stills).
   Synk needs no photos (dot-matrix/lattice/micro-UI in CSS).
2. **Roadmaps amended** (committed `6ad95dc` on main + synced to worktrees): per-lane "Visual assets"
   table; CSS-only atmosphere rule replaced; "no empty boxes where the template shows imagery" is an
   acceptance criterion.
3. **Mid-flight gates.** Every lane agent captures `screenshots/checkpoint-home-1440.png` the moment
   home assembles + writes `checkpoint-notes.md`; the orchestrator READS each checkpoint against the
   sliced template render (`agent-tools/template-slices/<lane>-NN.png`) and intervenes/redispatches
   on drift. Final gate unchanged: fidelity + divergence judged by eye against `out/<lane>.home.png`.
4. **Worktrees reset** to HEAD (run-3 uncommitted slop dropped; stale screenshots removed).

### Run-4 dispatch log (2026-06-12, in-session background agents, ports 3001-3005)

Wave 1 (a588…/a0e5…/a546…/a274…/abd3…) was killed by the shared session limit ~10-14 min in — partial
WS1-WS3 work left live in each worktree, none reached a checkpoint. Post-mortem: several wave-1 agents
downloaded framerusercontent.com assets into `public/framer/` (copyright violation) — purged from all
worktrees; wave-2 prompts carry an explicit prohibition. Wave 2 resumes the partial work after limit reset.

| Lane | Agent (wave 2) | Commit | verify | Final verdict (orchestrator, by eye vs out/<lane>.home.png) |
|---|---|---|---|---|
| message-ai | a7b06337729331f78 | c02bf54 | green | **GATE-PASS** — full-bleed god-ray dusk photo hero, ghost-pill labels, 48px cards with photo+UI-chip interiors, use-case tabs panel, 01-02-03 steps, 6-card grid, proof band, photo CTA bookend. Warm-black, lime sparingly. Reads as Message AI. |
| nouva | abd45766f4c1f980c | 0f83b56 | green | **GATE-PASS** — checkpoint issues (light bg / serif / blank cards) ALL FIXED in final: dark #080c12 void, Onest sans, dusk-photo hero, staggered 5/4/1 count-up stats, three-shifts cards with photo tops + glass micro-UI, sticky features, comparison, masonry, open-core, photo CTA card. Reads as Nouva. |
| kirimo | affd67bed7648db14 | a4596c5 | green | **GATE-PASS** — numbered eyebrows, big sand uppercase headline, full-bleed editorial-photo auto-slider, terra-cotta OPEN accordion panel, sand-on-near-black, AI-index list rows, colossal "JAMI STUDIO" footer ticker. Reads as Kirimo zine. |
| noir | a6438806f2d2ddaee | aec47a7 | green | **GATE-PASS** — asymmetric split hero w/ torus media + mono micro-labels + product ticker, WORKS⑤ colossal heading, asymmetric over-spaced color-cast work grid, SERVICES④ divider list, crimson-burst CTA, colossal full-bleed "JAMI" footer wordmark. Reads as Noir. |
| synk | a96d699cf598f2e79 | de91979 | green | **GATE-PASS** — dashed-border lattice (gap=0 seams), dot-matrix backgrounds, diagonal-hatch divider bands, embedded micro-UI feature cards (waveform/checklist/tag-cloud), pixel-heart product selector, dotted CTA vortex, 4-col footer. Reads as Synk. (polish note: hero vortex faint.) |

**DIVERGENCE GATE: PASS.** Side by side the five read as five different studios — cinematic warm-black (message-ai) vs blue-black glass-UI void (nouva) vs sand editorial zine (kirimo) vs high-contrast colossal-wordmark agency (noir) vs systematized dashed-lattice dot-matrix (synk). No shared generic spine. The opposite of run-3's five-color-skeleton failure.

All five: `pnpm verify` exit 0 (orchestrator re-ran, not just agent claim); `public/assets/` generated images tracked in-commit (synk uses none); no `public/framer` template-asset leakage; working trees clean.

### CLOSED (2026-06-12)

- **Pushed:** all five `design/<lane>-2` remote in sync with final SHAs (agents pushed their own; verified local==origin).
- **Served (production `next start` from verified builds):** message-ai :3001 · nouva :3002 · kirimo :3003 · noir :3004 · synk :3005 — all 200, homes contain real content, generated photo assets return 200 (hero.png/slide-1.png/hero-torus.png confirmed live, not 404).
- **Both gates PASS:** fidelity (each `/` reads as its template render) + divergence (five distinct studios).
- Run-4 unlock vs run-3: (1) fill template photo surfaces with ORIGINAL Grok/Gemini imagery deposited at `public/assets/`, not CSS-only boxes; (2) orchestrator gated final shots by eye against `out/<lane>.home.png` slices — caught + fixed nouva's light-bg/serif drift; (3) purged agents' `public/framer` template-asset downloads (copyright).

Wave 2 output files were empty on Codex resume; no terminal handoff was available. Treat those Claude agents as
STALE and trust only the live worktree state plus screenshots. Fresh Codex worker replacements were dispatched
2026-06-12T11:11:55-04:00. They were instructed to continue from the current live partial edits, not reset useful
work, and to verify/screenshot/commit locally only.

| Lane | Agent (Codex replacement) | Status | Ownership boundary | Next coordinator action |
|---|---|---|---|---|
| message-ai | 019ebc62-2c94-7260-99b5-3aac01ff0804 | PUSHED `c02bf54` | `../jami.studio-message-ai-2`, port 3001, Message AI lane presentation only | Initial light render rejected; dark correction GATE-PASS by orchestrator screenshot review; worker `pnpm verify` + route/theme/breakpoint smoke passed |
| nouva | 019ebc62-87e3-7cc1-8185-b0354c238205 | PUSHED `0f83b56` | `../jami.studio-nouva-2`, port 3002, Nouva lane presentation only | GATE-PASS by orchestrator screenshot review; worker `pnpm verify` + full route/theme/breakpoint smoke passed |
| kirimo | 019ebc62-decd-7061-923a-10c7f5804af8 | PUSHED `a4596c5` | `../jami.studio-kirimo-2`, port 3003, Kirimo lane presentation only | GATE-PASS by orchestrator screenshot review; worker `pnpm verify` + full route/theme/breakpoint smoke passed |
| noir | 019ebc63-3990-7b43-8781-3d1dbe8cd866 | PUSHED `aec47a7` | `../jami.studio-noir-2`, port 3004, Noir lane presentation only | GATE-PASS by orchestrator screenshot review; worker `pnpm verify` + route/theme/breakpoint smoke passed |
| synk | 019ebc63-91c6-7532-bbc7-2852c4d33506 | PUSHED `de91979` | `../jami.studio-synk-2`, port 3005, Synk lane presentation only | GATE-PASS by orchestrator screenshot review; worker `pnpm verify` + full route/theme/breakpoint smoke passed |

Closeout: all five lanes are pushed to origin, pass the orchestrator screenshot fidelity/divergence gate, and
have local preview servers listening on ports 3001-3005 for side-by-side review.

---

# (superseded) Orchestration State — RUN 3

Durable checkpoint for the orchestrator (per `orchestration-reliability.md`). Source of truth is the live
worktree + git state + the rendered screenshot; this file mirrors it so the run is resumable if the
coordinator context is interrupted. **Not committed to `main` as truth** — working mirror.

Re-scaffolded: 2026-06-11 (run 3). Brief: `docs/engineering/agents/design-goal.md`.
Roadmaps (one per lane): `docs/roadmaps/2026-06-11-design-rebuild-<lane>.md`.

## What changed from run 2 (why run 3)

Run 2's five lanes converged into one generic skeleton (Hero → features → showcase grid → proof → callout →
FAQ → CTA) in five palettes. Two root-cause bugs, both fixed:

1. **"Borrow the DNA, never clone" mandate** (design-goal + reference-brief §1/§3) let every agent invent the
   same skeleton and recolor it. → **Reversed:** lanes now **faithfully reproduce their template** (real
   structure, colors, textures, components), per a concrete section-by-section blueprint baked into each
   roadmap from the template's real `pageTrees` + render.
2. **Nouva and Synk were assigned "light editorial / systematized light"** — but the real templates are
   **DARK**. → Corrected: all five templates are dark; template-true accents replace the prior "locked brand
   palette" (still authored as tokens, swappable).

Plus a new hard gate: **screenshot fidelity + cross-lane divergence**, judged by the orchestrator by eye
against `out/<lane>.home.png` and side-by-side. Build-green is necessary, not sufficient.

## Template blueprints (extracted 2026-06-11, run 3)

| Lane | Template | Canvas | Accent | Signature (must reproduce) |
|---|---|---|---|---|
| message-ai | Message AI | warm near-black `#0a0908` | lime `#e8ff9c` | volumetric-light glow bookends + grain; centered hushed; 48px matte cards; ghost-pill labels; 2 horizontal slideshows; 01-02-03 steps; scroll cue |
| nouva | Nouva | blue-black `#080c12` | neon-lime `#8cff2e` | dusk-photo hero (CSS) + blur-up; charcoal cards on void w/ 5% hairline seams; staggered count-up stat row; sticky features; us-vs-them comparison panel; light pill buttons |
| kirimo | Kirimo | near-black `#0d0d0d`, sand fg `#b7ab98` | terra-cotta `#eb5939` | auto-play project slideshow; 136px "JAMI STUDIO" ticker; numbered service accordion; hairline rules + vertical dividers; uppercase numbered eyebrows |
| noir | Noir | near-black `#1a1a1a` | copper `#ed4515` | asymmetric over-spaced 5-project grid; divider services list; ONE inverted white stats section (grain + counters); vertical guide-lines; colossal "JAMI" footer wordmark; mono micro-labels |
| synk | Synk | near-black `#030303` | coral `#ff5e5d` | dashed-border card lattice (gap=0 seams); explicit dashed Divider between every section; ASCII/grid shader bg; embedded micro-UI feature cards; 5-product integration lattice |

## Model

Per lane, sequential goal sessions: Pass 1 EXECUTE → Pass 2+ AUDIT/FIX until quiet (≥2 passes). Always
audit/execute. Lanes parallel (disjoint worktrees). PUSH OVERRIDE: agents commit locally + report SHA; the
orchestrator pushes each `design/<lane>-2` from `main`. End state: 5 `next dev` on ports 3001–3005, labeled
URLs + screenshot set printed for review, all passing the fidelity + divergence gate.

## Lane map

| Lane | Branch | Worktree | Port | Roadmap |
|---|---|---|---|---|
| message-ai | design/message-ai-2 | ../jami.studio-message-ai-2 | 3001 | …-message-ai.md |
| nouva | design/nouva-2 | ../jami.studio-nouva-2 | 3002 | …-nouva.md |
| kirimo | design/kirimo-2 | ../jami.studio-kirimo-2 | 3003 | …-kirimo.md |
| noir | design/noir-2 | ../jami.studio-noir-2 | 3004 | …-noir.md |
| synk | design/synk-2 | ../jami.studio-synk-2 | 3005 | …-synk.md |

## Setup status (2026-06-11, run 3)

- ✅ design-goal.md rewritten (faithful-reproduction mandate + screenshot gate + dark-palette correction).
- ✅ reference-brief.md FULLY rewritten around faithful template reproduction (legacy "never clone / two
  aesthetic lanes / content-jobs-menu" framing removed, not just overridden).
- ✅ Pristine pass: `docs/_legacy/` deleted; retire-to-`_legacy` convention replaced with "delete; git
  history is the archive" across AGENTS.md + docs index + 3 standards docs; bridge README + projects.config
  refreshed to template-true all-dark characters. Committed to `main` (`aec09bf`).
- ✅ Five per-lane roadmaps rewritten with concrete template blueprints + signature elements + honest-sub maps.
- ✅ Worktree sync: all five worktrees on-branch, clean tree, run-3 roadmap + brief identical to main,
  `_legacy` removed on-branch, out/ artifacts present. (Bug caught + fixed: a `git checkout main -- docs/security`
  in the first sync aborted the whole checkout because that path is untracked on main — re-synced with only
  main-tracked paths.)
- ✅ Five EXECUTE goal sessions DISPATCHED 2026-06-11 as background agents (model: opus). PUSH OVERRIDE in
  effect: agents commit locally + report SHA; orchestrator pushes. Screenshot gate: orchestrator captures `/`
  per lane on ports 3001–3005 and compares to `out/<lane>.home.png` + side-by-side.

## Checkpoint log

Status legend: PENDING · DISPATCHED · RUNNING · DONE(execute) · SHOT(captured) · GATE-PASS · GATE-FAIL(reason) · AUDITING · CLOSED.

Note: first EXECUTE wave (2026-06-11) was cut off mid-build by the shared session limit — none committed,
screenshotted, or finished; each left uncommitted partial work in its worktree at a different stage
(synk barely started, kirimo furthest). Re-dispatched 2026-06-12 to pick up the partial work and finish.

| Lane | Pass | Agent id | Dispatched | Status | Screenshot verdict | Next action |
|---|---|---|---|---|---|---|
| message-ai | 1 EXECUTE (resumed) | aec977c18c9350b5c | 2026-06-12 | RUNNING | — | await completion → capture `/`@3001 → gate vs out/message-ai.home.png |
| nouva | 1 EXECUTE (resumed) | a612e92abb3b52ff3 | 2026-06-12 | DONE+COMMITTED bbd6e4f | GATE-PASS — faithful Nouva: dark void, charcoal cards on hairline seams, neon-lime accent, staggered count-up stats, us-vs-them comparison panel, 5-project masonry, card-on-void CTA. Distinct. Serving :3002 | ✅ orchestrator closed out (agent built design but died at closeout; I built+committed+screenshot) |
| kirimo | 1 EXECUTE (resumed) | a6c4879beefba08ed | 2026-06-12 | RUNNING | — | await completion → capture `/`@3003 → gate vs out/kirimo.home.png |
| noir | 1 EXECUTE (resumed) | a184ad8394b50c008 | 2026-06-12 | RUNNING | — | await completion → capture `/`@3004 → gate vs out/noir.home.png |
| synk | 1 EXECUTE (resumed) | aa599e4cf45bc0af2 | 2026-06-12 | RUNNING | — | await completion → capture `/`@3005 → gate vs out/synk.home.png |

## Notes

- The single most important gate: each lane's `/` must LOOK LIKE its template render and unlike the other four.
  Trust the pixels over any agent's self-report (run-2's log claimed distinct IAs; the renders proved otherwise).
- Never push to `main` from a lane agent. Each agent stays strictly in its own worktree.
- Re-deposit extractions if missing: `node tools/framer-bridge/inspect.mjs <lane>` from `main` → copy
  `out/<lane>.*` into the worktree (gitignored).
