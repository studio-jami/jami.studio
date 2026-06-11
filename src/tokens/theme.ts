import {
  validateThemeDials,
  validateTokenPreset,
  type ThemeDials,
  type TokenPreset
} from "./schema";

/**
 * Kirimo lane token values — primary aesthetic lane A (immersive dark creative).
 *
 * DNA borrowed from the Framer "Kirimo" template (near-black `#0d0d0d` canvas, warm
 * taupe primary text `#b7ab98`, uppercase display headings in Plus Jakarta Sans, a
 * vivid secondary accent reserved for eyebrows). That secondary is translated onto our
 * locked studio brand accent — wine-rose `#854c63` (`color.accent` → `--accent`/`--primary`,
 * dial family `rose`) — never a component literal. Both dark (primary) and light themes
 * ship here; the switch is wired in `globals.css`/`layout.tsx` over the same CSS vars
 * emitted by `tokenCssVariables()`.
 *
 * The `--grain-opacity` is not part of the frozen var contract, so it is surfaced
 * separately (see `grainOpacity`) and emitted alongside the preset vars in the layout.
 */

const WINE_ROSE = "#854c63";

// Shared, theme-agnostic value scales (type, spacing, radius, motion). Kept identical
// across dark/light so a theme swap never reflows the layout — only color changes.
const sharedTypography: TokenPreset["typography"] = {
  sans: "var(--font-jakarta), ui-sans-serif, system-ui, -apple-system, sans-serif",
  mono: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  display: "var(--font-jakarta), ui-sans-serif, system-ui, -apple-system, sans-serif",
  scale: {
    xs: "clamp(0.72rem, 0.69rem + 0.15vw, 0.78rem)",
    sm: "clamp(0.82rem, 0.79rem + 0.16vw, 0.9rem)",
    base: "clamp(1rem, 0.97rem + 0.2vw, 1.08rem)",
    lg: "clamp(1.18rem, 1.1rem + 0.42vw, 1.45rem)",
    xl: "clamp(1.9rem, 1.4rem + 2.4vw, 3.4rem)",
    hero: "clamp(2.5rem, 1rem + 7vw, 7.6rem)"
  },
  lineHeight: {
    tight: 1.04,
    body: 1.62
  }
};

const sharedSpacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  control: "3rem",
  section: "clamp(4.5rem, 3rem + 7vw, 8rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
};

const sharedRadii: TokenPreset["radii"] = {
  sm: "8px",
  md: "14px",
  lg: "22px",
  pill: "999px"
};

const sharedMotion: TokenPreset["motion"] = {
  duration: "560ms",
  durationFast: "220ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  intensity: 44
};

const sharedLogos: TokenPreset["logos"] = {
  markShape: "frame",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
};

const sharedHandles: TokenPreset["handles"] = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
};

const ownership: TokenPreset["ownership"] = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: [
    "dials",
    "colorValues",
    "typographyValues",
    "surfaceTreatment",
    "componentExpression"
  ]
};

const registry: TokenPreset["registry"] = {
  item: "@jami-studio/theme/kirimo",
  version: "0.1.0",
  candidate: true,
  exports: ["themePreset", "themeDials", "cssVariables", "registryManifest"],
  branchMutable: [
    "dials",
    "color",
    "typography",
    "spacing",
    "radii",
    "surface",
    "elevation",
    "motion"
  ]
};

// Lane dials — selects `rose` so the config-panel <select> reads true to the brand hex.
export const kirimoDarkDials: ThemeDials = validateThemeDials({
  accent: "rose",
  contrast: 88,
  warmth: 58,
  density: 50,
  radius: 14,
  surfaceDepth: 64,
  motion: 44
});

export const kirimoLightDials: ThemeDials = validateThemeDials({
  accent: "rose",
  contrast: 80,
  warmth: 62,
  density: 50,
  radius: 14,
  surfaceDepth: 36,
  motion: 44
});

/**
 * Dark preset — the lane's dominant identity.
 * Near-black warm charcoal canvas; warm-taupe foreground echoing Kirimo's brown text;
 * barely-lifted panels separated by glow + grain + hairline borders, not heavy shadows.
 */
export const darkPreset: TokenPreset = validateTokenPreset({
  id: "kirimo-dark",
  name: "Kirimo Dark",
  description:
    "Immersive dark creative lane: warm near-black canvas, taupe foreground, wine-rose accent, fine grain.",
  ownership,
  dials: kirimoDarkDials,
  color: {
    background: "#0d0d0f",
    foreground: "#ece6dc",
    muted: "#1a181c",
    mutedForeground: "#a39a8c",
    panel: "#161417",
    panelForeground: "#ece6dc",
    border: "#2c2830",
    ring: "#c06d8a",
    accent: WINE_ROSE,
    accentForeground: "#fdf3f7"
  },
  typography: sharedTypography,
  spacing: sharedSpacing,
  radii: sharedRadii,
  surface: {
    canvas: "#0d0d0f",
    panel: "#161417",
    panelRaised: "#1d1a20",
    overlay: "#211d24",
    inverse: "#ece6dc"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.4)",
    md: "0 30px 70px -30px rgb(0 0 0 / 0.7)"
  },
  motion: sharedMotion,
  logos: sharedLogos,
  handles: sharedHandles,
  registry
});

/**
 * Light preset — full sibling theme (not an inverted dark).
 * Layered warm off-white canvas, ink-brown foreground, the same wine-rose accent tuned
 * for AA on paper. Grain drops to a whisper (handled via grainOpacity below).
 */
export const lightPreset: TokenPreset = validateTokenPreset({
  id: "kirimo-light",
  name: "Kirimo Light",
  description:
    "Light editorial sibling of the Kirimo lane: warm layered off-white, ink-brown ink, wine-rose accent.",
  ownership,
  dials: kirimoLightDials,
  color: {
    background: "#f4f0e9",
    foreground: "#1f1a1c",
    muted: "#e7e0d4",
    mutedForeground: "#6f6357",
    panel: "#fbf8f2",
    panelForeground: "#1f1a1c",
    border: "#ddd3c4",
    ring: "#8f4f67",
    accent: "#7a3f57",
    accentForeground: "#fdf3f7"
  },
  typography: sharedTypography,
  spacing: sharedSpacing,
  radii: sharedRadii,
  surface: {
    canvas: "#f4f0e9",
    panel: "#fbf8f2",
    panelRaised: "#ffffff",
    overlay: "#ffffff",
    inverse: "#1f1a1c"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(54 44 33 / 0.06)",
    md: "0 28px 60px -34px rgb(54 44 33 / 0.28)"
  },
  motion: sharedMotion,
  logos: sharedLogos,
  handles: sharedHandles,
  registry
});

/** Per-theme grain opacity (not part of the frozen var contract; emitted by the layout). */
export const grainOpacity = {
  dark: 0.05,
  light: 0.022
} as const;

export type ThemeName = "dark" | "light";

export const themePresets: Record<ThemeName, TokenPreset> = {
  dark: darkPreset,
  light: lightPreset
};

export const defaultThemeName: ThemeName = "dark";
