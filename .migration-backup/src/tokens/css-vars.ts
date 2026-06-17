import type { TokenPreset } from "./schema";

export function tokenCssVariables(preset: TokenPreset): Record<string, string> {
  return {
    "--background": preset.color.background,
    "--foreground": preset.color.foreground,
    "--card": preset.surface.panel,
    "--card-foreground": preset.color.panelForeground,
    "--popover": preset.surface.overlay,
    "--popover-foreground": preset.color.panelForeground,
    "--primary": preset.color.accent,
    "--primary-foreground": preset.color.accentForeground,
    "--secondary": preset.color.muted,
    "--secondary-foreground": preset.color.foreground,
    "--muted": preset.color.muted,
    "--muted-foreground": preset.color.mutedForeground,
    "--accent": preset.color.accent,
    "--accent-foreground": preset.color.accentForeground,
    "--border": preset.color.border,
    "--input": preset.color.border,
    "--ring": preset.color.ring,
    "--panel": preset.color.panel,
    "--panel-foreground": preset.color.panelForeground,
    "--surface-canvas": preset.surface.canvas,
    "--surface-panel": preset.surface.panel,
    "--surface-panel-raised": preset.surface.panelRaised,
    "--surface-overlay": preset.surface.overlay,
    "--surface-inverse": preset.surface.inverse,
    "--shadow-sm": preset.elevation.sm,
    "--shadow-md": preset.elevation.md,
    "--font-sans": preset.typography.sans,
    "--font-mono": preset.typography.mono,
    "--font-display": preset.typography.display,
    "--text-xs": preset.typography.scale.xs,
    "--text-sm": preset.typography.scale.sm,
    "--text-base": preset.typography.scale.base,
    "--text-lg": preset.typography.scale.lg,
    "--text-xl": preset.typography.scale.xl,
    "--text-hero": preset.typography.scale.hero,
    "--line-tight": String(preset.typography.lineHeight.tight),
    "--line-body": String(preset.typography.lineHeight.body),
    "--container": preset.spacing.container,
    "--section": preset.spacing.section,
    "--spacing-unit": preset.spacing.unit,
    "--control-height": preset.spacing.control,
    "--radius-sm": preset.radii.sm,
    "--radius-md": preset.radii.md,
    "--radius-lg": preset.radii.lg,
    "--radius-pill": preset.radii.pill,
    "--motion-duration": preset.motion.duration,
    "--motion-duration-fast": preset.motion.durationFast,
    "--motion-easing": preset.motion.easing
  };
}

export function inlineCssVariables(preset: TokenPreset): string {
  return Object.entries(tokenCssVariables(preset))
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}
