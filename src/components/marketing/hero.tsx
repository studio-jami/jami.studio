import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/content/site";

/**
 * Home hero — Synk's centered statement: eyebrow tag, oversized display title,
 * a single decisive primary CTA + quiet secondary, and a mono meta row that
 * names the family members. Sits inside the boxed lattice.
 */
export function Hero() {
  const { home } = site;

  return (
    <Container>
      <section className="lattice hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <Eyebrow>{home.eyebrow}</Eyebrow>
          <h1 id="hero-title">{home.title}</h1>
          <p className="hero-lead">{home.lead}</p>
          <div className="btn-row">
            <ButtonLink href={home.primaryCta.href} variant="primary">
              {home.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={home.secondaryCta.href} variant="secondary">
              {home.secondaryCta.label}
            </ButtonLink>
          </div>
          <div className="hero-meta" aria-hidden="true">
            <span>Harness</span>
            <span>UI Registry</span>
            <span>Orchestra</span>
            <span>Intercal</span>
            <span>Collectiva</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
