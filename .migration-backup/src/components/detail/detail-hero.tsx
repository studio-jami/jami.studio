import type { StudioProject } from "@/content/projects";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Kirimo "Project Title" hero: numbered terra-cotta eyebrow, oversized
 * uppercase project name, summary lead on the editorial measure, then the
 * project's real CTAs (first as the filled pill, the rest as circle-arrow
 * text links).
 */
export function DetailHero({ project, index }: { project: StudioProject; index: number }) {
  return (
    <header className="detail-hero">
      <Eyebrow>{`${String(index + 1).padStart(2, "0")} / Project`}</Eyebrow>
      <h1 className="detail-hero__title">{project.name}</h1>
      <p className="detail-hero__summary">{project.summary}</p>
      <div className="detail-hero__ctas">
        {project.ctas.map((cta, ctaIndex) => (
          <Button key={cta.label} href={cta.href} variant={ctaIndex === 0 ? "primary" : "text"}>
            {cta.label}
          </Button>
        ))}
      </div>
    </header>
  );
}
