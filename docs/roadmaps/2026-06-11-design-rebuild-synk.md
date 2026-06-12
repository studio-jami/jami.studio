# jami.studio Design Rebuild — Synk Lane (`design/synk-2`)

Date: 2026-06-11 · Status: [ ] Active — run 3 (faithful template reproduction)
Lane: `synk` · Branch: `design/synk-2` · Worktree: `../jami.studio-synk-2`
Template: **Synk** (Framer) · Character: **systematized near-black, dashed-border card lattice**
Accent: **coral `#ff5e5d`** (dial slot `rose`) — template-true, authored as `color.accent`
Art direction: `docs/design/reference-brief.md` · Extraction: `tools/framer-bridge/out/synk.{json,full.json,home.png}`
Owner: Jamie

> **THE ONE RULE: reproduce the Synk template.** ⚠️ Synk is **DARK**, not light — the prior "systematized
> light" assignment was wrong against the real template. Build our site USING Synk's real design: its
> near-black canvas, its **dashed-border card lattice** (cards welded edge-to-edge at gap=0 sharing hairline
> dashed seams), its **explicit dashed `Divider` between every section**, its **animated ASCII/grid shader**
> backgrounds, its **embedded live product-UI mini-apps** in feature cards, its **12-tile integration grid**,
> its coral accent. The finished `/` must LOOK LIKE `out/synk.home.png`. Do **NOT** build a generic skeleton.
> Reuse the shared CONTRACTS verbatim.

## Active lane (locked)

- **Template:** Synk — a premium **dark** AI-SaaS template built on a strict global-token + modular-component
  system. Its identity is **structural framing made visible**: `1px dashed` borders on every card, `gap=0` so
  cards share dashed seams into a continuous engineered grid, explicit dashed `Divider`s between sections, and
  a faint animated ASCII/grid shader behind headers. Calm, technical, blueprint-like. Primary theme **dark**;
  a light theme also ships.
- **Canvas:** background `#030303` · card surfaces `#0f0f0f`/`#080808`/`#0b0b0b` · foreground `#ffffff` /
  white-85 `rgba(255,255,255,0.85)` · muted `rgba(255,255,255,0.6)`/`#9c9c9c` · borders `#171717`/`#121212` ·
  **dashed-card border `#2e2e2e`** (Border-light) · tints `rgba(255,255,255,0.1/0.05)` · accent coral `#ff5e5d`.
- **Accent:** coral `#ff5e5d` — the lone chromatic accent, used sparingly. Authored as `color.accent` (+
  `ring`/`accentForeground`) → `--accent`/`--primary` only.
- **Texture:** deliberately **flat/clean** — no grain, no heavy gradients. Atmosphere = the **animated ASCII /
  grid shader** behind heroes/headers + the dashed lattice. (A static SVG dot/ASCII pattern is fine; keep it
  subtle and reduced-motion-safe.)
- **Framer key:** `synk`.

## Home IA — BUILD THIS (Synk's real divider-segmented order)

Real `pageTrees` order, with an explicit dashed `Divider` between every section:
`Hero → Trusted-By(logo marquee) → Features(2×2 dashed lattice w/ product-UI) ┃ Benefits(2×2 dashed) ┃
Features-2(6 advantage cards, 3-col dashed) ┃ Reviews(testimonial block) ┃ Integrations(12-tile 4×3 dashed)
┃ FAQ`, then a footer CTA band. Centered, maxWidth-capped title blocks open every section. Build to this spine:

1. **Hero** — **centered** stack over the **animated ASCII/grid shader** bg (800px), an honest **badge**
   ("OPEN CORE", not "beta tester"), H1 `site.home.title` (Inter SemiBold 48px −0.02em, maxW 700), `lead`
   (maxW 550), **ONE primary button**.
2. **Trusted-By → honest marquee** — an auto-scrolling **marquee** in the logo-wall treatment, but filled with
   the **five product names / "generated from one shared source"**, NOT fake company logos. Faint grid bg.
3. **Features** — centered title (maxW 500) + a **2×2 dashed-lattice grid** (gap=0, shared dashed seams) of the
   four `site.home.pillars`, ideally each carrying a small **live token/UI micro-visual** (e.g. an animating
   token swatch / a tiny config readout) echoing Synk's embedded product-UI cards.
4. **`Divider`** — explicit dashed Divider (64px). **Reuse between every section below.**
5. **Benefits** — centered title + a **2×2 dashed `Benefits` grid** in two rows split by an inner dashed
   divider — cross-family benefits (honest).
6. **`Divider`**.
7. **Features-2** — centered title + **6 advantage cards in two 3-col dashed rows** — deeper capabilities drawn
   from `capabilities[]`.
8. **`Divider`**.
9. **Reviews → honest proof block** — centered title + a multi-item block in the testimonial treatment, filled
   with distilled real `proofPoints[]` (NO invented quotes).
10. **`Divider`**.
11. **Integrations → the five-project family map** — centered title + a **tile lattice (3-col dashed)** of the
    **five Studio products as one integrated family** ("how runtime, interface, coordination, knowledge, and
    society plug together"). This is the honest read of Synk's 12-tile integration grid — **NOT** fake
    third-party integration logos. The product-family centerpiece.
12. **`Divider`**.
13. **FAQ** — centered title + `site.faqs` (3) as an accordion.
- **Footer CTA band** — a closing CTA in the same systematized rhythm (lead with a `Divider`).

## Signature elements — MUST reproduce (drop any and the lane fails)

- **Dashed-border card lattice** — `1px dashed #2e2e2e` on every card, `gap=0` so adjacent cards share seams.
- **Explicit dashed `Divider` components between every section** (64px) — visible structural rhythm.
- **Inner dashed dividers inside grids** (e.g. Benefits row 1 / row 2 split).
- **Animated ASCII / grid shader** hero bg + faint **grid background** behind section headers.
- **Live UI micro-visuals embedded in Feature cards** (token swatch / config readout / animated detail).
- **Auto-scrolling marquee** trusted-by row (honest content, no fake logos).
- **12-tile-style integration lattice** repurposed as the 5-product family map.
- **Centered, maxWidth-capped title blocks** opening every section; single restrained coral accent.

## Color / Type / Texture (exact)

- **Color:** bg `#030303` · cards `#0f0f0f`/`#080808`/`#0b0b0b` · fg `#ffffff` · muted `rgba(255,255,255,0.6)`/
  `#9c9c9c` · borders `#171717`/`#121212` · **dashed `#2e2e2e`** · accent coral `#ff5e5d`. Dark-primary; light
  theme is a real light design (the systematized lattice still reads in light).
- **Type:** **Inter** only (self-host via `next/font/google`), 400/500/600/700: H1 600 48/55 −0.02em center;
  H2 600 36/43 center; H3 500 28; body 14–18 muted; **uppercase only for the badge/tag**. No mono.
- **Texture/motion:** flat/clean; atmosphere = ASCII/grid shader + dashed lattice. onInView appear (fade +20px
  rise); auto-scrolling logo marquee; live micro-UI loops inside Feature cards; link hover muted→white. All
  motion freezes under reduced-motion (shader becomes static).

## `/projects` index

A systematized **dashed-lattice grid** gallery of all five projects, `Divider` seams between bands, centered
capped title. Shared header/footer.

## `/projects/[slug]` detail

Synk ships rich detail patterns (`/pricing`, `/about` timelines); compose a case study in the
Hero→Divider→content rhythm: hero (`name`/`summary`/`positioning` + `project.ctas`), `capabilities[]` (dashed
lattice), `proofPoints[]` block, family cross-links, CTA — `Divider` between each. `generateStaticParams` for
all five + per-project `generateMetadata`.

## Component decomposition (Synk's vocabulary)

`Hero` (ASCII shader + badge), `LogoMarquee` (honest Trusted-By slot), `FeatureLattice`/`FeatureCard`
(dashed, with micro-UI), `Divider` (the signature — one component, reused everywhere), `BenefitsLattice`,
`AdvantageGrid` (Features-2), `ProofBlock` (Reviews slot), `FamilyIntegrationGrid` (Integrations slot, 5
products), `Faq`/`Accordion`, `CtaBand`, `GridBackground`/`AsciiShader`, `SiteHeader`/`SiteFooter`,
`ThemeToggle`, `Container`/`Section`/`SectionHeading`. Variants are props, never forks.

## Shared contracts (frozen — reuse verbatim; never edit)

- **Frozen:** `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (46-var
  contract), `src/registry/manifest.ts`. Tests frozen — incl. `tests/config-panel.test.tsx` and
  `public/social/*.svg` checks. Never edit a test to pass.
- **Build fresh:** `src/tokens/theme.ts` (dark+light VALUES, validated, 6-digit hex only — convert `rgb()`),
  all `src/components/*`, all `src/app/**`, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` (Synk's `/pricing`/`/about`/`/contact`/`/waitlist`/
  legal fold into our home/detail/footer). Hrefs only via `resolveProjectLink`/`site.*`/`routes.ts`.
- **Surface** `site.social` + `site.email` in footer; keep `createMetadata` + JSON-LD + sitemap/robots/llms wired.

## Workstreams (sequential)

1. **WS1 — tokens/theme.** Dark+light presets on coral `#ff5e5d`; Inter faces. Typecheck; validate; vars match.
2. **WS2 — globals + shell + theme switch + atmosphere.** Var blocks; no-flash init; **dashed-border + dashed
   `Divider` utilities**; subtle ASCII/grid background (reduced-motion-safe). Metadata/AI wiring kept.
3. **WS3 — primitives + header + footer + base UI.** Header (`site.nav` + GitHub + toggle + mobile menu),
   Footer (`footerLinks` + `social` + `email` + AI index), `Button`, badge `Tag`, the signature `Divider`,
   `SectionHeading` (centered, capped).
4. **WS4 — Home (`/`).** Build the divider-segmented Home IA + dashed lattice above. **SCREENSHOT CHECKPOINT:**
   capture `/` @1440 and compare to `out/synk.home.png`; fix until faithful before polishing.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the lattice index + detail.
6. **WS6 — responsive + themes + motion + a11y.** 4 bp × 2 themes; AA; `--ring` focus; ≥44px; no h-scroll@390
   (lattice reflows; dashed seams stay clean); reduced-motion makes the shader static.
7. **WS7 — AI surfaces + verify + screenshots + closeout.** Surfaces correct; `pnpm verify` green; capture
   `screenshots/synk-{home-1440,home-390,projects-1440}.png`; stop processes; conventional commit + HEREDOC;
   **do not push**.

## Acceptance criteria (all true, not 90%)

- `/` reproduces **Synk's** divider-segmented structure and **looks like `out/synk.home.png`**: dashed-border
  card lattice (gap=0 seams), explicit dashed dividers between every section, ASCII/grid shader bg, embedded
  micro-UI feature cards, honest marquee, the 5-product integration lattice, coral accent — all present and
  **DARK**. Not a generic skeleton, not another lane's.
- Every page fully designed (`/`, `/projects`, `/projects/[slug]` ×5); every content job housed; every CTA via
  the content/route layer.
- Both themes designed; all four breakpoints clean; token-driven only (template-true palette); contracts untouched.
- Restrained motion; reduced-motion honored (shader static); AA contrast; visible focus; semantic landmarks.
- **No fabricated content** (no fake logos/reviews/integrations); honest marquee + honest family map; no
  placeholder/status copy. AI surfaces intact; routes unchanged; static-first.
- `pnpm verify` green; §14 anti-slop zero true items. Committed to `design/synk-2` (never main); world-class.
