import { Button } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";

type CTA = { label: string; href: string };

/**
 * Reusable final-CTA band: eyebrow + heading + lead + one or two resolved CTAs, over an
 * accent glow. Closes the homepage and every project detail page.
 */
export function CTABand({
  eyebrow = "Next step",
  title,
  lead,
  primary,
  secondary
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  primary: CTA;
  secondary?: CTA;
}) {
  return (
    <Section aria-labelledby="cta-heading">
      <Reveal>
        <div className="cta-band">
          <Eyebrow plain>{eyebrow}</Eyebrow>
          <h2 id="cta-heading">{title}</h2>
          {lead ? <p>{lead}</p> : null}
          <div className="button-row">
            <Button href={primary.href} variant="primary" withArrow>
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="secondary">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
