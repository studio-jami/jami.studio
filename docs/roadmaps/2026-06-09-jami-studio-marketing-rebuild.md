# Jami Studio Marketing Site Design Rebuild Plan

Date: 2026-06-09
Status: [~] Active
Supersedes: `docs/_legacy/roadmaps/2026-06-06-jami-studio-marketing-site-plan.md`
Source reports: `C:\Users\james\dev\docs\reports\E-operations-gtm\F18-brand-and-identity.md`, `C:\Users\james\dev\docs\reports\E-operations-gtm\F19-marketing-and-content.md`, `C:\Users\james\dev\docs\reports\D-distribution-products-ax\F16-products.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F05-harness-runtime.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F09-ui-registry-and-render-seam.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F10-orchestra-and-dev-system.md`
Owner: Jamie
Surface: `www.jami.studio` marketing site and OSS project hub

## Purpose

The shared site foundation is built and lives on `main`: a Next.js 16 + React 19 app with a
registry-ready token/dial contract, a centralized project registry, route/metadata helpers, and
generated `robots`, `sitemap`, `llms.txt`, and `llms-full.txt` surfaces. What is NOT acceptable is the
current visual design. This plan throws away the existing UI and rebuilds the landing and marketing
site to a world-class, production-grade, design-studio standard.

This is a UI/design rebuild, not a foundation rebuild. The shared data contracts and token system are
reused verbatim; the entire visual surface is new.

The work is not to build the Harness, Registry, Orchestra, Intercal runtime, or Collectiva runtime.
Those live in their own repositories and deploy targets. This plan rebuilds the marketing site as the
full intended end-state public surface, with data-driven routing so each project can branch into its
own subdomain (`harness.jami.studio`, `registry.jami.studio`, `orchestra.jami.studio`,
`intercal.jami.studio`, `collectiva.jami.studio`) without rewriting marketing components.

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Complete
- [!] Blocked or needs owner decision

## Foundation Already Landed (reuse, do not rebuild)

- [x] Next.js 16 / React 19 / TypeScript app with `pnpm lint|typecheck|test|build|verify`.
- [x] Token/dial contract: `src/tokens/schema.ts`, `presets.ts`, `css-vars.ts` (shadcn-compatible CSS
      variables; accent options `cyan|green|amber|rose|violet`; dials for accent, contrast, warmth,
      density, radius, surfaceDepth, motion).
- [x] Registry-readiness manifest: `src/registry/manifest.ts`.
- [x] Centralized content: `src/content/projects.ts` (5 Zod-validated projects with subdomain/repo/
      docs/api/CTA materialization), `src/content/site.ts`, `src/content/links.ts`.
- [x] Route/metadata/AI helpers: `src/lib/routes.ts`, `metadata.ts`, `sitemap.ts`,
      `ai-public-files.ts`; generated routes `src/app/robots.ts`, `sitemap.ts`, `llms.txt`,
      `llms-full.txt`.

## What Gets Rebuilt (entirely fresh, per design branch)

- [ ] `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/projects/page.tsx`,
      `src/app/projects/[slug]/page.tsx` presentation.
- [ ] All of `src/components/**` (header, footer, hero, project/product cards, product-family map,
      capability/proof bands, FAQ, CTA bands, project-detail layout, primitives).
- [ ] `src/styles/globals.css` and each branch's own token preset VALUES.

## Locked Decisions

- [x] Reuse the shared data contracts and token schema verbatim. Do not fork the content registry,
      route/metadata helpers, sitemap, robots, `llms` generation, or token schema. Each branch owns its
      preset VALUES, visual treatment, component styling, and page/block composition.
- [x] Build the public site as the envisioned final marketing surface — not a gated launch page,
      status dashboard, or dev log. No "coming soon" / placeholder / status-apology copy.
- [x] Aesthetic target: a design-agency / design-portfolio feel adapted for open-core developer
      products — elevated, elegant, distraction-free, beautiful composition. Two acceptable lanes:
      (1) dark, grainy, textured backgrounds (preferred favorite); (2) clean, fresh, light editorial.
      Each branch picks/blends a lane and executes it to a world-class standard.
- [x] Dark AND light themes both required and fully responsive across mobile, tablet, and desktop.
- [x] Every UI element must be uniform, global, reusable, and composable. Zero one-off styling where a
      token role or shared component belongs.
- [x] Five design branches run in parallel from the same `main` foundation commit, each on its own
      pushed branch, using heterogeneous models: two Opus 4.8, one Claude Fable 5, one Gemini, one Grok.
- [x] Keep all project route, repo, subdomain, docs, API, CTA, social, and metadata data centralized.
- [x] Keep AI-readability a core build output, not a later optimization.
- [x] The token/config system stays the seed for the future Studio UI Registry; mark reusable
      components/blocks as candidate registry items without building the Registry runtime here.

## Registry & Harness Tie-In (explicit owner request)

- [ ] The Studio UI Registry and Jami Agent Harness must be first-class on the rebuilt site: complete,
      polished, prominent project pages, with data-driven routing to `registry.jami.studio/*` and
      `harness.jami.studio/*` from the central project registry (already wired in
      `src/content/projects.ts`).
- [ ] Document the `registry.jami.studio` (and sibling) subdomain mapping in `docs/operations/` as a
      separate deploy target.
- [ ] Boundary: this repo presents and links to the Registry/Harness; it does NOT implement the
      Registry/Harness runtime. Do not build a component/token registry runtime at
      `registry.jami.studio` from this repo.

## Scope Boundaries

- [x] In scope: full visual rebuild of landing + marketing + project pages over the existing shared
      data/token/route/metadata/AI foundation; responsive dark/light UI; grain/texture system; motion;
      reusable composable component system; visual QA; deployment readiness; verification.
- [x] Out of scope: implementing Harness, Registry, Orchestra, Intercal runtime, Collectiva runtime,
      product auth, billing, runtime APIs, MCP servers, SDK packages, or protocol internals; forking the
      shared content/route/metadata/AI/token-schema machinery.
- [x] Public claims stay product-positioning claims, not false implementation claims.
- [x] Secrets stay out of tracked files. Deploy/analytics keys are documented as variable names only.

## Shared Design Reference Brief

- [~] `docs/design/reference-brief.md` is the single model-agnostic design brief every design agent
      reads before building. It distills the owner's Framer reference templates (Message AI, Nouva,
      Recon, B2bizz, Kirimo, Kairy, Noir Agency, and others) into art direction, reference DNA, a
      grain/texture system, a canonical section/IA system, typography/color/motion/responsive guidance,
      a reusable component inventory, the reuse boundary, and an anti-slop checklist. It sets the quality
      bar without prescribing one single look.

## Cross-Stream Dependency Map

- WS0 (reference brief) and the roadmap/goal refresh land on `main` first; all branches cut from that
  commit.
- WS1 runs five complete design branches in parallel from the same `main` foundation commit. Branches
  are independent and isolated (disjoint ownership: each owns only its own branch/worktree).
- WS2 is the single owner decision gate: review all five, select one.
- WS3 depends on WS2: merge the selected branch to `main` and harden it.
- WS4 depends on WS3: deployment, subdomain mapping, AI-surface, QA, docs closeout.
- WS5 (Fable 5 adversarial audit) runs over the entire effort once branches are complete and again
  after selection/hardening; it gates final closeout.

## Workstream 0: Shared Design Reference Brief

Goal: Produce the shared design DNA + quality bar that all five design agents consume.

Implementation tasks:

- [~] Probe Framer MCP access and capture usable design DNA.
- [~] Research the owner's named reference templates and distill their design language.
- [~] Write `docs/design/reference-brief.md` (model-agnostic, implementation-ready).

Exit criteria:

- [ ] `docs/design/reference-brief.md` exists on `main` before branches are cut.
- [ ] It encodes art direction, reference DNA, grain/texture system, IA/section system, typography,
      color/theming through the token schema, motion, responsive expectations, component inventory,
      reuse boundary, and an anti-slop checklist.

## Workstream 1: Five Parallel Design-Direction Branches

Goal: Produce five complete, production-intent site designs over the same shared foundation, each a
world-class rebuild, on its own pushed branch for owner comparison.

Branches and models (cut from the same `main` foundation commit):

- [ ] `design/opus-a` — Claude Opus 4.8 (Agent tool, worktree).
- [ ] `design/opus-b` — Claude Opus 4.8 (Agent tool, worktree).
- [ ] `design/fable` — Claude Fable 5 (Agent tool, worktree).
- [ ] `design/gemini` — Gemini (gemini CLI, headless, worktree).
- [ ] `design/grok` — Grok (grok CLI, headless `grok-build`, worktree). Note: the owner's requested
      "grok 4.3" model id is not exposed to this account; the strongest available coding model
      (`grok-build`) is used and reported honestly.

Repo guidance:

- Cut all five branches from the same stable `main` commit. Push every branch to origin early.
- Each branch keeps the shared content registry, route/metadata helpers, sitemap, robots, AI-file
  generation, tests, and public route contract. Each branch may set its own token preset values,
  colors, density, surface/grain treatment, component styling, and page/block composition.
- Each branch is production-intent complete: homepage, `/projects`, all five project pages, dark/light
  themes, responsive states, accessibility, and verification all work in that branch.
- Do not merge any branch into `main` during WS1. Do not blend branches.

Implementation tasks (per branch, AUDIT/EXECUTE, ≥2 fresh-context passes):

- [ ] Build a complete, fresh visual system from `docs/design/reference-brief.md`: globals/grain,
      token preset values, reusable composable components, homepage, `/projects`, all five project
      pages including Harness and UI Registry.
- [ ] Dark and light themes; responsive at 1440 / 1024 / 768 / 390.
- [ ] Keep shared data/route/metadata/AI/token-schema machinery intact.
- [ ] Run the verification ladder and visual smoke (dark + light, all breakpoints); push the branch.

Exit criteria:

- [ ] All five branches build and render complete site experiences over the shared foundation.
- [ ] All five use the shared token/dial contract (no hardcoded one-off styling where a role belongs).
- [ ] Each branch passes `pnpm verify` and dark/light responsive visual smoke.
- [ ] All five branches pushed to origin for owner comparison.

## Workstream 2: Owner Selection (single human gate)

Goal: Owner reviews all five branches and selects one direction for `main`.

- [ ] Present a concise comparison (per-branch aesthetic, lane, standout sections, screenshots/links).
- [ ] Record the owner's selection in this roadmap's checkpoints.

## Workstream 3: Selected-Direction Hardening

Goal: Merge the chosen design to `main` and harden the selected full site for production.

- [ ] Merge the selected branch to `main`; do not blend non-selected visual systems.
- [ ] Remove comparison-only leftovers; promote the selected token preset and component set as the
      single marketing-site brand system.
- [ ] Finalize the Registry/Harness tie-in and verify all subdomain routing resolves from central data.
- [ ] Mark candidate Studio UI Registry components/blocks without blocking launch.
- [ ] Final dark/light responsive, accessibility, and copy polish on the selected full site.

Exit criteria:

- [ ] The selected branch is the only design system on `main`.
- [ ] Homepage and every project page are complete, responsive (dark+light), and copy-polished.
- [ ] Metadata, sitemap, robots, and AI files still come from the shared foundation.

## Workstream 4: Deployment, AI Surface, QA, And Closeout

Goal: Ship as a production-ready Vercel project with clean docs and verified public behavior.

- [ ] Add/confirm deployment configuration; document Vercel setup in `docs/operations/`.
- [ ] Document apex/`www` plus project-subdomain mapping (incl. `registry.jami.studio`,
      `harness.jami.studio`).
- [ ] Confirm canonical metadata, `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` on the new
      design.
- [ ] Full verification + visual QA (desktop/mobile, dark/light).
- [ ] Update durable docs and roadmap truthfully.

## Workstream 5: Fable 5 Adversarial Audit (closeout gate)

Goal: Run a fresh-context Claude Fable 5 adversarial agent over the entire effort — roadmap, goal
refresh, the five branches, and (after selection) the hardened `main` — judging each run and
dispatching only the fixes that are actually needed. May take multiple runs, treated like additional
fresh passes.

- [ ] Fable 5 adversarial pass over the plan + branches; classify findings; dispatch fixes.
- [ ] Re-run until quiet or only an external blocker remains.

Exit criteria:

- [ ] No open adversarial findings that block production polish.
- [ ] Final verification clean; no secrets in tracked files; roadmap reflects reality.

## Verification Ladder (exit criteria — must be 100% passing)

- [ ] `pnpm install`
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm verify`
- [ ] Visual smoke at 1440 / 1024 / 768 / 390, in BOTH dark and light, for `/`, `/projects`, and every
      project page — no overflow, clipping, contrast failures, or console errors.
- [ ] Inspect `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, and canonical metadata.
- [ ] All UI is token-driven, uniform, reusable, composable — no one-off styling where a role belongs.
- [ ] Registry/Harness project pages complete and routed to their subdomains from central data.
- [ ] No secrets in tracked files.
- [ ] Docs and roadmap reflect actual delivered behavior.

## Acceptance Criteria

- [ ] `www.jami.studio` is a complete, world-class production marketing site, not a placeholder.
- [ ] The homepage is polished, on-brand, responsive (dark+light), accessible, and copy-complete.
- [ ] Harness, Registry, Orchestra, Intercal, and Collectiva each have complete project pages.
- [ ] Five design directions were run to complete comparable branches; the owner selected one.
- [ ] The shared token/dial system remains reusable as a Studio UI Registry seed.
- [ ] All project URLs, subdomains, repos, docs links, CTAs, and summaries stay centralized; a
      subdomain/domain change requires data edits, not component rewrites.
- [ ] The site emits complete canonical metadata, sitemap, robots, and AI-readable files.
- [ ] Lint, typecheck, test, build, and verify pass. Deployment/domain setup documented.
- [ ] A Fable 5 adversarial audit ran over the effort and its required findings were resolved.
- [ ] No tracked file contains secrets or private operational credentials.

## Implementation Order

1. Land the new roadmap + refreshed goal pointer + shared reference brief on `main`.
2. Cut five design branches from the same `main` foundation commit; push all; create worktrees;
   delete the prior `design/direction-*` and `design/rerun-*` branches and prune their worktrees.
3. Dispatch five parallel design agents (2 Opus, 1 Fable, 1 Gemini, 1 Grok); run ≥2 fresh passes each;
   gate each per the goal's second-commit rules; push every branch.
4. Present the five for owner selection.
5. Merge the selected direction to `main` and harden it.
6. Deployment, subdomain mapping, AI-surface confirmation, QA, docs closeout.
7. Fable 5 adversarial audit over the whole effort; resolve required findings.
8. Final verification, roadmap truth-up, commit, and push.

## Orchestrator Checkpoints

- [~] 2026-06-09 - New rebuild roadmap authored; prior 2026-06-06 plan retired to
  `docs/_legacy/roadmaps/`; goal reusable prompt repointed to this plan. Shared design reference brief
  dispatched to a background research subagent. Next coordinator action: land the foundation commit,
  then cut the five design branches.
