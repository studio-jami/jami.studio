# Orchestration State — jami.studio design rebuild (RUN 3)

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
- ✅ reference-brief.md §0 RUN 3 OVERRIDE added (supersedes "never clone" + light-lane assignments).
- ✅ Five per-lane roadmaps rewritten with concrete template blueprints + signature elements + honest-sub maps.
- ⏳ Worktree sync + verification + EXECUTE dispatch — IN PROGRESS.

## Checkpoint log

Status legend: PENDING · DISPATCHED · RUNNING · DONE(execute) · SHOT(captured) · GATE-PASS · GATE-FAIL(reason) · AUDITING · CLOSED.

| Lane | Pass | Agent id | Dispatched | Status | Screenshot verdict | Next action |
|---|---|---|---|---|---|---|
| message-ai | 1 EXECUTE | — | — | PENDING | — | dispatch |
| nouva | 1 EXECUTE | — | — | PENDING | — | dispatch |
| kirimo | 1 EXECUTE | — | — | PENDING | — | dispatch |
| noir | 1 EXECUTE | — | — | PENDING | — | dispatch |
| synk | 1 EXECUTE | — | — | PENDING | — | dispatch |

## Notes

- The single most important gate: each lane's `/` must LOOK LIKE its template render and unlike the other four.
  Trust the pixels over any agent's self-report (run-2's log claimed distinct IAs; the renders proved otherwise).
- Never push to `main` from a lane agent. Each agent stays strictly in its own worktree.
- Re-deposit extractions if missing: `node tools/framer-bridge/inspect.mjs <lane>` from `main` → copy
  `out/<lane>.*` into the worktree (gitignored).
