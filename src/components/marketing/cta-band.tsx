import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type CtaAction = {
  label: string;
  href: string;
};

type CTABandProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  primary: CtaAction;
  secondary?: CtaAction;
};

/**
 * Final conversion band — a full-bleed glow panel with an oversized display statement
 * (Kirimo's giant "Text Ticker" / CTA moment, rendered static, no marquee). All hrefs are
 * passed in from the content/route layer.
 */
export function CTABand({ eyebrow, title, lead, primary, secondary }: CTABandProps) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-glow" aria-hidden="true" />
      <Container className="cta-inner">
        <Eyebrow className="cta-eyebrow">{eyebrow}</Eyebrow>
        <h2 id="cta-title" className="cta-title">
          {title}
        </h2>
        {lead ? <p className="cta-lead">{lead}</p> : null}
        <div className="cta-actions">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
