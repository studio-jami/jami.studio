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

## Generated Public Surface

The app generates these public surfaces from shared helpers:

- canonical metadata for every route
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `llms-full.txt`

Tests under `tests/` verify that the project registry, public routes, generated
sitemap, and AI-readable files stay in sync.

## Token Foundation

The shared token contract lives under `src/tokens/`. It defines a validated
theme preset shape, dial model, CSS variable output, and registry-candidate
metadata. The current neutral preset is a foundation preset, not the final brand
direction.

Design branches may change token values, component expression, and page
composition. They should not fork the content registry, route helpers, metadata
helpers, sitemap, robots, or AI-file generation without a real source-owned bug.

## Runtime Boundary

This repository markets and documents the Studio product family. It does not
implement the Harness, UI Registry runtime, Orchestra runtime, Intercal runtime,
or Collectiva runtime. Links to those surfaces are data-owned and can move
without component rewrites.
