import { tokenCssVariables } from "@/tokens/css-vars";
import {
  defaultTheme,
  grainBlend,
  grainOpacity,
  kirimoThemes,
  type ThemeName
} from "@/tokens/theme";

/**
 * Lane-local helper (not a frozen contract): renders the two Kirimo theme presets
 * into a single CSS string with `:root` holding the default (dark) theme and
 * `[data-theme="..."]` blocks overriding per theme. Both blocks emit the exact
 * variable names from `tokenCssVariables()` plus the lane-only `--grain-*` vars.
 */
function blockFor(theme: ThemeName): string {
  const vars = {
    ...tokenCssVariables(kirimoThemes[theme]),
    "--grain-opacity": grainOpacity[theme],
    "--grain-blend": grainBlend[theme]
  };

  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

export function themeCss(): string {
  const root = blockFor(defaultTheme);
  const dark = blockFor("dark");
  const light = blockFor("light");

  return [
    `:root {\n${root}\n  color-scheme: dark;\n}`,
    `[data-theme="dark"] {\n${dark}\n  color-scheme: dark;\n}`,
    `[data-theme="light"] {\n${light}\n  color-scheme: light;\n}`
  ].join("\n\n");
}

/**
 * Inline, render-blocking script that resolves the stored/system theme before
 * first paint so there is no flash of the wrong theme. Stays tiny and dependency
 * free; the source of truth afterwards is the `<html data-theme>` attribute.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('jami-theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;var t=s==='light'||s==='dark'?s:(m?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export const THEME_STORAGE_KEY = "jami-theme";
