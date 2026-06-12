# jami.studio Design Rebuild — Message AI Lane (`design/message-ai-2`)

Date: 2026-06-11 · Status: [ ] Active — run 3 (faithful template reproduction)
Lane: `message-ai` · Branch: `design/message-ai-2` · Worktree: `../jami.studio-message-ai-2`
Template: **Message AI** (Framer) · Character: **cinematic warm-black, volumetric-light glow**
Accent: **lime `#e8ff9c`** (dial slot `green`) — template-true, authored as `color.accent`
Art direction: `docs/design/reference-brief.md` · Extraction: `tools/framer-bridge/out/message-ai.{json,full.json,home.png}`
Owner: Jamie

> **THE ONE RULE: reproduce the Message AI template.** Build our site USING its real design — its section
> structure, its warm-near-black canvas, its volumetric-light glow, its film grain, its giant soft cards, its
> lime accent, its hushed centered type. The finished `/` must LOOK LIKE `out/message-ai.home.png`. Do **NOT**
> build a generic `Hero→pillars→showcase-grid→proof→FAQ→CTA` skeleton — that is the failure this replaces.
> Reuse the shared CONTRACTS verbatim; everything visible is this template's.

## Active lane (locked)

- **Template:** Message AI — a pitch-black cinematic AI-product canvas. Opens and closes on **full-bleed
  volumetric light** (a glowing beam fading into warm-black) with **fine film grain** over it; the middle is
  hushed, monochrome, centered, with **oversized 48px-radius matte-black cards** and soft "ghost-pill" section
  labels. Mood: a premium, mysterious "silent companion." Primary theme **dark**; a light theme also ships.
- **Canvas:** warm near-black `#0a0908` (Background), surfaces `#121212`, base black `#0a0a0a`. Foreground
  white `#ffffff`; muted `#858585`; border `rgba(255,255,255,0.16)`.
- **Accent:** lime `#e8ff9c` — used sparingly (CTA emphasis, focus, one or two highlights). Authored as
  `color.accent` (+ `ring`/`accentForeground`) → `--accent`/`--primary` only; never a literal.
- **Atmosphere is CSS, not their photo:** recreate the volumetric glow with **layered radial gradients**
  (cool blue `rgba(97,174,250,0.12)` + warm tint) fading into `#0a0908`, with the SVG film-grain overlay on
  top. Do **not** download the template's images.
- **Framer key:** `message-ai`.

## Home IA — BUILD THIS (Message AI's real 9-section order)

Real `pageTrees` order: `Hero → Features(grid) → Features(use-case slideshow) → HowItWorks(01-02-03) →
WhyItWorks(6-card) → Testimonials(slideshow) → Pricing → FAQ → FinalCTA`. The page is **uniformly dark**;
the only tonal shift is the glowing photographic hero + final-CTA bookends vs. the matte-black middle. Airy
rhythm (96px section padding, 128px on the pricing slot). **Every section opens with a translucent
ghost-pill label** above its heading. Build to this exact spine:

1. **Hero** — viewport-filling (100vh), **centered single column** over the volumetric-glow + grain
   atmosphere, `site.home.{eyebrow,title,lead}` (Host-Grotesk-style display, 56px desktop, −0.03em, centered,
   sentence case), **ONE primary CTA** (`primaryCta`), and an explicit **"Scroll to explore"** cue (down
   chevron + label) absolutely positioned at the bottom. The defining bookend.
2. **Features grid** — ghost-pill + heading, then a **3-column grid of the four `site.home.pillars`** as
   icon+label feature cards (48px-radius matte cards, 12px gap). Tight, scannable.
3. **Use-case slideshow → the five-project showcase** — ghost-pill + heading, then the **five `projects` as a
   horizontal slideshow / carousel** with an edge-fade overlay mask (Message AI's signature sideways moment).
   Each slide = a `ProjectCard` (name, summary, positioning, CTA → `/projects/[slug]`). This is the centerpiece.
4. **HowItWorks — stepped 01-02-03** — ghost-pill + heading, then a **numbered 3-step band** telling the
   "everything generated from one shared source" story (governed runtime → trusted interfaces → durable
   coordination). Explicit big `01 / 02 / 03` numerals. Distinct from the feature grid.
5. **WhyItWorks — 6-card grid** — ghost-pill + heading, then a **denser 6-card matrix** of distilled
   benefits/proof drawn from the projects' real `proofPoints[]` (honest — no invented numbers).
6. **Testimonials slideshow → honest proof band** — ghost-pill + heading, then a **horizontal auto-scrolling
   row** in the testimonial-slideshow treatment, but filled with **real proof points**, NOT fabricated quotes.
7. **Pricing → open-core panel** — the most airy section (128px). Keep the pricing-section *frame* but
   replace tiers with an **honest open-core / OSS callout** (GitHub via `studioLinks.githubOrg`). If you use
   the count-up number device, animate only **real** counts (5 products · 4 foundations · 1 shared source).
8. **FAQ** — ghost-pill + heading, then `site.faqs` (3) as **ExpandableCard accordion** rows.
9. **FinalCTA** — the closing bookend: a large dark panel with its **own volumetric-glow** echoing the hero,
   centered heading + lead + one CTA ("View projects" / "Read AI index"). Footer below.

## Signature elements — MUST reproduce (drop any and the lane fails)

- **Volumetric light-beam glow bookends** (hero + final CTA), recreated in CSS, fading into warm-black.
- **Fine film-grain overlay** over the dark canvas (static `feTurbulence` data-URI; `--grain-opacity` 0.04–0.07).
- **"Scroll to explore" cue** under the hero — explicit down-chevron + label.
- **Ghost-pill section labels** above every section heading (consistent rhythmic tell).
- **Oversized 48px card radius** — big, soft, pillowy matte-black surfaces (not 8–12px SaaS corners).
- **Two horizontal slideshows** (projects/use-cases + proof) breaking the vertical stack sideways.
- **Numbered 01-02-03 HowItWorks** band, separate from the feature grid.
- **Hushed, single-lime-accent palette** — lime is "neon through fog," never a fill.

## Color / Type / Texture (exact)

- **Color:** bg `#0a0908` · surface `#121212` · fg `#ffffff` · muted `#858585` · border `rgba(255,255,255,0.16)`
  · accent lime `#e8ff9c`. Glow tints: cool blue `rgba(97,174,250,0.12)`, warm `#171200`. Dark-primary;
  light theme is a genuine light design, not an inversion.
- **Type:** display = **Host Grotesk** (self-host via `next/font/google`), 400/700, hero 56/40px, −0.03em,
  centered, sentence case; body = **DM Sans** 400/500/700, 16px muted. No uppercase transforms.
- **Texture/motion:** grain + radial glow; smooth scroll feel; once-only scroll-reveal (fade/translate 8–16px);
  in-view count-up only on real numbers; gentle slideshow auto-advance. All motion freezes under reduced-motion.

## `/projects` index

A cinematic gallery of all five `ProjectCard`s on the warm-black canvas — generous spacing, 1–2 columns,
grain + glow doing the separation, 48px-radius cards, ghost-pill section label. Shared header/footer.

## `/projects/[slug]` detail

A focused vertical descent in the cinematic idiom (Message AI has no detail page of its own — extend its
language): glowing hero (`name`/`summary`/`positioning` + `project.ctas`), audience/positioning statement,
`capabilities[]` as a stepped/progressive list, `proofPoints[]` band, "part of the Studio family"
cross-links, final-CTA glow panel. `generateStaticParams` for all five slugs + per-project `generateMetadata`.

## Component decomposition (Message AI's vocabulary)

`Hero`, `GhostBadge`, `FeatureGrid`/`FeatureCard`, `ProjectSlideshow`/`ProjectCard`, `HowItWorksSteps`,
`WhyItWorksGrid`, `ProofSlideshow` (testimonials slot), `OpenCoreCallout` (pricing slot), `Faq`/`ExpandableCard`,
`FinalCta`, `ScrollCue`, `SiteHeader`/`SiteFooter`, `GrainOverlay`/`Atmosphere`, `ThemeToggle`,
`Container`/`Section`. Variants are props, never forks.

## Shared contracts (frozen — reuse verbatim; never edit)

- **Frozen:** `src/content/*` (`site.ts`, `projects.ts` [5: harness, registry, orchestra, intercal,
  collectiva], `links.ts`), `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (46-var contract),
  `src/registry/manifest.ts`. Tests frozen — incl. `tests/config-panel.test.tsx` (every dial label +
  description; "Tokens"/"Registry" tabs) and `public/social/*.svg` checks. Never edit a test to pass.
- **Build fresh:** `src/tokens/theme.ts` (dark+light VALUES, validated, 6-digit hex only — convert any
  `rgb()`), all `src/components/*`, all `src/app/**`, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]`. Hrefs only via `resolveProjectLink`/`site.*`/`routes.ts`.
- **Surface** `site.social` + `site.email` in footer; keep `createMetadata` + JSON-LD + sitemap/robots/llms wired.

## Workstreams (sequential)

1. **WS1 — tokens/theme.** Dark+light presets on lime `#e8ff9c`; Host Grotesk + DM Sans; `--grain-opacity`.
   `pnpm typecheck` green; presets validate; vars match `tokenCssVariables()`.
2. **WS2 — globals + shell + theme switch + atmosphere.** `:root` + `[data-theme="dark"]` from
   `tokenCssVariables()`; no-flash init; static grain + radial-glow utilities; metadata/JSON-LD/AI wiring kept.
3. **WS3 — primitives + header + footer + base UI.** `SiteHeader` (`site.nav` + GitHub + toggle + mobile menu),
   `SiteFooter` (`footerLinks` + `social` + `email` + AI index), `Button`/`GhostBadge`/`Container`/`Section`.
4. **WS4 — Home (`/`).** Build the 9-section Home IA above. **SCREENSHOT CHECKPOINT:** capture `/` @1440 and
   compare to `out/message-ai.home.png`; fix until it reads as the same template before polishing.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build index + detail above.
6. **WS6 — responsive + themes + motion + a11y.** 1440/1024/768/390 × both themes; AA contrast; `--ring`
   focus; ≥44px targets; no h-scroll at 390; reduced-motion freezes motion.
7. **WS7 — AI surfaces + verify + screenshots + closeout.** metadata/sitemap/robots/llms correct; `pnpm verify`
   green; capture `screenshots/message-ai-{home-1440,home-390,projects-1440}.png`; stop processes; conventional
   commit + HEREDOC body; **do not push** (orchestrator pushes).

## Acceptance criteria (all true, not 90%)

- `/` reproduces **Message AI's** 9-section structure and **looks like `out/message-ai.home.png`**: glow
  bookends, grain, scroll cue, ghost-pill labels, 48px cards, the two slideshows, the 01-02-03 steps — all
  present. Not a generic skeleton, not another lane's.
- Every page fully designed (`/`, `/projects`, `/projects/[slug]` ×5); every content job housed; every CTA via
  the content/route layer.
- Both themes designed; all four breakpoints clean; token-driven only (template-true palette); contracts untouched.
- Grain/glow + restrained motion; reduced-motion honored; AA contrast; visible focus; semantic landmarks.
- **No fabricated content** (no fake testimonials/logos/metrics/tiers/posts); no placeholder/status copy. AI
  surfaces intact; routes unchanged; static-first.
- `pnpm verify` green; §14 anti-slop zero true items. Committed to `design/message-ai-2` (never main); reads
  world-class.
