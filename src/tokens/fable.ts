import { validateTokenPreset, validateThemeDials, type TokenPreset } from "./schema";

/**
 * ASH & IRIS — the design/fable branch preset pair.
 *
 * Lane A: dark, grainy, cinematic ("the atelier at night") as the primary
 * character, with a fully designed light counterpart ("the print proof") —
 * warm gallery paper and ink rather than an inverted dark theme.
 *
 * Both presets are authored through the shared foundation schema. The schema,
 * validation, CSS-variable export, and registry metadata stay foundation-owned;
 * only the values below are branch-owned.
 */

const sharedTypography: TokenPreset["typography"] = {
  sans: 'var(--font-hanken), "Helvetica Neue", ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-jbmono), ui-monospace, "Cascadia Code", Consolas, monospace',
  display: 'var(--font-fraunces), "Iowan Old Style", Georgia, serif',
  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)",
    xl: "clamp(1.875rem, 1.3rem + 2.5vw, 3.25rem)",
    hero: "clamp(3rem, 1.8rem + 6.5vw, 6.75rem)"
  },
  lineHeight: {
    tight: 0.98,
    body: 1.62
  }
};

const sharedSpacing: TokenPreset["spacing"] = {
  density: "open",
  unit: "1.25rem",
  control: "3rem",
  section: "clamp(5.5rem, 4rem + 6vw, 10rem)",
  container: "min(1200px, 100vw - clamp(2.5rem, 8vw, 6rem))"
};

const sharedRadii: TokenPreset["radii"] = {
  sm: "6px",
  md: "10px",
  lg: "16px",
  pill: "999px"
};

const sharedMotion: TokenPreset["motion"] = {
  duration: "640ms",
  durationFast: "160ms",
  easing: "cubic-bezier(0.22, 0.61, 0.21, 1)",
  intensity: 30
};

/**
 * The official brand mark is the illustrated studio portrait (round glasses,
 * soft waves, ribbon-bow choker) above a lowercase wordmark. The portrait is
 * presented as a circular cameo — the schema's closest mark shape is
 * "monogram" (one identifying mark). Source variants: `public/brand/`.
 */
const sharedLogos: TokenPreset["logos"] = {
  markShape: "monogram",
  wordmark: "jami.studio",
  favicon: "/icon.png"
};

const sharedHandles: TokenPreset["handles"] = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@jami_studio"
};

const sharedOwnership: TokenPreset["ownership"] = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: [
    "dials",
    "colorValues",
    "typographyValues",
    "surfaceTreatment",
    "componentExpression"
  ]
};

const branchMutable = [
  "dials",
  "color",
  "typography",
  "spacing",
  "radii",
  "surface",
  "elevation",
  "motion"
];

export const fableDarkDials = validateThemeDials({
  accent: "violet",
  contrast: 86,
  warmth: 38,
  density: 70,
  radius: 10,
  surfaceDepth: 58,
  motion: 30
});

export const fableLightDials = validateThemeDials({
  accent: "violet",
  contrast: 82,
  warmth: 72,
  density: 70,
  radius: 10,
  surfaceDepth: 34,
  motion: 30
});

/** The atelier at night: ash-violet charcoal, warm bone foreground, heliotrope accent. */
export const fableDarkPreset = validateTokenPreset({
  id: "fable-ash-iris-dark",
  name: "Ash & Iris — Night",
  description:
    "Cinematic dark theme for the design/fable branch: ash charcoal canvas, film grain, warm bone type, and a heliotrope accent used like neon through fog.",
  ownership: sharedOwnership,
  dials: fableDarkDials,
  color: {
    background: "#100f15",
    foreground: "#ece9e1",
    muted: "#1c1a23",
    mutedForeground: "#a8a3b0",
    panel: "#16151d",
    panelForeground: "#ece9e1",
    border: "#282533",
    ring: "#b9a7f2",
    accent: "#ab91f2",
    accentForeground: "#170f24"
  },
  typography: sharedTypography,
  spacing: sharedSpacing,
  radii: sharedRadii,
  surface: {
    canvas: "#100f15",
    panel: "#16151d",
    panelRaised: "#1b1925",
    overlay: "#201d2b",
    inverse: "#ece9e1"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(4 3 8 / 0.5)",
    md: "0 32px 64px -28px rgb(4 3 8 / 0.66)"
  },
  motion: sharedMotion,
  logos: sharedLogos,
  handles: sharedHandles,
  registry: {
    item: "@jami-studio/theme/fable-ash-iris-dark",
    version: "1.0.0",
    candidate: true,
    exports: ["themePreset", "themeDials", "cssVariables", "registryManifest"],
    branchMutable
  }
});

/** The print proof: warm gallery paper, soft ink, deep iris accent. */
export const fableLightPreset = validateTokenPreset({
  id: "fable-ash-iris-light",
  name: "Ash & Iris — Print",
  description:
    "Editorial light theme for the design/fable branch: warm paper canvas, faint tooth, ink foreground, and a deep iris accent reserved for interaction.",
  ownership: sharedOwnership,
  dials: fableLightDials,
  color: {
    background: "#f4f1e9",
    foreground: "#1e1b16",
    muted: "#e9e4d7",
    mutedForeground: "#5c574c",
    panel: "#fbf9f3",
    panelForeground: "#1e1b16",
    border: "#ddd6c6",
    ring: "#6c55cf",
    accent: "#5b46b4",
    accentForeground: "#f8f5ff"
  },
  typography: sharedTypography,
  spacing: sharedSpacing,
  radii: sharedRadii,
  surface: {
    canvas: "#f4f1e9",
    panel: "#fbf9f3",
    panelRaised: "#ffffff",
    overlay: "#fffefa",
    inverse: "#1e1b16"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(30 27 22 / 0.07)",
    md: "0 28px 56px -24px rgb(30 27 22 / 0.16)"
  },
  motion: sharedMotion,
  logos: sharedLogos,
  handles: sharedHandles,
  registry: {
    item: "@jami-studio/theme/fable-ash-iris-light",
    version: "1.0.0",
    candidate: true,
    exports: ["themePreset", "themeDials", "cssVariables", "registryManifest"],
    branchMutable
  }
});
