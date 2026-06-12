# Design Goal — jami.studio Marketing Rebuild (Orchestrator Brief)

Date: 2026-06-11
Status: [ ] Active — **run 3**. Re-scaffolded 2026-06-11 after run 2's five lanes converged into one generic
skeleton (Hero → features → showcase grid → proof → callout → FAQ → CTA) in five palettes. Root cause fixed
below. Fresh execute pass dispatched on the existing `design/<lane>-2` branches (their converged work is
replaced, not appended).
Active roadmaps (one per lane): `docs/roadmaps/2026-06-11-design-rebuild-{message-ai,nouva,kirimo,noir,synk}.md`
Design guidelines: `docs/design/reference-brief.md`
Orchestration reliability: `docs/engineering/agents/orchestration-reliability.md`
State checkpoint: `docs/engineering/agents/orchestration-state.md`
Owner: Jamie

> **This is the ORCHESTRATOR's document. Lane agents never see it.** Each lane agent receives only: (1) its
> own lane roadmap, (2) `AGENTS.md`, (3) `docs/design/reference-brief.md`, and (4) the pasted goal-session
> prompt from the bottom of this file.

## Mission

The shared site foundation lives on `main`: a Next.js 16 / React 19 app with a frozen token contract
(`schema.ts` + `css-vars.ts`), a centralized content registry, route/metadata helpers, and generated
`robots`/`sitemap`/`llms` surfaces. The foundation is reused **verbatim**. This session rebuilds the
landing + marketing + project pages across **five lanes**, each on its own branch/worktree, each assigned
one real Framer reference template whose **complete design system is already extracted into the worktree**.

This is a **design bakeoff**: five competing visual directions for the same site, so the owner can pick one.
Five different templates must yield **five sites that read as five different studios** — not one skeleton in
five colors.

## The one rule that matters this run: REPRODUCE YOUR TEMPLATE

Run 2 failed because the mandate was "borrow the DNA, never clone the layout" — an abstraction that let every
agent invent the same generic marketing skeleton and just recolor it. **That mandate is retired.** The new
mandate, in the owner's words:

> **Each agent builds our site USING the template's design — its colors, textures, components, section
> structure, and layout.** Pour OUR content into the template's REAL shape. The build must look like the
> template render (`out/<lane>.home.png`), not like a generic landing page.

Concretely, faithful reproduction means:

- **Section structure & order:** build the template's actual home section sequence, in its order, with its
  treatments — taken from the lane roadmap's "Home IA — BUILD THIS" blueprint (extracted from the real
  `pageTrees`). Not the §10 menu order. Not another lane's order.
- **Colors:** use the template's real palette — its canvas, surfaces, borders, foreground, muted, and its
  **own accent** (Message AI lime, Nouva neon-lime, Kirimo terra-cotta, Noir copper, Synk coral). Authored
  as `color.accent`/surface tokens in the lane's `theme.ts` — token-driven, never a component literal — but
  the **rendered hex is the template's**, overriding the old "locked brand palette."
- **Texture & motion:** reproduce the template's atmosphere — grain, glow, dividers, lattice, tickers,
  slideshows, sticky stacks, count-up numbers, marquees — whatever its signature is. **Run-4 owner
  directive:** the template's PHOTOGRAPHIC surfaces are filled with ORIGINAL images generated via
  Grok/Gemini (deposited per lane at `public/assets/`, mapped in the roadmap's "Visual assets" table);
  CSS grain/glow/overlays layer on top. **Never download the template's own copyrighted images/videos.**
  Empty flat boxes where the template shows imagery = a failed lane.
- **Component vocabulary:** name and split components after the template's real sections (its blueprint lists
  them), not a shared inventory. Two lanes must not share a `page.tsx` composition or component set.

**ALL FIVE TEMPLATES ARE DARK.** Run 2's "Nouva = light editorial" and "Synk = systematized light"
assignments were wrong against the real templates and are corrected to dark here. Each lane ships a dark
primary theme true to its template **plus** a working light theme (the contract requires both), but the
template's character is dark — do not invent a light-primary design.

**Honest substitution (anti-fabrication still absolute).** Templates contain slots we have no real data for —
client-logo walls, testimonial quotes, ROI stats, pricing tiers, blog feeds. Keep the template's *treatment*
(the marquee, the stat row, the testimonial block, the pricing panel, the blog grid) but fill it with our
**real** content via honest remaps the roadmap specifies: proof-line instead of fake logos, real proof points
instead of invented quotes, real counts (5 products, 4 foundations, 1 shared source) instead of fake metrics,
an open-core panel instead of price tiers, the AI index instead of fake blog posts. Never fabricate.

## Execution model — goal sessions, always audit/execute

Each lane is one worktree owned end-to-end by a full goal session. Per lane, sequential passes:

1. **Pass 1 — EXECUTE.** A fresh goal session rebuilds the lane to its roadmap's template blueprint (WS1→WS7),
   verifies, captures screenshots, commits. Reports screenshot paths + SHA.
2. **Pass 2 — AUDIT / FIX.** A fresh goal session audits the lane against the roadmap Acceptance Criteria +
   `reference-brief.md` §14 + **template fidelity** (does the screenshot look like `out/<lane>.home.png`?) and
   **fixes every gap in the same session**. Re-captures, verifies, commits.
3. **Repeat** audit/fix until a quiet pass (no substantial changes). At least two passes total.

**Always audit/execute. Never a read-only auditor.** Every pass leaves the branch better, verified, committed.

## Screenshot gate — the new hard gate (owner-mandated)

Build-green + anti-slop never measured cross-lane difference or template fidelity, so nothing caught the
convergence. This run adds a visual gate the orchestrator enforces directly:

- **Each agent captures and reports screenshots.** After the home is first assembled (mid-session self-check)
  and again at closeout: full-page `/` at 1440 and 390, and `/projects` at 1440, saved to
  `screenshots/<lane>-home-1440.png` etc. in the worktree, paths reported. The agent self-checks its home
  screenshot against `out/<lane>.home.png` before polishing — if it doesn't read as the same template, fix
  before continuing.
- **The orchestrator reads every screenshot and judges two things, by eye:**
  1. **Fidelity** — does the built `/` look like its template render `out/<lane>.home.png`? (same structure,
     palette, signature elements present)
  2. **Divergence** — do the five built `/` screenshots look like five different studios? Lay them side by
     side; if any two share the generic spine, that's a failure.
- **Kill / fix rule.** A lane whose screenshot doesn't match its template, or collapses toward the generic
  spine, is **rejected**: the orchestrator fixes the lane's roadmap/prompt directions that allowed the drift,
  then re-dispatches a fresh pass. A green build with a wrong-looking page is a failed lane, full stop.

The orchestrator does not declare the run done until all five screenshots pass both gates.

## Lane mapping (template-true accent + character; STRUCTURE baked into each roadmap)

| # | Branch | Worktree | Template | Per-lane roadmap | Character (all DARK) | Accent (template-true) | Dial slot |
|---|---|---|---|---|---|---|---|
| 1 | `design/message-ai-2` | `../jami.studio-message-ai-2` | Message AI | `…-message-ai.md` | cinematic warm-black, volumetric-light glow bookends, hushed centered, slideshows, 48px matte cards | lime `#e8ff9c` | `green` |
| 2 | `design/nouva-2` | `../jami.studio-nouva-2` | Nouva | `…-nouva.md` | blue-black void, charcoal cards w/ hairline seams, dusk-photo hero, staggered counters, sticky features | neon-lime `#8cff2e` | `green` |
| 3 | `design/kirimo-2` | `../jami.studio-kirimo-2` | Kirimo | `…-kirimo.md` | sand-on-near-black editorial zine, auto-play slideshow, 136px ticker, numbered accordion, hairline rules | terra-cotta `#eb5939` | `amber` |
| 4 | `design/noir-2` | `../jami.studio-noir-2` | Noir | `…-noir.md` | high-contrast near-black agency, over-spaced asymmetric work grid, divider services, inverted white stats, colossal wordmark | copper `#ed4515` | `amber` |
| 5 | `design/synk-2` | `../jami.studio-synk-2` | Synk | `…-synk.md` | systematized near-black, dashed-border card lattice, explicit dividers, ASCII-shader bg, embedded live UI | coral `#ff5e5d` | `rose` |

Accents are authored as `color.accent` tokens (→ `--accent`/`--primary`/`--ring`), used sparingly, so any
lane stays retunable on the token system. The dial slot is only the config `<select>` label; the rendered
accent is always the template-true hex.

## NO BLOCKERS — prerequisites satisfied

Each template's full design system is extracted headless and deposited in every worktree (gitignored):
`out/<lane>.json` (brief — tokens, type, fonts, component inventory, agentContext), `out/<lane>.full.json`
(`pageTrees` = real section structure + flat node arrays), `out/<lane>.home.png` (render). Re-extract if
needed from `main`: `node tools/framer-bridge/inspect.mjs <lane>`. Baseline proven: `pnpm verify` green on
`main`; worktree `pnpm install` + dev smoke-tested. PUSH OVERRIDE: agents commit locally and report SHA; the
orchestrator pushes each `design/<lane>-2` branch centrally from `main` (token in root `.env`; see
`github-remote-and-push-auth` memory).

## Definition of Done — per lane

The roadmap's Acceptance Criteria, in short: home built to the template's real section blueprint with its
signature elements present; every page (`/`, `/projects`, every `/projects/[slug]`) fully designed; every §10
content job housed in the template's idiom with honest substitutions; every CTA via the content layer; both
themes; all four breakpoints (1440/1024/768/390); token-driven only (template-true palette); grain/motion +
reduced-motion; AA contrast + focus rings; AI surfaces intact; `pnpm verify` green; §14 anti-slop clean;
**screenshots pass the fidelity + divergence gate.** Major credit spend — drive each lane all the way home.

## End state of this session

When all five lanes pass audit/fix AND the screenshot gate:
- Run each worktree on its own local port (`3001`–`3005`).
- Print the five labeled local URLs (lane + template) for side-by-side review, alongside the screenshot set.

Scope ends at "five distinct, template-faithful lanes live on separate local hosts, ready to review."
Selection, merge to `main`, hardening, and Vercel deploy are a separate, later decision.

## Orchestration guardrails

- The coordinator protects the main context; it sequences passes, dispatches goal sessions, captures/compares
  screenshots, and keeps state coherent in `orchestration-state.md`. It is not the implementation worker.
- **Never leave orchestration state only in context.** Checkpoint every dispatch + result (agent id, lane,
  pass, screenshot verdict, next action). Poll per `orchestration-reliability.md` until terminal.
- **Source truth is the live worktree + the screenshot, not roadmap claims.** Run-2's state log claimed each
  lane had a distinct IA; the renders proved otherwise. Trust the pixels.
- Keep route/repo/subdomain/docs/API/CTA/social/metadata/project data centralized. Do not implement any
  product runtime (Harness, UI Registry, Orchestra, Intercal, Collectiva). No secrets in tracked files.
- Lanes run in parallel (disjoint worktrees). Never two goal sessions on one lane at once. Never push `main`.

---

## Reusable goal-session prompts

Paste one to the lane agent, with `<BRANCH>`, `<TEMPLATE>`, `<WORKTREE>`, `<LANE-KEY>`, and `<ROADMAP>` filled.

### Pass 1 — EXECUTE

```text
You own ONE lane only: <BRANCH> (<TEMPLATE>) in worktree <WORKTREE>. Do not touch any other lane, worktree,
or `main`. A prior run built this lane as a generic marketing skeleton; you are REPLACING that with a
faithful reproduction of the <TEMPLATE> template. Rebuild the presentation; keep the frozen contracts.

THE ONE RULE: build our site USING the <TEMPLATE> template's real design — its section structure and order,
its colors, its textures, its component vocabulary, its layout. The finished home must LOOK LIKE the template
render `tools/framer-bridge/out/<LANE-KEY>.home.png`, not like a generic landing page. Do NOT build a
Hero → pillars → showcase-grid → proof → callout → FAQ → CTA skeleton — that uniform skeleton is the exact
failure you are fixing.

Work from, in order: `<ROADMAP>` (your end-to-end work order — the "Active lane (locked)" block, the
"Home IA — BUILD THIS" section-by-section blueprint, the "Signature elements", the color/type/texture spec,
and the per-section honest-substitution map), `AGENTS.md`, `docs/design/reference-brief.md` (§14 anti-slop +
art direction). The LIVE worktree is the source of truth.

Study the real template first: READ `tools/framer-bridge/out/<LANE-KEY>.home.png` (look at it — this is the
target), `out/<LANE-KEY>.json` (tokens, type, fonts, components), and `out/<LANE-KEY>.full.json` `pageTrees`
(the real section structure/rhythm). Build YOUR home to that structure.

Reuse VERBATIM (do not fork): `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts`,
`src/registry/manifest.ts`. Build fresh: `src/tokens/theme.ts` (your dark+light preset VALUES, accent =
template-true hex authored as a token), all `src/components/*`, all `src/app/**` presentation,
`src/styles/globals.css`. The template's photographic surfaces are filled with the GENERATED images in
`public/assets/` (mapped in your roadmap's "Visual assets" table) with CSS grain/glow/overlays on top —
never download the template's images, never leave an image slot as an empty box. Honest substitutions per
the roadmap: no fake logos/quotes/metrics/tiers/posts.

Execute WS1→WS7 to Acceptance Criteria. Token-driven only. Hrefs only from the content/route layer. Both
themes, all four breakpoints (1440/1024/768/390). AI surfaces wired. No placeholder/status copy, no secrets.

SCREENSHOT CHECKPOINT: once the home is first assembled, run the dev server and capture full-page `/` at
1440px; compare it to `out/<LANE-KEY>.home.png`. If it does not read as the same template (same structure,
palette, signature elements), FIX it before polishing — that match is the primary acceptance gate.

Verify before returning: `pnpm verify` green; smoke `/`, `/projects`, a `/projects/[slug]` at 1440 + 390 in
both themes; §14 anti-slop passes. Capture final full-page screenshots to `screenshots/<LANE-KEY>-home-1440.png`,
`screenshots/<LANE-KEY>-home-390.png`, `screenshots/<LANE-KEY>-projects-1440.png`. Stop helper processes;
stage only intentional changes; conventional commit + HEREDOC body; do NOT push (orchestrator pushes). Report:
changed files, the three screenshot paths, a one-line self-assessment of fidelity vs the template render,
verification result, remaining gaps, commit SHA. Do not stop at 90%.
```

### Pass 2+ — AUDIT / FIX (always fixes; never read-only)

```text
You own ONE lane only: <BRANCH> (<TEMPLATE>) in worktree <WORKTREE>. Do not touch any other lane or `main`.
A prior pass rebuilt this lane to reproduce the <TEMPLATE> template; AUDIT it and FIX every gap in this same
session. Not a report — you leave the branch better, verified, committed, re-screenshotted.

Authority: `<ROADMAP>` (Acceptance Criteria + "Home IA — BUILD THIS" + "Signature elements" + color/type spec),
`tools/framer-bridge/out/<LANE-KEY>.home.png` (the fidelity target — LOOK at it), `docs/design/reference-brief.md`
§14, `AGENTS.md`. The LIVE worktree + the screenshot are the source of truth.

Audit the whole lane, page by page (`/`, `/projects`, every `/projects/[slug]`), in BOTH themes at ALL four
breakpoints (1440/1024/768/390). Capture `/` at 1440 and hold it next to `out/<LANE-KEY>.home.png`. FIX every
gap: missing/weak signature element (the template's glow/grain/dividers/lattice/ticker/slideshow/sticky/
counters/wordmark — whatever its blueprint specifies), section structure that has drifted from the template's
real order toward a generic skeleton, wrong palette (not template-true), half-styled section, dead or
hand-built href, hardcoded value where a token role exists, broken breakpoint, weak light theme, missing focus
ring / AA failure, anti-slop hit, a §10 content job with no home, fabricated content, AI-surface regression.
Do not relax the bar; do not touch the contracts.

Verify: `pnpm verify` green; smoke the full route × theme × breakpoint matrix; §14 passes. Re-capture
`screenshots/<LANE-KEY>-home-1440.png`, `-home-390.png`, `-projects-1440.png`. Stop helper processes; stage
intentional changes; conventional commit + HEREDOC body; do NOT push. Report: what you audited, every fix,
the screenshot paths, your fidelity self-assessment, what (if anything) still falls short, verification
result, commit SHA. If you fixed substantial work, say so — the orchestrator runs another pass. The lane
closes only when a pass finds nothing substantial AND the screenshot passes the fidelity gate.
```

## Closeout (session)

- All five lanes meet Acceptance Criteria, pass the screenshot fidelity + divergence gate, and are pushed.
- Each lane went execute → audit/fix until a quiet pass.
- Orchestrator prints the five labeled preview URLs + the screenshot set for review.
- No secrets in tracked files; no stray helper processes left running.
