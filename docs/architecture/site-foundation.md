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

Project URL formatting is centralized in `src/lib/routes.ts`: canonical project
routes, product subdomain targets, repository links, docs links, API links, and
project-page link contracts are derived there before being rendered by routes
or included in generated public files.

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
sitemap, route metadata, project JSON-LD, and AI-readable files stay in sync.

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

Design branches may change token values, component expression, and page
composition. They should not fork the content registry, route helpers, metadata
helpers, sitemap, robots, or AI-file generation without a real source-owned bug.

## Runtime Boundary

This repository markets and documents the Studio product family. It does not
implement the Harness, UI Registry runtime, Orchestra runtime, Intercal runtime,
or Collectiva runtime. Links to those surfaces are data-owned and can move
without component rewrites.
