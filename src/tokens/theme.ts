import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Kirimo lane theme presets — faithful reproduction of the Kirimo template's
 * token system (`design/kirimo-2`).
 *
 * The template's extracted palette is authored verbatim for the dark theme:
 *   Background  rgb(13, 13, 13)         → #0d0d0d
 *   Primary     rgb(183, 171, 152)      → #b7ab98  (warm SAND — the type color)
 *   Brown 80    rgba(184,172,153,0.8)   → #968c7d  (body copy, flattened on bg)
 *   Brown 50    rgba(184,172,153,0.5)   → #635d53  (1px hairline rules/dividers)
 *   Brown 20    rgba(184,172,153,0.2)   → #2f2d29  (raised panel tint)
 *   Brown 10    rgba(184,172,153,0.1)   → #1e1d1b  (panel tint)
 *   Secondary   rgb(235, 89, 57)        → #eb5939  (terra-cotta accent — eyebrows + hovers)
 *
 * Alpha tints are pre-composited over the canvas because the schema is 6-digit
 * hex only. The accent is authored as `color.accent` (+ `ring`/`accentForeground`)
 * and surfaces only through `--accent` / `--primary` / `--ring`; the dial slot
 * label is `amber`, the rendered hex is the template's terra-cotta.
 *
 * The light theme is a real warm-paper design (sand family read in daylight),
 * not an inverted dark theme. Same single accent, darkened for AA on paper.
 */

const TERRA_COTTA = "#eb5939";
const TERRA_COTTA_LIGHT = "#b53a1c"; // AA on the paper canvas
const NEAR_BLACK = "#0d0d0d";

// Single family — Plus Jakarta Sans (the template's only typeface).
const typography: TokenPreset["typography"] = {
  sans: "var(--font-jakarta), 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  mono: "ui-monospace, SFMono-Regular, 'Cascadia Mono', Consolas, monospace",
  display: "var(--font-jakarta), 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.5rem",
    // Heading 2 — 56 / 45 / 36 px across the template breakpoints.
    xl: "clamp(2.25rem, 1.4rem + 2.9vw, 3.5rem)",
    // Heading 1 — 72 / 58 / 46 px, uppercase, LH 1.3.
    hero: "clamp(2.875rem, 1.6rem + 4.2vw, 4.5rem)"
  },
  lineHeight: {
    // Template headings sit at 1.2–1.3 — editorial, never crushed.
    tight: 1.25,
    body: 1.5
  }
};

const spacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  control: "3rem",
  // Sections run 100px top/bottom on desktop (80px for the hero band).
  section: "clamp(4rem, 2.5rem + 4.5vw, 6.25rem)",
  // Template inner column: max 1440 with 50px side gutters at desktop.
  container: "min(1340px, calc(100vw - 2.5rem))"
};

// Kirimo is squared-off editorial; only buttons go full pill.
const radii: TokenPreset["radii"] = {
  sm: "2px",
  md: "4px",
  lg: "8px",
  pill: "999px"
};

const motion: TokenPreset["motion"] = {
  duration: "480ms",
  durationFast: "180ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  intensity: 40
};

const logos: TokenPreset["logos"] = {
  markShape: "frame",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
};

const handles: TokenPreset["handles"] = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
};

const ownership: TokenPreset["ownership"] = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: ["dials", "colorValues", "typographyValues", "surfaceTreatment", "componentExpression"]
};

function registry(id: string): TokenPreset["registry"] {
  return {
    item: `@jami-studio/theme/${id}`,
    version: "0.1.0",
    candidate: true,
    exports: ["themePreset", "themeDials", "cssVariables", "registryManifest"],
    branchMutable: ["dials", "color", "typography", "spacing", "radii", "surface", "elevation", "motion"]
  };
}

/**
 * DARK — the template expression: near-black canvas, sand type (not white),
 * pre-composited sand tints for panels and hairlines, terra-cotta accent.
 * Flat — no grain, no glow; contrast comes from imagery and hairline rules.
 */
export const kirimoDarkPreset: TokenPreset = validateTokenPreset({
  id: "kirimo-dark",
  name: "Kirimo Dark",
  description:
    "Template-true Kirimo dark preset: near-black canvas, warm sand foreground, terra-cotta accent, hairline sand rules, flat editorial surfaces.",
  ownership,
  dials: {
    accent: "amber",
    contrast: 78,
    warmth: 70,
    density: 55,
    radius: 4,
    surfaceDepth: 30,
    motion: 40
  },
  color: {
    background: NEAR_BLACK,
    foreground: "#b7ab98",
    muted: "#1e1d1b",
    mutedForeground: "#968c7d",
    panel: "#1e1d1b",
    panelForeground: "#b7ab98",
    border: "#635d53",
    ring: "#f1684a",
    accent: TERRA_COTTA,
    accentForeground: NEAR_BLACK
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: NEAR_BLACK,
    panel: "#1e1d1b",
    panelRaised: "#2f2d29",
    overlay: "#161514",
    inverse: "#b7ab98"
  },
  elevation: {
    none: "none",
    sm: "0 0 0 1px rgb(184 172 153 / 0.08)",
    md: "0 24px 60px rgb(0 0 0 / 0.5)"
  },
  motion,
  logos,
  handles,
  registry: registry("kirimo-dark")
});

/**
 * LIGHT — warm paper daylight: the sand family inverted into parchment neutrals
 * with warm ink type and the terra-cotta accent darkened for AA. A real light
 * design sharing the same editorial grammar, not a value flip.
 */
export const kirimoLightPreset: TokenPreset = validateTokenPreset({
  id: "kirimo-light",
  name: "Kirimo Light",
  description:
    "Warm paper light preset for the Kirimo lane: parchment canvas, warm ink type, darkened terra-cotta accent, sand hairlines.",
  ownership,
  dials: {
    accent: "amber",
    contrast: 84,
    warmth: 76,
    density: 55,
    radius: 4,
    surfaceDepth: 24,
    motion: 40
  },
  color: {
    background: "#efe9df",
    foreground: "#221c14",
    muted: "#e3dccd",
    mutedForeground: "#5f574a",
    panel: "#f5f1e8",
    panelForeground: "#221c14",
    border: "#c2b8a5",
    ring: TERRA_COTTA_LIGHT,
    accent: TERRA_COTTA_LIGHT,
    accentForeground: "#fdf6ef"
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#efe9df",
    panel: "#f5f1e8",
    panelRaised: "#faf7f0",
    overlay: "#f5f1e8",
    inverse: "#221c14"
  },
  elevation: {
    none: "none",
    sm: "0 0 0 1px rgb(34 28 20 / 0.06)",
    md: "0 20px 50px rgb(34 28 20 / 0.10)"
  },
  motion,
  logos,
  handles,
  registry: registry("kirimo-light")
});

export type ThemeName = "dark" | "light";

export const kirimoThemes: Record<ThemeName, TokenPreset> = {
  dark: kirimoDarkPreset,
  light: kirimoLightPreset
};

/** Dark is the template's primary expression. */
export const defaultTheme: ThemeName = "dark";

/** Restored helper compatibility; Kirimo run 4 intentionally ships flat, no grain. */
export const grainOpacity: Record<ThemeName, string> = {
  dark: "0",
  light: "0"
};

/** Restored helper compatibility; unused while opacity is zero. */
export const grainBlend: Record<ThemeName, string> = {
  dark: "normal",
  light: "normal"
};
