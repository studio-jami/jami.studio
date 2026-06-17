# Site Foundation

Date: 2026-06-06
Status: Active
Owner: Jamie

## Purpose

This document records the durable implementation shape for the `www.jami.studio`
marketing site after the app foundation exists.

## Source-Owned Public Data

The project roster, routes, subdomains, repository URLs, docs URLs, API URLs,
CTAs, project summaries, and AI summaries live in `src/content/`. Components
consume that data instead of hardcoding project links or copy.

`src/content/projects.ts` validates the project registry at module load with
the same shape consumed by pages, metadata helpers, route helpers, sitemap, and
AI-ingestion files. `src/content/links.ts` owns shared external link roots such
as the Studio GitHub organization.

Project URL formatting is centralized before rendering: `src/content/projects.ts`
derives project routes, domain targets, and CTA hrefs from typed slug,
subdomain, repository, docs, and API fields, while `src/lib/routes.ts` exposes
canonical project routes, product subdomain targets, repository links, docs
links, API links, and project-page link contracts for pages and generated public
files.

## Generated Public Surface

The app generates these public surfaces from shared helpers:

- canonical metadata for every route
- Open Graph and Twitter/X metadata for site and project pages
- JSON-LD for the organization, website, and project/source-code surfaces
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `llms-full.txt`

Tests under `tests/` verify that the project registry, public routes, generated
sitemap, route metadata, project JSON-LD, project CTAs, and AI-readable files
stay in sync.

## Token Foundation

The shared token contract lives under `src/tokens/`. It defines a validated
theme preset shape, dial model, CSS variable output, and registry-candidate
metadata. The current neutral preset is a foundation preset, not the final brand
direction.

Token values are applied through shadcn-compatible CSS variable roles such as
`--background`, `--foreground`, `--card`, `--primary`, `--border`, and `--ring`,
plus site-owned variables for surface depth, spacing, typography, radii, and
motion. The internal configuration panel renders the available dials and token
output from the same contract.

The selected public surface is the design-agent-starter direction promoted on
2026-06-07. It keeps the registry-compatible token plumbing and uses the shared
content registry for the homepage, project index, and project-detail pages. The
internal configuration panel remains available as a source component and
registry-readiness surface, but it is not presented as a primary public
homepage section.

Future visual changes may tune token values, component expression, and page
composition. They should not fork the content registry, route helpers, metadata
helpers, sitemap, robots, or AI-file generation without a real source-owned bug.

## Tooling Boundary

Source reports and research artifacts can exist under `docs/reports/` and
`docs/research/`, including vendored research packs. They are not web-app source
and are excluded from TypeScript, ESLint, and Prettier gates. Durable product,
architecture, operations, and decision docs remain under the documented docs
owners and continue to be reviewed as first-class project context.

## Runtime Boundary

This repository markets and documents the Studio product family. It does not
implement the Harness, UI Registry runtime, Orchestra runtime, Intercal runtime,
or Collectiva runtime. Links to those surfaces are data-owned and can move
without component rewrites.
