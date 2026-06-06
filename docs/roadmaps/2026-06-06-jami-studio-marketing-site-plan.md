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
- [x] The brand report defines the committed naming surface: `jami`, the Studio, `jami.studio`, `@jami-studio`, and `studio-jami`; brand tokens should become a resolved reusable source for site, docs, decks, and social surfaces.
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
- [x] After the shared foundation, content registry, routing, and metadata seams are stable, design exploration can run as three full-build branches. Each branch must consume the same data seams and finish the complete site experience; the losing branches are review artifacts, not partial prototypes.

## Scope Boundaries

- [x] In scope: marketing site, project pages, route model, content model, metadata, brand tokens, responsive UI, AI-ingestion files, sitemap, robots, deployment readiness, and verification.
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
- Brand tokens for color, type, spacing, radii, logos, handles, and page theming.
- Vercel-ready build and deploy configuration.

## Cross-Stream Dependency Map

- Workstream 1 establishes app foundation, build tooling, and repository shape.
- Workstream 2 depends on Workstream 1 and creates brand tokens plus reusable UI primitives.
- Workstream 3 depends on Workstreams 1-2 and creates the content model, project registry, route map, and metadata helpers.
- Workstream 4 depends on Workstreams 1-3 and runs three complete design branches over the same shared foundation.
- Workstream 5 depends on the selected Workstream 4 branch and builds or finalizes the homepage.
- Workstream 6 depends on the selected Workstream 4 branch and builds or finalizes project pages.
- Workstream 7 depends on Workstreams 3, 5, and 6 and adds AI-readability, SEO, sitemap, robots, and structured metadata.
- Workstream 8 depends on all previous streams and closes deployment, visual QA, docs, and verification.

## Workstream 1: Web App Foundation

Goal: Create the production web-app foundation and verification commands for the marketing site.

Depends on:

- [ ] Refreshed repo instructions and active roadmap.

Enables:

- [ ] Brand system, content model, page builds, AI files, deployment.

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

- [ ] Initialize the web app with TypeScript, strict linting, formatting, test runner, and build command.
- [ ] Add `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm verify`.
- [ ] Add `.gitignore` and `.env.example` with secret names only.
- [ ] Add base route shell, global CSS, font loading strategy, and accessible document structure.
- [ ] Add a decision record for the selected framework and deployment target.

Exit criteria:

- [ ] The app builds locally.
- [ ] `pnpm verify` runs the full local gate.
- [ ] The root route renders a valid placeholder shell that will be replaced by Workstream 5 after design selection.

Suggested verification:

- `pnpm install`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm verify`

## Workstream 2: Brand System And Reusable UI

Goal: Establish a polished, reusable, global visual system for the marketing site.

Depends on:

- [ ] Workstream 1 app foundation.

Enables:

- [ ] Homepage, project pages, AI-readable consistent content blocks, social images.

Repo guidance:

- Brand tokens are shared source data. Do not hardcode one-off colors, type scales, spacing, or CTA styles inside individual pages.

Primary areas:

- `src/styles/`
- `src/components/`
- `src/content/brand.*`
- `public/`

Implementation tasks:

- [ ] Add brand token source for colors, typography, spacing, radii, logo paths, and handles.
- [ ] Build reusable layout, nav, footer, section, CTA, project-card, feature-grid, link-list, and prose components.
- [ ] Add responsive constraints for desktop, tablet, and mobile.
- [ ] Add accessible focus states, skip link, semantic headings, and motion-reduction handling.
- [ ] Add social preview image strategy, even if the first pass uses generated/static templates.

Exit criteria:

- [ ] Pages can be assembled from reusable components without page-specific styling drift.
- [ ] The brand system supports both main landing and project detail pages.

Suggested verification:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- Visual smoke at desktop and mobile widths.

## Workstream 3: Content, Routing, And Project Registry

Goal: Centralize all public project, route, CTA, and metadata data.

Depends on:

- [ ] Workstream 1 app foundation.
- [ ] Workstream 2 brand/content primitives.

Enables:

- [ ] Homepage project sections, detail pages, sitemap, AI files, redirects, deploy routing.

Repo guidance:

- No page should hardcode a project subdomain, docs link, repo link, CTA, or summary if that value belongs to the project registry.

Primary areas:

- `src/content/`
- `src/lib/routes.*`
- `src/lib/metadata.*`
- `src/app/` or route files

Implementation tasks:

- [ ] Add project registry entries for Harness, Registry, Orchestra, Intercal, and Collectiva.
- [ ] Add route helpers for canonical URLs, product subdomains, docs/API/repo links, and future standalone domains.
- [ ] Add page content models for homepage sections, project detail sections, FAQs, CTAs, and AI summaries.
- [ ] Add validation tests for required project fields and URL shape.
- [ ] Add route generation for `/`, `/projects`, and each project page.

Exit criteria:

- [ ] All public routes and links resolve from typed or validated content data.
- [ ] Product subdomain targets can change from one source file.

Suggested verification:

- `pnpm test`
- `pnpm typecheck`
- `pnpm build`

## Workstream 4: Three Design Direction Branches

Goal: Produce three complete visual directions after the shared foundation is solid, then select one direction to merge.

Depends on:

- [ ] Workstream 1 app foundation.
- [ ] Workstream 2 brand system baseline.
- [ ] Workstream 3 content, routing, project registry, and metadata seams.

Enables:

- [ ] A confident design choice without compromising the shared content/data architecture.
- [ ] Homepage and project pages finalized from the selected direction.

Repo guidance:

- Do not branch before the shared seams are stable. Each design branch must keep the same content registry, route helpers, metadata helpers, tests, and generated public artifacts.
- Prefer local branch/worktree review first. Use Vercel preview deploys only if comparing in browser locally is not enough or if remote review is useful.
- Keep each branch production-intent complete: homepage, project pages, responsive states, metadata, AI files, accessibility, and verification should all work in that branch.

Primary areas:

- `src/styles/`
- `src/components/`
- `src/app/` or route files
- `src/content/`
- `public/`

Implementation tasks:

- [ ] Cut three branches from the same foundation commit, for example `design/direction-a`, `design/direction-b`, and `design/direction-c`.
- [ ] Build Direction A as a complete site, not a partial mockup.
- [ ] Build Direction B as a complete site, not a partial mockup.
- [ ] Build Direction C as a complete site, not a partial mockup.
- [ ] Run the same verification and visual smoke for all three directions.
- [ ] Capture local URLs or preview URLs and concise notes for comparison.
- [ ] Select one branch, merge it to `main`, and close the other branches without mixing their visual systems into the selected direction.

Exit criteria:

- [ ] All three design branches build and render complete site experiences over the same shared content/data seams.
- [ ] The selected branch is merged to `main`.
- [ ] Non-selected branches are left as review history or deleted after selection; their changes are not blended into `main` unless explicitly chosen.

Suggested verification:

- `pnpm verify`
- `pnpm build`
- Visual smoke at 1440px, 1024px, 768px, and 390px for each branch.

## Workstream 5: Homepage

Goal: Build the main `www.jami.studio` landing page as the complete first impression.

Depends on:

- [ ] Workstream 2 brand system.
- [ ] Workstream 3 content model.
- [ ] Selected Workstream 4 design direction.

Enables:

- [ ] Production public hub, social sharing, AI-readable homepage summary.

Repo guidance:

- The homepage should be the product experience, not a marketing placeholder. It must avoid dev-log and "coming soon" framing.

Primary areas:

- `src/app/page.*` or homepage route
- `src/components/marketing/`
- `src/content/home.*`

Implementation tasks:

- [ ] Build hero with clear brand signal and concise platform positioning.
- [ ] Add project-family overview with reusable project cards.
- [ ] Add sections for runtime, registry, orchestration, knowledge, and collective governance.
- [ ] Add OSS/community/developer credibility sections without vanity metrics or fake proof.
- [ ] Add primary CTAs for project exploration, Intercal, GitHub, docs, and contact/list capture when the mechanism exists.
- [ ] Add responsive and accessibility polish.

Exit criteria:

- [ ] Homepage is visually complete, copy-polished, responsive, and generated from shared content.
- [ ] No primary homepage copy exposes internal implementation status or apology language.

Suggested verification:

- `pnpm build`
- Visual smoke at 1440px, 1024px, 768px, and 390px.

## Workstream 6: Project Pages

Goal: Build polished project pages for each OSS project in the Studio family.

Depends on:

- [ ] Workstream 2 brand system.
- [ ] Workstream 3 project registry.
- [ ] Selected Workstream 4 design direction.

Enables:

- [ ] Subdomain CTAs, project SEO, AI-readable project summaries, future docs/API expansion.

Repo guidance:

- Pages can describe the intended final project shape while avoiding false claims about implementation state in this repo.

Primary areas:

- `src/app/projects/`
- `src/content/projects/`
- `src/components/project/`

Implementation tasks:

- [ ] Build reusable project page template.
- [ ] Add Harness page.
- [ ] Add Registry page.
- [ ] Add Orchestra page.
- [ ] Add Intercal page with live-surface CTA.
- [ ] Add Collectiva page.
- [ ] Add related-project navigation and next-step CTAs.

Exit criteria:

- [ ] Every project has a complete page with canonical metadata, CTAs, and AI summary.
- [ ] Intercal links to the live product surface through centralized metadata.

Suggested verification:

- `pnpm test`
- `pnpm build`
- Visual smoke for at least one detail page and one mobile detail page.

## Workstream 7: AI Readiness, SEO, And Public Metadata

Goal: Make the site natively legible to search engines, social previews, and AI agents.

Depends on:

- [ ] Workstream 3 content model.
- [ ] Workstream 5 homepage.
- [ ] Workstream 6 project pages.

Enables:

- [ ] Agent discovery, high-quality technical SEO, stable public references.

Repo guidance:

- AI-readable output should be generated from the same content source as human pages.

Primary areas:

- `public/robots.txt`
- generated `sitemap.xml`
- generated `llms.txt`
- generated expanded AI source file
- metadata helpers
- route tests

Implementation tasks:

- [ ] Add canonical metadata for every route.
- [ ] Add Open Graph and Twitter/X metadata.
- [ ] Add JSON-LD for Organization, WebSite, SoftwareSourceCode or SoftwareApplication where appropriate.
- [ ] Add generated sitemap.
- [ ] Add robots policy.
- [ ] Add `llms.txt` and expanded AI-readable source.
- [ ] Add tests or build checks that fail if required AI/SEO files drift or omit routes.

Exit criteria:

- [ ] Every public page has canonical metadata and appears in sitemap output.
- [ ] AI files are generated from validated content and include all project surfaces.

Suggested verification:

- `pnpm test`
- `pnpm build`
- Inspect generated metadata files.

## Workstream 8: Deployment, QA, And Closeout

Goal: Ship the site as a production-ready Vercel project with clean docs and verified public behavior.

Depends on:

- [ ] Workstreams 1-7.

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
4. Build brand tokens and reusable UI primitives.
5. Build content registry and route model.
6. Cut three design branches from the same stable foundation commit.
7. Finish each design branch as a complete site and compare locally or by preview deploy.
8. Select one direction and merge it to `main`.
9. Finalize homepage from the selected direction.
10. Finalize project pages from the selected direction.
11. Generate AI/SEO files and metadata.
12. Add deploy/domain operations docs.
13. Run full verification and visual QA.
14. Update roadmap, docs, and closeout artifacts.

## Expansion Track

- Add technical essays and project docs previews once each project repo has stable docs.
- Add newsletter/list capture once email provider and privacy posture are finalized.
- Add changelog/news only as a curated editorial surface, not a development-status dump.
- Add generated social cards per project.
- Add docs search or cross-project index when the project docs surfaces exist.
