import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

type CtaLink = { label: string; href: string };

type CTABandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
};

/** Reusable final-CTA section before the footer. */
export function CTABand({ eyebrow = "Get started", title, body, primary, secondary }: CTABandProps) {
  return (
    <Section divider className="cta-section" aria-labelledby="cta-title">
      <div className="cta-band">
        <div className="cta-band-grid" aria-hidden="true" />
        <div className="cta-band-copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="cta-title">{title}</h2>
          {body ? <p>{body}</p> : null}
        </div>
        <div className="button-row cta-band-actions">
          <Button href={primary.href} variant="primary" size="lg">
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
