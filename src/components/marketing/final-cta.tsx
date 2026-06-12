import type { Route } from "next";
import { Container } from "@/components/ui/layout";
import { LinkButton } from "@/components/ui/primitives";
import { site } from "@/content/site";

/**
 * FinalCTA (template FinalCTA) — the closing bookend that echoes the hero: a
 * large 48px-radius panel filled with our generated light-shaft photograph
 * (/assets/cta.png), grain + glow layered on top in CSS, and the heading +
 * lead + ONE white pill CTA sitting left-aligned on the fog, exactly as the
 * template stages it.
 */
export function FinalCta({ id }: { id: string }) {
  const { primaryCta } = site.home;

  return (
    <Container as="div" width="wide">
      <div className="final-cta final-cta-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/cta.png" alt="" className="final-cta-bg" aria-hidden="true" />
        <div className="final-cta-shade" aria-hidden="true" />
        <div className="final-cta-content">
          <h2 id={id} className="final-cta-title">
            Step into the family, <span className="final-cta-soft">guided by one shared source.</span>
          </h2>
          <p className="final-cta-lead">
            Five agent-native products built in the open — explore the work and see how the
            foundations hold together.
          </p>
          <div className="final-cta-ctas">
            <LinkButton href={primaryCta.href as Route} variant="primary" size="lg">
              {primaryCta.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </Container>
  );
}
