import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Nouva lane — faithful reproduction of the real Nouva (Framer) template.
 *
 * Nouva is a DARK, blue-black SaaS/agency portfolio: a near-black void where every
 * block is a softly-rounded charcoal "Surface" card floating on the canvas, divided by
 * 1px / 5%-white hairline seams. White type, muted cool blue-grey secondary text, a
 * reserved neon-lime accent, and LIGHT pill buttons with a near-black label.
 *
 * These VALUES are owned by this design lane; the schema, the CSS-var contract
 * (`tokenCssVariables`), and the validation pipeline are shared/foundation-owned and
 * untouched.
 *
 * Palette extracted verbatim from `tools/framer-bridge/out/nouva.json` tokens:
 *   Dark/Background  rgb(8,12,18)        → #080c12
 *   Dark/Surface     rgb(14,19,29)       → #0e131d
 *   Dark/Surface 2   rgb(15,21,32)       → #0f1520
 *   Dark/Surface 3   rgb(18,25,38)       → #121926  (inset / highlighted column)
 *   Text/Primary     rgb(255,255,255)    → #fafafa  (Heading 1 textColor)
 *   Text/Secondary   rgb(153,160,176)    → #99a0b0
 *   Dark/Border      rgba(255,255,255,0.05)
 *   Primary (accent) rgb(140,255,46)     → #8cff2e  (neon-lime)
 *   Button label     rgb(13,13,13)       → #0d0d0d
 *
 * The accent is authored directly as `color.accent` (dial slot `green`) — the shared
 * accent enum does not carry a neon-lime preset, so the lane owns the value here. The
 * accentForeground is the near-black button/label ink so light accent fills read as the
 * template's light pill buttons.
 *
 * A real light theme also ships (designed, not an inverted dark theme): a soft paper
 * canvas with white cards and the same neon-lime accent dialled to a darker, AA-legible
 * green when used as a text/line role; pills stay light-on-dark in the dark theme and
 * dark-on-light in the light theme via `--btn-*` knobs in globals.css.
 */

// Onest is the single personality face (display + body). The leading family name is
// injected at runtime from `next/font` className-bound CSS variables declared in the
// layout; the literal family names here are the self-hosted fallbacks so the preset is
// valid and renders correctly even before hydration.
const ONEST_STACK = "var(--font-onest), Onest, ui-sans-serif, system-ui, -apple-system, sans-serif";
const MONO_STACK =
  "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Type scale translated from Nouva's style presets. `hero` owns the centered 60px H1
// moment; `xl` carries the 48px section H2; `lg`/`base` are Body Large / Body Medium.
const TYPE_SCALE = {
  xs: "0.75rem", // Tag 12px
  sm: "0.875rem", // Body Small 14px
  base: "1rem", // Body Medium 16px
  lg: "1.125rem", // Body Large 18px
  xl: "clamp(2.375rem, 4.4vw, 3rem)", // H2 38 → 48px
  hero: "clamp(2.875rem, 6vw, 3.75rem)" // H1 46 → 60px
} as const;

const TYPOGRAPHY = {
  sans: ONEST_STACK,
  mono: MONO_STACK,
  display: ONEST_STACK,
  scale: TYPE_SCALE,
  // Nouva tracks H1/H2 at -0.04em with near-1.0 line-height; body is relaxed.
  lineHeight: {
    tight: 1,
    body: 1.45
  }
} as const;

// One spacing system shared across both themes — generous, card-on-void rhythm.
const SPACING = {
  density: "comfortable",
  unit: "1rem",
  control: "2.875rem",
  section: "clamp(4.5rem, 9vw, 8rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
} as const;

// 16px rounded Surface cards are the universal building block; pills are full-round.
const RADII = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  pill: "999px"
} as const;

// One motion vocabulary, shared by both themes. Smooth, restrained.
const MOTION = {
  duration: "600ms",
  durationFast: "220ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  intensity: 40
} as const;

const LOGOS = {
  markShape: "dot",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
} as const;

const HANDLES = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
} as const;

function ownership() {
  return {
    foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
    branchOwned: [
      "dials",
      "colorValues",
      "typographyValues",
      "surfaceTreatment",
      "componentExpression"
    ]
  };
}

const REGISTRY_EXPORTS = ["themePreset", "themeDials", "cssVariables", "registryManifest"] as const;
const REGISTRY_BRANCH_MUTABLE = [
  "dials",
  "color",
  "typography",
  "spacing",
  "radii",
  "surface",
  "elevation",
  "motion"
] as const;

/**
 * Dark preset — the lane's primary character and the fidelity target.
 *
 * Blue-black void canvas; charcoal Surface cards on hairline 5%-white seams; near-white
 * type over muted blue-grey secondary text; neon-lime accent used sparingly. Elevation is
 * deep, soft, and cool — depth comes from layered Surfaces on the void, not heavy shadow.
 */
export const nouvaDarkPreset: TokenPreset = validateTokenPreset({
  id: "nouva-dark",
  name: "Nouva Dark",
  description:
    "Faithful Nouva dark preset: blue-black void canvas, charcoal Surface cards on 5%-white hairline seams, near-white type, neon-lime accent.",
  ownership: ownership(),
  dials: {
    accent: "green",
    contrast: 92,
    warmth: 8,
    density: 52,
    radius: 16,
    surfaceDepth: 74,
    motion: 40
  },
  color: {
    background: "#080c12",
    foreground: "#fafafa",
    muted: "#0f1520",
    mutedForeground: "#99a0b0",
    panel: "#0e131d",
    panelForeground: "#fafafa",
    border: "#1b2433",
    ring: "#8cff2e",
    accent: "#8cff2e",
    accentForeground: "#0d0d0d"
  },
  typography: { ...TYPOGRAPHY },
  spacing: { ...SPACING },
  radii: { ...RADII },
  surface: {
    canvas: "#080c12",
    panel: "#0e131d",
    panelRaised: "#0f1520",
    overlay: "#121926",
    inverse: "#fafafa"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.5)",
    md: "0 40px 80px -40px rgb(0 0 0 / 0.85)"
  },
  motion: { ...MOTION },
  logos: { ...LOGOS },
  handles: { ...HANDLES },
  registry: {
    item: "@jami-studio/theme/nouva-dark",
    version: "0.1.0",
    candidate: true,
    exports: [...REGISTRY_EXPORTS],
    branchMutable: [...REGISTRY_BRANCH_MUTABLE]
  }
});

/**
 * Light preset — a real, designed light companion (not an inverted dark theme).
 *
 * Soft cool-paper canvas; clean white cards on hairline seams; near-black type over a
 * muted slate secondary; the neon-lime accent stays the brand mark but is paired with a
 * darker lime-green line/text role (`ring`) so accent-on-light text stays AA-legible.
 * Pills invert to dark-on-light via globals.css knobs.
 */
export const nouvaLightPreset: TokenPreset = validateTokenPreset({
  id: "nouva-light",
  name: "Nouva Light",
  description:
    "Designed light companion for the Nouva lane: cool-paper canvas, white Surface cards on hairline seams, near-black type, neon-lime accent.",
  ownership: ownership(),
  dials: {
    accent: "green",
    contrast: 88,
    warmth: 18,
    density: 52,
    radius: 16,
    surfaceDepth: 24,
    motion: 40
  },
  color: {
    background: "#eef1f5",
    foreground: "#0b0f16",
    muted: "#e3e8ef",
    mutedForeground: "#5a6677",
    panel: "#ffffff",
    panelForeground: "#0b0f16",
    border: "#d7dde6",
    ring: "#3f7a16",
    accent: "#8cff2e",
    accentForeground: "#0d0d0d"
  },
  typography: { ...TYPOGRAPHY },
  spacing: { ...SPACING },
  radii: { ...RADII },
  surface: {
    canvas: "#eef1f5",
    panel: "#ffffff",
    panelRaised: "#f7f9fc",
    overlay: "#ffffff",
    inverse: "#0b0f16"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(15 23 42 / 0.06)",
    md: "0 30px 70px -36px rgb(15 23 42 / 0.28)"
  },
  motion: { ...MOTION },
  logos: { ...LOGOS },
  handles: { ...HANDLES },
  registry: {
    item: "@jami-studio/theme/nouva-light",
    version: "0.1.0",
    candidate: true,
    exports: [...REGISTRY_EXPORTS],
    branchMutable: [...REGISTRY_BRANCH_MUTABLE]
  }
});

export const nouvaThemePresets = {
  dark: nouvaDarkPreset,
  light: nouvaLightPreset
} as const;

export type NouvaThemeName = keyof typeof nouvaThemePresets;
