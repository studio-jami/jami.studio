# Design Direction Decision — Kirimo

Date: 2026-06-12
Status: Accepted
Owner: Jamie

## Decision

The **Kirimo** lane is the chosen visual direction for the `jami.studio` OSS hub site.

The five-lane design bakeoff (run 4) is **closed**. The winning build lives on branch
**`design/kirimo-2`** (worktree `../jami.studio-kirimo-2`, HEAD `a4596c5`). It is **not yet merged to
`main`**. The next implementation pass should merge/import it as the site's presentation layer while
preserving the restored roadmap, ADR, operations, and security docs that now exist on `main`.

The Kirimo visual system is locked for the public marketing site. It should not be redesigned, replaced by
older site layouts, or constrained by Studio UI Registry styling demands. The Registry can remain a separate
runtime/product surface and can later promote compatible primitives from this site without governing the
marketing page's art direction.

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

**Synk is not discarded, but the product-page direction is post-launch.** Synk's systematized lattice is *a
candidate* for future per-product pages (Harness, UI Registry, Orchestra, Intercal, Collectiva), where dense,
extensible feature communication and the micro-UI cards could shine. But the owner now prefers to ship the
cohesive Kirimo site first and revisit product-page layout later as a global uniform design pass once the
products themselves are live enough to inform the page system. Treat "Kirimo = hub and launch surface" as
settled and "future product-page system = deferred" as a separate later project. Synk's build remains on
`origin/design/synk-2` for reference only.

## Launch Tweaks

Captured from review and updated with the 2026-06-12 launch decision:

1. **Do not alter the Kirimo design.** Only fix defects found during merge, build, accessibility, or visual
   smoke. Avoid aesthetic rewrites and do not reintroduce the old marketing-site layouts.
2. **Accent color remains token-driven.** Minor tuning is acceptable only if it preserves the Kirimo
   sand-on-near-black editorial system; broad palette changes are not part of launch.
3. **Project routes ship as current Kirimo routes.** Do not redesign individual project pages now. Verify
   they are responsive, metadata-complete, and route/CTA-correct, then defer deeper product-page layout work.
4. **General polish pass** means production-readiness polish: no broken links, no placeholder/status copy,
   no layout breakage, no missing assets, no degraded AI/SEO surfaces.

## Resume plan (ordered, for when rate/time allows)

1. **Merge/import Kirimo into `main`** as the site's presentation layer. Preserve `main` docs that are newer
   than the design branch, especially the restored full roadmap and this ADR.
2. Reconcile only contract integration issues: centralized content, route helpers, metadata, sitemap, robots,
   `llms.txt`, `llms-full.txt`, assets, and tests.
3. Verify `/`, `/projects`, and all current `/projects/[slug]` routes at desktop/mobile. Treat project-page
   layout redesign as post-launch.
4. Finish the public site and route all project CTAs through the content/route layer, then launch the first
   OSS surfaces — per `docs/operations/credit-utilization-plan.md`
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
