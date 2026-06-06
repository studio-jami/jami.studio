# Framework And Deployment Target Decision

Date: 2026-06-06
Status: Accepted
Owner: Jamie

## Decision

Build `www.jami.studio` as a static-first Next.js application deployed on
Vercel.

## Rationale

The marketing site needs route-level metadata, generated sitemap and robots
files, AI-ingestion routes, project pages, typed content, and a Vercel-ready
deployment path. Next.js provides those pieces directly while still allowing the
site to stay static-first and portable. The content registry, route helpers,
metadata helpers, and AI file generators remain source-owned so the framework is
an implementation host, not the product truth.

## Consequences

- Public routes live under `src/app/`.
- Content, project links, CTAs, and AI summaries live under `src/content/`.
- Metadata, sitemap, and AI-readable files are generated from shared helpers.
- Deployment defaults to Vercel with secrets and analytics identifiers kept in
  provider configuration or local `.env`, not tracked files.
- If the site later moves to another static host, the content registry and
  generated-file helpers should move before page composition code.
