import { Atmosphere } from "@/components/atmosphere/atmosphere";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { StudioProject } from "@/content/projects";

/**
 * "Project Title" — the rich detail hero. Mono index + project badge, the name as
 * a display moment, the summary as a lead, the resolved CTAs (hrefs always from the
 * content/route layer), over the wine-rose atmosphere.
 */
export function DetailHero({ project, index }: { project: StudioProject; index: number }) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <section className="detail-hero" aria-labelledby="detail-title">
      <Atmosphere variant="hero" />
      <Container width="wide">
        <div className="detail-hero-inner">
          <div className="detail-hero-meta">
            <span className="detail-hero-index">{ordinal}</span>
            <Badge tone="accent">{project.shortName}</Badge>
            <span className="detail-hero-subdomain">{project.subdomain}</span>
          </div>

          <h1 id="detail-title" className="detail-hero-title">
            {project.name}
          </h1>
          <p className="detail-hero-summary">{project.summary}</p>

          <div className="detail-hero-actions">
            {project.ctas.map((cta, ctaIndex) => (
              <ButtonLink
                key={cta.href}
                href={cta.href}
                variant={ctaIndex === 0 ? "primary" : "ghost"}
                size="lg"
              >
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
