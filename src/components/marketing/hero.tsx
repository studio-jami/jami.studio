import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * Homepage hero — the owner-grade moment. Oversized centered display title, eyebrow,
 * lead, primary + secondary CTA, a proof-meta row, and a scroll cue, over the canvas
 * grain/glow. All copy + CTA hrefs from `site.home`. Mirrors the Message AI template's
 * centered, atmospheric hero rhythm (160px top padding, ~500–560px content column).
 */
export function Hero() {
  const { eyebrow, title, lead, primaryCta, secondaryCta } = site.home;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <Reveal className="hero-inner">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="hero-title">
            <span className="hero-title-accent">{title}</span>
          </h1>
          <p className="hero-lead">{lead}</p>
          <div className="button-row">
            <Button href={primaryCta.href} variant="primary" withArrow>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
          <div className="hero-meta">
            <span>Open-core foundations</span>
            <span>Five products, one hub</span>
            <span>Human + agent readable</span>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span className="hero-scroll-line" />
            Scroll
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
