import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

type CtaLink = { label: string; href: string; external?: boolean };

/**
 * Reusable final CTA band (the template ends at FAQ; we add this in the same
 * systematized rhythm, preceded by a Divider). All hrefs come from callers via
 * the content/route layer.
 */
export function CtaBand({
  eyebrow,
  title,
  lead,
  primary,
  secondary
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <Container>
      <section className="lattice cta-band" aria-label="Next step">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
        <div className="btn-row">
          <ButtonLink href={primary.href} external={primary.external} variant="primary">
            {primary.label}
          </ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} external={secondary.external} variant="secondary">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </section>
    </Container>
  );
}
