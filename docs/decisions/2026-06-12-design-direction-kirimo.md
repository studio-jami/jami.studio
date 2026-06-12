# Design Direction Decision — Kirimo

Date: 2026-06-12
Status: Accepted
Owner: Jamie

## Decision

The **Kirimo** lane is the chosen visual direction for the `jami.studio` OSS hub site.

The five-lane design bakeoff (run 4) is **closed**. The winning build lives on branch
**`design/kirimo-2`** (worktree `../jami.studio-kirimo-2`, HEAD `a4596c5`). It is **not yet merged to
`main`** — that is the first step when work resumes, after the tweaks below. No further design work was
done at close-out; this record only folds the decision in and sets expectations for resume.

## Why Kirimo (over the runner-up, Synk)

Both finalists were strong and template-faithful. The two optimized for different scarce things:

- **Synk (runner-up)** — category-fluent: near-black, dot-matrix, dashed-lattice, micro-UI, restrained.
  Reads instantly as legitimate dev-infra and communicates product breadth at a glance. Its weakness is
  that the agent-infra space is saturated with this exact look, so it fits in rather than stands out.
- **Kirimo (chosen)** — memorable and on-positioning: a warm, sand-on-near-black editorial *zine* with a
  terra-cotta accent. It is the only lane that reads as a **studio** rather than a SaaS, which matches what
  `jami.studio` actually is — a house of craft shipping a family of products from one shared source. For a
  hub whose job is identity and credibility (not feature-conversion; docs do that), distinctiveness and a
  felt sense of craft win. The warmth signals the care that is the studio's product promise.

**Synk is not discarded, but the product-page direction is OPEN — not locked to Synk.** Synk's
systematized lattice is *a candidate* for the per-product pages (Harness, UI Registry, Orchestra, Intercal,
Collectiva), where dense, extensible feature communication and the micro-UI cards could shine. But on
further review the owner leans toward the product/project page being **a different layout altogether** —
possibly a distinct template — rather than reusing Synk wholesale. The owner intends to survey the template
set more before deciding the ideal project-page layout. Treat "Kirimo = hub" as settled and "product-page
system = TBD" as an open design question. Synk's build remains on `origin/design/synk-2` for reference.

## Pending tweaks (the bar is NOT "merge as-is")

Captured from review so they are not lost when work resumes:

1. **Accent color.** The terra-cotta/orange is loved but to be explored and tuned. It is token-driven
   (`color.accent` in the lane's `theme.ts`), so this is a values change, not a refactor.
2. **`/projects` and `/projects/[slug]` — the largest open design item.** The project pages need more
   structure and detail — surface the sections with more depth than the home's editorial pacing provides.
   **The layout direction is undecided:** Synk is one candidate, but the owner leans toward a different
   layout/template altogether and plans to look around the template set more before choosing. Do not assume
   Synk here.
3. **General polish pass** on the home before merge.

## Resume plan (ordered, for when rate/time allows)

1. (optional) Rename `design/kirimo-2` → a clean trunk name, then **merge Kirimo into `main`** as the site's
   presentation layer (the frozen contracts on `main` are reused verbatim; only presentation merges).
2. Accent-color exploration on the token.
3. Decide the project-page layout direction (survey templates; Synk is a candidate, not the default), then
   build out `/projects` + `/projects/[slug]` structure/detail (item 2 above).
4. Return to the **pre-design product thread**: finish the public site and route all project CTAs through
   the content/route layer, then launch the first OSS surfaces — per `docs/operations/credit-utilization-plan.md`
   ("Launch Sequencing") and the framework decision `docs/decisions/2026-06-06-framework-and-deployment.md`.

## Pointers

- **Design source of truth (chosen lane):** `docs/roadmaps/2026-06-11-design-rebuild-kirimo.md`
  (locked lane block, Home IA, signature elements, color/type spec, Visual assets table).
- **Build:** branch `design/kirimo-2` / worktree `../jami.studio-kirimo-2`. Generated photography is
  committed under `public/assets/` (sand/terracotta editorial series; originals from Grok/Gemini, never
  template files).
- **How the decision was reached (bakeoff record):** `docs/engineering/agents/orchestration-state.md`
  (run-4 dispatch log + per-lane fidelity/divergence verdicts).
- **Runner-up + losing lanes:** preserved on `origin/design/{synk-2,message-ai-2,noir-2,nouva-2}` and the
  older `origin/design/*` branches (local copies pruned 2026-06-12; GitHub branches left intact for now).

## Consequences

- `docs/roadmaps/` keeps only the Kirimo design roadmap; the four losing-lane rebuild roadmaps are deleted
  (git history + `origin` branches are the archive, per the repo's delete-superseded convention).
- Local branches reduced to `main` + `design/kirimo-2`; loser worktrees removed; only the Kirimo worktree
  is kept so the preview can be relaunched (`pnpm exec next start -p 3003` in `../jami.studio-kirimo-2`).
- No `main` presentation changed yet; the foundation/contract work on `main` is untouched and ready to
  continue.
