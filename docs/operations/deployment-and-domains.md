# Deployment And Domains

Date: 2026-06-06
Status: Draft operating shape
Owner: Jamie

## Purpose

Define the deployment and domain shape for `www.jami.studio` without blocking implementation on unresolved project-level hosting details.

## Principles

- The marketing site is independently deployable.
- Each product can live in its own repo, Vercel project, docs/API surface, and subdomain.
- The marketing repo keeps project routing in centralized metadata.
- Subdomain targets can change without rewriting page copy or component code.
- Domain and deploy configuration are operational concerns, not copy embedded in components.

## Initial Host Shape

- `www.jami.studio` routes to this marketing site.
- `jami.studio` redirects to `www.jami.studio`.
- Product subdomains route to their owning projects when those projects exist.
- Intercal is already live and should be treated as the first active subdomain integration.

## Required Deployment Artifacts

When the web app is scaffolded, add and verify:

- Vercel project settings or equivalent documented setup.
- Environment variable names in `.env.example`, with no secret values.
- Preview deployment path.
- Production deployment path.
- Domain mapping checklist.
- Build command.
- Output framework preset.
- Analytics/privacy configuration.
- Rollback instructions.

## Current App Deployment Shape

- Framework: Next.js.
- Package manager: pnpm.
- Build command: `pnpm build`.
- Local full gate: `pnpm verify`.
- Local production preview: `pnpm exec next start --hostname 127.0.0.1 --port 3000` after a
  successful build.
- Vercel framework preset: Next.js.
- Output mode: Vercel-managed Next.js build; no static export or standalone self-hosting mode is
  configured.

## Environment Variables

Tracked files may document names only:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`
- `NEXT_PUBLIC_ANALYTICS_SITE_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_ORG_ID`

Real values belong in local `.env`, Vercel project settings, or the host secret
store.

## Domain Mapping Checklist

- Map `www.jami.studio` to the marketing site project.
- Redirect `jami.studio` to `www.jami.studio`.
- Keep product subdomains owned through centralized project metadata.
- Route `intercal.jami.studio` to the Intercal product surface.
- Reserve `harness.jami.studio`, `registry.jami.studio`,
  `orchestra.jami.studio`, and `collectiva.jami.studio` for their owning
  projects or docs surfaces.

## Preview And Rollback

Use Vercel preview deployments for branch review when local browser comparison
is not enough. Roll back by promoting the previous known-good Vercel deployment
or reverting the selected branch commit and redeploying.

## Open Decisions

- Whether docs pages are hosted in this repo, in each project repo, or through a docs provider.
- Whether product subdomains eventually move off `jami.studio` to standalone domains.

These decisions should be captured in `docs/decisions/` when finalized.
