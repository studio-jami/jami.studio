# Design Direction Decision — Kirimo

Date: 2026-06-12
Status: Accepted
Owner: Jamie

## Decision

The **Kirimo** lane is the chosen visual direction for the `jami.studio` OSS hub site.

The five-lane design bakeoff (run 4) is **closed**. The winning build came from branch
**`design/kirimo-2`** (worktree `../jami.studio-kirimo-2`, HEAD `a4596c5`) and is now imported to
`main` in `25e5b73` as the site's presentation layer. Production-candidate verification and production
deployment evidence landed during Workstream 6 closeout; `www.jami.studio` now serves the Kirimo-era site,
and the apex redirects to `www`.

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

## Launch Status

1. Kirimo is imported to `main` and remains the locked public marketing-site presentation.
2. Contract integration is verified through centralized content, route helpers, metadata, sitemap, robots,
   `llms.txt`, `llms-full.txt`, assets, and tests.
3. `/`, `/projects`, and all current `/projects/[slug]` routes are verified as launch-grade at
   desktop/mobile. Deeper project-page layout redesign remains post-launch.
4. Deployment/domain evidence is maintained in `docs/operations/deployment-and-domains.md`; analytics and
   privacy launch posture is maintained in `docs/decisions/2026-06-13-analytics-privacy-deferral.md`.

## Pointers

- **Design source of truth (chosen lane):** `docs/roadmaps/2026-06-11-design-rebuild-kirimo.md`
  (locked lane block, Home IA, signature elements, color/type spec, Visual assets table).
- **Build origin:** branch `design/kirimo-2` / worktree `../jami.studio-kirimo-2`, imported to `main` in
  `25e5b73`. Generated photography is committed under `public/assets/` (sand/terracotta editorial series;
  originals from Grok/Gemini, never template files).
- **How the decision was reached (bakeoff record):** `docs/engineering/agents/orchestration-state.md`
  (run-4 dispatch log + per-lane fidelity/divergence verdicts).
- **Runner-up + losing lanes:** preserved on `origin/design/{synk-2,message-ai-2,noir-2,nouva-2}` and the
  older `origin/design/*` branches (local copies pruned 2026-06-12; GitHub branches left intact for now).

## Consequences

- `docs/roadmaps/` keeps only the Kirimo design roadmap; the four losing-lane rebuild roadmaps are deleted
  (git history + `origin` branches are the archive, per the repo's delete-superseded convention).
- Local losing-lane worktrees and the local design branch were removed after import. Remote design branches
  remain as version-control history.
- Workstream 6 verified the imported Kirimo site as the production candidate and proved the live production
  deployment/domain behavior. Future design work should start from a new scoped brief, not this closed
  bakeoff prompt.
