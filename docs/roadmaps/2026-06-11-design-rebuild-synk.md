# jami.studio Design Rebuild — Synk Lane (`design/synk-2`)

Date: 2026-06-11
Status: [ ] Active — execute pass not started
Lane: `synk` · Branch: `design/synk-2` · Worktree: `../jami.studio-synk-2`
Template: **Synk** (Framer) · Aesthetic: **Lane B — systematized light**
Accent: `#2b4173` indigo (dial `green` slot — no blue/indigo name in the enum; retune the `accentPalettes` entry on-branch so the config `<select>` reads true)
Art direction: `docs/design/reference-brief.md` · Framer extraction: `tools/framer-bridge/out/synk.{json,full.json,home.png}`
Owner: Jamie

> **ONE lane, ONE branch, ONE worktree.** Reuse the shared CONTRACTS verbatim; build a design whose
> STRUCTURE is **Synk's**, not any other lane's. The Home IA below is extracted from this template's real
> exported `pageTrees` — build to it. Do **NOT** collapse to a generic
> `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton; that uniform skeleton was the exact failure this rebuild
> replaces. The contracts are shared and frozen; the visible design is this template's and yours.

## Active lane (locked)

- **Template:** Synk — premium AI-SaaS template built on *global styling variables* and modular components
  with explicit dividers between sections — exactly our token-driven philosophy. Borrow its systematized,
  swap-anything discipline made visible.
- **Aesthetic lane:** B — systematized light (both dark **and** light themes still ship).
- **Accent:** `#2b4173` indigo — authored as `color.accent` (+ `ring`/`accentForeground`), surfaced only
  via `--accent`/`--primary`. Never a literal.
- **Framer key:** `synk`.

## Home IA — build THIS (from `synk` `pageTrees`)

The real Synk home renders **sections separated by an explicit `Divider` component, in this order**:
`Hero → Trusted By → Features → ┃ → Benefits → ┃ → Features-2 → ┃ → Reviews → ┃ → Integrations → ┃ → FAQ`
(where `┃` is a token-driven `Divider`). Build our home to the same structure + rhythm. **The visible
`Divider` between every section is Synk's signature — the global-variable / swap-anything discipline made
visible.** Map each template section to our real content.

1. **Hero** → `site.home.{eyebrow,title,lead,primaryCta,secondaryCta}`. Calm systematized light, indigo
   accent, clean baseline grid.
2. **Trusted By** → **NO fake logos.** Map to `site.home.proof` (the honest "one shared source" line).
3. **Features** → the four `site.home.pillars` as systematized cards.
4. **`Divider`** → a real, token-driven `Divider` component (the visible system seam). **Reuse it between
   every section** below.
5. **Benefits** → distilled `capabilities[]` themes across the family.
6. **`Divider`**.
7. **Features-2** → the **five-project product-family showcase** (systematized grid), each a `ProjectCard` →
   `/projects/[slug]`. Centerpiece.
8. **`Divider`**.
9. **Reviews** → **NO fake reviews.** Map to a distilled `proofPoints[]` band.
10. **`Divider`**.
11. **Integrations** → **honest fit:** the five Studio products as one *integrated family* — they genuinely
    interconnect, so build a real "how the family fits together" map. **NOT** fake third-party integration
    logos.
12. **`Divider`**.
13. **FAQ** → `site.faqs` (3).
- Add a final **CTA band** before the footer (the template ends at FAQ; keep it in the same systematized
  rhythm with a leading `Divider`).

**Signature treatment:** an explicit, token-driven `Divider` between every section; a calm systematized
grid; the token system **is** the design statement. Indigo accent, disciplined. Texture optional/faint
(Lane B).

## `/projects` index

A systematized grid gallery of all five projects, `Divider` seams between bands. Shared header/footer.

## `/projects/[slug]` detail

Systematized case study with `Divider` seams between sections: hero (`name`/`summary`/`positioning` +
`project.ctas`), `capabilities[]`, `proofPoints[]`, family cross-links, CTA. `generateStaticParams` for all
five slugs + per-project `generateMetadata`.

## Component decomposition (name them this template's way)

`Hero`, `ProofLine` (Trusted By slot), `PillarCards` (Features), `Divider` (the signature — one component,
reused everywhere), `BenefitsList`, `ShowcaseGrid` + `ProjectCard` (Features-2), `ProofPointBand` (Reviews
slot), `FamilyIntegrationMap` (Integrations slot), `FAQ`, `CTABand`, `SiteHeader`/`SiteFooter`,
`ThemeToggle`, layout `Container`/`Section`. Variants are props, never forks.

## Shared contracts (frozen — reuse verbatim; identical on every lane; never edit)

- **Frozen, do not edit:** `src/content/*` (all copy — `site.ts`, `projects.ts` [5 projects: `harness`,
  `registry`, `orchestra`, `intercal`, `collectiva`], `links.ts`), `src/lib/*`
  (routes/metadata/sitemap/ai-public-files), `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (the fixed
  46-var contract), `src/registry/manifest.ts`. Tests are frozen too — incl. `tests/config-panel.test.tsx`
  (every dial label + description and the "Tokens"/"Registry" tab views must still render) and the
  `public/social/*.svg` existence checks. A lane never edits a test to pass.
- **Build entirely fresh:** `src/tokens/theme.ts` (this lane's **dark + light** `TokenPreset` VALUES,
  validated by `validateTokenPreset`, **6-digit hex only** — convert any `rgb()` from the extraction), all
  `src/components/*`, all `src/app/**` presentation, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` only — never add or rename a route (Synk's own
  `/pricing`, `/about`, `/contact`, `/waitlist`, legal pages do not become new routes; their content lives
  in our home/detail/footer). Hrefs come only from the content/route layer (`resolveProjectLink`, `site.*`,
  `src/lib/routes.ts`); never hand-built.
- **Accent is a token, not a literal:** author `color.accent` (+ `ring`/`accentForeground`) → surfaced only
  via `--accent`/`--primary`. Both dark + light themes ship, switched over `tokenCssVariables()` via
  `[data-theme]`.
- **Surface shared identity:** `site.social` + `site.email` in the footer/contact area; keep
  `createMetadata` + JSON-LD + `sitemap`/`robots`/`llms.txt` wired.

## Workstreams (sequential; each consumes the one before)

1. **WS1 — tokens/theme.** `src/tokens/theme.ts`: dark + light presets on `#2b4173` indigo (retune the
   `accentPalettes` `green`-slot entry so the `<select>` reads true); faces + `--grain-opacity` per
   `reference-brief.md` §6/§7 (light ≤0.03 or none). `pnpm typecheck` green; both presets validate; var
   names match `tokenCssVariables()` exactly.
2. **WS2 — globals + shell + theme switch + atmosphere.** `globals.css`, `layout.tsx`, `Divider`,
   `ThemeToggle`; emit `:root` + `[data-theme="dark"]` from `tokenCssVariables()`; no-flash init; keep
   metadata + JSON-LD + AI wiring. Reduced-motion is a hard gate.
3. **WS3 — primitives + header + footer + base UI.** `SiteHeader` (`site.nav` + GitHub + `ThemeToggle` +
   mobile menu), `SiteFooter` (`site.footerLinks` + `site.social` + `site.email` + AI index), `Button` /
   `Badge` / `Eyebrow` / `Container` / `Section` / `SectionHeading`, and the signature `Divider`. One radius
   scale, one motion.
4. **WS4 — Home (`/`).** Build the **Home IA** above — this template's section set + order, `Divider`
   between every section.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the index + detail above.
6. **WS6 — responsive + themes + motion + a11y hardening.** 1440/1024/768/390 × both themes; AA contrast;
   visible `--ring` focus; ≥44px tap targets; no horizontal scroll at 390; motion freezes under
   `prefers-reduced-motion`. Light is not an inverted dark.
7. **WS7 — AI surfaces + verify + closeout.** Confirm metadata/sitemap/robots/llms generate correctly and
   headings parse; `pnpm verify` green; stop helper processes; stage only intentional changes;
   conventional-style commit + HEREDOC body; `git push origin design/synk-2`.

## Acceptance criteria (Definition of Done — all true, not 90%)

- Every page fully designed: `/`, `/projects`, `/projects/[slug]` × all five products. No stubs, no
  half-styled sections.
- The home + detail compositions match **Synk's** divider-systematized information architecture above — not
  another lane's, not a generic `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton.
- Every required content job has a home; every CTA resolves through the content/route layer.
- Both themes fully designed; all four breakpoints clean; token-driven only (no hardcoded hex/px where a
  token role exists); frozen contracts untouched.
- Texture/motion per the brief; `prefers-reduced-motion` honored. WCAG AA text contrast; visible focus
  rings; semantic landmarks.
- **No fabricated content** (no fake testimonials/reviews/logos/metrics/pricing/posts); no
  placeholder/"coming soon"/status copy. AI surfaces intact; canonical routes unchanged; static-first.
- `pnpm verify` green; `reference-brief.md` §14 anti-slop passes with zero true items.
- Committed and pushed to `design/synk-2` (**never main**); reads world-class, not "fine".
