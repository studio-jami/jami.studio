import type { Route } from "next";
import { Container } from "@/components/ui/layout";
import { Badge, GhostBadge, LinkButton } from "@/components/ui/primitives";
import { site } from "@/content/site";

/**
 * Hero — the nocturnal moment. Mirrors the Message AI template's Hero: a centered
 * oversized display headline on the charcoal canvas (atmosphere lives in the
 * fixed layer behind), Content (eyebrow + title + lead + CTAs) and a Scroll cue.
 */
export function Hero() {
  const { eyebrow, lead, primaryCta, secondaryCta } = site.home;

  return (
    <Container as="section" className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <GhostBadge>{eyebrow}</GhostBadge>

        <h1 id="hero-title" className="display-1">
          One public surface for the <span className="hero-title-accent">agent-native</span> Studio
          family
        </h1>

        <p className="lead hero-lead">{lead}</p>

        <div className="hero-ctas">
          <LinkButton href={primaryCta.href as Route} variant="primary" size="lg">
            {primaryCta.label}
          </LinkButton>
          <LinkButton href={secondaryCta.href as Route} variant="secondary" size="lg">
            {secondaryCta.label}
          </LinkButton>
        </div>

        <div className="hero-meta">
          <Badge tone="outline">Open-core</Badge>
          <Badge tone="outline">Agent-readable</Badge>
          <Badge tone="outline">Five products, one foundation</Badge>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-cue-track">
            <span className="scroll-cue-dot" />
          </span>
          Scroll to explore
        </div>
      </div>
    </Container>
  );
}
