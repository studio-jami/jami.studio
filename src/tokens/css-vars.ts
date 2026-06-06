import type { TokenPreset } from "./schema";

export function tokenCssVariables(preset: TokenPreset): Record<string, string> {
  return {
    "--background": preset.color.background,
    "--foreground": preset.color.foreground,
    "--muted": preset.color.muted,
    "--panel": preset.color.panel,
    "--border": preset.color.border,
    "--accent": preset.color.accent,
    "--accent-foreground": preset.color.accentForeground,
    "--font-sans": preset.typography.sans,
    "--font-mono": preset.typography.mono,
    "--font-display": preset.typography.display,
    "--container": preset.spacing.container,
    "--section": preset.spacing.section,
    "--radius-sm": preset.radii.sm,
    "--radius-md": preset.radii.md,
    "--radius-lg": preset.radii.lg,
    "--motion-duration": preset.motion.duration,
    "--motion-easing": preset.motion.easing
  };
}

export function inlineCssVariables(preset: TokenPreset): string {
  return Object.entries(tokenCssVariables(preset))
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}
