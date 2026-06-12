import { validateThemeDials, validateTokenPreset } from "./schema";
import type { ThemeDials, TokenPreset } from "./schema";

/**
 * Message AI lane — aesthetic Lane A (cinematic dark, prime).
 *
 * Accent is authored once as `color.accent` (#175d5e deep teal) and surfaced
 * only through `--accent`/`--primary` by `tokenCssVariables()`. Never a literal
 * in a component. Two full presets ship: a nocturnal dark (the prime) and a
 * matched warm-cool light. Both are validated by `validateTokenPreset`.
 *
 * Type system translated from the real Message AI Framer template:
 *   display/headings → Host Grotesk · body → DM Sans · mono labels → JetBrains Mono.
 * Font CSS variables are injected by `next/font` in layout.tsx; the stacks below
 * reference those variables with robust system fallbacks.
 */

const fontDisplay =
  "var(--font-host-grotesk), 'Host Grotesk', ui-sans-serif, system-ui, sans-serif";
const fontSans = "var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, sans-serif";
const fontMono =
  "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace";

const dialsBase: ThemeDials = validateThemeDials({
  accent: "cyan",
  contrast: 84,
  warmth: 28,
  density: 50,
  radius: 14,
  surfaceDepth: 58,
  motion: 40
});

// Shared, theme-independent token roles. The deep-teal accent is the brand
// constant; only neutrals/surfaces diverge between dark and light.
const accent = "#175d5e"; // deep teal — the single brand accent
const accentForegroundDark = "#eafaf7"; // near-white teal-tinted ink for fills on dark
const accentForegroundLight = "#f4fffb"; // ink on the accent fill in light theme
const ringDark = "#3aa394"; // brighter teal so focus stays visible on dark
const ringLight = "#16726b"; // teal that holds AA contrast on light surfaces

const typographyScale: TokenPreset["typography"]["scale"] = {
  xs: "0.78rem",
  sm: "0.875rem",
  base: "1.0625rem",
  lg: "1.25rem",
  xl: "clamp(1.85rem, 3.4vw, 2.35rem)",
  hero: "clamp(2.75rem, 8.4vw, 6.5rem)"
};

const spacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  control: "3rem",
  section: "clamp(4.5rem, 9vw, 8.5rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
};

const radii: TokenPreset["radii"] = {
  sm: "8px",
  md: "14px",
  lg: "22px",
  pill: "999px"
};

const motion: TokenPreset["motion"] = {
  duration: "440ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  intensity: 40
};

const logos: TokenPreset["logos"] = {
  markShape: "dot",
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
  item: "@jami-studio/theme/message-ai",
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

function buildPreset(input: {
  id: string;
  name: string;
  description: string;
  dials: ThemeDials;
  color: TokenPreset["color"];
  surface: TokenPreset["surface"];
  elevation: TokenPreset["elevation"];
}): TokenPreset {
  return validateTokenPreset({
    id: input.id,
    name: input.name,
    description: input.description,
    ownership,
    dials: input.dials,
    color: input.color,
    typography: {
      sans: fontSans,
      mono: fontMono,
      display: fontDisplay,
      scale: typographyScale,
      lineHeight: {
        tight: 1.02,
        body: 1.6
      }
    },
    spacing,
    radii,
    surface: input.surface,
    elevation: input.elevation,
    motion,
    logos,
    handles,
    registry
  });
}

/**
 * Dark — the prime. A warm-cool charcoal canvas (not #000) so film grain and
 * the layered teal glow have something to sit on. Panels are barely lifted with
 * hairline borders; foreground is a slightly cool near-white.
 */
export const messageAiDarkPreset: TokenPreset = buildPreset({
  id: "message-ai-dark",
  name: "Message AI — Nocturne",
  description:
    "Cinematic dark preset for the Message AI lane: charcoal canvas, hairline borders, deep-teal accent surfaced as neon through fog.",
  dials: dialsBase,
  color: {
    background: "#0a0b0d",
    foreground: "#f3f6f5",
    muted: "#15181b",
    mutedForeground: "#9aa4a3",
    panel: "#101316",
    panelForeground: "#f3f6f5",
    border: "#262b2e",
    ring: ringDark,
    accent,
    accentForeground: accentForegroundDark
  },
  surface: {
    canvas: "#0a0b0d",
    panel: "#101316",
    panelRaised: "#161a1e",
    overlay: "#1b2024",
    inverse: "#f3f6f5"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.45)",
    md: "0 28px 70px rgb(0 0 0 / 0.55)"
  }
});

/**
 * Light — a matched warm-cool off-white. Not the dark theme inverted: its own
 * neutral rhythm, layered panels, and a teal that holds AA on paper. Grain drops
 * to a whisper (wired via --grain-opacity in globals.css).
 */
export const messageAiLightPreset: TokenPreset = buildPreset({
  id: "message-ai-light",
  name: "Message AI — Daybreak",
  description:
    "Matched light preset for the Message AI lane: warm-cool off-white canvas, layered neutrals, deep-teal accent held to AA on paper.",
  dials: validateThemeDials({ ...dialsBase, contrast: 78, surfaceDepth: 30 }),
  color: {
    background: "#f4f5f3",
    foreground: "#121513",
    muted: "#e7e9e5",
    mutedForeground: "#586160",
    panel: "#ffffff",
    panelForeground: "#121513",
    border: "#d7dbd6",
    ring: ringLight,
    accent: "#175d5e",
    accentForeground: accentForegroundLight
  },
  surface: {
    canvas: "#f4f5f3",
    panel: "#ffffff",
    panelRaised: "#fbfcfa",
    overlay: "#ffffff",
    inverse: "#121513"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(18 21 19 / 0.06)",
    md: "0 24px 60px rgb(18 21 19 / 0.12)"
  }
});

export const messageAiThemes = {
  dark: messageAiDarkPreset,
  light: messageAiLightPreset
} as const;

export type ThemeName = keyof typeof messageAiThemes;

/** Default theme rendered server-side before the client no-flash script runs. */
export const defaultThemeName: ThemeName = "dark";

/** Per-theme grain overlay tuning, consumed by globals.css via --grain-* vars. */
export const grainSettings: Record<ThemeName, { opacity: string; blendMode: string }> = {
  dark: { opacity: "0.05", blendMode: "soft-light" },
  light: { opacity: "0.022", blendMode: "multiply" }
};
