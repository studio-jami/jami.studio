import type { ReactNode } from "react";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/system/reveal";
import { Eyebrow } from "@/components/primitives/section-heading";

type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

/**
 * Reusable final-CTA band — the editorial closing moment before the footer. A full-bleed
 * panel with the accent treatment; actions resolve through hrefs passed from the
 * content/route layer.
 */
export function CtaBand({
  eyebrow,
  title,
  lead,
  actions,
  titleId = "cta-title"
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions: CtaAction[];
  titleId?: string;
}) {
  return (
    <section className="cta-band" aria-labelledby={titleId}>
      <Container>
        <Reveal className="cta-band-panel">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={titleId} className="cta-band-title">
            {title}
          </h2>
          {lead && <p className="cta-band-lead">{lead}</p>}
          <div className="cta-band-actions">
            {actions.map((action, index) => (
              <ButtonLink
                key={action.href}
                href={action.href}
                variant={action.variant ?? (index === 0 ? "primary" : "ghost")}
                size="lg"
              >
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
