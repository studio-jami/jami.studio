import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * Hero — the owner-grade opening moment. Oversized uppercase display title over deep
 * near-black, copper accent, the numbered editorial spine introduced by a "00 / Index"
 * marker. The five products tick along a quiet rail beneath the statement (real names from
 * the content layer — no fabricated imagery or metrics).
 */
export function Hero() {
  const { eyebrow, title, lead, primaryCta, secondaryCta } = site.home;

  return (
    <header className="hero">
      <Container className="hero-inner">
        <p className="eyebrow hero-eyebrow">
          <span className="section-number" aria-hidden="true">
            00
          </span>
          <span>{eyebrow}</span>
        </p>

        <h1 className="hero-title">
          {title}
          <span className="hero-mark" aria-hidden="true">
            ®
          </span>
        </h1>

        <p className="hero-lead">{lead}</p>

        <div className="hero-actions">
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary">
            {secondaryCta.label}
          </Button>
        </div>

        <div className="hero-rail" aria-label="Studio project family">
          {projects.map((project, i) => (
            <span className="hero-rail-item" key={project.slug}>
              <span className="hero-rail-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              {project.shortName}
            </span>
          ))}
        </div>
      </Container>
    </header>
  );
}
