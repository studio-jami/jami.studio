/**
 * Branch token preset — design/opus-a · codename "Obsidian Atlas" (Lane A).
 *
 * This file authors the *values* for the design branch. It consumes the shared
 * token schema and CSS-var contract verbatim (`createTokenPresetFromDials`,
 * `tokenCssVariables`) — it does not change the schema, the preset generator, or
 * the var-export shape. The light theme is produced through the foundation
 * generator (it derives light neutrals from `warmth`); the dark theme is an
 * intentional, hand-tuned override expressed over the *same* CSS-var roles so a
 * single `[data-theme]` switch flips the whole system with no extra components.
 */
import { createTokenPresetFromDials } from "@/tokens/presets";
import { tokenCssVariables } from "@/tokens/css-vars";
import type { ThemeDials, TokenPreset } from "@/tokens/schema";

/**
 * Branch dials. Violet accent = "neon through fog" for the nocturnal Lane A
 * canvas. Open density for editorial breathing room, an 8px radius family that
 * keeps cards and controls in lock-step, and a measured motion intensity.
 */
export const branchDials: ThemeDials = {
  accent: "violet",
  contrast: 84,
  warmth: 70,
  density: 60,
  radius: 8,
  surfaceDepth: 58,
  motion: 40
};

/**
 * Branch preset values. The logo/wordmark fields are authored here (branch-owned
 * expression over the shared schema): the brand mark is the official jami.studio
 * character portrait, presented as a circular *frame* avatar, and the favicon
 * points at the generated circular portrait icon (`src/app/icon.png`). The
 * schema's `markShape` enum has no "portrait" member, so we use its nearest
 * member — `frame` — for the contained, ringed avatar.
 */
const generatedPreset = createTokenPresetFromDials(branchDials);

export const branchPreset: TokenPreset = {
  ...generatedPreset,
  logos: {
    markShape: "frame",
    wordmark: "jami.studio",
    favicon: "/icon.png"
  }
};

/**
 * The light theme is the foundation-generated set (warm off-white neutrals +
 * the violet accent), which we then sharpen with a few Lane-B-grade editorial
 * surface roles so the light theme reads as its own considered gallery design,
 * not a flat inversion of the dark canvas.
 */
const generatedLightVars = tokenCssVariables(branchPreset);

/**
 * Warm, paper-leaning light theme. Layered neutrals (canvas / panel / raised)
 * give vertical rhythm; a deepened violet ink keeps AA contrast on the warm
 * ground; hairline borders and a soft ground glow carry the structure.
 */
export const lightThemeVars: Record<string, string> = {
  ...generatedLightVars,
  "--background": "#f4f1ea",
  "--foreground": "#191712",
  "--card": "#fbf9f3",
  "--card-foreground": "#191712",
  "--popover": "#fbf9f3",
  "--popover-foreground": "#191712",
  "--primary": "#5b4fb0",
  "--primary-foreground": "#fbf9ff",
  "--secondary": "#e7e1d4",
  "--secondary-foreground": "#191712",
  "--muted": "#e7e1d4",
  "--muted-foreground": "#5a544a",
  "--accent": "#5b4fb0",
  "--accent-foreground": "#fbf9ff",
  "--border": "#ddd5c6",
  "--input": "#ddd5c6",
  "--ring": "#7466d6",
  "--panel": "#fbf9f3",
  "--panel-foreground": "#191712",
  "--surface-canvas": "#f4f1ea",
  "--surface-panel": "#fbf9f3",
  "--surface-panel-raised": "#ffffff",
  "--surface-overlay": "#fbf9f3",
  "--surface-inverse": "#191712",
  "--shadow-sm": "0 1px 2px rgb(45 38 24 / 0.06)",
  "--shadow-md": "0 24px 60px -28px rgb(45 38 24 / 0.22)",
  // Atmosphere + texture roles (branch-owned expression over the var contract).
  "--accent-strong": "#473d96",
  "--accent-soft": "#7466d6",
  "--on-accent": "#fbf9ff",
  "--hairline": "rgb(45 38 24 / 0.10)",
  "--hairline-strong": "rgb(45 38 24 / 0.16)",
  "--glow-1": "rgb(91 79 176 / 0.10)",
  "--glow-2": "rgb(150 110 40 / 0.08)",
  "--grain-opacity": "0.022",
  "--grain-blend": "multiply",
  "--scrim": "rgb(244 241 234 / 0.78)",
  "--code-bg": "#efeadf",
  "--selection-bg": "rgb(91 79 176 / 0.18)"
};

/**
 * Nocturnal dark theme. Warm charcoal canvas (never pure #000) so the grain has
 * tooth to sit on; barely-lifted panels separated by hairlines and glow rather
 * than heavy shadow; a luminous violet that reads like neon through fog. All
 * roles map onto the exact same CSS-var contract as the light theme.
 */
export const darkThemeVars: Record<string, string> = {
  "--background": "#0b0b0f",
  "--foreground": "#f1eff7",
  "--card": "#131319",
  "--card-foreground": "#f1eff7",
  "--popover": "#16161d",
  "--popover-foreground": "#f1eff7",
  "--primary": "#a99bf2",
  "--primary-foreground": "#0b0b0f",
  "--secondary": "#1c1c24",
  "--secondary-foreground": "#f1eff7",
  "--muted": "#1a1a21",
  "--muted-foreground": "#a09bb0",
  "--accent": "#a99bf2",
  "--accent-foreground": "#0b0b0f",
  "--border": "#26252f",
  "--input": "#26252f",
  "--ring": "#b3a6ff",
  "--panel": "#131319",
  "--panel-foreground": "#f1eff7",
  "--surface-canvas": "#0b0b0f",
  "--surface-panel": "#131319",
  "--surface-panel-raised": "#1a1a22",
  "--surface-overlay": "#16161d",
  "--surface-inverse": "#f1eff7",
  "--shadow-sm": "0 1px 2px rgb(0 0 0 / 0.5)",
  "--shadow-md": "0 32px 80px -32px rgb(0 0 0 / 0.7)",
  "--accent-strong": "#c3b8ff",
  "--accent-soft": "#8b7be8",
  "--on-accent": "#0b0b0f",
  "--hairline": "rgb(255 255 255 / 0.07)",
  "--hairline-strong": "rgb(255 255 255 / 0.14)",
  "--glow-1": "rgb(124 102 232 / 0.20)",
  "--glow-2": "rgb(40 60 120 / 0.16)",
  "--grain-opacity": "0.06",
  "--grain-blend": "soft-light",
  "--scrim": "rgb(11 11 15 / 0.72)",
  "--code-bg": "#16161d",
  "--selection-bg": "rgb(124 102 232 / 0.34)"
};

/**
 * Theme-independent vars (type, spacing, radii, motion) come straight from the
 * generated preset. Authored once on :root; themes only swap color/surface
 * roles. We strip color roles the themes own so there is a single source.
 */
const themeOwnedKeys = new Set(Object.keys(darkThemeVars));

const baseRootVars: Record<string, string> = Object.fromEntries(
  Object.entries(generatedLightVars).filter(([key]) => !themeOwnedKeys.has(key))
);

/**
 * Re-point the font stacks at the Next-optimized variable webfonts (loaded in
 * the layout via next/font), keeping the schema's families as graceful
 * fallbacks. This consumes the var contract; it does not change the schema.
 */
export const rootVars: Record<string, string> = {
  ...baseRootVars,
  "--font-sans": "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
  "--font-display":
    "var(--font-inter-tight), Inter Tight, Inter, ui-sans-serif, system-ui, sans-serif",
  "--font-mono":
    "var(--font-jetbrains), JetBrains Mono, ui-monospace, SFMono-Regular, Consolas, monospace"
};

function serialize(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

/**
 * Emits the full theme stylesheet: shared roots, then dark/light role overrides
 * bound to `[data-theme]`. Dark is the default ground (Lane A); the resolved
 * theme is set on <html> by the no-flash inline script before paint.
 */
export function themeStylesheet(): string {
  return `:root {
${serialize(rootVars)}
}

:root,
:root[data-theme="dark"] {
${serialize(darkThemeVars)}
}

:root[data-theme="light"] {
${serialize(lightThemeVars)}
}`;
}
