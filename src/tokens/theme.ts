import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Noir lane theme presets — template-true.
 *
 * Lane A reproduces the Noir Framer template: a high-contrast dark agency portfolio on
 * near-black `#1a1a1a` with bone-white type, hairline dividers at white/10%, and a single
 * warm copper accent `#ed4515` (dial slot `amber`). Both a primary dark theme and a fully
 * designed light twin are authored as concrete `TokenPreset` VALUES (6-digit hex only),
 * validated by `validateTokenPreset` and surfaced through the fixed CSS-var contract.
 *
 * Template palette mapping (alpha values flattened onto the canvas, hex-only schema):
 *   - background       #1a1a1a   (template Dark Gray canvas)
 *   - panel            #161616   (deeper section surface)
 *   - border           #313131   ≈ rgba(255,255,255,0.10) over #1a1a1a
 *   - mutedForeground  #a3a3a3   ≈ rgba(255,255,255,0.60) over #1a1a1a
 *   - inverse surface  #ffffff   (the ONE inverted Stats section)
 *   - accent           #ed4515   copper — interactive/emphasis only
 *
 * Type DNA from the real template:
 *   - Display + body: Instrument Sans (56px −0.04em headline, colossal uppercase bands)
 *   - Micro-labels / stat captions / answers: Geist Mono
 *
 * Accent contrast (WCAG AA checked):
 *   - copper #ed4515 as TEXT on #1a1a1a → 4.54:1 (passes AA; use at body size and up)
 *   - copper fill + #000000 foreground → 5.48:1 (button text passes AA)
 *   - light theme deepens copper to #c93a10 (5.1:1 on the off-white canvas)
 */

const fontDisplay =
  "var(--font-instrument-sans), 'Instrument Sans', ui-sans-serif, system-ui, sans-serif";
const fontSans =
  "var(--font-instrument-sans), 'Instrument Sans', ui-sans-serif, system-ui, sans-serif";
const fontMono =
  "var(--font-geist-mono), 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const typography: TokenPreset["typography"] = {
  sans: fontSans,
  mono: fontMono,
  display: fontDisplay,
  scale: {
    xs: "0.6875rem",
    sm: "0.8125rem",
    base: "1rem",
    lg: "1.25rem",
    xl: "1.75rem",
    // Noir's H1 moment: 56px at desktop, −0.04em, sentence-case.
    hero: "clamp(2.35rem, 4vw, 3.5rem)"
  },
  lineHeight: {
    tight: 1.05,
    body: 1.55
  }
};

const spacing: TokenPreset["spacing"] = {
  density: "open",
  unit: "1rem",
  control: "3rem",
  // Noir breathes: 80–192px vertical rhythm between sections.
  section: "clamp(5rem, 12vw, 12rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
};

const radii: TokenPreset["radii"] = {
  sm: "4px",
  md: "10px",
  lg: "12px",
  pill: "999px"
};

const motion: TokenPreset["motion"] = {
  duration: "480ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  intensity: 36
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

const registry: TokenPreset["registry"] = {
  item: "@jami-studio/theme/noir",
  version: "0.2.0",
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

// Shared dial intent for the lane (accent = amber family per the locked accent dial).
const noirDials: TokenPreset["dials"] = {
  accent: "amber",
  contrast: 96,
  warmth: 40,
  density: 38,
  radius: 10,
  surfaceDepth: 24,
  motion: 36
};

export const noirDarkPreset: TokenPreset = validateTokenPreset({
  id: "noir-dark",
  name: "Noir — Dark",
  description:
    "Template-true Noir: bone-white type and copper #ed4515 on near-black #1a1a1a, hairline dividers, one inverted white Stats break, colossal closing wordmark.",
  ownership,
  dials: noirDials,
  color: {
    background: "#1a1a1a",
    foreground: "#ffffff",
    muted: "#222222",
    mutedForeground: "#a3a3a3",
    panel: "#161616",
    panelForeground: "#ffffff",
    border: "#313131",
    ring: "#f97c52",
    accent: "#ed4515",
    accentForeground: "#000000"
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#1a1a1a",
    panel: "#161616",
    panelRaised: "#202020",
    overlay: "#161616",
    inverse: "#ffffff"
  },
  elevation: {
    none: "none",
    sm: "0 1px 0 rgb(0 0 0 / 0.45)",
    md: "0 28px 70px rgb(0 0 0 / 0.55)"
  },
  motion,
  logos,
  handles,
  registry
});

export const noirLightPreset: TokenPreset = validateTokenPreset({
  id: "noir-light",
  name: "Noir — Light",
  description:
    "The designed light twin: near-black ink on warm off-white, the same copper accent deepened for AA, the same colossal editorial spine.",
  ownership,
  dials: { ...noirDials, contrast: 88, surfaceDepth: 16 },
  color: {
    background: "#f5f4f1",
    foreground: "#1a1a1a",
    muted: "#eae8e4",
    mutedForeground: "#5d5a56",
    panel: "#fbfaf8",
    panelForeground: "#1a1a1a",
    border: "#dcd9d4",
    ring: "#c93a10",
    accent: "#c93a10",
    accentForeground: "#ffffff"
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#f5f4f1",
    panel: "#fbfaf8",
    panelRaised: "#ffffff",
    overlay: "#fbfaf8",
    inverse: "#1a1a1a"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(26 26 26 / 0.06)",
    md: "0 24px 50px rgb(26 26 26 / 0.12)"
  },
  motion,
  logos,
  handles,
  registry
});

export type ThemeName = "dark" | "light";

export const noirThemes: Record<ThemeName, TokenPreset> = {
  dark: noirDarkPreset,
  light: noirLightPreset
};

export const defaultTheme: ThemeName = "dark";

/** Film-grain opacity for the ONE inverted Stats panel (`--grain-opacity`). */
export const grainOpacity: Record<ThemeName, string> = {
  dark: "0.16",
  light: "0.12"
};

/** Grain blend mode for the Stats panel; multiply reads on the light inverted ground. */
export const grainBlend: Record<ThemeName, string> = {
  dark: "multiply",
  light: "multiply"
};
