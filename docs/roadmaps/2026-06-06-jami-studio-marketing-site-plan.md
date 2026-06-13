# Jami Studio Marketing Site Implementation Plan

Date: 2026-06-06 · Recovered & reconciled: 2026-06-12
Status: [x] Complete — Kirimo imported, production launch evidence landed, Stream D pass 2 verified
Source reports: `C:\Users\james\dev\docs\reports\E-operations-gtm\F18-brand-and-identity.md`, `C:\Users\james\dev\docs\reports\E-operations-gtm\F19-marketing-and-content.md`, `C:\Users\james\dev\docs\reports\D-distribution-products-ax\F16-products.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F05-harness-runtime.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F09-ui-registry-and-render-seam.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F10-orchestra-and-dev-system.md`
Owner: Jamie
Surface: `www.jami.studio` marketing site and OSS project hub

## Recovery & Current Status (2026-06-12)

This is the **full original implementation plan**, recovered after it was progressively narrowed to
design-only and then deleted across three "reset main for design rebuild" commits (`57402c9` →
`5bcb13e` → `ba96523`). The intermediate design-only rewrites
(`2026-06-09-jami-studio-marketing-rebuild.md`, `2026-06-10-jami-studio-design-rebuild.md`) remain in git
history if needed. The full non-design scope below — deployment, subdomains, expansion — was never
finished and is restored here as the canonical forward plan.

**What is actually done (against the workstreams below):**
- **WS1 Web App Foundation** — ✅ complete on `main` (Next.js 16 / React 19 / TS; `pnpm lint|typecheck|test|build|verify`).
- **WS2 Token/Dial Foundation** — ✅ complete (`src/tokens/{schema,presets,css-vars}.ts`, `src/registry/manifest.ts`, config panel).
- **WS3 Content/Routing/Metadata/AI Files** — ✅ complete (`src/content/*`, `src/lib/*`, generated `robots`/`sitemap`/`llms[-full].txt`).
- **WS4 Design Directions** — ✅ **concluded, superseded by the run-4 bakeoff.** The original 3-branch
  plan (and the 2026-06-07 "starter" selection in WS5 below) was redone as a **five-template** bakeoff;
  the owner selected **Kirimo** on 2026-06-12. Decision, rationale, and launch constraints:
  **`docs/decisions/2026-06-12-design-direction-kirimo.md`**. Chosen-lane spec:
  `docs/roadmaps/2026-06-11-design-rebuild-kirimo.md`. The Kirimo build was imported to `main` in
  `25e5b73` and is the locked marketing-site presentation.
- **WS5 Selected-Direction Hardening** — ✅ **complete for Kirimo.** The earlier 2026-06-07 hardening
  applied to a now-superseded direction; the current selected-direction closeout is the Kirimo import on
  `main` plus Stream A production-candidate verification.
- **WS6 Deployment, QA, Closeout** — ✅ **launch evidence complete.** Stream A production-candidate QA is
  closed; Stream B closed with verified Kirimo production deployment, live `www.jami.studio`, and apex
  redirect evidence; Stream C explicitly deferred analytics/privacy for launch in
  `docs/decisions/2026-06-13-analytics-privacy-deferral.md`. Stream D pass 1 updates roadmap/durable-doc
  status from that evidence; Stream D pass 2 confirmed the final roadmap/durable-doc closeout without
  changing workflow mechanics or public design surfaces.
- **Expansion Track** — ❌ not started.

**Owner-requested scope folded back in (from the 2026-06-09 rewrite, do not lose):**
- **Registry & Harness tie-in.** The Studio UI Registry and Jami Agent Harness are first-class on the
  site with data-driven routing (already wired in `src/content/projects.ts`). This repo **presents and
  links** to them; it does **not** implement their runtimes.
- **Design autonomy.** The marketing site uses shared content, route, metadata, and AI-file contracts, but
  the Kirimo visual system is not governed by Studio UI Registry styling requirements. Registry promotion
  can happen later from candidate primitives; it must not pull the public marketing site back toward the
  older utilitarian layouts.
- **Subdomain deploy mapping (WS6 documented).** Document `harness.jami.studio`, `registry.jami.studio`,
  `orchestra.jami.studio`, `intercal.jami.studio`, `collectiva.jami.studio` as separate deploy targets in
  `docs/operations/`.

**Current closeout posture:** Kirimo is imported to `main`, production-candidate verification and visual smoke
passed, `www.jami.studio` is live on the verified Vercel production deployment, apex redirects to `www`, and
analytics/privacy is explicitly deferred for launch. The deeper project-page layout redesign remains
post-launch and should be opened later as one global project-page system, not as a pre-launch rewrite.
Cross-ref:
`docs/decisions/2026-06-12-design-direction-kirimo.md`, `docs/operations/credit-utilization-plan.md`
("Launch Sequencing"), and `docs/decisions/2026-06-06-framework-and-deployment.md`.

> The workstream bodies below are the **original 2026-06-06 plan verbatim**; their inline `[x]` marks and
> dated closeouts reflect the *first* (pre-bakeoff) pass and are historical. Trust this Recovery note for
> current status where the two differ.

## Purpose

Stand up `www.jami.studio` as the production-ready public marketing site for the Studio OSS project family. The site is the first impression, central hub, and AI-readable source for the project suite: Jami Agent Harness, Studio UI Registry, Orchestra, Intercal, and Collectiva.

The work is not to build the Harness, Registry, Orchestra, Intercal runtime, or Collectiva runtime. Those live in their own repositories and deploy targets. This plan builds the marketing site as the full intended end-state public surface, with routing and metadata flexible enough for each project to branch into its own subdomain, docs, API pages, and Vercel project.

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Complete
- [!] Blocked or needs owner decision

## Source Findings

- [x] The current `jami.studio` repo is docs-only: `AGENTS.md`, `docs/engineering/standards/*`, and `docs/engineering/agents/*`.
- [x] The copied repo instructions originally described Intercal, so they must be refreshed for the marketing-site repo before implementation.
- [x] The brand report defines the committed naming surface: `jami`, the Studio, `jami.studio`, `@jami-studio`, and `studio-jami`; visual tokens should be resolved through the selected design branch, not locked before design exploration.
- [x] The marketing report makes the website the first marketing artifact and calls for content-led developer credibility, technical docs/SEO, and AI-readable content.
- [x] The product report positions `jami.studio` as the OSS foundations platform and hub for Harness, UI Registry, Orchestra, Intercal, and Collectiva.
- [x] Intercal is live in a separate repo under `C:\Users\james\dev\orgs\oss\intercal.dev`; this marketing site should link to it without absorbing its runtime.
- [x] Harness, Registry, Orchestra, and Collectiva are product-family surfaces for this site, but their implementations are out of scope for this repo.
- [x] The selected Kirimo implementation lives in worktree `C:\Users\james\dev\orgs\oss\jami.studio-kirimo-2`
  on branch `design/kirimo-2` at `a4596c5` (`feat(kirimo): finish editorial design rebuild`).

## Locked Decisions

- [x] Build the public site as the envisioned final marketing surface, not a gated launch page, implementation-status dashboard, or dated dev log.
- [x] Keep each product's route, repo, docs URL, API URL, CTA, and subdomain target in centralized content data.
- [x] Treat `www.jami.studio` as the canonical hub and `jami.studio` as a redirect.
- [x] Treat `intercal.jami.studio` as the first live product subdomain integration.
- [x] Assume product pages can later move to independent repos, Vercel projects, subdomains, docs providers, or standalone domains without rewriting marketing components.
- [x] Make AI-readability a core build output, not a later optimization.
- [x] Keep implementation-status caveats out of primary marketing copy.
- [x] After the shared app foundation, content registry, routing, metadata, sitemap, robots, and AI-ingestion seams are stable, design exploration can run as three full-site branches. Each branch owns its own visual/brand system, layout language, homepage, and project pages while consuming the same shared data and generated public-file pipeline.
- [x] Build a shared token/dial contract before branching, but do not lock the final brand look before branching. The shared foundation owns the schema, shadcn-compatible plumbing, validation, and configuration surface; each branch chooses values, visual treatment, and page/block composition.
- [x] Treat the marketing site's token/config system as a candidate seed for the future Studio UI Registry. It should be registry-ready and code-supported now, without forcing full public registry packaging before the marketing site needs it.
- [x] Treat Kirimo as the final chosen marketing-site design. Do not redesign it, revert it to older layouts,
  or let UI Registry styling constraints override the public site's editorial visual system.
- [x] Defer a deeper per-project page layout redesign until after launch. The current Kirimo project routes
  can ship if they pass verification; future product-page layout work must be global and uniform, not an
  ad hoc pre-launch rewrite.

## Scope Boundaries

- [x] In scope: marketing site, launch-grade project routes, route model, content model, metadata, shared token/dial contract, selected Kirimo brand/visual values, responsive UI, AI-ingestion files, sitemap, robots, deployment readiness, and verification.
- [x] Out of scope: implementing Harness, Registry, Orchestra, Intercal runtime, Collectiva runtime, product auth, billing, runtime APIs, MCP servers, SDK packages, or protocol internals.
- [x] Public claims must be product-positioning claims, not false implementation claims. Copy can describe the intended project family while links and docs reflect actual owned surfaces.
- [x] Secrets stay out of tracked files. Deployment and analytics keys are documented as variable names only.

## Repo Guidance

- Follow `AGENTS.md` and `docs/engineering/standards/*`.
- Keep active implementation plans in `docs/roadmaps/`.
- Promote lasting decisions to `docs/decisions/`.
- Keep deployment and domain steps in `docs/operations/`.
- Add a changelog fragment once a changelog convention exists and production-meaningful behavior changes.
- When the app exists, verify with lint, typecheck, tests, build, generated metadata files, and visual smoke on desktop/mobile.

## Target Product Shape

- A canonical homepage with the selected Kirimo editorial design: sand-on-near-black canvas, terra-cotta accent, generated editorial imagery, project slideshow, numbered service accordion, hairline rules, and giant footer ticker.
- Launch-grade project routes for Harness, Registry, Orchestra, Intercal, and Collectiva using the current Kirimo implementation; deeper per-project page composition is deferred until the products are live enough to justify one global uniform redesign.
- Data-driven navigation and footer.
- Centralized project registry data containing slug, name, summary, positioning, subdomain, repo URL, docs URL, API URL, status label for internal use, public CTAs, social image, and AI summary.
- Reusable metadata helpers for canonical URLs, Open Graph, Twitter/X cards, JSON-LD, sitemap, and AI-ingestion files.
- `robots.txt`, `sitemap.xml`, `llms.txt`, and an expanded AI-readable source file generated from content data.
- A registry-compatible token contract for color, type, spacing, radii, density, surfaces, elevation, motion, logos, handles, and page theming.
- Branch-specific token values and visual systems, finalized from the selected design branch.
- A neat internal configuration panel for exploring token dials and theme values, aligned with the future Studio UI Registry direction.
- Vercel-ready build and deploy configuration.

## Cross-Stream Dependency Map

- Workstream 1 establishes app foundation, build tooling, and repository shape with only a neutral shell.
- Workstream 2 depends on Workstream 1 and creates the registry-compatible token/dial contract, shadcn-compatible plumbing, validation, and internal configuration panel.
- Workstream 3 depends on Workstreams 1-2 and creates the content model, project registry, route map, metadata helpers, sitemap, robots, and AI-ingestion pipeline.
- Workstream 4 depends on Workstreams 1-3 and runs three complete design branches over the same shared foundation. Each branch sets its own token values and builds its own homepage and project pages.
- Workstream 5 depends on the selected Workstream 4 branch and hardens the selected site.
- Workstream 6 depends on all previous streams and closes deployment, visual QA, docs, and verification.

## Workstream 1: Web App Foundation

Goal: Create the production web-app foundation and verification commands for the marketing site.

Depends on:

- [x] Refreshed repo instructions and active roadmap.

Enables:

- [x] Token contract, content model, route model, metadata/AI files, design branches, deployment.

Repo guidance:

- Pick a static-first, Vercel-ready framework shape. Record the framework decision in `docs/decisions/`.

Primary areas:

- `package.json`
- `pnpm-lock.yaml`
- `src/` or `app/`
- `public/`
- `docs/decisions/`
- `.env.example`

Implementation tasks:

- [x] Initialize the web app with TypeScript, strict linting, formatting, test runner, and build command.
- [x] Add `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm verify`.
- [x] Add `.gitignore` and `.env.example` with secret names only.
- [x] Add a neutral base route shell, global reset, font loading strategy, and accessible document structure.
- [x] Add a decision record for the selected framework and deployment target.

Exit criteria:

- [x] The app builds locally.
- [x] `pnpm verify` runs the full local gate.
- [x] The root route renders a valid placeholder shell that design branches replace with complete site experiences.

Suggested verification:

- `pnpm install`
- `pnpm lint`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm verify`

Pass 1 closeout, 2026-06-06: Workstream 1 foundation is complete in the live repo. `pnpm lint`,
`pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm verify` pass locally.
Browser smoke against `/`, `/projects`, and `/projects/intercal` passes at 1440px desktop and 390px
mobile with no console errors or 404s. Public-file smoke confirms `robots.txt`, `sitemap.xml`,
`llms.txt`, `llms-full.txt`, `icon.svg`, and representative social assets return 200. The existing
prior-agent foundation also includes early Workstream 2 and Workstream 3 scaffolding; those later
workstreams still need their own focused passes before being marked complete.

Pass 2 closeout, 2026-06-06: fresh-context audit found no Workstream 1 code, tooling, public-file,
secret-handling, or docs-parity fixes needed. Current verification passed: `pnpm lint`,
`pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm verify`, `git diff --check`, tracked secret-file
scan, HTTP smoke for `/`, `/projects`, `/projects/intercal`, `/robots.txt`, `/sitemap.xml`,
`/llms.txt`, `/llms-full.txt`, `/icon.svg`, and `/social/jami-studio.svg`, canonical metadata
inspection for sampled routes, and Playwright render smoke at 1440px and 390px. Workstream 1 is
quiet; proceed to Workstream 2.

## Workstream 2: Registry-Compatible Token And Dial Foundation

Goal: Create the shared token/configuration engine that design branches use and the future Studio UI Registry can adopt.

Depends on:

- [x] Workstream 1 app foundation.

Enables:

- [x] Three design branches that vary look and feel without changing the underlying token contract.
- [x] Future Studio UI Registry items, blocks, and theme presets sourced from the same system.

Repo guidance:

- Build the token/dial contract before branching, not the final brand. Do not choose final colors, typography personality, or full component styling here.
- Align with shadcn conventions and registry-readiness, but do not force public registry packaging unless it is cheap and useful during this site build.
- The configuration panel should be very neat, tidy, organized, and practical for internal use. Use `C:\Users\james\projects\yrka\apps\web\components\admin\dock\appearance-panel.tsx`, sibling `appearance-*` tab/control files, `apps\web\lib\theme\workbench-*`, and `packages\design-tokens\src\business-theme-*` as the preferred reference for panel organization and token workflow. Do not copy Yrka's business-domain naming, persistence assumptions, or exact styling.

Primary areas:

- `src/registry/`
- `src/tokens/`
- `src/components/system/`
- `src/components/config-panel/`
- `src/lib/theme.*`
- `docs/architecture/`

Implementation tasks:

- [x] Define a typed token schema for color roles, typography roles, spacing, radii, surface depth, density, motion, logos, and handles.
- [x] Define parameterized dials for theme generation, such as accent, contrast, warmth, density, radius, surface depth, and motion intensity.
- [x] Add validation for token sets and theme presets.
- [x] Add shadcn-compatible CSS variable plumbing so branches can theme components through tokens rather than hardcoded values.
- [x] Add neutral primitive wrappers or adapters only where they clarify the future registry contract.
- [x] Add an internal configuration panel for inspecting and adjusting token dials.
- [x] Add a registry-readiness manifest or metadata shape for eventual Studio UI Registry promotion.
- [x] Document what is foundation-owned versus branch-owned.

Exit criteria:

- [x] A branch can define a token preset and apply it site-wide without changing the shared token schema.
- [x] The internal configuration panel renders the available dials and token output.
- [x] The token system is ready to become, or seed, a Studio UI Registry item later.
- [x] No final brand look is locked before the design branches.

Suggested verification:

- `pnpm test`
- `pnpm typecheck`
- `pnpm build`

Pass 1 replacement closeout, 2026-06-06: Workstream 2 is complete in the live repo. The token
contract now covers color roles, typography roles, spacing, radii, surfaces, elevation, density,
motion, logos, handles, dial definitions, ownership metadata, and registry-readiness metadata.
`src/tokens/presets.ts` can generate a branch preset from dials without changing the schema, and
`src/tokens/css-vars.ts` emits shadcn-compatible variables plus site-owned surface, spacing, type,
radius, elevation, and motion roles. The internal config panel is a client-side inspector/editor for
dials, token output, and registry ownership; it uses a small system token swatch primitive. Durable
docs now define foundation-owned versus branch-owned responsibilities. Verification passed:
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm verify`.

Pass 2 closeout, 2026-06-06: fresh-context audit confirmed the pass-1 token/dial foundation is
source-owned and cohesive. Follow-up work added focused config-panel render/tab coverage and fixed
neutral-shell responsive issues found during visual smoke: the desktop hero title no longer runs
under the project map, and the mobile header/heading stack no longer clips at the viewport edge.
Verification passed: `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm verify`,
`pnpm format:check`, `git diff --check`, HTTP smoke for `/`, `/projects`, `/projects/registry`,
`/robots.txt`, `/sitemap.xml`, and `/llms.txt`, and Chrome-headless desktop/mobile screenshot smoke
for the homepage plus tall mobile capture reaching the internal config panel. Workstream 2 is quiet;
proceed to Workstream 3 when ready.

## Workstream 3: Shared Content, Routing, Metadata, And AI Files

Goal: Centralize all public content, project data, route helpers, canonical metadata, sitemap, robots, and AI-readable files before design branching.

Depends on:

- [x] Workstream 1 app foundation.
- [x] Workstream 2 token/dial foundation.

Enables:

- [x] Homepage branches, project-page branches, generated sitemap, generated AI files, redirects, deploy routing.

Repo guidance:

- No page should hardcode a project subdomain, docs link, repo link, CTA, or summary if that value belongs to the project registry.

Primary areas:

- `src/content/`
- `src/lib/routes.*`
- `src/lib/metadata.*`
- `src/lib/sitemap.*`
- `src/lib/ai-public-files.*`
- `public/robots.txt`
- `src/app/` or route files

Implementation tasks:

- [x] Add project registry entries for Harness, Registry, Orchestra, Intercal, and Collectiva.
- [x] Add route helpers for canonical URLs, product subdomains, docs/API/repo links, and future standalone domains.
- [x] Add page content models for homepage sections, project detail sections, FAQs, CTAs, and AI summaries.
- [x] Add canonical metadata generation for every route.
- [x] Add Open Graph and Twitter/X metadata helpers.
- [x] Add JSON-LD helpers for Organization, WebSite, and project/software surfaces where appropriate.
- [x] Add generated sitemap.
- [x] Add robots policy.
- [x] Add generated `llms.txt` and expanded AI-readable source file from the shared content registry.
- [x] Add validation tests for required project fields and URL shape.
- [x] Add route and generated-file tests that fail if a public route is missing metadata, sitemap coverage, or AI-file coverage.

Exit criteria:

- [x] All public routes and links resolve from typed or validated content data.
- [x] Product subdomain targets can change from one source file.
- [x] Metadata, sitemap, robots, and AI-readable files are generated from shared data before design branches begin.

Suggested verification:

- `pnpm test`
- `pnpm typecheck`
- `pnpm build`

Pass 1 closeout, 2026-06-06: Workstream 3 is complete from the live repo state.
The existing content, route, metadata, sitemap, robots, and AI-file scaffolding was preserved and
expanded into a validated central project registry, shared external link roots, project URL/link
helpers, project metadata helpers, conservative project JSON-LD, project-detail CTA/link rendering
from registry data, and route/metadata/generated-file tests. Durable architecture docs now record
the source-owned content and generated-public-file ownership. Verification passed: `pnpm lint`,
`pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm verify`, and `git diff --check`. Local public-file
inspection after build confirmed `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`
return generated content from shared data.

Pass 2 closeout, 2026-06-06: fresh-context audit confirmed Workstream 3 pass 1 was present in the
live repo at commit `37038cf99ba74d6a4290e71900e3cb7d6706d256`. Follow-up work tightened the
central registry by deriving project routes, domain targets, and CTA hrefs from typed slug,
subdomain, repository, docs, and API fields instead of carrying duplicate free-form CTA URLs.
`llms-full.txt` now includes source-owned calls to action, and tests assert CTA derivation plus
AI-file CTA coverage. Durable architecture docs were updated to match the source-owned link
materialization contract. Verification passed: `pnpm lint`, `pnpm typecheck`, `pnpm test`,
`pnpm build`, `pnpm verify`, `pnpm format:check`, `git diff --check`, and local public-file
inspection for `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.

## Workstream 4: Three Complete Design Direction Branches

Goal: Produce three complete site designs after the shared data and generated-file foundation is solid, then select one direction to merge.

Depends on:

- [x] Workstream 1 app foundation.
- [x] Workstream 2 token/dial foundation.
- [x] Workstream 3 content, routing, metadata, sitemap, robots, and AI-file seams.

Enables:

- [x] A confident design choice without compromising the shared token contract, content, route, metadata, sitemap, or AI-file architecture.
- [x] Homepage and project pages already exist in each branch as complete comparable site experiences.

Repo guidance:

- Do not branch before the shared seams are stable. Each design branch must keep the same content registry, route helpers, metadata helpers, sitemap, robots, AI-file generation, tests, and public route contract.
- Each branch can choose its own token preset, colors, density, surface treatment, component styling, and page/block composition within the shared token/dial contract.
- Run the three design branches in parallel from the same foundation commit. Use separate branches or worktrees, push every branch to the remote early, keep them isolated, and do not merge any direction into `main` until the owner selects one.
- Prefer local branch/worktree review first. Use Vercel preview deploys only if comparing in browser locally is not enough or if remote review is useful.
- Keep each branch production-intent complete: homepage, project pages, responsive states, accessibility, and verification should all work in that branch. Branches may tune page composition and visual hierarchy, but must not fork the metadata or generated-file machinery.

Primary areas:

- `src/styles/`
- `src/components/`
- `src/app/` or route files
- `src/content/`
- `public/`

Implementation tasks:

- [x] Cut three branches from the same foundation commit, for example `design/direction-a`, `design/direction-b`, and `design/direction-c`.
- [x] Push all three design branches to the remote before substantial branch work starts.
- [x] Build Direction A with its own token preset, component language, homepage, and all project pages.
- [x] Build Direction B with its own token preset, component language, homepage, and all project pages.
- [x] Build Direction C with its own token preset, component language, homepage, and all project pages.
- [x] Run the same verification and visual smoke for all three directions.
- [x] Capture local URLs or preview URLs and concise notes for comparison.
- [x] Leave all three branches available for owner review until one is selected.
- [x] Select one branch, merge it to `main`, and close the other branches without mixing their visual systems into the selected direction.

Exit criteria:

- [x] All three design branches build and render complete site experiences over the same shared content, route, metadata, sitemap, robots, and AI-file seams.
- [x] All three design branches use the shared token/dial contract instead of hardcoded one-off styling.
- [x] The selected branch is merged to `main`.
- [x] Non-selected branches are left as review history or deleted after selection; their changes are not blended into `main` unless explicitly chosen.

Suggested verification:

- `pnpm verify`
- `pnpm build`
- Visual smoke at 1440px, 1024px, 768px, and 390px for each branch.

Selection closeout, 2026-06-07: owner selected the `jami.studio-design-agent-starter`
marketing surface as the preferred direction for `main`. Source comparison confirmed the starter
repo already matched the shared site code path; Workstream 5 promoted that selected surface through
focused homepage, project-index, project-detail, footer, responsive, and styling polish directly on
`main` without forking the source-owned content, route, metadata, sitemap, robots, or AI-file
contracts. Non-selected design branches remain available as review history.

## Workstream 5: Selected Direction Hardening

Goal: Merge the chosen design direction and harden the selected full site for production.

Depends on:

- [x] Selected Workstream 4 design direction.

Enables:

- [x] Final production candidate for deployment and QA.

Repo guidance:

- Do not rebuild homepage, project pages, metadata, or AI files from scratch here. This stream polishes the selected complete branch and removes comparison-only leftovers.

Primary areas:

- `src/app/page.*` or homepage route
- `src/app/projects/`
- `src/components/`
- `src/styles/`
- `src/content/`

Implementation tasks:

- [x] Merge the selected design branch to `main`.
- [x] Remove branch-comparison-only labels, temporary notes, and unused design-direction files.
- [x] Promote the selected branch's token preset, visual treatment, and reusable components as the single marketing-site brand system.
- [x] Mark any selected components, blocks, or page sections that should be considered candidate Studio UI Registry items.
- [x] Tighten homepage and project-page copy using the shared content model.
- [x] Confirm the selected design still uses shared project registry data and shared metadata/AI-file generation.
- [x] Run responsive, accessibility, and visual polish on the selected full site.

Exit criteria:

- [x] The selected branch is the only design system on `main`.
- [x] Homepage and every project page are complete, responsive, and copy-polished.
- [x] Metadata, sitemap, robots, and AI files still come from the shared foundation.
- [x] Candidate registry items are identified without blocking the marketing-site launch.

Suggested verification:

- `pnpm test`
- `pnpm build`
- Visual smoke at 1440px, 1024px, 768px, and 390px.

Closeout, 2026-06-07: selected-direction hardening is complete locally. The public homepage no
longer exposes the internal token panel as a primary marketing section; it now presents the
selected starter direction with a stronger project-family map, Intercal feature panel, proof-rich
project cards, polished project index, and complete project-detail pages. App tooling now excludes
local `docs/reports/` and `docs/research/` source-report artifacts from lint, formatting, and
typecheck so vendored research packs do not enter the web-app gate. Verification passed:
`pnpm format:check`, `pnpm verify` (`lint`, `typecheck`, `test`, `build`), local HTTP smoke for `/`,
`/projects`, `/projects/intercal`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and
`/llms-full.txt`, plus Chrome-headless screenshots for desktop and mobile-width homepage views.

Kirimo replacement closeout, 2026-06-13: the 2026-06-07 selected direction above is historical and
superseded. Kirimo is now the selected and imported presentation on `main` (`25e5b73`), and Stream A
confirmed the current Kirimo production candidate with `pnpm verify`, route/public-file smoke, sampled
metadata/canonical inspection, tracked secret scan, and desktop/mobile Playwright visual smoke. Current
Kirimo project routes are accepted for launch; deeper per-project page layout redesign remains post-launch.

## Workstream 6: Deployment, QA, And Closeout

Goal: Ship the site as a production-ready Vercel project with clean docs and verified public behavior.

Depends on:

- [x] Workstreams 1-5.

Enables:

- [x] Production deployment, documented preview path, future project/subdomain expansion.

Repo guidance:

- Deployment credentials and analytics keys stay in provider configuration, not tracked files.

Primary areas:

- deployment config
- `.env.example`
- `docs/operations/`
- `docs/decisions/`
- `docs/roadmaps/`

Implementation tasks:

- [x] Add deployment configuration and document Vercel setup.
- [x] Add domain mapping checklist for apex, `www`, and project subdomains.
- [x] Add analytics/privacy setup or explicitly defer with a decision record.
- [x] Run full verification.
- [x] Run visual QA across desktop and mobile.
- [x] Update durable docs with final operating instructions.
- [x] Update roadmap status truthfully.

Exit criteria:

- [x] Local build passes via `pnpm verify`.
- [x] Preview deploy path is documented; no successful branch-preview deploy is claimed from the landed evidence.
- [x] Production deploy path is documented and proven through the Git-source Vercel API deployment path.
- [x] Visual and metadata smoke checks pass.
- [x] No secrets are present in tracked files.

Suggested verification:

- `pnpm verify`
- `pnpm build`
- Preview deployment check
- Browser smoke for `/`, `/projects`, each project page, `robots.txt`, `sitemap.xml`, and `llms.txt`.

## Final Verification And Closeout

- [x] `pnpm lint` via Stream A/B `pnpm verify`.
- [x] `pnpm typecheck` via Stream A/B `pnpm verify`.
- [x] `pnpm test` via Stream A/B `pnpm verify`.
- [x] `pnpm build` via Stream A/B `pnpm verify`.
- [x] `pnpm verify`
- [x] Visual smoke at desktop and mobile.
- [x] Inspect `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, and canonical metadata.
- [x] Confirm no secrets in tracked files.
- [x] Confirm docs and roadmap reflect actual delivered behavior.
- [x] Stage only intentional files.
- [x] Commit with a conventional-style subject and body.
- [x] Push to the default branch when a git remote exists.

## Acceptance Criteria

- [x] `www.jami.studio` is a complete production marketing site, not a placeholder.
- [x] The homepage is polished, on-brand, responsive, accessible, and copy-complete.
- [x] Harness, Registry, Orchestra, Intercal, and Collectiva each have launch-grade project routes backed by centralized content data; deeper per-project page layout redesign is explicitly post-launch.
- [x] Three design directions were either run to complete comparable branches after the shared foundation or explicitly skipped by owner decision.
- [x] The shared token/dial system is reusable as a Studio UI Registry seed or candidate item set.
- [x] All project URLs, subdomains, repos, docs links, CTAs, and summaries are centralized.
- [x] Subdomain or standalone-domain changes require metadata edits, not component rewrites.
- [x] The site emits complete canonical metadata, sitemap, robots, and AI-readable files.
- [x] The codebase has working lint, typecheck, test, build, and verify commands.
- [x] Deployment and domain setup are documented.
- [x] No tracked file contains secrets or private operational credentials.

## Implementation Order

1. Refresh repo docs and standards for the marketing-site codebase.
2. Initialize the web app and verification commands.
3. Add framework/deployment decision record.
4. Build the registry-compatible token/dial contract, validation, shadcn-compatible plumbing, and internal configuration panel.
5. Build content registry, route model, metadata, sitemap, robots, and AI-file generation.
6. Cut three design branches from the same stable foundation commit.
7. Finish each design branch with its own token preset, visual system, complete homepage, and all project pages.
8. Compare locally or by preview deploy.
9. Select Kirimo and merge/import it to `main` without losing the restored `main` roadmap, ADR, operations, or security docs.
10. Promote the Kirimo visual system as the public marketing-site presentation without redesigning it or coupling it to UI Registry styling demands.
11. Verify the current project routes as launch-grade; defer deeper project-page layout work to a later global redesign.
12. Identify candidate components/blocks/page sections for future Studio UI Registry promotion without making registry promotion a launch blocker.
13. Add deploy/domain operations docs.
14. Run full verification and visual QA.
15. Update roadmap, docs, and closeout artifacts.

## Orchestrator Checkpoints

- [x] 2026-06-12T18:44:49.3264351-04:00 - Dispatched Stream A / Workstream 6 production-candidate
  audit pass 1 to subagent `019ebe02-45d3-7d71-a051-a0f34fb45b69` (`Hooke`). Ownership boundary:
  current `main` Kirimo production-candidate verification, launch-grade defect fixes only, route/public-file
  smoke, desktop/mobile visual smoke, metadata/canonical inspection, tracked secret scan, and evidence
  reporting. Active workstreams: Stream A only. Next coordinator action: wait for terminal result, log it,
  and dispatch a fresh Stream A pass 2 before gating closeout.
  Result 2026-06-12: completed from `main` with one launch-grade CTA defect fixed in centralized
  project metadata: Harness now points to `https://github.com/studio-jami/jami-harness` and Studio UI
  Registry now points to `https://github.com/studio-jami/studio-ui`. Verification passed: `pnpm verify`
  (`lint`, `typecheck`, 17 tests, `build`), local production HTTP smoke for `/`, `/projects`, all five
  `/projects/[slug]` routes, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`,
  metadata/canonical inspection for `/`, `/projects`, and `/projects/registry`, public CTA target checks
  for the GitHub org, all five repository links, and `https://intercal.jami.studio`, tracked secret-pattern
  scan, and desktop/mobile Playwright visual smoke with mobile-nav and first-tab skip-link checks. The
  in-app Browser plugin was unavailable for `iab`, so visual/browser evidence used local Playwright
  instead. No screenshots, design-bakeoff leftovers, local helper logs, or pre-existing untracked helper
  directories were staged.
- [~] 2026-06-12T21:26:59.5417469-04:00 - Dispatched fresh Stream A / Workstream 6
  production-candidate AUDIT/EXECUTE pass 2 to subagent `019ebe96-96a4-7f53-8c96-5e55b866c5bd`
  (`Archimedes`). Ownership boundary: confirm or fix current Kirimo production-candidate state after
  pass 1, with no workflow mechanics changes. Active workstreams: Stream A only. Next coordinator
  action: wait for terminal result, then gate Stream A using the second-pass commit/no-change evidence.
  Result 2026-06-12: pass 2 found no launch-grade defects and made no file changes. Verification
  passed: `pnpm verify`, production-server smoke for `/`, `/projects`, all five project pages,
  `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`, Playwright route capture,
  desktop/mobile visual smoke for home, project index, and `/projects/intercal`, metadata/canonical
  inspection for `/`, `/projects`, and `/projects/intercal`, tracked secret scan, CTA/link placeholder
  scan, and tracked artifact check. The in-app Browser control tool was not exposed, so Playwright CLI
  was used; mobile smoke used Chromium at `390x844` because the WebKit device preset was unavailable.
  Coordinator gate: Stream A is closed as class C / quiet second pass. Remaining Workstream 6 lanes:
  deployment/domain closeout and analytics/privacy decision.
- [~] 2026-06-12T21:47:38.9064090-04:00 - Dispatched Stream B / Workstream 6 deployment-domain
  AUDIT/EXECUTE pass 1 to subagent `019ebea9-8c48-78e3-9402-7884003d69f5` (`Boole`). Ownership
  boundary: deployment/domain operations docs/config, Vercel/build/domain evidence, preview and rollback
  path, required env-var names only, product-subdomain ownership plan, and directly required roadmap
  evidence. Active workstreams: Stream B only. Next coordinator action: wait for terminal result, log it,
  and dispatch a fresh Stream B pass 2 before gating closeout.
  Result 2026-06-13: pass 1 updated `docs/operations/deployment-and-domains.md` to the current
  Kirimo-era operating shape and recorded verified external evidence without inventing missing provider
  proof. Verified: no repo-local `.vercel/project.json` or `vercel.json`; source build settings are
  Next.js from repo root with `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm verify`;
  Vercel MCP authenticated to team `yrka` but exposed no `jami.studio`/`jami-studio` project; accessible
  `marketing` project is tied to `yrka-io/yrka`, not this repo; Vercel CLI authenticated as
  `jamienavinhill` with no personal-scope projects; Cloudflare authoritative nameservers are
  `elliott.ns.cloudflare.com` and `irena.ns.cloudflare.com`; `www.jami.studio` CNAMEs to a Vercel DNS
  target and returns `200 OK`; apex `jami.studio` resolves to Vercel A records and returns `308` to
  `https://www.jami.studio/`; `intercal.jami.studio` CNAMEs to Vercel and returns `200 OK`; `harness`,
  `registry`, `orchestra`, and `collectiva` subdomains do not resolve. Remaining Stream B risk: live
  `www.jami.studio` still serves the older starter/system-map presentation, so the domain is live but
  the current Kirimo `main` production candidate is not verified as deployed.
- [~] 2026-06-12T22:01:03.3332169-04:00 - Dispatched fresh Stream B / Workstream 6
  deployment-domain AUDIT/EXECUTE pass 2 to subagent `019ebeb5-edaa-7d23-bcb3-b61517f0b5a2`
  (`Hypatia`). Ownership boundary: exhaust accessible Vercel/GitHub/CLI/DNS evidence for the stale
  production deployment, establish or verify a safe deploy path if available, update only proven
  deployment/domain docs and roadmap evidence, and avoid workflow mechanics changes. Active workstreams:
  Stream B only. Next coordinator action: wait for terminal result, then gate Stream B using the
  second-pass commit/no-change evidence.
  Result 2026-06-13: pass 2 proved the owning Vercel path through the local token-backed
  `studio-jami` scope. The `jami.studio` Vercel project is linked to `JamiStudio/jami.studio`, production
  branch `main`, root directory `.`, and Next.js/Node 24 build settings. A Git-source production deploy
  for commit `577d8ddb30e519434c500285aef22ea47777226c` reached `READY` / `PROMOTED` as
  `dpl_7RwnuGqTaLKKk9o4faHLfZQomQeL` with `www.jami.studio`, `jami.studio`, and the main branch alias
  assigned. Verification passed: `pnpm verify`; Vercel inspect for `www.jami.studio` and
  `jamistudio-git-main-studio-jami.vercel.app`; remote HTTP smoke for `/`, `/projects`, all five project
  pages, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`; apex `308` redirect to
  `https://www.jami.studio/`; DNS for `www`, apex, Intercal, and absent reserved subdomains; live HTML no
  longer contains the old starter/system-map marker. Caveat: local-source CLI preview/production uploads
  created `BLOCKED` deployments with no build logs or alias assignment, so Git-source API deployment is the
  proven fallback path.
- [~] 2026-06-12T22:34:51.3978134-04:00 - Dispatched fresh Stream B / Workstream 6 deployment-domain
  AUDIT/EXECUTE pass 3 to subagent `019ebed4-d6ad-7302-be78-e097b6bee6b7` (`Fermat`). Ownership
  boundary: quiet confirmation of production Kirimo deployment, apex redirect, public route/file
  status, Vercel runbook accuracy, product-subdomain status, and absence of staged Vercel/secret
  metadata. Active workstreams: Stream B only. Next coordinator action: wait for terminal result, then
  close Stream B if the pass is quiet or rerun if it finds meaningful gaps.
  Result 2026-06-13: pass 3 confirmed the live production surface remains Kirimo-era content and not
  the old starter/system-map presentation; `https://jami.studio/` returns `308` to
  `https://www.jami.studio/`; `/`, `/projects`, all five project pages, `/robots.txt`,
  `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt` return `200`; Vercel CLI/API evidence still points
  to `studio-jami/jami.studio`, deployment `dpl_7RwnuGqTaLKKk9o4faHLfZQomQeL`, READY production target,
  aliases for `www`, apex, and main; Intercal resolves and serves `200`, while `harness`, `registry`,
  `orchestra`, and `collectiva` do not resolve. Documentation precision fix: the Projects API currently
  returns default/blank `productionBranch` and command fields, while the deployment API proves Git source
  ref `main`; no `.vercel` metadata, credentials, deploy tokens, or local secret/account files were staged
  or introduced. Coordinator gate on commit `af915f0af70e084b75dfd4abfed37601ee4d571f`: numeric gate
  passed (2 files, 21 insertions, 2 deletions), character classified as C - docs/evidence precision
  cleanup. Stream B is closed.
- [~] 2026-06-12T22:41:25.9398518-04:00 - Dispatched Stream C / Workstream 6 analytics-privacy
  AUDIT/EXECUTE pass 1 to subagent `019ebeda-e995-7442-a1ec-8e44faf2d272` (`Linnaeus`). Ownership
  boundary: decide and execute minimal analytics implementation or explicit analytics/privacy deferral,
  durable decision record if deferring, env names only if implementing, no secrets, and directly required
  roadmap evidence. Active workstreams: Stream C only. Next coordinator action: wait for terminal result
  and dispatch a fresh Stream C pass 2 before gating closeout.
  Result 2026-06-13: pass 1 found no runtime analytics implementation in the tracked app and no
  launch-critical dependency on analytics data. Analytics is explicitly deferred for launch in
  `docs/decisions/2026-06-13-analytics-privacy-deferral.md`: PostHog Cloud is the deferred first-choice
  provider, Amplitude is a backup pending fresh implementation evidence, and launch proceeds without
  analytics scripts, cookies, session replay, or required analytics host variables. Directly related
  operations evidence now records that no analytics Vercel variables are required for launch.
- [~] 2026-06-12T22:48:05.1756621-04:00 - Dispatched fresh Stream C / Workstream 6 analytics-privacy
  AUDIT/EXECUTE pass 2 to subagent `019ebee1-0162-78b3-8f30-0686e57b1c98` (`Tesla`). Ownership
  boundary: confirm or fix analytics/privacy deferral clarity, deployment/domain and roadmap parity,
  absence of analytics runtime code, and absence of tracked analytics keys/secrets. Active workstreams:
  Stream C only. Next coordinator action: wait for terminal result, then gate Stream C using the
  second-pass commit/no-change evidence.
  Result 2026-06-13: pass 2 confirmed the deferral decision is durable and launch-sufficient. The
  decision record, deployment/domain runbook, `.env.example`, and roadmap evidence agree that launch
  requires no analytics script, cookie banner, consent manager, session replay, tracking event, or
  analytics host value. Current tracked app code has no analytics provider dependency or instrumentation;
  the only browser storage hit is the existing theme preference. Tracked analytics key scan found no
  PostHog, Amplitude, analytics-site-id, Vercel token, or required analytics host values. Stream C is
  quiet after this evidence update. Coordinator gate on commit
  `e9f04f1a7a9c76681d27a19452d65454d20857ed`: numeric gate passed (1 file, 15 insertions, 1
  deletion), character classified as C - roadmap evidence confirmation. Stream C is closed.
- [~] 2026-06-12T22:54:34.3920573-04:00 - Dispatched Stream D / roadmap closeout AUDIT/EXECUTE
  pass 1 to subagent `019ebee6-eae0-70e2-931a-23f6c48cc7b0` (`Hubble`). Ownership boundary: final
  roadmap and durable-doc status parity after Streams A/B/C, Workstream 5 and Workstream 6 evidence,
  project-page redesign post-launch note, closed design-goal posture, deployment/domain and analytics
  decision references, and final checklist truthfulness. Active workstreams: Stream D only. Next
  coordinator action: wait for terminal result and dispatch a fresh Stream D pass 2 before final gating.
  Result 2026-06-13: pass 1 updated status surfaces only. Workstream 5 is marked complete for the
  already-imported Kirimo design and Stream A production-candidate verification. Workstream 6 tasks now
  reflect the landed evidence from Stream A/B/C: local verification and visual smoke passed, production
  deployment is live on `www.jami.studio`, apex redirects to `www`, deployment/domain operations are
  documented, analytics/privacy is explicitly deferred, and no successful branch-preview deploy is invented.
  Durable decision references were aligned with Kirimo imported-to-`main` reality, the design-goal brief stays
  closed/history-only, and deeper project-page redesign remains post-launch.
- [~] 2026-06-13T02:39:39.5306251-04:00 - Dispatched fresh Stream D / roadmap closeout
  AUDIT/EXECUTE pass 2 to subagent `019ebfb5-0a96-7fb1-ae97-2ef0297fa758` (`Lorentz`). Ownership
  boundary: confirm or fix final roadmap/durable-doc parity, design-goal closed posture, deployment,
  domain, analytics, final checklist truthfulness, and absence of workflow/process changes. Active
  workstreams: Stream D only. Next coordinator action: wait for terminal result, then gate Stream D.
  Result 2026-06-13: pass 2 found no contradiction across the roadmap, deployment/domain runbook, Kirimo
  ADR, analytics/privacy decision, active goal prompt, or closed design-goal brief. Fresh external checks
  confirmed `www.jami.studio` returns `200 OK`, apex `jami.studio` returns `308` to `www`, all public
  routes and AI files return `200`, `intercal.jami.studio` is live, and the reserved `harness`, `registry`,
  `orchestra`, and `collectiva` subdomains remain absent from DNS. No successful branch-preview deploy is
  claimed; the preview path remains documented only. Stream D is closed with a roadmap-status-only update.

- [~] 2026-06-06T13:15:59.9373818-04:00 - Dispatched Workstream 1 pass 1 to subagent
  `019e9def-09d0-7e11-84b5-41a7ba7f739d` (`Boole`). Ownership boundary: app foundation,
  verification scripts, neutral route shell, `.gitignore`/`.env.example`, framework/deploy
  decision docs, and Workstream 1 roadmap/doc parity only. Active workstreams: Workstream 1 only.
  Result 2026-06-06T13:33:39.1097901-04:00: completed and pushed commit
  `06f435a7c6ce3e5a53ab315a2bca75d8ad55d52f` (`feat: establish marketing site foundation`).
  Verification reported: `pnpm format:check`, `pnpm verify`, HTTP smoke, Playwright smoke at 1440px
  and 390px, secret-pattern scan. Remaining dirty file reported and confirmed:
  `docs/engineering/agents/goal.md`. Next coordinator action: dispatch fresh Workstream 1 pass 2.
- [~] 2026-06-06T13:34:52.8107319-04:00 - Dispatched Workstream 1 pass 2 to subagent
  `019e9e00-4aee-70e2-aee8-de59bfb91fed` (`Banach`). Ownership boundary: fresh-context
  Workstream 1 audit/execute pass over pass-1 foundation, verification wiring, docs/roadmap parity,
  and unsafe overreach/secret checks. Active workstreams: Workstream 1 only. Next coordinator action:
  wait quietly, then log terminal result and gate Workstream 1 per the second-pass commit rules.
  Result 2026-06-06: pass 2 found no code or config gaps. Verification passed: `pnpm lint`,
  `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm verify`, `git diff --check`, tracked
  secret-file scan, local HTTP/public-file smoke, canonical metadata inspection, and Playwright
  desktop/mobile render smoke. Remaining pre-existing dirty file intentionally left unstaged:
  `docs/engineering/agents/goal.md`. Next coordinator action: close Workstream 1 and dispatch
  Workstream 2 when ready.
- [x] 2026-06-06T13:42:48.8685812-04:00 - Coordinator gated Workstream 1 pass 2 commit
  `e2fc19d72b41b4cdd2f4602308d5cb6c5df2fec4`: numeric gate passed (3 files, 122 insertions,
  3 deletions), character classified as C - tests plus small doc/cleanup closeout. Workstream 1 is
  closed. Repo status is clean except the pre-existing unstaged `docs/engineering/agents/goal.md`.
  Next coordinator action: dispatch Workstream 2 pass 1.
- [~] 2026-06-06T13:43:48.4604588-04:00 - Dispatched Workstream 2 pass 1 to subagent
  `019e9e08-793e-73a1-bb9b-8d54a4c7779e` (`Poincare`). Ownership boundary: token/dial schema,
  validation, shadcn-compatible CSS variable plumbing, internal configuration panel,
  registry-readiness metadata, tests, and architecture docs for foundation-owned vs branch-owned
  responsibilities. Active workstreams: Workstream 2 only. Next coordinator action: wait quietly,
  then log terminal result and dispatch a fresh Workstream 2 pass 2 after pass 1 lands.
- [!] 2026-06-06T14:19:32.5323075-04:00 - Workstream 2 pass 1 subagent
  `019e9e08-793e-73a1-bb9b-8d54a4c7779e` was resumable after a continuation boundary but returned
  no terminal result after three long quiet waits. Durable repo state showed no Workstream 2 commit
  after `e2fc19d72b41b4cdd2f4602308d5cb6c5df2fec4`; repo status remained dirty only for
  `docs/engineering/agents/goal.md` and this roadmap checkpoint. Next coordinator action: close the
  stale handle and dispatch a replacement Workstream 2 pass 1.
- [x] 2026-06-06T14:20:35.8409876-04:00 - Dispatched replacement Workstream 2 pass 1 to subagent
  `019e9e2a-240d-7fe1-ab42-bb7b0d67dd0b` (`Linnaeus`). Ownership boundary: token/dial schema,
  validation, shadcn-compatible CSS variable plumbing, internal configuration panel,
  registry-readiness metadata, tests, and architecture docs for foundation-owned vs branch-owned
  responsibilities. Active workstreams: Workstream 2 only. Result 2026-06-06: completed from live
  repo state. Early scaffolding was preserved and expanded into the complete token/dial foundation,
  internal config panel, registry metadata, tests, and docs parity. Verification passed:
  `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm verify`, `pnpm format:check`,
  and `git diff --check`; local HTTP smoke passed for `/`, `/robots.txt`, `/sitemap.xml`, and
  `/llms.txt`. Visual screenshot smoke was not run in pass 1. Next coordinator action: dispatch a
  fresh Workstream 2 pass 2 audit.
- [~] 2026-06-06T14:33:41.4072589-04:00 - Dispatched Workstream 2 pass 2 to subagent
  `019e9e36-2612-7250-bd0f-8de24f1fb852` (`Parfit`). Ownership boundary: fresh-context
  Workstream 2 audit/execute pass over pass-1 token/dial foundation, config panel, validation,
  CSS variables, registry-readiness manifest, tests, docs, and the visual-smoke gap if tooling is
  available. Active workstreams: Workstream 2 only. Next coordinator action: wait quietly, then log
  terminal result and gate Workstream 2 per the second-pass commit rules.
- [x] 2026-06-06 - Workstream 2 pass 2 completed from live repo state. Audit found the shared
  token/dial schema, dial-derived preset generation, validation, shadcn-compatible CSS variables,
  registry-readiness manifest, and ownership docs present. Follow-up changes added config-panel
  component coverage and narrow responsive shell fixes proven by Chrome-headless desktop/mobile
  smoke. Verification passed: `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`,
  `pnpm verify`, `pnpm format:check`, `git diff --check`, local HTTP smoke, and screenshot smoke.
  Next coordinator action: gate Workstream 2 as closed and dispatch Workstream 3 when ready.
- [x] 2026-06-06T14:48:32.6766518-04:00 - Coordinator gated Workstream 2 pass 2 commit
  `783b180f90d288c3541ab7e9ab1523e3506cbf5d`: numeric gate passed (3 files, 82 insertions,
  6 deletions), character classified as C - tests plus small doc/cleanup. Workstream 2 is closed.
  Next coordinator action: dispatch Workstream 3 pass 1.
- [~] 2026-06-06T14:50:46.6415344-04:00 - Dispatched Workstream 3 pass 1 to subagent
  `019e9e45-c9e7-7f13-a60c-a2e26d782625` (`Ampere`). Ownership boundary: centralized content,
  route helpers, canonical metadata, sitemap, robots, AI public-file helpers, public route coverage,
  tests, and Workstream 3 docs/roadmap parity. Active workstreams: Workstream 3 only. Result
  2026-06-06: completed from live repo state with validated content registry, route/link helpers,
  project metadata and JSON-LD helpers, generated-file coverage, homepage FAQ content model, docs
  parity, and focused tests. Verification passed: `pnpm lint`, `pnpm typecheck`, `pnpm test`,
  `pnpm build`, `pnpm verify`, `pnpm format:check`, `git diff --check`, and local HTTP inspection of
  `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, and sampled canonical metadata. Next
  coordinator action: gate Workstream 3 and dispatch a fresh Workstream 3 pass 2 audit if required.
- [~] 2026-06-06T15:06:16.7023413-04:00 - Dispatched Workstream 3 pass 2 to subagent
  `019e9e53-fa2c-7521-b7be-182abc85bda7` (`Descartes`). Ownership boundary: fresh-context
  Workstream 3 audit/execute pass over centralized content, route helpers, canonical metadata,
  sitemap, robots, AI files, public route coverage, generated-file tests, and docs/roadmap parity.
  Active workstreams: Workstream 3 only. Result 2026-06-06: completed from live repo state with
  source-owned route/domain/CTA materialization, expanded AI-source CTA coverage, tests for CTA
  derivation and generated-file coverage, and site-foundation docs parity. Verification passed:
  `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm verify`, `pnpm format:check`,
  `git diff --check`, and local public-file inspection. Next coordinator action: gate Workstream 3
  per the second-pass commit rules.
- [x] 2026-06-06T15:13:36.2892667-04:00 - Coordinator gated Workstream 3 pass 2 commit
  `784ddf2b87cac1511469572587ac01105b79b8af`: numeric gate passed (6 files, 114 insertions,
  44 deletions), character classified as C - tests plus narrow content/metadata cleanup.
  Workstream 3 is closed. Next coordinator action: dispatch Workstream 4 pass 1.
- [x] 2026-06-06T15:15:15.6822373-04:00 - Dispatched Workstream 4 Direction A pass 1 to subagent
  `019e9e5d-4a14-7083-91d0-11a90d5921c1` (`Hooke`) on branch `design/direction-a` from base
  `171b6a6a36d5e7107b3a37d77630d190f03276de`. Result 2026-06-06T18:14:24.1829536-04:00:
  completed and pushed `535ee822b4fc4047d2e59486588cd3e0907d2480` to `origin/design/direction-a`.
  Verification reported: lint, typecheck, tests, build, verify, targeted Prettier, diff check, HTTP
  smoke, canonical metadata inspection, and Playwright desktop/mobile visual smoke. Next coordinator
  action: run fresh Direction A pass 2 after Direction C pass 1 is available or when sequencing
  allows.
- [x] 2026-06-06T15:15:15.6822373-04:00 - Dispatched Workstream 4 Direction B pass 1 to subagent
  `019e9e5d-5e55-72d3-8ef0-a2a6f6634085` (`Faraday`) on branch `design/direction-b` from base
  `171b6a6a36d5e7107b3a37d77630d190f03276de`. Result 2026-06-06T18:14:24.1829536-04:00:
  completed and pushed `ac6607c2887e179c31a8588a7bf3b88e59efe483` to `origin/design/direction-b`.
  Verification reported: lint, typecheck, tests, build, verify, format check, diff check,
  public-file inspection, canonical metadata inspection, and Playwright visual smoke at 1440px,
  768px, and 390px. Next coordinator action: run fresh Direction B pass 2 after Direction C pass 1
  is available or when sequencing allows.
- [!] 2026-06-06T15:15:15.6822373-04:00 - Workstream 4 Direction C pass 1 dispatch was deferred
  because the subagent thread limit was reached.
- [~] 2026-06-06T18:14:24.1829536-04:00 - Dispatched Workstream 4 Direction C pass 1 to subagent
  `019e9eff-8f24-7831-84d4-1eeb60c82d4b` (`Huygens`) on branch `design/direction-c` from base
  `171b6a6a36d5e7107b3a37d77630d190f03276de`, preferably in separate worktree
  `C:\Users\james\dev\orgs\oss\jami.studio-direction-c`. Ownership boundary: complete Direction C
  operational command-center visual system, branch-owned token preset values, reusable
  sections/components, homepage, `/projects`, all project pages, verification, visual smoke, and
  branch docs/roadmap notes. Active workstreams: Workstream 4 Direction C only. Result
  2026-06-06T21:28:51.5174882-04:00: completed and pushed
  `cc2afdc4803fa3d89a3e5299229e85761efba511` to `origin/design/direction-c`. Verification reported:
  lint, typecheck, tests, build, verify, format check, diff check, HTTP smoke, canonical/social
  metadata sample, and Playwright visual smoke at 1440, 1024, 768, and 390 widths. Next coordinator
  action: dispatch fresh pass 2 for all three design directions.
- [~] 2026-06-06T21:30:25.5370027-04:00 - Dispatched Workstream 4 Direction A pass 2 to subagent
  `019e9fb3-7543-7d43-a591-e2fa699f05fe` (`Dewey`) on branch `design/direction-a` in worktree
  `C:\Users\james\dev\orgs\oss\jami.studio-direction-a`. Ownership boundary: fresh-context audit of
  the full Direction A design branch, including homepage, `/projects`, all project pages, shared data
  consumption, token preset use, responsive behavior, visual assets, metadata/public files, and
  verification. Active workstreams: Direction A pass 2 and Direction B pass 2. Next coordinator
  action: wait quietly.
  Result 2026-06-06T22:11:35.1570599-04:00: completed and pushed
  `86cacc3a5a9db3aa98a317df8afe125571234e9e` to `origin/design/direction-a`. Verification reported:
  lint, typecheck, tests, build, verify, diff check, HTTP smoke, metadata sample, browser visual
  smoke across 28 route/viewport combinations, and tracked secret-pattern scan.
- [x] 2026-06-06T22:11:35.1570599-04:00 - Coordinator gated Workstream 4 Direction A pass 2 commit
  `86cacc3a5a9db3aa98a317df8afe125571234e9e`: numeric gate passed (2 files, 15 insertions,
  3 deletions), character classified as C - focused responsive/verification stabilization.
  Direction A is closed for Workstream 4 comparison.
- [~] 2026-06-06T21:30:25.5370027-04:00 - Dispatched Workstream 4 Direction B pass 2 to subagent
  `019e9fb3-9162-7102-8edc-fe065afb0a2b` (`Pascal`) on branch `design/direction-b` in worktree
  `C:\Users\james\dev\orgs\oss\jami.studio-direction-b`. Ownership boundary: fresh-context audit of
  the full Direction B design branch, including homepage, `/projects`, all project pages, shared data
  consumption, token preset use, responsive behavior, visual assets, metadata/public files, and
  verification. Active workstreams: Direction A pass 2 and Direction B pass 2. Next coordinator
  action: wait quietly.
  Result 2026-06-06T22:09:04.4695776-04:00: completed and pushed
  `d2e20b03ccf4ceac3cafd1c6c38cfcfbffbbe63c` to `origin/design/direction-b`. Verification reported:
  `pnpm format:check`, `pnpm verify`, `git diff --check`, HTTP smoke, and Chrome headless visual
  smoke at 1440, 1024, 768, and 390 widths. Next coordinator action: gate Direction B pass 2.
- [x] 2026-06-06T22:09:04.4695776-04:00 - Coordinator gated Workstream 4 Direction B pass 2 commit
  `d2e20b03ccf4ceac3cafd1c6c38cfcfbffbbe63c`: numeric gate passed (4 files, 40 insertions,
  7 deletions), character classified as C - small responsive/public-copy cleanup with verification.
  Direction B is closed for Workstream 4 comparison.
- [~] 2026-06-06T22:09:04.4695776-04:00 - Dispatched Workstream 4 Direction C pass 2 to subagent
  `019e9fd7-0971-7f33-bc87-54af54e1b381` (`Avicenna`) on branch `design/direction-c` in worktree
  `C:\Users\james\dev\orgs\oss\jami.studio-direction-c`. Ownership boundary: fresh-context audit of
  the full Direction C design branch, including homepage, `/projects`, all project pages, shared data
  consumption, token preset use, responsive behavior, visual assets, metadata/public files, and
  verification. Active workstreams: Direction A pass 2 and Direction C pass 2. Next coordinator
  action: wait quietly.
  Result 2026-06-06T22:30:50.1181662-04:00: completed and pushed
  `215de3483674cdec4c2d63bcfa11f3bb8c30f47b` to `origin/design/direction-c`. Verification reported:
  `pnpm format:check`, `pnpm verify`, `git diff --check`, HTTP smoke, and CDP viewport smoke at
  1440, 1024, 768, and 390 widths.
- [x] 2026-06-06T22:30:50.1181662-04:00 - Coordinator gated Workstream 4 Direction C pass 2 commit
  `215de3483674cdec4c2d63bcfa11f3bb8c30f47b`: numeric gate passed (3 files, 41 insertions,
  5 deletions), character classified as C - responsive/public-copy cleanup with verification.
  Direction C is closed for Workstream 4 comparison.
- [x] 2026-06-06T22:30:50.1181662-04:00 - Workstream 4 design branches are ready for owner
  comparison: `origin/design/direction-a` at `86cacc3a5a9db3aa98a317df8afe125571234e9e`,
  `origin/design/direction-b` at `d2e20b03ccf4ceac3cafd1c6c38cfcfbffbbe63c`, and
  `origin/design/direction-c` at `215de3483674cdec4c2d63bcfa11f3bb8c30f47b`. Next coordinator
  action: prepare concise comparison evidence and request/record owner selection before merging one
  design branch to `main`.
- [x] 2026-06-06T23:45:00.0000000-04:00 - Owner requested Workstream 4 rerun with three new
  high-polish design branches after the first GPT directions underwhelmed. Cut `design/rerun-a`,
  `design/rerun-b`, and `design/rerun-c` from foundation `171b6a6a36d5e7107b3a37d77630d190f03276de`,
  pushed all three branches to origin, and created worktrees
  `C:\Users\james\dev\orgs\oss\jami.studio-rerun-a`,
  `C:\Users\james\dev\orgs\oss\jami.studio-rerun-b`, and
  `C:\Users\james\dev\orgs\oss\jami.studio-rerun-c`.
- [x] 2026-06-06 - Workstream 4 rerun pass 1+2 completed for all three directions. Polish commits:
  `origin/design/rerun-a` at `3a5528760745eb95ed4905a6f7b2075c2c678afe` (Obsidian Atlas),
  `origin/design/rerun-b` at `c69e2f5a27c4df303cd9aa61294b3814196c9e5f` (Luminous Grid),
  `origin/design/rerun-c` at `044d98c3a370bd93d1be715de6a20ce6dd880129` (Signal Forge). All branches
  passed lint, typecheck, test, build, verify, HTTP smoke, and viewport visual smoke. Next coordinator
  action: owner local review across the three rerun worktrees before selecting a direction for merge.

## Expansion Track

- Add technical essays and project docs previews once each project repo has stable docs.
- Add newsletter/list capture once email provider and privacy posture are finalized.
- Add changelog/news only as a curated editorial surface, not a development-status dump.
- Add generated social cards per project.
- Add docs search or cross-project index when the project docs surfaces exist.
