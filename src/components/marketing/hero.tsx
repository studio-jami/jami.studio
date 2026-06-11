import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

// The Kirimo hero's "We are / 01 02 03" numbered points, mapped to our four pillars'
// short titles — earned structure from real content, not invented copy.
const heroPoints = site.home.pillars.map((pillar, index) => ({
  number: String(index + 1).padStart(2, "0"),
  label: pillar.title
}));

/**
 * Home hero — the owner-grade moment. Oversized uppercase display title (Kirimo's
 * Plus Jakarta hero) built from real `site.home` copy: the wordmark title sits as a
 * kicker, the eyebrow becomes the headline, the lead supports it, with one decisive CTA
 * pair. Atmosphere (grain + glow) is global; the hero adds a local glow anchor.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <Container className="hero-inner">
        <div className="hero-points">
          {heroPoints.map((point) => (
            <span className="hero-point" key={point.number}>
              <span className="hero-point-num">{point.number}</span>
              <span className="hero-point-label">{point.label}</span>
            </span>
          ))}
        </div>

        <p className="hero-kicker">{site.home.title}</p>

        <h1 id="hero-title" className="hero-title">
          {site.home.eyebrow}
        </h1>

        <p className="hero-lead">{site.home.lead}</p>

        <div className="hero-actions">
          <Button href={site.home.primaryCta.href} variant="primary">
            {site.home.primaryCta.label}
          </Button>
          <Button href={site.home.secondaryCta.href} variant="secondary">
            {site.home.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
