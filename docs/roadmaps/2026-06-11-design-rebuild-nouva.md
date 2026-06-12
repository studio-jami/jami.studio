# jami.studio Design Rebuild — Nouva Lane (`design/nouva-2`)

Date: 2026-06-11 · Status: [x] Run 4 local closeout — faithful template reproduction
Lane: `nouva` · Branch: `design/nouva-2` · Worktree: `../jami.studio-nouva-2`
Template: **Nouva** (Framer) · Character: **dark blue-black void, charcoal cards on hairline seams**
Accent: **neon-lime `#8cff2e`** (dial slot `green`) — template-true, authored as `color.accent`
Art direction: `docs/design/reference-brief.md` · Extraction: `tools/framer-bridge/out/nouva.{json,full.json,home.png}`
Owner: Jamie

> **THE ONE RULE: reproduce the Nouva template.** ⚠️ Nouva is **DARK**, not light — the prior "light
> editorial" assignment was wrong against the real template. Build our site USING Nouva's real design: its
> blue-black void, its full-bleed cinematic hero, its rounded charcoal cards floating on void with 5%-white
> hairline seams, its staggered counter cards, its sticky-stacking features, its us-vs-them comparison panel,
> its neon-lime accent. The finished `/` must LOOK LIKE `out/nouva.home.png`. Do **NOT** build a generic
> skeleton. Reuse the shared CONTRACTS verbatim.

## Active lane (locked)

- **Template:** Nouva — a confident, editorial, image-forward **dark** SaaS/agency portfolio. Leads with a
  **full-bleed cinematic photograph** behind centered white type, then drops into a near-black void where
  every block is a **softly-rounded (16px) charcoal "Surface" card** floating on void, divided by hairline
  5%-white borders. Reserved neon-lime accent. Primary theme **dark**; a light theme also ships.
- **Canvas:** background `#080c12` · card surface `#0e131d` · surface-2 `#0f1520` · inset/highlight `#121926`
  · foreground `#ffffff`/`#fafafa` · muted cool blue-grey `#99a0b0` · border `rgba(255,255,255,0.05)`.
- **Accent:** neon-lime `#8cff2e` — used sparingly; buttons are **light pills with near-black label** (`#0d0d0d`).
  Authored as `color.accent` (+ `ring`/`accentForeground`) → `--accent`/`--primary` only.
- **Atmosphere is OUR generated photography (run-4 owner directive — supersedes any "CSS-only" rule):**
  Nouva is image-forward; empty charcoal boxes are the run-3 failure. Original dusk photographs were
  generated (Grok/Gemini) and live in the worktree at `public/assets/` — use them on every surface the
  template uses photography, with dark gradient overlays + blur-up. Never download the template's own images.
- **Framer key:** `nouva`.

## Visual assets (generated — already in `public/assets/`; reference as `/assets/<file>`)

| File | Surface |
|---|---|
| `hero.png` | full-bleed hero background (dark overlay over it; type on top) |
| `card-1.png` `card-2.png` `card-3.png` | Intro "three shifts" cards — photographic TOP HALF of each card, with a small glass micro-UI panel (HTML/CSS: mini chart / progress / breakdown rows) overlaid on the photo, title+body below — exactly like the template's cards |
| `feature-1.png` `feature-2.png` `feature-3.png` | Features sticky blocks — each block's media side is the photo with a translucent glass UI panel (HTML/CSS: big number, tabs, progress rows) floating on it |
| `team.png` | Benefits split — the tall left panel is this photo card with caption type overlaid |
| `cta.png` | final CTA card-on-void — photo fills the rounded card, type + pill on top |

Micro-UI panels are built in HTML/CSS (glassmorphism: `rgba` bg + blur + hairline border), never images.
If an asset file is missing at build time, build the slot with a CSS dusk-gradient placeholder AND flag it
in your report — do not drop or flatten the slot.

## Home IA — BUILD THIS (Nouva's real 10-section order)

Real `pageTrees` order: `Hero → WhyItMatters(staggered stat row) → Intro(3-col cards) → Features(sticky stack)
→ Benefits(asymmetric split) → Comparison(us-vs-them) → Testimonials(3-col masonry) → Pricing(toggle) →
FAQ(accordion) → CTA(card-on-void)`. Uniformly dark — depth comes from cards on void, **no light/dark
alternation**. Every section opens **eyebrow (uppercase tag) → big H2** (Onest, −0.04em). Build to this spine:

1. **Hero** — `min-height:100vh`, **centered** stack (≤600px), over the full-bleed generated dusk photo
   `/assets/hero.png` (cover, dark gradient overlay so type reads).
   `site.home.{eyebrow,title,lead}` (H1 60px, −0.04em, line-height 1.0, centered) with a **word-by-word
   blur-up reveal**, **ONE primary CTA** + a **scroll indicator** below.
2. **Why It Matters** — eyebrow + H2, then a **3-card stat row that is vertically staggered/offset** (cards 1
   & 3 pushed down ~48px), each topped by an **animated count-up number** — **real counts only** (e.g.
   5 products · 4 foundations · 1 shared source). Charcoal cards on void.
3. **Intro** — eyebrow ("What the studio does") + H2, then a **3-column grid of feature cards** carrying
   three of the `site.home.pillars` as the "three shifts."
4. **Features** — eyebrow + H2, then a **sticky-stacking set of feature blocks** (pinned scroll, "Sticky
   Container 1/2/3"), each a horizontal split, expanding on the pillars / the governed-runtime story.
5. **Benefits** — eyebrow ("Built across the family") + H2, then an **asymmetric split: a tall left CTA panel
   beside a 2-column grid of benefit cards** (cross-family benefits, honest).
6. **Comparison** — eyebrow + H2, then a **two-column us-vs-them panel** inside one Surface card: left
   "Generic site templates" (fabricated logos/metrics/placeholder) vs a right **inset, highlighted
   (Surface-3)** "jami.studio" column (generated from one shared source · real proof · open-core). Checklist
   of negatives vs positives. Honest framing, no invented competitor names.
7. **Testimonials → the five-project family** — eyebrow ("The family") + H2, then the **3-column masonry**
   treatment filled with the **five `projects` as `ProjectCard`s** (NOT fabricated quotes), each → its detail.
   This is the work showcase in Nouva's idiom.
8. **Pricing → open-core panel** — eyebrow + H2; keep the **monthly/yearly Switch** *frame* if you like but
   resolve it to an **honest open-core / OSS callout** (no tiers); a small **logo-ticker marquee** slot
   becomes an honest "generated from one source" / product-name marquee, never fake company logos.
9. **FAQ** — eyebrow + H2, then `site.faqs` (3) as a single **Accordion**.
10. **CTA** — a **centered card-on-void**: H2 + subtitle + one CTA, wrapped in a 16px-radius Surface panel.
    (Footer below, shared.)

## Signature elements — MUST reproduce (drop any and the lane fails)

- **Full-bleed cinematic hero** (generated dusk photo + dark overlay) behind centered type, with **word blur-up reveal**.
- **Photographic card surfaces** — intro cards, sticky features, and the benefits panel carry the generated
  photos with glass micro-UI overlays; no large card may be an empty flat box.
- **Rounded 16px charcoal cards floating on near-black void**, divided by **1px / 5%-white hairline seams** —
  the universal building block on every section.
- **Staggered/offset stat row** (cards pushed up/down ~48px) with **animated count-up numbers** (real counts).
- **Sticky-stacking Features** — feature blocks that pin and stack on scroll.
- **Eyebrow (uppercase tag) → big Onest H2 (−0.04em)** opening every section.
- **Two-column Comparison panel** with an inset highlighted "us" column vs a muted "them" column.
- **Light pill buttons** (near-black label) + reserved neon-lime accent.

## Color / Type / Texture (exact)

- **Color:** bg `#080c12` · cards `#0e131d`/`#0f1520`/`#121926` · fg `#ffffff`/`#fafafa` · muted `#99a0b0` ·
  border `rgba(255,255,255,0.05)` · accent neon-lime `#8cff2e` · button-label `#0d0d0d`. Dark-primary; light
  theme is a real light design.
- **Type:** display + body = **Onest** (self-host via `next/font/google`), 400/500/700: H1 60/48/46, H2
  48/40/38, all **−0.04em**, line-height ~1.0–1.05; body 16/18 muted; **eyebrow/Tag uppercase 12px** +0.06em.
- **Texture/motion:** no grain; depth via layered Surface cards + hairline seams on void. Smooth scroll;
  hero per-word blur-up (opacity/y/blur, ~0.6s, 0.02s stagger); stat count-up on in-view; sticky/pin in
  Features; ticker marquee; accordion + switch. All motion freezes under reduced-motion.

## `/projects` index

The five `ProjectCard`s as a **masonry/3-column grid of charcoal cards on void** with hairline seams — the
full family view. Shared header/footer, eyebrow → H2 section opener.

## `/projects/[slug]` detail

Nouva ships a `/contact` (Hero + form) pattern; extend its card-on-void language to a case study: hero card
(`name`/`summary`/`positioning` + `project.ctas`), audience/positioning, `capabilities[]` (card grid),
`proofPoints[]` (stat row), "part of the Studio family" cross-links, CTA card-on-void. `generateStaticParams`
for all five + per-project `generateMetadata`.

## Component decomposition (Nouva's vocabulary)

`Hero` (+blur-up), `ScrollIndicator`, `StatRow`/`StatCard` (count-up), `IntroGrid`/`FeatureCard`,
`StickyFeatures`/`FeatureBlock`, `BenefitsSplit`/`BenefitCard`, `ComparisonPanel`, `FamilyMasonry`/`ProjectCard`,
`OpenCoreCallout` (pricing slot), `LogoTicker` (honest marquee), `Faq`/`Accordion`, `CtaCard`,
`SiteHeader`/`SiteFooter`, `ThemeToggle`, `Container`/`Section`/`SectionHeading`. Variants are props, never forks.

## Shared contracts (frozen — reuse verbatim; never edit)

- **Frozen:** `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (46-var
  contract), `src/registry/manifest.ts`. Tests frozen — incl. `tests/config-panel.test.tsx` and
  `public/social/*.svg` checks. Never edit a test to pass.
- **Build fresh:** `src/tokens/theme.ts` (dark+light VALUES, validated, 6-digit hex only), all
  `src/components/*`, all `src/app/**`, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]`. Hrefs only via `resolveProjectLink`/`site.*`/`routes.ts`.
- **Surface** `site.social` + `site.email` in footer; keep `createMetadata` + JSON-LD + sitemap/robots/llms wired.

## Workstreams (sequential)

1. **WS1 — tokens/theme.** Dark+light presets on neon-lime `#8cff2e`; Onest faces. Typecheck green; validate.
2. **WS2 — globals + shell + theme switch + atmosphere.** Var blocks; no-flash init; hero photo layer +
   dark overlay utilities; card-on-void surface utilities + hairline seams. Metadata/AI wiring kept.
3. **WS3 — primitives + header + footer + base UI.** Header (`site.nav` + GitHub + toggle + mobile menu),
   Footer (`footerLinks` + `social` + `email` + AI index), pill `Button`, eyebrow Tag, `SectionHeading`.
4. **WS4 — Home (`/`).** Build the 10-section Home IA above. **SCREENSHOT CHECKPOINT:** capture `/` @1440 and
   compare to `out/nouva.home.png`; fix until faithful before polishing.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build index masonry + detail.
6. **WS6 — responsive + themes + motion + a11y.** 4 bp × 2 themes; AA; `--ring` focus; ≥44px; no h-scroll@390;
   reduced-motion freezes blur-up/sticky/count-up.
7. **WS7 — AI surfaces + verify + screenshots + closeout.** Surfaces correct; `pnpm verify` green; capture
   `screenshots/nouva-{home-1440,home-390,projects-1440}.png`; stop processes; conventional commit + HEREDOC;
   **do not push** (orchestrator pushes).

## Acceptance criteria (all true, not 90%)

- `/` reproduces **Nouva's** 10-section structure and **looks like `out/nouva.home.png`**: cinematic hero,
  card-on-void with hairline seams, staggered count-up stat row, sticky features, comparison panel, light pill
  buttons, neon-lime accent — all present and **DARK**. Not a generic skeleton, not another lane's.
- Every page fully designed (`/`, `/projects`, `/projects/[slug]` ×5); every content job housed; every CTA via
  the content/route layer.
- Both themes designed; all four breakpoints clean; token-driven only (template-true palette); contracts untouched.
- Restrained motion; reduced-motion honored; AA contrast; visible focus; semantic landmarks.
- **No fabricated content** (no fake quotes/logos/metrics/tiers); honest comparison + honest marquee; no
  placeholder/status copy. AI surfaces intact; routes unchanged; static-first.
- `pnpm verify` green; §14 anti-slop zero true items. Committed to `design/nouva-2` (never main); world-class.

## Run 4 checkpoint evidence

- Fixed dark-default rendering by making the Nouva theme initializer default to `dark` unless the visitor has
  explicitly stored a theme preference; the 1440 checkpoint now renders `#080c12` with Onest.
- Fixed full-page capture gaps by making reveal wrappers render visible in static HTML; smoke reported zero
  hidden `.reveal` sections.
- Fixed empty photo slots by wiring generated assets from `public/assets/` and eager-loading the lane photo
  surfaces used in full-page screenshots.
- Captured `screenshots/checkpoint-home-1440.png`, `screenshots/nouva-home-1440.png`,
  `screenshots/nouva-home-390.png`, and `screenshots/nouva-projects-1440.png`.
- Smoked `/`, `/projects`, and all five `/projects/[slug]` pages at 1440/1024/768/390 in both dark and light
  themes: 56 checks, no 404s, no horizontal overflow, no hidden reveal sections, and no broken generated assets.
- Ran `pnpm verify`: lint, typecheck, tests, and build passed.
