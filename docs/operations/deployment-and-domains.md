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
- The local `.env` names include `VERCEL_ACCESS_TOKEN`, `VERCEL_TEAM_ID`, and
  `VERCEL_USER_ID`; the values were used only as local credentials and were not
  printed or copied into tracked files.
- With the local Vercel access token loaded as `VERCEL_TOKEN`, `vercel teams ls`
  resolves the owning scope as `studio-jami` / `jami-studio`, and
  `vercel project ls` exposes `jami.studio`, `intercal`, and `collectiva`.
- `vercel project inspect jami.studio` proves project
  `studio-jami/jami.studio`: Framework Preset Next.js, Root Directory `.`,
  Node.js `24.x`, and default Vercel install/build commands for the detected
  package manager/framework.
- The Vercel Projects API proves the project is Git-linked to
  `JamiStudio/jami.studio`; current API readback reports default/blank
  `rootDirectory`, `productionBranch`, `buildCommand`, `installCommand`, and
  `outputDirectory` fields. The CLI readback resolves the default root as `.`,
  and deployment evidence below proves the production deployment was created
  from Git source `main`.
- The project currently has no Vercel environment variables configured. This is
  acceptable for the current static-first marketing site and the deferred
  analytics launch posture; required variable names remain documented below for
  future host/local configuration.

Conclusion: the owning Vercel project is proven and manageable from the local
token path. The MCP-visible `yrka` team is not the owner for this site.

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
- `www.jami.studio` and `jami.studio` are both verified domains on the
  `jami.studio` Vercel project; the apex is configured as a `308` redirect to
  `www.jami.studio`.
- Production deployment `dpl_7RwnuGqTaLKKk9o4faHLfZQomQeL` was created from
  Git source `main` at commit `577d8ddb30e519434c500285aef22ea47777226c`.
  Vercel reported `READY`, `PROMOTED`, and `aliasAssigned: true`.
- `vercel inspect https://www.jami.studio/` and
  `vercel inspect https://jamistudio-git-main-studio-jami.vercel.app/` both
  resolve to deployment `dpl_7RwnuGqTaLKKk9o4faHLfZQomQeL`.
- Remote HTTP smoke after promotion returned `200 OK` for `/`, `/projects`, all
  five `/projects/[slug]` routes, `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
  and `/llms-full.txt`.
- Live `https://www.jami.studio/` no longer contains the older
  starter/system-map marker and serves the current Kirimo-era project-family
  content.

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
  surface. A `collectiva` project exists in the `studio-jami` Vercel scope, but
  `collectiva.jami.studio` is not live in DNS as of this audit.

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
2. Prefer a Git-source Vercel API deployment for the target ref after confirming
   the target project and scope.
3. Treat the generated `*.vercel.app` URL as review-only, not as a canonical
   public URL.

Current caveat: direct local-source Vercel CLI uploads from a clean detached
worktree created `BLOCKED` deployments with no build logs and no production
alias assignment. Git-source API deployment succeeded and is the verified
automation path from this pass. Generated branch/deployment aliases are covered
by Vercel deployment protection; use `vercel inspect` or `vercel curl` with the
local Vercel token path for protected preview checks.

## Production Deployment Path

1. Confirm the Vercel project is linked to `studio-jami/jami.studio` with root
   directory `./` and production branch `main`.
2. Confirm required environment variable names exist in Vercel with real values
   only where the variable is needed.
3. Push `main` to `origin`.
4. If Git auto-deploy does not produce a current production deployment, create a
   Git-source deployment through Vercel's deployment API using `target:
   "production"`, `name: "jami.studio"`, the `jami.studio` project, and
   `gitSource` for `JamiStudio/jami.studio` on `main`.
5. Wait for the production deployment to reach `READY` and `PROMOTED`.
6. Verify `https://www.jami.studio/`, `https://jami.studio/`, `/projects`, all
   project routes, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and
   `/llms-full.txt`.
7. Confirm the deployed HTML is Kirimo, not the older starter/system-map
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

- Decide whether direct local-source CLI deployments should remain blocked for
  this project, or whether Vercel deployment protection / automation bypass
  should be adjusted for trusted release automation.
- Decide whether GitHub push-to-production should be relied on for `main`, or
  whether the Git-source Vercel API deployment should remain the documented
  release fallback.
- Decide whether the reserved product subdomains should remain absent from DNS
  until their owners launch, or should receive holding redirects/docs surfaces.
