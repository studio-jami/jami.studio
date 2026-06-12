import Image from "next/image";
import { Container } from "@/components/primitives/container";
import { ButtonLink } from "@/components/primitives/button";
import { Eyebrow } from "@/components/primitives/section-heading";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "accent";
};

type CtaCardProps = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  titleId: string;
  actions: Action[];
  /**
   * Optional photographic fill (e.g. `/assets/cta.png`) — the template's closing
   * moment: the rounded card is entirely filled by the dusk photograph (cover, wide
   * crop) with left-aligned type + light pill on top of a dark scrim.
   */
  photo?: string;
};

/**
 * CTA — Nouva's closing card-on-void: a 16px-radius Surface panel wrapping an eyebrow,
 * a big H2, an optional subtitle, and pill CTAs. With `photo` set it becomes the
 * template's photo-filled rounded card (left-aligned type over the photograph).
 */
export function CtaCard({ eyebrow, title, lead, titleId, actions, photo }: CtaCardProps) {
  return (
    <section className="cta-section" aria-labelledby={titleId}>
      <Container>
        <div className={photo ? "cta-card cta-card--photo" : "cta-card"}>
          {photo && (
            <div className="photo-fill" aria-hidden="true">
              <Image
                src={photo}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={titleId} className="cta-card-title">
            {title}
          </h2>
          {lead && <p className="cta-card-lead">{lead}</p>}
          <div className="cta-card-actions">
            {actions.map((action) => (
              <ButtonLink
                key={action.href + action.label}
                href={action.href}
                variant={action.variant ?? "primary"}
                size="lg"
              >
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
