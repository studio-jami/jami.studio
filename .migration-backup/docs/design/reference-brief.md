# jami.studio — Design Reference Brief

**Audience:** the five design agents rebuilding the `jami.studio` marketing-site UI, one per assigned Framer
reference template, on separate branches/worktrees.
**Status:** model-agnostic, implementation-ready. Read this in full before writing any UI.
**Scope:** the universal craft, system rules, and verification bar that apply to every lane. **Your lane's
*structure* is owned by your roadmap** (`docs/roadmaps/2026-06-11-design-rebuild-<lane>.md`) — this brief does
not prescribe one look; it makes every lane clear the same quality + integrity bar while reproducing its own
template.

> One-line mandate: build the public hub for an open-core, agent-native product family so each lane reads like
> **its assigned reference template, fully realized with our content** — five templates, five distinct studios.

---

## 1. The one rule: reproduce your template

This is a five-way design bakeoff. Each lane is assigned one real Framer template whose complete design system
is already extracted into your worktree. **Build our site USING that template's design** — its real section
structure and order, its colors, its textures, its component vocabulary, its layout — populated with our
content. The finished `/` must **look like the template render** (`tools/framer-bridge/out/<lane>.home.png`).

- **Structure comes from your template, not a shared menu.** Your roadmap's "Home IA — BUILD THIS" lists the
  template's real section sequence (extracted from its `pageTrees`). Build that sequence, in that order, with
  those treatments. Do **NOT** build a generic `Hero → pillars → showcase-grid → proof → callout → FAQ → CTA`
  skeleton — that uniform skeleton is the exact failure this rebuild replaces, and no two lanes may share a
  `page.tsx` composition.
- **Reproduce the visual language, intentionally and well.** The goal is your specific template realized to
  production polish — not a vague "Framer vibe," and not generic stock shadcn/Tailwind. Match its hero
  treatment, card style, spacing rhythm, signature elements, and palette.
- **All five templates are DARK.** Each lane ships a dark primary theme true to its template **and** a working
  light theme (both themes are a contract). There is no "light editorial" lane.
- **Recreate atmosphere with code, not their assets.** Reproduce photographic/video glow, grain, and shaders
  with token-driven CSS (layered radial gradients, SVG grain, etc.). Do **not** download the template's
  copyrighted images — reproduce the *look*.

The target is the kind of site a senior design studio would put at the top of its own portfolio. "Fine" fails.

---

## 2. The five lanes

Each lane's full blueprint (exact section sequence, signature elements, color/type spec, honest-substitution
map, component decomposition, acceptance criteria) lives in its roadmap — that is the authority on structure.
Summary of what each must read as:

| Lane | Template | Canvas | Accent | Signature elements (must reproduce) |
|---|---|---|---|---|
| `message-ai` | Message AI | warm near-black `#0a0908` | lime `#e8ff9c` | volumetric-light glow bookends + film grain; centered hushed type; 48px-radius matte cards; ghost-pill section labels; two horizontal slideshows; 01-02-03 steps; scroll-to-explore cue |
| `nouva` | Nouva | blue-black `#080c12` | neon-lime `#8cff2e` | cinematic hero + word blur-up; charcoal cards on void w/ 5%-white hairline seams; staggered count-up stat row; sticky-stacking features; us-vs-them comparison panel; light pill buttons |
| `kirimo` | Kirimo | near-black `#0d0d0d`, **sand** fg `#b7ab98` | terra-cotta `#eb5939` | auto-play project slideshow; colossal 136px "JAMI STUDIO" ticker; numbered service accordion; hairline rules + vertical dividers; uppercase numbered eyebrows |
| `noir` | Noir | near-black `#1a1a1a` | copper `#ed4515` | asymmetric over-spaced 5-project work grid; divider-ruled services list; ONE inverted white stats section (grain + counters); vertical guide-lines; colossal "JAMI" footer wordmark; mono micro-labels |
| `synk` | Synk | near-black `#030303` | coral `#ff5e5d` | dashed-border card lattice (gap=0 shared seams); explicit dashed Divider between every section; ASCII/grid shader bg; embedded live UI feature cards; 5-product integration lattice |

Accents are template-true and authored as `color.accent` tokens (swappable on the token system); the dial
`<select>` slot is only a label, the rendered hex is the template's.

---

## 3. How to reproduce: the inputs in your worktree

The **complete design system of your assigned template is already extracted into your worktree** (gitignored),
no setup required:

- **`tools/framer-bridge/out/<lane>.home.png`** — a full-page render of the template's home. **This is your
  fidelity target — look at it.**
- **`tools/framer-bridge/out/<lane>.json`** — compact brief: the template's named color token system
  (`getColorStyles` — read the values, not the slot names; many fill only the `light` slot even when the design
  is dark), its type system (`getTextStyles` → fonts, tags, per-breakpoint sizes), its used fonts, its
  component inventory (the section vocabulary), pages, and `agentContext`. Read it top to bottom.
- **`tools/framer-bridge/out/<lane>.full.json`** — `pageTrees` (each page as a nested hierarchy: named sections
  in order, layout, gap, padding, per-breakpoint frames — **start here for structure and rhythm**) + flat
  `nodes` arrays (exact geometry/color/border/radius values).

Map the template's colors/type onto our token contract; build its section sequence with our content. Your
roadmap has already distilled this into a section-by-section blueprint — follow it.

---

## 4. Grain / texture (when your template has it)

Message AI and Noir use film grain; recreate it correctly — bad grain reads as JPEG noise and cheapens the
site. The performant standard is a **static SVG `feTurbulence` overlay (data-URI), not a runtime filter.**

```css
/* Token-driven grain overlay. Tune --grain-opacity per theme. */
.grain-overlay {
  position: fixed; inset: 0; pointer-events: none;
  z-index: 0;                 /* above canvas, below content */
  opacity: var(--grain-opacity, 0.05);
  mix-blend-mode: soft-light; /* overlay on dark; multiply at low opacity on light */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}
```

- **Opacity:** dark `0.03`–`0.07`. If you *see* it as texture rather than *feel* it as tooth, it's too strong.
  Expose it as `--grain-opacity` and swap per theme.
- **Color space:** always `color-interpolation-filters='sRGB'`. **numOctaves:** 2–3 (above 4 wastes CPU).
- **Tiling:** small tile (`~160–220px`) repeated, so grain stays crisp at 2× DPR.
- **Depth without banding:** build atmosphere from 1–2 large low-contrast radial gradients, then grain on top so
  8-bit steps dissolve into tooth.
- **Performance:** one fixed grain layer + ≤2 gradient layers per viewport; `pointer-events:none`, `aria-hidden`,
  **never animated** (no per-frame reseed). Static grain may stay under `prefers-reduced-motion`; any animated
  glow/parallax/shader **must** freeze.

---

## 5. Color & theming

Everything runs through the token schema (`src/tokens/schema.ts`), the preset generator (`src/tokens/presets.ts`),
and the CSS-var plumbing (`src/tokens/css-vars.ts`). You author your **own preset VALUES**; you never rewrite the
schema or the var-export contract.

- **Use your template's real palette.** Canvas, surfaces, borders, foreground, muted, and accent come from the
  extraction (your roadmap lists the exact hexes). 6-digit hex only — convert any `rgb()` before authoring.
- **Both themes required.** Author a full dark **and** a full light theme; wire a `[data-theme]` (or `.dark`)
  switch over the same vars from `tokenCssVariables()`. The light theme is a real light design, never an
  inverted dark.
- **Accent is a token, not a literal.** Author your template-true accent as `color.accent` (+ matching `ring` /
  `accentForeground`) → surfaced only via `--accent` / `--primary` / `--ring`. Use it sparingly (interactive +
  emphasis), never a fill-everywhere.
- **Consume the vars, never hardcode.** Backgrounds/text/panels/borders/shadows all come from the exported vars
  (`--background --foreground --muted --card --panel --border --ring --primary --accent --surface-* --shadow-*`).
  No raw hex in components.
- **Contrast:** hit WCAG AA on text. Dark foreground is near-white but not pure `#fff` (tuned to the canvas);
  muted text stays readable. Use `--surface-canvas/-panel/-panel-raised` for depth, not invented grays.

---

## 6. Typography

Map everything to the schema roles (`typography.display`, `typography.sans`, `typography.mono`,
`typography.scale.{xs,sm,base,lg,xl,hero}`, `typography.lineHeight.{tight,body}`); set values in your own preset;
consume via the CSS vars (`--font-display`, `--font-sans`, `--font-mono`, `--text-*`, `--line-tight`,
`--line-body`).

- **Use your template's real fonts** (from the extraction), self-hosted via `next/font/google` or
  `next/font/local` (`display: swap`, preload display + body, Latin subset): Message AI = Host Grotesk + DM Sans;
  Nouva = Onest; Kirimo = Plus Jakarta Sans; Noir = Instrument Sans + Geist Mono; Synk = Inter. If a face is
  licensed, document the license need and ship a free fallback so the build never depends on an unlicensed asset.
- **Scale & hierarchy:** match the template's hero size and heading scale; keep a clear, limited hierarchy
  (hero → xl heads → lg subheads → base body → sm/xs labels). Use the scale; don't invent in-between sizes.
- **Tracking:** match the template (most of these run tight negative tracking on display, e.g. −0.02 to −0.04em;
  uppercase eyebrows/labels letterspace positively). Line-height: tight (~1.0) for display, body (~1.5) for prose.

---

## 7. Motion

Tasteful, restrained, scroll-aware. Map durations/easing to the motion tokens (`--motion-duration`,
`--motion-duration-fast`, `--motion-easing`). Motion supports content; it never performs.

- **Reproduce your template's signature motion** where it has one: Message AI's horizontal slideshows + in-view
  count-up; Nouva's word blur-up + staggered counters + sticky-pin; Kirimo's auto-play slider + ticker marquees;
  Noir's logo ticker + per-letter reveal; Synk's animated ASCII shader + marquee + embedded micro-UI loops.
- **Scroll-reveal:** gentle fade/translate-in (8–16px, ~`--motion-duration`), once only.
- **Hover:** subtle on cards/buttons (border/accent shift, ≤2px lift, faint glow on dark). Consistent everywhere.
- **No:** scroll-hijacking, bouncy overshoot, anything that delays content paint.
- **`prefers-reduced-motion: reduce` is a hard gate:** disable transforms/parallax/animated reveals; pause
  auto-play sliders and marquees; make shaders static; show final state immediately. Static grain may stay.
- **Performance:** animate only `transform` and `opacity`; respect a small motion budget so nothing blocks LCP/INP.

---

## 8. Responsive

Design and verify at all four breakpoints; both themes work at all four.

- **~1440 (desktop):** the full layout. Container ≈ `min(1120px, 100vw − 2rem)` (the `--container` token).
- **~1024 (laptop):** container shrinks gracefully; multi-column grids step down; nav intact; type scales via `clamp`.
- **~768 (tablet):** grids collapse to 1–2 columns; nav may become a menu; hero scales but stays a moment; rhythm preserved.
- **~390 (mobile):** single column; tap targets ≥44px; nav is a clean menu/sheet; hero legible and punchy; grain
  opacity may drop slightly; **no horizontal scroll, ever**; footer reflows to a readable stack. Signature
  elements (tickers, lattices, work grids, wordmarks) must reflow cleanly, not overflow.

Use fluid `clamp()` type and the spacing tokens so transitions between breakpoints are smooth.

---

## 9. Accessibility (by construction)

- WCAG AA contrast minimum for text (watch warm/low-contrast accents on near-black).
- Visible focus rings via `--ring` on every interactive element.
- Semantic landmarks; one `h1` per page; ordered heading hierarchy.
- Respect `prefers-reduced-motion` (§7).

---

## 10. AI-friendliness (keep intact)

The site is AI-readable by design; the rebuild must not regress this.

- Keep canonical metadata (`src/lib/metadata.ts`), `sitemap.xml`, `robots.txt`, `llms.txt` / `llms-full.txt`
  generation wired and correct.
- Stable URLs: `/`, `/projects`, `/projects/[slug]` — never rename or break canonical paths.
- Semantic, clean heading hierarchy so the structure parses.
- Per-project social images + concise descriptions stay from the content layer.
- Static-first — don't bury content behind client-only rendering that strips it from initial HTML.

---

## 11. Reuse boundary

**Reuse as-is (shared contracts — do not reimplement, do not fork):**
- `src/content/*` — `projects.ts` (5 projects: harness, registry, orchestra, intercal, collectiva), `site.ts`,
  `links.ts` (all copy, projects, nav, FAQ, CTAs, socials, email).
- `src/lib/*` — `routes.ts`, `metadata.ts`, `sitemap.ts`, `ai-public-files.ts` and the generated
  `robots`/`sitemap`/`llms` routes they feed.
- `src/tokens/schema.ts` + `css-vars.ts` — the token **contract** + var export (46 fixed vars).
- `src/registry/manifest.ts` — registry-ready metadata.
- Tests (`tests/*`) are frozen — incl. `config-panel.test.tsx` (every dial label + description, the
  "Tokens"/"Registry" tabs) and the `public/social/*.svg` checks. Never edit a test to pass.

**Build entirely fresh:**
- All UI components (`src/components/*`), all app-route presentation (`src/app/**`), `globals.css`, and your own
  token preset VALUES (`src/tokens/theme.ts` — your colors/type/spacing/radii/surfaces/motion + your dark and
  light themes, validated by `validateTokenPreset`).

**Hard line:** do not reimplement any product runtime (Harness, UI Registry, Orchestra, Intercal, Collectiva) —
this repo owns the marketing site only. Hrefs come only from the content/route layer (`resolveProjectLink`,
`site.*`, `routes.ts`), never hand-assembled. Surface `site.social` + `site.email` in the footer on every lane.

---

## 12. Honest substitution (anti-fabrication is absolute)

Templates contain slots we have no real data for — client-logo walls, testimonial quotes, ROI stats, pricing
tiers, blog feeds. **Keep the template's *treatment* (the marquee, stat row, testimonial block, pricing panel,
blog grid); fill it with our real content** via the honest remaps your roadmap specifies. Never fabricate.

| Template slot | Honest substitution |
|---|---|
| Client-logo wall / "trusted by" marquee | the honest "everything generated from one shared source" proof line / a product-name marquee — never invented company logos |
| Testimonial / review quotes | distilled **real** `proofPoints[]` — never invented quotes or names |
| Stats / metrics (ROI %, counts) | **real** counts only (5 products · 4 foundations · 1 shared source) or the `site.home.proof` statement — never a fabricated statistic |
| Pricing tiers / toggle | an **open-core / OSS** callout (GitHub via `studioLinks.githubOrg`) — never invented tiers/prices |
| Blog / news feed | the **AI-readable index** (`site.nav` "AI index" + `llms.txt`) — never invented posts |

---

## 13. Anti-slop checklist (reject the design if any are true)

- Collapsed to a generic `Hero → pillars → showcase-grid → proof → FAQ → CTA` skeleton instead of the template's
  real section structure; a composition that matches another lane's.
- Generic multi-color gradient blobs; stock "AI" mesh gradients; gradient text everywhere.
- Pure `#000` or pure `#fff` flat canvas with no atmosphere, depth, or texture; wrong (not template-true) palette.
- Visible/heavy grain that reads as JPEG artifacting instead of fine film tooth.
- Lorem ipsum, placeholder copy, "coming soon", status apologies, or implementation caveats in marketing copy.
- Generic stock shadcn/Tailwind-UI look shipped unchanged instead of the assigned template's realized design.
- Mismatched radii (card ≠ button ≠ input); inconsistent spacing; ad-hoc margins; off-scale type.
- Hardcoded hex/px in components instead of tokens/CSS vars.
- Low-contrast body text (fails AA); invisible or missing focus rings.
- **Fabricated** metrics, "trusted by" logo walls, testimonials, pricing tiers, or blog posts (see §12).
- Three-column "feature soup" / SaaS pricing-card energy that ignores our open-core dev context.
- Broken/cramped layout at 768 or 390; horizontal scroll on mobile; desktop-only thinking.
- Light theme that's just the dark theme inverted (or missing); grain that doesn't adapt per theme.
- Heavy `feDisplacementMap` filter on a full-screen background; animated grain/shader with no reduced-motion guard.
- Carousels/marquees that scroll-hijack or auto-play without a reduced-motion pause; motion that delays content paint.
- One-off page styling that can't be reused; components that only work in one spot.

---

## 14. Verification — screenshots are part of the bar

Build-green is necessary, not sufficient. Your lane is judged visually:

1. **Fidelity** — does the built `/` look like its template render `out/<lane>.home.png`? (same structure, same
   palette, signature elements present)
2. **Divergence** — does it look like a different studio from the other four lanes?

Capture full-page `/` at 1440 and 390, and `/projects` at 1440, to `screenshots/<lane>-*.png`, and self-check the
home shot against the template render before polishing. The orchestrator compares every lane's screenshots
against its render and side-by-side; a lane that doesn't match its template, or collapses toward the generic
spine, is rejected and rebuilt.

---

*Build it like a studio showing its own best work — your template, fully realized, every pixel earning its place.*
