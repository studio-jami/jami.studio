# Product Shape

Date: 2026-06-06
Status: Active
Owner: Jamie

## Purpose

`www.jami.studio` is the central public hub for the Studio OSS project family. It should feel like the intended final public product surface: polished, credible, agent-readable, and globally reusable.

## Owned Surface

This repo owns:

- The `www.jami.studio` landing page.
- Project landing pages for Harness, UI Registry, Orchestra, Intercal, and Collectiva.
- Shared navigation, footer, project cards, CTAs, metadata, sitemap, robots, and AI-ingestion files.
- Brand tokens and reusable marketing components.
- Deployment configuration for the marketing site.

This repo does not own:

- The Harness runtime.
- The UI Registry package or registry distribution runtime.
- The Orchestra runtime.
- The Intercal API, MCP server, pipeline, docs, or dashboard runtime.
- The Collectiva protocol/runtime.

## Public Product Family

The site presents these as one coherent OSS ecosystem:

- Jami Agent Harness: governed agent runtime and BYOK reference foundation.
- Studio UI Registry: tokenized UI system and trusted agent-render contract.
- Orchestra: development and multi-agent coordination framework.
- Intercal: provenance-backed temporal knowledge substrate.
- Collectiva: open agent society and governance layer.

## Routing Model

Project routing must be data-driven. Per the 2026-06-15 topology decision, per-product subdomains were **not** adopted; only products with a live, separately deployed surface carry a subdomain:

- `www.jami.studio` - main hub; also hosts each non-subdomain product at `www.jami.studio/projects/<slug>`.
- `intercal.jami.studio` - Intercal product surface (live, separate app).
- `registry.jami.studio` - Studio UI Registry / docs host (live).
- Harness, Orchestra, and Collectiva carry **no** subdomain. They are apex sections (`www.jami.studio/projects/harness`, `/orchestra`, `/collectiva`) that link to their GitHub repos until a dedicated surface ships.

These are target route contracts, not hardcoded infrastructure. Any project can gain a subdomain/docs/API surface — or move to a separate domain, repo, Vercel project, or docs provider — by changing centralized project metadata in `src/content/projects.ts`, only once that surface is actually live.

## Marketing Copy Rules

- Present the full envisioned product family.
- Avoid dev-log framing, apology copy, "not ready yet" copy, and temporary-sounding language.
- Keep live/current implementation status out of primary marketing copy.
- Use precise developer language: runtime, registry, contracts, provenance, governance, orchestration, docs, APIs, and OSS.
- Make each page useful to both humans and agents through stable headings, concise summaries, canonical metadata, and linked source files.
