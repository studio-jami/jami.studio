import { Atmosphere } from "@/components/atmosphere/atmosphere";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

/** The three-point stance rail that opens Kirimo's hero ("We Are" → points). */
const STANCE = ["Governed", "Composable", "Agent-native"] as const;

/**
 * Immersive hero — the owner-grade moment. A mono stance rail, an oversized
 * two-line display statement (the eyebrow + title from the content layer), a
 * decisive primary CTA with a quiet secondary, all over a wine-rose glow + grain.
 */
export function Hero() {
  const { eyebrow, lead, primaryCta, secondaryCta } = site.home;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Atmosphere variant="hero" />
      <Container width="wide">
        <div className="hero-inner">
          <ul className="hero-stance" aria-label="What the studio is">
            {STANCE.map((word, index) => (
              <li key={word}>
                <span className="hero-stance-index">{String(index + 1).padStart(2, "0")}</span>
                {word}
              </li>
            ))}
          </ul>

          <p className="hero-eyebrow">{eyebrow}</p>

          <h1 id="hero-title" className="hero-title">
            <span>Open foundations</span>
            <span className="hero-title-accent">for agent-native products.</span>
          </h1>

          <p className="hero-lead">{lead}</p>

          <div className="hero-actions">
            <ButtonLink href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="ghost" size="lg">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <p className="hero-scroll" aria-hidden="true">
            <span>Scroll to explore</span>
            <span className="hero-scroll-line" />
          </p>
        </div>
      </Container>
    </section>
  );
}
