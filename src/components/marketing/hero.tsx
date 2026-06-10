import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * The owner-grade moment: oversized display title over atmosphere, one decisive
 * primary CTA and a quiet secondary. A live family ticker grounds the claim in
 * the actual products. All copy comes from `site.home`.
 */
export function Hero() {
  const { eyebrow, lead, primaryCta, secondaryCta } = site.home;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-inner">
          <Eyebrow className="hero-eyebrow">{eyebrow}</Eyebrow>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line">Foundations for</span>
            <span className="hero-title-line hero-title-accent">agent-native</span>
            <span className="hero-title-line">products.</span>
          </h1>
          <p className="hero-lead">{lead}</p>
          <div className="hero-actions">
            <Button href={primaryCta.href} variant="primary" size="lg" withArrow>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost" size="lg">
              {secondaryCta.label}
            </Button>
          </div>

          <ul className="hero-ticker" aria-label="Studio project family">
            {projects.map((project) => (
              <li key={project.slug} className="hero-ticker-item">
                <span className="hero-ticker-dot" aria-hidden="true" />
                {project.shortName}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
