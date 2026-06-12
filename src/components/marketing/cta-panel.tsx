import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Kirimo's closing CTA — a full-bleed panel over a dark vertical-slat texture
 * (pure CSS, no downloaded imagery), centered terra-cotta eyebrow, sand
 * headline, short line, and one filled terra-cotta pill button. The contact
 * path is the real studio inbox from the content layer.
 */
export function CtaPanel({ titleId }: { titleId: string }) {
  return (
    <div className="cta-panel">
      <div className="container cta-panel__inner">
        <Eyebrow as="p">Get in touch with the studio</Eyebrow>
        <h2 id={titleId} className="cta-panel__title">
          One contract,
          <br />
          five open surfaces
        </h2>
        <p className="cta-panel__copy">
          Questions, integrations, or contributions — write to the studio, or start with the
          project family.
        </p>
        <div className="cta-panel__actions">
          <Button href={`mailto:${site.email}`} variant="primary">
            Email the studio
          </Button>
        </div>
      </div>
    </div>
  );
}
