import type { ProjectSlug } from "@/content/projects";

/**
 * Presentation-layer art assignment: our generated editorial photography (Grok/Gemini,
 * sculptural objects — no fake humans) from `public/assets/`, mapped to the five projects
 * in content order. The template's five work tiles, in its color order:
 * purple / blue-smoke / blue-satin / amber-trails / blue-plant-on-white.
 */
export const projectArt: Record<ProjectSlug, { src: string; width: number; height: number }> = {
  harness: { src: "/assets/work-1.png", width: 864, height: 1152 },
  registry: { src: "/assets/work-2.png", width: 864, height: 1152 },
  orchestra: { src: "/assets/work-3.png", width: 1024, height: 1024 },
  intercal: { src: "/assets/work-4.png", width: 1152, height: 864 },
  collectiva: { src: "/assets/work-5.png", width: 864, height: 1152 }
};
