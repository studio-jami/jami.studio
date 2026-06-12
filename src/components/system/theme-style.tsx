import { tokenCssVariables } from "@/tokens/css-vars";
import { defaultThemeName, grainSettings, messageAiThemes } from "@/tokens/theme";
import type { ThemeName } from "@/tokens/theme";

function declarationBlock(theme: ThemeName): string {
  const vars = tokenCssVariables(messageAiThemes[theme]);
  const grain = grainSettings[theme];
  const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`);
  lines.push(`  --grain-opacity: ${grain.opacity};`);
  lines.push(`  --grain-blend: ${grain.blendMode};`);
  lines.push(`  color-scheme: ${theme};`);
  return lines.join("\n");
}

/**
 * Emits the full CSS-var contract for both themes. The default theme is also
 * written to :root so server HTML is styled before the no-flash script runs;
 * `[data-theme="…"]` blocks let the toggle switch instantly over the same vars.
 */
export function ThemeStyle() {
  const css = `:root {
${declarationBlock(defaultThemeName)}
}
[data-theme="dark"] {
${declarationBlock("dark")}
}
[data-theme="light"] {
${declarationBlock("light")}
}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
