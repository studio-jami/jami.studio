# Deployment And Domains

Date: 2026-06-13
Status: Active operating runbook with point-in-time external evidence
Owner: Jamie

## Purpose

Define the deployment and domain shape for `www.jami.studio` without turning
product-level hosting details into marketing-site code. This repo owns the
public marketing site only; product runtimes stay in their owning repositories
and deployment projects.

## Principles

- The marketing site is independently deployable from the repository root.
- Each product can live in its own repo, Vercel project, docs/API surface, and
  subdomain.
- Project routes, subdomains, repos, docs URLs, API URLs, and CTAs stay
  centralized in `src/content/projects.ts`.
- Domain and deployment configuration are operational concerns, not page copy or
  component-local constants.
- Tracked files may document environment variable names only. Real values belong
  in local `.env`, Vercel project settings, or the host secret store.

## Current Source-Owned Build Shape

- Framework: Next.js, from `next` in `package.json`.
- App root: repository root (`./`), with public routes under `src/app/`.
- Package manager: `pnpm@10.33.2`, from `package.json`.
- Install command: `pnpm install --frozen-lockfile`.
- Build command: `pnpm build`.
- Local full gate: `pnpm verify`.
- Local production preview: `pnpm exec next start --hostname 127.0.0.1 --port
  3000` after a successful build.
- Vercel framework preset: Next.js.
- Output mode: Vercel-managed Next.js build output. No `output: "export"` or
  `output: "standalone"` mode is configured.
- Deployment config files: no `vercel.json` and no `.vercel/project.json` are
  tracked or present in the repo as of this audit.
- Selected public design on `main`: Kirimo, imported in commit `25e5b73` and
  currently present in `src/app/page.tsx`, `src/styles/globals.css`, and
  `public/assets/*`.

## Vercel Project Settings

The intended production project settings for this repo are:

- Project source: `studio-jami/jami.studio`.
- Production branch: `main`.
- Root Directory: `./`.
- Framework Preset: Next.js.
- Install Command: `pnpm install --frozen-lockfile`.
- Build Command: `pnpm build`.
- Output Directory: Vercel default for Next.js.
- Environment variables: use the names listed in this document; do not copy
  local values into tracked files.

Point-in-time provider evidence from 2026-06-13:

- Vercel MCP is authenticated and exposes one accessible team, `yrka`.
- `yrka` does not expose a project named `jami.studio` or `jami-studio`.
- The accessible Vercel project named `marketing` is a Next.js project, but its
  domains are `marketing-yrka.vercel.app` and
  `marketing-git-main-yrka.vercel.app`; its recent deployments are tied to
  `yrka-io/yrka`, not `studio-jami/jami.studio`.
- `vercel whoami` is authenticated locally as `jamienavinhill`; `vercel project
  ls` reports no personal-scope projects, and `vercel project ls --scope yrka`
  fails because that CLI scope is unavailable locally.
- `vercel inspect https://www.jami.studio --scope yrka` and the Vercel MCP
  deployment lookup for `www.jami.studio` cannot resolve a deployment under the
  accessible `yrka` team.

Conclusion: Vercel access exists, but this audit cannot prove a manageable
Vercel project currently linked to `studio-jami/jami.studio`. Do not claim
project-level deploy readiness until the owning Vercel project is inspected or
created and linked to this repo.

## Production Domain Mapping

Verified DNS and HTTP behavior on 2026-06-13:

- Authoritative DNS for `jami.studio` uses Cloudflare nameservers:
  `elliott.ns.cloudflare.com` and `irena.ns.cloudflare.com`.
- `www.jami.studio` resolves as a CNAME to
  `48df215fd6d358bf.vercel-dns-017.com`.
- `jami.studio` resolves to Vercel A records `64.29.17.65` and
  `216.198.79.65`.
- `https://www.jami.studio/` returns `200 OK` from Vercel.
- `https://jami.studio/` returns `308 Permanent Redirect` with
  `Location: https://www.jami.studio/`.

Important current gap:

- The live `https://www.jami.studio/` HTML still serves the older
  starter/system-map presentation. It does not serve the Kirimo presentation now
  on `main`. The domain is live, but the current `main` production candidate is
  not verified as deployed.

Production closeout requires the Vercel project for `studio-jami/jami.studio`
to build the current `main` commit and attach both `www.jami.studio` and
`jami.studio` to that project with `www` as the canonical host.

## Product Subdomain Ownership

`src/content/projects.ts` is the source-owned roster for product subdomains and
CTA destinations. Operational ownership is:

- `intercal.jami.studio`: live product surface outside this marketing repo.
  Verified on 2026-06-13 as a CNAME to
  `25b8236304cda166.vercel-dns-017.com`, with
  `https://intercal.jami.studio/` returning `200 OK` from Vercel.
- `harness.jami.studio`: reserved for the Jami Agent Harness repo or docs/API
  surface. Not live in DNS as of this audit.
- `registry.jami.studio`: reserved for the Studio UI Registry repo or registry
  distribution/docs surface. Not live in DNS as of this audit.
- `orchestra.jami.studio`: reserved for the Orchestra repo or docs/API surface.
  Not live in DNS as of this audit.
- `collectiva.jami.studio`: reserved for the Collectiva repo or future product
  surface. Not live in DNS as of this audit.

Do not hardcode these subdomains in components. Change `src/content/projects.ts`
first, then verify generated routes, sitemap, metadata, and AI-readable files.

## Preview Deployment Path

Preferred preview path after the Vercel project is linked:

1. Push a branch to `origin`.
2. Let Vercel create the branch or pull-request preview deployment.
3. Verify the preview with `pnpm verify` locally and remote HTTP smokes for `/`,
   `/projects`, all five `/projects/[slug]` routes, `/robots.txt`,
   `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`.
4. Inspect canonical metadata on the preview without changing
   `NEXT_PUBLIC_SITE_URL`; canonical production URLs should remain
   `https://www.jami.studio`.

Fallback preview path when GitHub-connected previews are unavailable:

1. Run `pnpm verify` locally.
2. Use Vercel CLI preview deploy from the repository root only after confirming
   the target project and scope.
3. Treat the generated `*.vercel.app` URL as review-only, not as a canonical
   public URL.

## Production Deployment Path

1. Confirm the Vercel project is linked to `studio-jami/jami.studio` with root
   directory `./` and production branch `main`.
2. Confirm required environment variable names exist in Vercel with real values
   only where the variable is needed.
3. Push `main` to `origin`.
4. Wait for the production deployment to reach `READY`.
5. Verify `https://www.jami.studio/`, `https://jami.studio/`, `/projects`, all
   project routes, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and
   `/llms-full.txt`.
6. Confirm the deployed HTML is Kirimo, not the older starter/system-map
   presentation.

## Rollback

Use the lowest-risk rollback that matches the failure:

- Vercel instant rollback: promote the previous known-good production deployment
  from the Vercel dashboard or CLI, then repeat production HTTP smokes.
- Git rollback: `git revert` the faulty commit on `main`, push, wait for Vercel
  to deploy, then repeat production HTTP smokes.
- DNS rollback: only use if the domain was pointed at the wrong project. Restore
  the last known-good Vercel DNS target or A records in Cloudflare and verify
  propagation with `Resolve-DnsName` plus HTTPS checks.

This marketing site has no source-owned database migration or customer data
plane, so rollback risk is primarily content, routing, asset, metadata, and
domain-routing behavior.

## Environment Variables

Tracked files may document these names only:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`
- `NEXT_PUBLIC_ANALYTICS_SITE_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_ORG_ID`

Real values belong in local `.env`, Vercel project settings, or the host secret
store. `.env.example` is the tracked name-only reference.

## Open External Checks

- Inspect or create the actual Vercel project for `studio-jami/jami.studio`.
- Link that project to `main` and verify a Kirimo production deployment.
- Attach or transfer `www.jami.studio` and `jami.studio` to the correct project
  if the current live deployment is owned by a stale or inaccessible project.
- Decide whether the reserved product subdomains should remain absent from DNS
  until their owners launch, or should receive holding redirects/docs surfaces.
- Resolve analytics/privacy in `docs/decisions/` before final launch closeout.
