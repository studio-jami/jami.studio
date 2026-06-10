/**
 * Atelier theme — design/opus-b
 *
 * Lane B: clean, fresh, light editorial gallery minimalism.
 *
 * This module authors the BRANCH-OWNED preset values through the shared,
 * foundation-owned token schema (`createTokenPresetFromDials`) — it does not
 * change the schema or the CSS-variable export contract. It then layers a
 * fully considered dark theme (its own surface ramp, not a flat inversion)
 * over the same `--*` variables emitted by `tokenCssVariables`.
 *
 * Everything downstream consumes the CSS variables only; no component reads
 * raw hex.
 */
import { tokenCssVariables } from "./css-vars";
import { createTokenPresetFromDials } from "./presets";
import type { ThemeDials } from "./schema";

/**
 * Atelier dials. Violet accent reads ink-adjacent and gallery-premium rather
 * than "tech". Comfortable density, small sharp radii, restrained motion.
 */
export const atelierDials: ThemeDials = {
  accent: "violet",
  contrast: 88,
  warmth: 72,
  density: 52,
  radius: 6,
  surfaceDepth: 30,
  motion: 30
};

/** The active site preset, generated through the shared schema machinery. */
export const atelierPreset = createTokenPresetFromDials(atelierDials);

/**
 * Editorial type stacks. The CSS-variable names below are populated by
 * `next/font` (see `app/layout.tsx`); we keep robust system fallbacks so the
 * site never depends on a network font fetch to look correct.
 */
const FONT_DISPLAY =
  "var(--font-display-face), 'Geist', 'Inter Tight', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const FONT_SANS =
  "var(--font-sans-face), 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const FONT_MONO =
  "var(--font-mono-face), 'JetBrains Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', Consolas, monospace";

/**
 * Brand-authored, editorial type scale. Stays on the foundation roles
 * (`xs/sm/base/lg/xl/hero`) — we only change the *values* the branch owns.
 */
const atelierType = {
  "--font-display": FONT_DISPLAY,
  "--font-sans": FONT_SANS,
  "--font-mono": FONT_MONO,
  "--text-xs": "0.75rem",
  "--text-sm": "0.875rem",
  "--text-base": "1.0625rem",
  "--text-lg": "1.25rem",
  "--text-xl": "clamp(1.75rem, 3vw, 2.6rem)",
  "--text-hero": "clamp(2.85rem, 8.5vw, 7rem)",
  "--line-tight": "1.02",
  "--line-body": "1.6"
} as const;

/**
 * Shared, theme-independent geometry/motion. One spacing rhythm, one radius
 * scale, one motion vocabulary for every component.
 */
const atelierShared = {
  "--container": "min(1180px, calc(100vw - 2.5rem))",
  "--container-wide": "min(1340px, calc(100vw - 2.5rem))",
  "--section": "clamp(4.5rem, 9vw, 8.5rem)",
  "--gutter": "clamp(1.25rem, 4vw, 2.5rem)",
  "--radius-sm": "4px",
  "--radius-md": "8px",
  "--radius-lg": "14px",
  "--radius-pill": "999px",
  "--motion-duration": "420ms",
  "--motion-duration-fast": "200ms",
  "--motion-easing": "cubic-bezier(.21,.78,.27,1)",
  "--ring-width": "2px"
} as const;

/**
 * LIGHT theme — warm gallery off-white. Layered paper neutrals for rhythm,
 * near-black ink, hairline rules, a single restrained violet accent.
 */
const lightTheme: Record<string, string> = {
  "--background": "#f6f4ee",
  "--surface-canvas": "#f6f4ee",
  "--surface-sunken": "#efece3",
  "--foreground": "#16140f",
  "--foreground-strong": "#0c0b08",
  "--muted": "#ebe7dc",
  "--muted-foreground": "#5b564a",
  "--subtle-foreground": "#7a7464",
  "--card": "#fffefb",
  "--card-foreground": "#16140f",
  "--panel": "#fffefb",
  "--panel-foreground": "#16140f",
  "--surface-panel": "#fffefb",
  "--surface-panel-raised": "#ffffff",
  "--surface-overlay": "#fffefb",
  "--surface-inverse": "#16140f",
  "--surface-inverse-foreground": "#f6f4ee",
  "--popover": "#fffefb",
  "--popover-foreground": "#16140f",
  "--secondary": "#ebe7dc",
  "--secondary-foreground": "#16140f",
  "--border": "#ddd7c8",
  "--border-strong": "#c7c0ad",
  "--hairline": "#cfc8b7",
  "--input": "#ddd7c8",
  "--primary": "#5b46c9",
  "--primary-foreground": "#fbfaff",
  "--accent": "#5b46c9",
  "--accent-foreground": "#fbfaff",
  "--accent-soft": "rgba(91, 70, 201, 0.10)",
  "--accent-line": "rgba(91, 70, 201, 0.28)",
  "--ring": "#5b46c9",
  "--shadow-sm": "0 1px 2px rgba(22, 20, 15, 0.05), 0 1px 1px rgba(22, 20, 15, 0.04)",
  "--shadow-md": "0 18px 50px -28px rgba(22, 20, 15, 0.30), 0 2px 8px -4px rgba(22, 20, 15, 0.12)",
  "--shadow-lg": "0 40px 90px -50px rgba(22, 20, 15, 0.42)",
  "--grain-opacity": "0.022",
  "--grain-blend": "multiply",
  "--glow-1": "rgba(91, 70, 201, 0.10)",
  "--glow-2": "rgba(196, 154, 92, 0.10)"
};

/**
 * DARK theme — a considered "gallery at night": deep warm charcoal with its
 * own surface ramp, slightly lifted violet accent for legibility, fine grain
 * doing the separation work. Deliberately NOT an inversion of the light theme.
 */
const darkTheme: Record<string, string> = {
  "--background": "#100f0d",
  "--surface-canvas": "#100f0d",
  "--surface-sunken": "#0b0a09",
  "--foreground": "#eee9df",
  "--foreground-strong": "#fbf8f1",
  "--muted": "#1c1a17",
  "--muted-foreground": "#a39c8d",
  "--subtle-foreground": "#7e7768",
  "--card": "#17151210",
  "--card-foreground": "#eee9df",
  "--panel": "#19171300",
  "--panel-foreground": "#eee9df",
  "--surface-panel": "#1a1815",
  "--surface-panel-raised": "#211e1a",
  "--surface-overlay": "#1a1815",
  "--surface-inverse": "#f6f4ee",
  "--surface-inverse-foreground": "#100f0d",
  "--popover": "#1a1815",
  "--popover-foreground": "#eee9df",
  "--secondary": "#1c1a17",
  "--secondary-foreground": "#eee9df",
  "--border": "#2c2924",
  "--border-strong": "#3b372f",
  "--hairline": "#2a2722",
  "--input": "#2c2924",
  "--primary": "#a99bf0",
  "--primary-foreground": "#15121f",
  "--accent": "#a99bf0",
  "--accent-foreground": "#15121f",
  "--accent-soft": "rgba(169, 155, 240, 0.12)",
  "--accent-line": "rgba(169, 155, 240, 0.30)",
  "--ring": "#a99bf0",
  "--shadow-sm": "0 1px 2px rgba(0, 0, 0, 0.5)",
  "--shadow-md": "0 30px 70px -40px rgba(0, 0, 0, 0.8), 0 4px 14px -6px rgba(0, 0, 0, 0.55)",
  "--shadow-lg": "0 60px 130px -60px rgba(0, 0, 0, 0.9)",
  "--grain-opacity": "0.05",
  "--grain-blend": "soft-light",
  "--glow-1": "rgba(120, 102, 224, 0.16)",
  "--glow-2": "rgba(176, 138, 84, 0.10)"
};

function toCssBlock(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

/**
 * Build the full :root + [data-theme] CSS. We start from the foundation's
 * generated variables (so every schema-derived role exists) and override the
 * branch-owned color/surface/type/geometry values for each theme.
 */
export function atelierThemeCss(): string {
  const generated = tokenCssVariables(atelierPreset);
  const base = { ...generated, ...atelierType, ...atelierShared };

  const lightVars = { ...base, ...lightTheme };
  const darkVars = { ...base, ...darkTheme };

  return [
    `:root,\n[data-theme="light"] {\n${toCssBlock(lightVars)}\n  color-scheme: light;\n}`,
    `[data-theme="dark"] {\n${toCssBlock(darkVars)}\n  color-scheme: dark;\n}`
  ].join("\n\n");
}

/** Inline script that sets the theme before paint to avoid a flash. */
export const themeBootstrapScript = `(function(){try{var s=localStorage.getItem("atelier-theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(m?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export const THEME_STORAGE_KEY = "atelier-theme";
