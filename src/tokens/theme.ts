import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Kirimo lane theme presets — Lane A (immersive dark creative).
 *
 * Built fresh for the `design/kirimo-2` lane. The DNA is the real Kirimo Framer
 * template: a deep near-black canvas (`rgb(13,13,13)`), warm taupe foreground
 * (`rgb(183,171,152)`), Plus Jakarta Sans display + body, oversized uppercase
 * headings, and a single decisive accent. The template's coral accent is replaced
 * by this lane's locked brand accent — `#854c63` wine-rose — authored as
 * `color.accent` (+ `ring`/`accentForeground`), surfaced only via
 * `--accent`/`--primary`, never a component literal.
 *
 * Both a full dark preset and a full light preset ship; they are switched over the
 * same `tokenCssVariables()` contract via `[data-theme]`. Values are 6-digit hex.
 */

// Locked brand accent for this lane (schema dial: rose).
const WINE_ROSE = "#854c63";
const WINE_ROSE_RING = "#c46a8c"; // brighter focus/glow rose — AA on dark, visible on light
const WINE_ROSE_ON = "#fdf2f6"; // near-white warm text on the accent fill (AA)

// Shared, lane-wide non-color values (type, spacing, radii, motion) so the dark and
// light presets stay a single, cohesive system rather than two unrelated themes.
const typography: TokenPreset["typography"] = {
  sans: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace",
  display: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  scale: {
    xs: "0.8125rem",
    sm: "0.9375rem",
    base: "1.0625rem",
    lg: "1.375rem",
    xl: "clamp(1.75rem, 3.2vw, 2.8rem)",
    hero: "clamp(2.85rem, 8.5vw, 7rem)"
  },
  lineHeight: {
    tight: 1.04,
    body: 1.6
  }
};

const spacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  control: "3rem",
  section: "clamp(4.5rem, 10vw, 7.5rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
};

const radii: TokenPreset["radii"] = {
  sm: "6px",
  md: "12px",
  lg: "20px",
  pill: "999px"
};

const motion: TokenPreset["motion"] = {
  duration: "460ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  intensity: 44
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
 * DARK — the primary Kirimo expression: deep warm charcoal canvas, warm taupe
 * foreground, barely-lifted panels with hairline borders, wine-rose accent that
 * reads like neon through fog. Grain + glow do the separation work, not shadows.
 */
export const kirimoDarkPreset: TokenPreset = validateTokenPreset({
  id: "kirimo-dark",
  name: "Kirimo Dark",
  description:
    "Immersive dark creative preset for the Kirimo lane: deep warm charcoal canvas, warm taupe text, wine-rose accent, fine grain over gentle glow.",
  ownership,
  dials: {
    accent: "rose",
    contrast: 84,
    warmth: 62,
    density: 52,
    radius: 12,
    surfaceDepth: 58,
    motion: 44
  },
  color: {
    background: "#0d0d0d",
    foreground: "#ece4d6",
    muted: "#1a1815",
    mutedForeground: "#b7ab98",
    panel: "#161412",
    panelForeground: "#ece4d6",
    border: "#2c2823",
    ring: WINE_ROSE_RING,
    accent: WINE_ROSE,
    accentForeground: WINE_ROSE_ON
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#0d0d0d",
    panel: "#161412",
    panelRaised: "#1f1b18",
    overlay: "#0a0a09",
    inverse: "#ece4d6"
  },
  elevation: {
    none: "none",
    sm: "0 1px 0 rgb(184 172 153 / 0.06), 0 12px 30px rgb(0 0 0 / 0.45)",
    md: "0 1px 0 rgb(184 172 153 / 0.08), 0 32px 70px rgb(0 0 0 / 0.55)"
  },
  motion,
  logos,
  handles,
  registry: registry("kirimo-dark")
});

/**
 * LIGHT — a warm gallery daylight, not an inverted dark theme. Warm off-white
 * canvas (the Kirimo taupe family reads as a parchment neutral in light), deep
 * ink foreground, the same wine-rose accent disciplined to interactive roles.
 */
export const kirimoLightPreset: TokenPreset = validateTokenPreset({
  id: "kirimo-light",
  name: "Kirimo Light",
  description:
    "Warm gallery light preset for the Kirimo lane: parchment off-white canvas, deep ink text, disciplined wine-rose accent, faint paper tooth.",
  ownership,
  dials: {
    accent: "rose",
    contrast: 86,
    warmth: 72,
    density: 52,
    radius: 12,
    surfaceDepth: 36,
    motion: 44
  },
  color: {
    background: "#f4efe7",
    foreground: "#1c1714",
    muted: "#e7dfd2",
    mutedForeground: "#6a5d51",
    panel: "#fbf8f2",
    panelForeground: "#1c1714",
    border: "#d8cdbc",
    ring: "#9c4f6a",
    accent: "#7a3f56",
    accentForeground: WINE_ROSE_ON
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#f4efe7",
    panel: "#fbf8f2",
    panelRaised: "#ffffff",
    overlay: "#fbf8f2",
    inverse: "#1c1714"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(28 23 20 / 0.06), 0 10px 24px rgb(28 23 20 / 0.05)",
    md: "0 1px 2px rgb(28 23 20 / 0.08), 0 28px 60px rgb(28 23 20 / 0.10)"
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

/** Dark is the lane's default expression. */
export const defaultTheme: ThemeName = "dark";

/** Per-theme grain opacity (Lane A range: dark 0.03–0.07, light 0.015–0.03). */
export const grainOpacity: Record<ThemeName, string> = {
  dark: "0.055",
  light: "0.022"
};

/** Per-theme grain blend mode (soft-light on dark, multiply on light). */
export const grainBlend: Record<ThemeName, string> = {
  dark: "soft-light",
  light: "multiply"
};
