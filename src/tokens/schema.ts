import { z } from "zod";

export const themeDialSchema = z.object({
  accent: z.enum(["cyan", "green", "amber", "rose", "violet"]),
  contrast: z.number().min(0).max(100),
  warmth: z.number().min(0).max(100),
  density: z.number().min(0).max(100),
  radius: z.number().min(0).max(24),
  surfaceDepth: z.number().min(0).max(100),
  motion: z.number().min(0).max(100)
});

export const tokenPresetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  dials: themeDialSchema,
  color: z.object({
    background: z.string().min(1),
    foreground: z.string().min(1),
    muted: z.string().min(1),
    panel: z.string().min(1),
    border: z.string().min(1),
    accent: z.string().min(1),
    accentForeground: z.string().min(1)
  }),
  typography: z.object({
    sans: z.string().min(1),
    mono: z.string().min(1),
    display: z.string().min(1)
  }),
  spacing: z.object({
    density: z.enum(["compact", "comfortable", "open"]),
    section: z.string().min(1),
    container: z.string().min(1)
  }),
  radii: z.object({
    sm: z.string().min(1),
    md: z.string().min(1),
    lg: z.string().min(1)
  }),
  motion: z.object({
    duration: z.string().min(1),
    easing: z.string().min(1)
  }),
  handles: z.object({
    github: z.string().min(1),
    npm: z.string().min(1)
  }),
  registry: z.object({
    item: z.string().min(1),
    version: z.string().min(1),
    candidate: z.boolean()
  })
});

export type ThemeDials = z.infer<typeof themeDialSchema>;
export type TokenPreset = z.infer<typeof tokenPresetSchema>;

export function validateTokenPreset(preset: TokenPreset): TokenPreset {
  return tokenPresetSchema.parse(preset);
}
