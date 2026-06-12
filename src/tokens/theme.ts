import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Noir lane theme presets.
 *
 * Lane A — high-contrast dark agency portfolio. Warm copper (`#a1704f`) accent on a
 * deep, slightly warm near-black canvas. Both a primary dark theme and a full light
 * theme are authored here as concrete `TokenPreset` VALUES (6-digit hex only), validated
 * by `validateTokenPreset` and surfaced through the fixed CSS-var contract in `css-vars.ts`.
 *
 * Type DNA is mapped from the real Noir Framer template:
 *   - Display + body: Instrument Sans (uppercase, tight tracking display moment)
 *   - Labels / numbered section spine (01/02/03): Geist Mono
 * Both faces self-host via `next/font/google` and bind to `--font-display`/`--font-sans`/
 * `--font-mono` in `layout.tsx`.
 *
 * Accent contrast (WCAG AA verified):
 *   - dark:  copper #a1704f fill + #120d09 foreground  → 4.55:1
 *   - light: copper #7d5232 fill + #fdfbf8 foreground  → 6.51:1
 * Accent-as-text on the dark canvas is lightened in `globals.css` via `color-mix`
 * (token-derived, never a literal) so eyebrows/links clear AA on near-black.
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
    xs: "0.75rem",
    sm: "0.8125rem",
    base: "1rem",
    lg: "1.25rem",
    xl: "2rem",
    // Noir's display moment: 48px → 120px, fluid.
    hero: "clamp(3rem, 10vw, 8.25rem)"
  },
  lineHeight: {
    tight: 1.02,
    body: 1.55
  }
};

const spacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  control: "3rem",
  section: "clamp(4.5rem, 10vw, 9rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
};

const radii: TokenPreset["radii"] = {
  // Noir is sharp; a single small radius scale across cards and controls.
  sm: "4px",
  md: "8px",
  lg: "8px",
  pill: "999px"
};

const motion: TokenPreset["motion"] = {
  duration: "420ms",
  durationFast: "180ms",
  easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
  intensity: 32
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

// Shared dial intent for the lane (accent = amber family per the locked accent dial).
const noirDials: TokenPreset["dials"] = {
  accent: "amber",
  contrast: 90,
  warmth: 58,
  density: 52,
  radius: 8,
  surfaceDepth: 30,
  motion: 32
};

export const noirDarkPreset: TokenPreset = validateTokenPreset({
  id: "noir-dark",
  name: "Noir — Dark",
  description:
    "High-contrast dark agency portfolio: warm copper on deep near-black, numbered editorial spine, film-grain canvas.",
  ownership,
  dials: noirDials,
  color: {
    background: "#141210",
    foreground: "#f4efe9",
    muted: "#221e1a",
    mutedForeground: "#b3aaa0",
    panel: "#1b1815",
    panelForeground: "#f4efe9",
    border: "#2c2722",
    ring: "#cf9a74",
    accent: "#a1704f",
    accentForeground: "#120d09"
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#141210",
    panel: "#1b1815",
    panelRaised: "#221d18",
    overlay: "#1b1815",
    inverse: "#f4efe9"
  },
  elevation: {
    none: "none",
    sm: "0 1px 0 rgb(0 0 0 / 0.4)",
    md: "0 24px 60px rgb(0 0 0 / 0.55)"
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
    "The light twin of the Noir dark lane: warm ink on layered off-white neutrals, same copper accent, same numbered spine.",
  ownership,
  dials: { ...noirDials, contrast: 84, surfaceDepth: 22 },
  color: {
    background: "#f4f1ec",
    foreground: "#1a1714",
    muted: "#e7e1d8",
    mutedForeground: "#5f574d",
    panel: "#fbf9f5",
    panelForeground: "#1a1714",
    border: "#ddd5c9",
    ring: "#7d5232",
    accent: "#7d5232",
    accentForeground: "#fdfbf8"
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#f4f1ec",
    panel: "#fbf9f5",
    panelRaised: "#ffffff",
    overlay: "#fbf9f5",
    inverse: "#1a1714"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(26 23 20 / 0.06)",
    md: "0 24px 50px rgb(26 23 20 / 0.12)"
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

/** Per-theme film-grain opacity, exposed as a CSS var (`--grain-opacity`). */
export const grainOpacity: Record<ThemeName, string> = {
  dark: "0.05",
  light: "0.022"
};

/** Per-theme grain blend mode; soft-light on dark, multiply on light. */
export const grainBlend: Record<ThemeName, string> = {
  dark: "soft-light",
  light: "multiply"
};
