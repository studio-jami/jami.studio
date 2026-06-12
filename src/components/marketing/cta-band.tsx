import { Container, Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type CtaAction = { label: string; href: string };

type CtaBandProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  primary: CtaAction;
  secondary?: CtaAction;
};

/**
 * Reusable final-CTA band — the closing conversion moment before the footer, consistent
 * with the numbered editorial system. Hrefs are always passed in from the content/route
 * layer by the caller.
 */
export function CtaBand({ eyebrow, title, lead, primary, secondary }: CtaBandProps) {
  return (
    <Section className="cta-section" ariaLabelledby="cta-heading">
      <Container>
        <div className="cta-band">
          <div className="cta-band-copy">
            <p className="eyebrow">
              <span className="section-number" aria-hidden="true">
                →
              </span>
              <span>{eyebrow}</span>
            </p>
            <h2 id="cta-heading" className="cta-title">
              {title}
            </h2>
            {lead ? <p className="cta-lead">{lead}</p> : null}
          </div>
          <div className="cta-band-actions">
            <Button href={primary.href} variant="primary">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="secondary">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
