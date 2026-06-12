import { DotVortex } from "@/components/system/dot-vortex";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * Synk hero: a centered stack — small uppercase pill tag, big white H1,
 * capped lead, ONE white pill CTA — over the swirling dotted-particle
 * vortex (animated canvas; static under reduced motion).
 */
export function Hero() {
  const { home } = site;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <DotVortex />
      <div className="hero-inner container">
        <span className="pill-tag">
          <span className="pill-dot" aria-hidden="true" />
          {home.eyebrow}
        </span>
        <h1 id="hero-title">{home.title}</h1>
        <p className="hero-lead">{home.lead}</p>
        <ButtonLink href={home.primaryCta.href} variant="primary">
          {home.primaryCta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
