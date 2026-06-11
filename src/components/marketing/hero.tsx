import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Home hero — the owner-grade moment. Oversized display, editorial whitespace, one decisive primary
 * CTA + a quiet secondary, and a small meta band that frames the family without fake metrics.
 */
export function Hero() {
  const { eyebrow, title, lead, primaryCta, secondaryCta } = site.home;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-inner">
          <Eyebrow accent className="hero-eyebrow">
            {eyebrow}
          </Eyebrow>
          <h1 id="hero-title">
            The studio behind <span className="hero-accent">{title}</span>
          </h1>
          <p className="hero-lead">{lead}</p>
          <div className="button-row hero-cta">
            <Button href={primaryCta.href} variant="primary" icon="arrow">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
          <dl className="hero-meta">
            <div className="hero-meta-item">
              <dt>{projects.length} projects</dt>
              <dd>One family across runtime, interface, coordination, and knowledge.</dd>
            </div>
            <div className="hero-meta-item">
              <dt>Open core</dt>
              <dd>Each surface ships in its own repository under one studio.</dd>
            </div>
            <div className="hero-meta-item">
              <dt>Shared foundation</dt>
              <dd>One token system, content layer, and routing contract beneath every surface.</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
