# AGENTS.md - jami.studio operating rules

jami.studio is the public marketing site and central OSS hub for the Studio project family. It is the first impression for developers, agents, partners, and future users. Read this before editing.

## Source Of Truth

1. The live site code and generated routes, metadata, feeds, robots, sitemap, `llms.txt`, and deployed previews.
2. Durable docs under `docs/architecture/`, `docs/operations/`, and `docs/decisions/`.
3. Cross-repo planning, plan/report standards, and agent coordination in the sibling `_ops` repo.
4. Active roadmaps under `_ops/planning/jami.studio/roadmaps/`.

Never treat a product concept, dated report, roadmap, or founder note as implemented behavior unless the repo or deployed surface proves it.

## Product Role

This repo owns the `www.jami.studio` marketing site only. It does not implement the Jami Agent Harness, Studio UI Registry, Orchestra, Intercal, or Collectiva runtimes.

The site must present the full intended end-state product family in a polished, credible way:

- Jami Agent Harness: governed agent runtime and BYOK reference foundation.
- Studio UI Registry: tokenized UI registry and trusted render contract.
- Orchestra: development and multi-agent coordination framework.
- Intercal: live provenance-backed temporal knowledge substrate.
- Collectiva: open agent society and governance layer.

The implementation must keep subdomain/repo/project links data-driven. Only live product surfaces carry a subdomain — `intercal.jami.studio` (separate app) and `registry.jami.studio` (registry/docs host); Harness, Orchestra, and Collectiva resolve as apex sections (`www.jami.studio/projects/<slug>`) plus their `github.com/studio-jami/<repo>` repos until a dedicated surface ships. Never fabricate `/docs` or `/api` URLs for a surface that is not live. Any product can move to a separate domain or project by editing `src/content/projects.ts` without content rewrites.

## Hard Rules

- Build the marketing site as the final intended public surface, not as a dev log, gated launch page, or status apology page.
- Use polished, direct, developer-credible copy. Avoid placeholder phrasing, launch excuses, unpleasant language, and "coming soon" framing.
- Keep current implementation status out of primary marketing copy. Status belongs in docs, changelog, or operations notes, not the first impression.
- Keep all project, route, CTA, social, repository, docs, and subdomain data centralized.
- Make the site AI-friendly by design: `llms.txt`, `llms-full.txt` or equivalent source bundle, sitemap, robots, structured metadata, stable canonical URLs, clean headings, and concise project descriptions.
- Keep the brand globally reusable: shared tokens, reusable content models, reusable section components, consistent metadata, and no one-off page styling.
- Do not put secrets, tokens, analytics keys, deploy tokens, or private notes in tracked files. `.env` is local-only; `.env.example` documents names only.
- Verify drift-prone external claims before committing them to durable docs or public pages.
- Agents have full access and a green light to complete requested work; build to a sturdy,
  production-ready shape, not a placeholder.
- No mocks, fake metrics, invented testimonials, or hidden demo data in shipped pages.
- Work from first principles: ask why a constraint or surprise exists, several layers deep,
  before committing to a fix. Never trade away integrity, security, correctness, or evidence
  quality for speed.
- No-cost constraint: stay within approved subscriptions, credits, and free tiers; stop and
  report rather than incur spend.

## Expected Repo Shape

- `app/` or `src/app/` - public routes for the main site.
- `src/content/` - project, page, navigation, SEO, CTA, FAQ, and AI-ingestion content.
- `src/components/` - reusable marketing sections, project cards, nav, footer, metadata helpers, and layout primitives.
- `src/lib/` - URL, route, metadata, sitemap, `llms.txt`, and content helpers.
- `public/` - icons, social images, robots assets, and static files.
- `docs/` - architecture, operations, decisions, roadmaps, research, and engineering pointers.

The exact framework is selected by the active plan, but the implementation must be static-first, Vercel-ready, and easy to keep portable.

## Verification

Run the narrowest complete set for what changed. The frontend gates are:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm verify`
- Visual smoke against desktop and mobile routes after meaningful frontend changes.

For docs-only work, read back changed Markdown and run `git diff --check`.

## Docs And Changelog

- Active plans live in `_ops/planning/jami.studio/roadmaps/`.
- Durable product and architecture docs live under `docs/architecture/`.
- Operations docs live under `docs/operations/`.
- Decision records live under `docs/decisions/`.
- Plan/report and docs standards are canonical in `_ops/planning/_standards/`, symlinked here
  at `docs/_standards/`; follow the dev-docs standard for internal docs. This site has no user
  docs. Local `docs/engineering/agents/` and plan/report standard files are retired.
- Delete completed or superseded dated plans once their durable rules are promoted; git history is the archive. The repo keeps no `_legacy/` shelf and no dead copy.
- Add a changelog fragment when a production-meaningful change lands, following the repo's changelog convention.

## Closeout

Keep the active roadmap and durable docs accurate, leave unrelated changes untouched, report verification results honestly, and do not claim deploy readiness until the local build and preview/deploy checks prove it.
