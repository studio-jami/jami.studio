# UI Registry Token Foundation

Date: 2026-06-06
Status: Active planning guidance
Owner: Jamie

## Purpose

The `jami.studio` marketing site should use a tokenized, parameterized visual system that can seed the future Studio UI Registry. The site is allowed to move fast, but the foundation should not become throwaway styling that has to be reverse-engineered later.

## Core Shape

The shared foundation owns the contract:

- Token schema.
- Theme preset shape.
- Dial/parameter model.
- Validation.
- shadcn-compatible CSS variable plumbing.
- Internal configuration panel.
- Registry-readiness metadata.

Design branches own the values and expression:

- Color choices.
- Typography personality.
- Density and spacing feel.
- Surface treatment.
- Component styling.
- Homepage and project-page composition.
- Candidate blocks/pages for registry promotion.

## What Ships Before Branching

Before the three design branches, build only the reusable system mechanics:

- A typed token model for color roles, typography roles, spacing, radii, density, surfaces, elevation, motion, logos, and handles.
- Parameter dials such as accent, contrast, warmth, density, radius, surface depth, and motion intensity.
- Token validation and preset validation.
- CSS variable output aligned with shadcn conventions.
- A clean internal panel for inspecting and adjusting dials.
- A lightweight manifest shape that can later become a Studio UI Registry item or package.

Do not lock final colors, type personality, component look, or page composition before branching.

## Branch Rules

Each design branch must:

- Use the shared token/dial contract.
- Define its own token preset.
- Build a complete homepage and all project pages.
- Avoid hardcoded one-off styling where a token role or dial belongs.
- Keep shared content, routes, metadata, sitemap, robots, and AI-file generation untouched unless a real bug is found.

## Promotion Rules

After a design direction is selected:

- Promote that branch's token preset as the marketing-site brand system.
- Keep the shared token contract intact unless the selected branch exposed a real missing primitive.
- Mark components, blocks, and page sections that are strong candidates for the future Studio UI Registry.
- Do not block the marketing-site launch on full public registry packaging.

## Non-Goals

- Building the complete Studio UI Registry in this repo.
- Publishing public registry items before the marketing site needs them.
- Freezing a brand look before the design comparison.
- Copying old `yrka.io` implementation details as a constraint.
