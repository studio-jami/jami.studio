import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

type CTA = { label: string; href: string };

/**
 * Reusable final-CTA section. One primary action, one quiet secondary; both hrefs come from the
 * content/route layer.
 */
export function CTABand({
  eyebrow = "Get started",
  title,
  body,
  primary,
  secondary
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  primary: CTA;
  secondary?: CTA;
}) {
  return (
    <div className="cta-band">
      <Eyebrow accent>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      <div className="button-row" style={{ justifyContent: "center" }}>
        <Button href={primary.href} variant="primary" icon="arrow">
          {primary.label}
        </Button>
        {secondary ? (
          <Button href={secondary.href} variant="secondary">
            {secondary.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
