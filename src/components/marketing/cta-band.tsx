import type { ReactNode } from "react";
import { Button } from "@/components/primitives/button";
import { Eyebrow } from "@/components/primitives/eyebrow";

type CtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

type CtaBandProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  primary: CtaLink;
  secondary?: CtaLink;
};

/** Reusable final-CTA band — the conversion moment before the footer. */
export function CtaBand({ eyebrow, title, lead, primary, secondary }: CtaBandProps) {
  return (
    <div className="cta-band">
      <div className="cta-band-glow" aria-hidden="true" />
      <div className="cta-band-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="cta-band-title">{title}</h2>
        {lead ? <p className="cta-band-lead">{lead}</p> : null}
        <div className="cta-band-actions">
          {primary.external ? (
            <Button href={primary.href} external variant="primary" size="lg" withArrow>
              {primary.label}
            </Button>
          ) : (
            <Button href={primary.href} variant="primary" size="lg" withArrow>
              {primary.label}
            </Button>
          )}
          {secondary ? (
            secondary.external ? (
              <Button href={secondary.href} external variant="secondary" size="lg">
                {secondary.label}
              </Button>
            ) : (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
