import { Container } from "@/components/layout/container";
import { CtaRings } from "@/components/system/cta-rings";
import { ButtonLink } from "@/components/ui/button";

type CtaLink = { label: string; href: string; external?: boolean };

/**
 * Synk's closing CTA: centered title, capped lead, ONE white pill button —
 * over a radial dotted vortex (authored SVG rings), with dotted edge gutters
 * and hairline bounds. All hrefs come from callers via the content/route layer.
 */
export function CtaBand({
  title,
  lead,
  primary
}: {
  title: string;
  lead?: string;
  primary: CtaLink;
}) {
  return (
    <section className="cta-band" aria-label="Next step">
      <CtaRings />
      <Container>
        <div className="cta-inner" data-reveal>
          <h2>{title}</h2>
          {lead ? <p className="lead">{lead}</p> : null}
          <ButtonLink href={primary.href} external={primary.external} variant="primary">
            {primary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
