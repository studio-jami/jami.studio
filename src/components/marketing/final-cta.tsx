import type { Route } from "next";
import { Container } from "@/components/ui/layout";
import { GhostBadge, LinkButton } from "@/components/ui/primitives";
import { site } from "@/content/site";

/**
 * FinalCTA — the closing conversion band. Reuses the home CTAs from the content
 * layer ("View projects" / "Read AI index"). The atmosphere glow sits in the
 * panel background; no fabricated copy.
 */
export function FinalCta({ id }: { id: string }) {
  const { primaryCta, secondaryCta } = site.home;

  return (
    <Container as="div">
      <div className="final-cta">
        <GhostBadge>Start here</GhostBadge>
        <h2 id={id} className="display-1" style={{ fontSize: "var(--text-xl)" }}>
          Explore the family or read the agent index
        </h2>
        <p className="lead">
          Five products over one shared foundation, with a public surface designed to be read by
          people and agents alike.
        </p>
        <div className="final-cta-ctas">
          <LinkButton href={primaryCta.href as Route} variant="primary" size="lg">
            {primaryCta.label}
          </LinkButton>
          <LinkButton href={secondaryCta.href as Route} variant="secondary" size="lg">
            {secondaryCta.label}
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
