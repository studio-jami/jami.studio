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

## Yrka Reference

Use `C:\Users\james\projects\yrka` as the preferred reference for the configuration-panel layout and organization style, specifically:

- `packages/design-tokens/src/business-theme-contract.ts`
- `packages/design-tokens/src/business-theme-validation.ts`
- `packages/design-tokens/src/business-theme-presets.ts`
- `packages/design-tokens/src/business-theme-css-vars.ts`
- `apps/web/lib/theme/workbench-*`
- `apps/web/components/admin/dock/appearance-panel.tsx`
- `apps/web/components/admin/dock/appearance-panel-controls.tsx`
- `apps/web/components/admin/dock/appearance-theme-tab.tsx`
- `apps/web/components/admin/dock/appearance-type-tab.tsx`
- `apps/web/components/admin/dock/appearance-shell-tab.tsx`
- `apps/web/components/admin/dock/appearance-manage-tab.tsx`

The part to preserve is the neat, organized control surface: clear tabs, compact sections, explicit labels, swatches, sliders, token pickers, validation feedback, save/apply actions, and a clean split between contract, state, metadata, controls, and tabs.

Do not copy Yrka's business-domain naming, persistence model, exact styling, or admin-shell assumptions. The reference is for layout discipline and operational neatness, not for carrying old product constraints into `jami.studio`.

## What Ships Before Branching

Before the three design branches, build only the reusable system mechanics:

- A typed token model for color roles, typography roles, spacing, radii, density, surfaces, elevation, motion, logos, and handles.
- Parameter dials such as accent, contrast, warmth, density, radius, surface depth, and motion intensity.
- Token validation and preset validation.
- CSS variable output aligned with shadcn conventions.
- A clean internal panel for inspecting and adjusting dials.
- A lightweight manifest shape that can later become a Studio UI Registry item or package.

Do not lock final colors, type personality, component look, or page composition before branching.

## Implemented Foundation

The current source-owned contract lives in:

- `src/tokens/schema.ts` for dial, preset, ownership, and registry metadata validation.
- `src/tokens/presets.ts` for neutral foundation dials, dial definitions, and dial-derived preset generation.
- `src/tokens/css-vars.ts` for shadcn-compatible CSS variable output plus site-specific surface, elevation, spacing, type, radius, and motion variables.
- `src/registry/manifest.ts` for registry-readiness metadata and foundation-owned versus branch-owned responsibilities.
- `src/components/config-panel/config-panel.tsx` and `src/components/system/token-swatch.tsx` for the internal dial inspector and token output panel.

The foundation-owned contract is the schema, validation, CSS variable export, config panel, and registry metadata. Design branches own token values, visual treatment, component styling, homepage composition, and project-page composition.

The neutral foundation preset is not the final brand. It exists so branches can prove that a token preset can be generated from dials and applied site-wide without rewriting the shared schema, route model, content registry, metadata helpers, sitemap, robots, or AI-file generation.

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
