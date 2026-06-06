# Jami Studio Marketing Site Implementation Plan

Date: 2026-06-06
Status: [ ] Active
Source reports: `C:\Users\james\dev\docs\reports\E-operations-gtm\F18-brand-and-identity.md`, `C:\Users\james\dev\docs\reports\E-operations-gtm\F19-marketing-and-content.md`, `C:\Users\james\dev\docs\reports\D-distribution-products-ax\F16-products.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F05-harness-runtime.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F09-ui-registry-and-render-seam.md`, `C:\Users\james\dev\docs\reports\B-agent-substrate\F10-orchestra-and-dev-system.md`
Owner: Jamie
Surface: `www.jami.studio` marketing site and OSS project hub

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

## Scope Boundaries

- [x] In scope: marketing site, project pages, route model, content model, metadata, shared token/dial contract, branch-specific brand/visual values, responsive UI, AI-ingestion files, sitemap, robots, deployment readiness, and verification.
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

- A canonical homepage with strong brand signal, project-family overview, proof-oriented sections, direct CTAs, OSS links, and technical credibility.
- Reusable project pages for Harness, Registry, Orchestra, Intercal, and Collectiva.
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

## Workstream 2: Registry-Compatible Token And Dial Foundation

Goal: Create the shared token/configuration engine that design branches use and the future Studio UI Registry can adopt.

Depends on:

- [ ] Workstream 1 app foundation.

Enables:

- [ ] Three design branches that vary look and feel without changing the underlying token contract.
- [ ] Future Studio UI Registry items, blocks, and theme presets sourced from the same system.

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

- [ ] Define a typed token schema for color roles, typography roles, spacing, radii, surface depth, density, motion, logos, and handles.
- [ ] Define parameterized dials for theme generation, such as accent, contrast, warmth, density, radius, surface depth, and motion intensity.
- [ ] Add validation for token sets and theme presets.
- [ ] Add shadcn-compatible CSS variable plumbing so branches can theme components through tokens rather than hardcoded values.
- [ ] Add neutral primitive wrappers or adapters only where they clarify the future registry contract.
- [ ] Add an internal configuration panel for inspecting and adjusting token dials.
- [ ] Add a registry-readiness manifest or metadata shape for eventual Studio UI Registry promotion.
- [ ] Document what is foundation-owned versus branch-owned.

Exit criteria:

- [ ] A branch can define a token preset and apply it site-wide without changing the shared token schema.
- [ ] The internal configuration panel renders the available dials and token output.
- [ ] The token system is ready to become, or seed, a Studio UI Registry item later.
- [ ] No final brand look is locked before the design branches.

Suggested verification:

- `pnpm test`
- `pnpm typecheck`
- `pnpm build`

## Workstream 3: Shared Content, Routing, Metadata, And AI Files

Goal: Centralize all public content, project data, route helpers, canonical metadata, sitemap, robots, and AI-readable files before design branching.

Depends on:

- [ ] Workstream 1 app foundation.
- [ ] Workstream 2 token/dial foundation.

Enables:

- [ ] Homepage branches, project-page branches, generated sitemap, generated AI files, redirects, deploy routing.

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

- [ ] Add project registry entries for Harness, Registry, Orchestra, Intercal, and Collectiva.
- [ ] Add route helpers for canonical URLs, product subdomains, docs/API/repo links, and future standalone domains.
- [ ] Add page content models for homepage sections, project detail sections, FAQs, CTAs, and AI summaries.
- [ ] Add canonical metadata generation for every route.
- [ ] Add Open Graph and Twitter/X metadata helpers.
- [ ] Add JSON-LD helpers for Organization, WebSite, and project/software surfaces where appropriate.
- [ ] Add generated sitemap.
- [ ] Add robots policy.
- [ ] Add generated `llms.txt` and expanded AI-readable source file from the shared content registry.
- [ ] Add validation tests for required project fields and URL shape.
- [ ] Add route and generated-file tests that fail if a public route is missing metadata, sitemap coverage, or AI-file coverage.

Exit criteria:

- [ ] All public routes and links resolve from typed or validated content data.
- [ ] Product subdomain targets can change from one source file.
- [ ] Metadata, sitemap, robots, and AI-readable files are generated from shared data before design branches begin.

Suggested verification:

- `pnpm test`
- `pnpm typecheck`
- `pnpm build`

## Workstream 4: Three Complete Design Direction Branches

Goal: Produce three complete site designs after the shared data and generated-file foundation is solid, then select one direction to merge.

Depends on:

- [ ] Workstream 1 app foundation.
- [ ] Workstream 2 token/dial foundation.
- [ ] Workstream 3 content, routing, metadata, sitemap, robots, and AI-file seams.

Enables:

- [ ] A confident design choice without compromising the shared token contract, content, route, metadata, sitemap, or AI-file architecture.
- [ ] Homepage and project pages already exist in each branch as complete comparable site experiences.

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

- [ ] Cut three branches from the same foundation commit, for example `design/direction-a`, `design/direction-b`, and `design/direction-c`.
- [ ] Push all three design branches to the remote before substantial branch work starts.
- [ ] Build Direction A with its own token preset, component language, homepage, and all project pages.
- [ ] Build Direction B with its own token preset, component language, homepage, and all project pages.
- [ ] Build Direction C with its own token preset, component language, homepage, and all project pages.
- [ ] Run the same verification and visual smoke for all three directions.
- [ ] Capture local URLs or preview URLs and concise notes for comparison.
- [ ] Leave all three branches available for owner review until one is selected.
- [ ] Select one branch, merge it to `main`, and close the other branches without mixing their visual systems into the selected direction.

Exit criteria:

- [ ] All three design branches build and render complete site experiences over the same shared content, route, metadata, sitemap, robots, and AI-file seams.
- [ ] All three design branches use the shared token/dial contract instead of hardcoded one-off styling.
- [ ] The selected branch is merged to `main`.
- [ ] Non-selected branches are left as review history or deleted after selection; their changes are not blended into `main` unless explicitly chosen.

Suggested verification:

- `pnpm verify`
- `pnpm build`
- Visual smoke at 1440px, 1024px, 768px, and 390px for each branch.

## Workstream 5: Selected Direction Hardening

Goal: Merge the chosen design direction and harden the selected full site for production.

Depends on:

- [ ] Selected Workstream 4 design direction.

Enables:

- [ ] Final production candidate for deployment and QA.

Repo guidance:

- Do not rebuild homepage, project pages, metadata, or AI files from scratch here. This stream polishes the selected complete branch and removes comparison-only leftovers.

Primary areas:

- `src/app/page.*` or homepage route
- `src/app/projects/`
- `src/components/`
- `src/styles/`
- `src/content/`

Implementation tasks:

- [ ] Merge the selected design branch to `main`.
- [ ] Remove branch-comparison-only labels, temporary notes, and unused design-direction files.
- [ ] Promote the selected branch's token preset, visual treatment, and reusable components as the single marketing-site brand system.
- [ ] Mark any selected components, blocks, or page sections that should be considered candidate Studio UI Registry items.
- [ ] Tighten homepage and project-page copy using the shared content model.
- [ ] Confirm the selected design still uses shared project registry data and shared metadata/AI-file generation.
- [ ] Run responsive, accessibility, and visual polish on the selected full site.

Exit criteria:

- [ ] The selected branch is the only design system on `main`.
- [ ] Homepage and every project page are complete, responsive, and copy-polished.
- [ ] Metadata, sitemap, robots, and AI files still come from the shared foundation.
- [ ] Candidate registry items are identified without blocking the marketing-site launch.

Suggested verification:

- `pnpm test`
- `pnpm build`
- Visual smoke at 1440px, 1024px, 768px, and 390px.

## Workstream 6: Deployment, QA, And Closeout

Goal: Ship the site as a production-ready Vercel project with clean docs and verified public behavior.

Depends on:

- [ ] Workstreams 1-5.

Enables:

- [ ] Production deployment, preview review, future project/subdomain expansion.

Repo guidance:

- Deployment credentials and analytics keys stay in provider configuration, not tracked files.

Primary areas:

- deployment config
- `.env.example`
- `docs/operations/`
- `docs/decisions/`
- `docs/roadmaps/`

Implementation tasks:

- [ ] Add deployment configuration and document Vercel setup.
- [ ] Add domain mapping checklist for apex, `www`, and project subdomains.
- [ ] Add analytics/privacy setup or explicitly defer with a decision record.
- [ ] Run full verification.
- [ ] Run visual QA across desktop and mobile.
- [ ] Update durable docs with final operating instructions.
- [ ] Update roadmap status truthfully.

Exit criteria:

- [ ] Local build passes.
- [ ] Preview deploy succeeds.
- [ ] Production deploy path is documented and ready.
- [ ] Visual and metadata smoke checks pass.
- [ ] No secrets are present in tracked files.

Suggested verification:

- `pnpm verify`
- `pnpm build`
- Preview deployment check
- Browser smoke for `/`, `/projects`, each project page, `robots.txt`, `sitemap.xml`, and `llms.txt`.

## Final Verification And Closeout

- [ ] `pnpm install`
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm verify`
- [ ] Visual smoke at desktop and mobile.
- [ ] Inspect `robots.txt`, `sitemap.xml`, `llms.txt`, and canonical metadata.
- [ ] Confirm no secrets in tracked files.
- [ ] Confirm docs and roadmap reflect actual delivered behavior.
- [ ] Stage only intentional files.
- [ ] Commit with a conventional-style subject and body.
- [ ] Push to the default branch when a git remote exists.

## Acceptance Criteria

- [ ] `www.jami.studio` is a complete production marketing site, not a placeholder.
- [ ] The homepage is polished, on-brand, responsive, accessible, and copy-complete.
- [ ] Harness, Registry, Orchestra, Intercal, and Collectiva each have complete project pages.
- [ ] Three design directions were either run to complete comparable branches after the shared foundation or explicitly skipped by owner decision.
- [ ] The shared token/dial system is reusable as a Studio UI Registry seed or candidate item set.
- [ ] All project URLs, subdomains, repos, docs links, CTAs, and summaries are centralized.
- [ ] Subdomain or standalone-domain changes require metadata edits, not component rewrites.
- [ ] The site emits complete canonical metadata, sitemap, robots, and AI-readable files.
- [ ] The codebase has working lint, typecheck, test, build, and verify commands.
- [ ] Deployment and domain setup are documented.
- [ ] No tracked file contains secrets or private operational credentials.

## Implementation Order

1. Refresh repo docs and standards for the marketing-site codebase.
2. Initialize the web app and verification commands.
3. Add framework/deployment decision record.
4. Build the registry-compatible token/dial contract, validation, shadcn-compatible plumbing, and internal configuration panel.
5. Build content registry, route model, metadata, sitemap, robots, and AI-file generation.
6. Cut three design branches from the same stable foundation commit.
7. Finish each design branch with its own token preset, visual system, complete homepage, and all project pages.
8. Compare locally or by preview deploy.
9. Select one direction and merge it to `main`.
10. Promote the selected visual system and harden the selected full site without forking shared metadata or AI-file generation.
11. Identify candidate components/blocks/page sections for future Studio UI Registry promotion.
12. Add deploy/domain operations docs.
13. Run full verification and visual QA.
14. Update roadmap, docs, and closeout artifacts.

## Orchestrator Checkpoints

- [~] 2026-06-06T13:15:59.9373818-04:00 - Dispatched Workstream 1 pass 1 to subagent
  `019e9def-09d0-7e11-84b5-41a7ba7f739d` (`Boole`). Ownership boundary: app foundation,
  verification scripts, neutral route shell, `.gitignore`/`.env.example`, framework/deploy
  decision docs, and Workstream 1 roadmap/doc parity only. Active workstreams: Workstream 1 only.
  Next coordinator action: poll in short intervals until terminal result, then log result under
  `docs/engineering/agents/orchestrator-logs/` and dispatch a fresh Workstream 1 pass 2 if pass 1
  lands a commit.

## Expansion Track

- Add technical essays and project docs previews once each project repo has stable docs.
- Add newsletter/list capture once email provider and privacy posture are finalized.
- Add changelog/news only as a curated editorial surface, not a development-status dump.
- Add generated social cards per project.
- Add docs search or cross-project index when the project docs surfaces exist.
