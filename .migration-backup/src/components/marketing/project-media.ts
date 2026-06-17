import type { ProjectSlug } from "@/content/projects";

/**
 * Lane-local mapping from project slug to OUR generated editorial photography
 * (sand/terracotta chiaroscuro series, `public/assets/`). These are original
 * images generated for this rebuild — never template assets.
 */
export const projectSlideImage: Record<ProjectSlug, string> = {
  harness: "/assets/slide-1.png",
  registry: "/assets/slide-2.png",
  orchestra: "/assets/slide-3.png",
  intercal: "/assets/slide-4.png",
  collectiva: "/assets/slide-5.png"
};

/**
 * The "Our Project" immersive grid mixes the three showcase frames with crops
 * of two slides so the grid reads differently from the slider.
 */
export const projectGridImage: Record<ProjectSlug, string> = {
  harness: "/assets/showcase-1.png",
  registry: "/assets/showcase-2.png",
  orchestra: "/assets/slide-3.png",
  intercal: "/assets/showcase-3.png",
  collectiva: "/assets/slide-5.png"
};

export const aboutImage = "/assets/about.png";
