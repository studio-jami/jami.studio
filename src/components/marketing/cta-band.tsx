import Image from "next/image";
import { Container } from "@/components/layout/container";
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
 * Closing CTA — Noir's full-bleed statement moment: left-aligned display heading + lead +
 * outlined pill action, over the crimson particle-burst visual with the copper/purple
 * gradient bloom layered on. Hrefs always arrive from the content/route layer.
 */
export function CtaBand({ eyebrow, title, lead, primary, secondary }: CtaBandProps) {
  return (
    <section className="cta-band" aria-labelledby="cta-heading">
      <Image
        className="cta-burst"
        src="/assets/cta-burst.png"
        alt=""
        width={1152}
        height={864}
        sizes="60vw"
        aria-hidden="true"
      />
      <div className="cta-bloom" aria-hidden="true" />
      <Container>
        <div className="cta-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="cta-heading" className="cta-title">
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
        </div>
      </Container>
    </section>
  );
}
