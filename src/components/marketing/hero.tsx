import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Hero — Nouva's centered display moment. Eyebrow, oversized display title, lead, a
 * decisive primary CTA + quiet secondary, then a thin family ticker and a scroll cue.
 * Translated to the light editorial canvas with magenta as the single highlight.
 */
export function Hero() {
  const { eyebrow, title, lead, primaryCta, secondaryCta } = site.home;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <Reveal as="p" className="hero-eyebrow eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal as="h1" className="hero-title" delay={60}>
          <span id="hero-title">{title}</span>
        </Reveal>
        <Reveal as="p" className="hero-lead" delay={120}>
          {lead}
        </Reveal>
        <Reveal className="hero-actions" delay={180}>
          <ButtonLink href={primaryCta.href} variant="primary" size="lg">
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href={secondaryCta.href} variant="ghost" size="lg">
            {secondaryCta.label}
          </ButtonLink>
        </Reveal>
      </Container>

      <Container className="hero-ticker-wrap">
        <Reveal className="hero-ticker" delay={240}>
          <span className="hero-ticker-label">The family</span>
          <ul className="hero-ticker-list">
            {projects.map((project) => (
              <li key={project.slug}>{project.shortName}</li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
