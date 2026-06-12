# AGENTS.md - jami.studio operating rules

jami.studio is the public marketing site and central OSS hub for the Studio project family. It is the first impression for developers, agents, partners, and future users. Read this before editing.

## Source Of Truth

1. The live site code and generated routes, metadata, feeds, robots, sitemap, `llms.txt`, and deployed previews.
2. Durable docs under `docs/architecture/`, `docs/operations/`, and `docs/decisions/`.
3. Source reports copied from the wider Studio research program under `C:\Users\james\dev\docs\reports\`.
4. Active roadmaps under `docs/roadmaps/`.

Never treat a product concept, dated report, roadmap, or founder note as implemented behavior unless the repo or deployed surface proves it.

## Product Role

This repo owns the `www.jami.studio` marketing site only. It does not implement the Jami Agent Harness, Studio UI Registry, Orchestra, Intercal, or Collectiva runtimes.

The site must present the full intended end-state product family in a polished, credible way:

- Jami Agent Harness: governed agent runtime and BYOK reference foundation.
- Studio UI Registry: tokenized UI registry and trusted render contract.
- Orchestra: development and multi-agent coordination framework.
- Intercal: live provenance-backed temporal knowledge substrate, currently routed from `intercal.jami.studio`.
- Collectiva: open agent society and governance layer, initially expected to route from a subdomain.

The implementation must keep subdomain/repo/project links data-driven so `intercal.jami.studio`, `collectiva.jami.studio`, `harness.jami.studio`, `registry.jami.studio`, and `orchestra.jami.studio` can move to separate domains or projects without content rewrites.

## Hard Rules

- Build the marketing site as the final intended public surface, not as a dev log, gated launch page, or status apology page.
- Use polished, direct, developer-credible copy. Avoid placeholder phrasing, launch excuses, unpleasant language, and "coming soon" framing.
- Keep current implementation status out of primary marketing copy. Status belongs in docs, changelog, or operations notes, not the first impression.
- Keep all project, route, CTA, social, repository, docs, and subdomain data centralized.
- Make the site AI-friendly by design: `llms.txt`, `llms-full.txt` or equivalent source bundle, sitemap, robots, structured metadata, stable canonical URLs, clean headings, and concise project descriptions.
- Keep the brand globally reusable: shared tokens, reusable content models, reusable section components, consistent metadata, and no one-off page styling.
- Do not put secrets, tokens, analytics keys, deploy tokens, or private notes in tracked files. `.env` is local-only; `.env.example` documents names only.
- Verify drift-prone external claims before committing them to durable docs or public pages.

## Expected Repo Shape

- `app/` or `src/app/` - public routes for the main site.
- `src/content/` - project, page, navigation, SEO, CTA, FAQ, and AI-ingestion content.
- `src/components/` - reusable marketing sections, project cards, nav, footer, metadata helpers, and layout primitives.
- `src/lib/` - URL, route, metadata, sitemap, `llms.txt`, and content helpers.
- `public/` - icons, social images, robots assets, and static files.
- `docs/` - architecture, operations, decisions, roadmaps, research, and engineering standards.

The exact framework is selected by the active plan, but the implementation must be static-first, Vercel-ready, and easy to keep portable.

## Verification

Run the narrowest complete set for what changed. Once the app exists, expected gates are:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm verify`
- Visual smoke against desktop and mobile routes after meaningful frontend changes.

For docs-only work before the app exists, read back changed Markdown and run `git diff --check` when a git repository is initialized.

## Docs And Changelog

- Active plans live in `docs/roadmaps/`.
- Durable product and architecture docs live under `docs/architecture/`.
- Operations docs live under `docs/operations/`.
- Decision records live under `docs/decisions/`.
- Delete completed or superseded dated plans once their durable rules are promoted; git history is the archive. The repo keeps no `_legacy/` shelf and no dead copy.
- Add changelog fragments once the codebase has a changelog fragment convention and a production-meaningful change lands.

## Closeout

Keep the active roadmap and durable docs accurate, leave unrelated changes untouched, report verification results honestly, and do not claim deploy readiness until the local build and preview/deploy checks prove it.
