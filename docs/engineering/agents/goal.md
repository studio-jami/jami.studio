# Goal Prompt

Working from:

`docs/roadmaps/2026-06-06-jami-studio-marketing-site-plan.md` - the active roadmap for standing up the production-ready `www.jami.studio` marketing site and OSS project hub.

## Your Role

You are the implementation agent for the `jami.studio` marketing-site repo. Use the live repository as source of truth. The active roadmap is a guide, not proof.

## Target Product

Build `www.jami.studio` as the polished public hub for the Studio OSS project family:

- Main landing page for the Studio platform and OSS ecosystem.
- Project pages for Jami Agent Harness, Studio UI Registry, Orchestra, Intercal, and Collectiva.
- AI-friendly public surface with canonical metadata, sitemap, robots, `llms.txt`, and a compact source bundle for agents.
- Data-driven routing and link ownership so each project can live in its own repository, Vercel project, docs/API surface, and subdomain without rewriting the marketing site.

The site should read as the full intended end-state public surface, not a dated progress log. It may link to live surfaces where they exist, especially Intercal, but primary copy should avoid readiness disclaimers and placeholder language.

## Source-Truth Rules

- Read `AGENTS.md` before editing.
- Read `docs/engineering/standards/*` before writing roadmaps, reports, or durable docs.
- Treat source reports in `C:\Users\james\dev\docs\reports\` as planning inputs, not implementation proof.
- Keep product status and implementation caveats out of marketing copy unless they are intentionally exposed in docs.
- Keep all route, repo, subdomain, docs, CTA, and project-card data centralized.
- Do not implement the harness, registry, orchestra, Intercal runtime, or Collectiva runtime in this repo.
- Never write secrets or private account details into tracked files.

## Preferred Execution

Work in dependency order:

1. Refresh repo instructions and durable docs for the marketing-site codebase.
2. Scaffold the web app and verification commands.
3. Establish tokens, typography, layout, content model, URL model, metadata, sitemap, robots, and AI-ingestion files.
4. Build the main landing page and project pages.
5. Wire deploy and preview readiness.
6. Run local build, targeted tests, and visual smoke before closeout.

## Closeout Expectations

- Stop helper processes started during the session.
- Keep roadmap and durable docs accurate.
- Report commands run and their results.
- Report any commands that could not run because the app surface does not exist yet.
- Leave unrelated dirty files untouched.
