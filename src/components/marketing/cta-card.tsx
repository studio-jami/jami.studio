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
};

/**
 * CTA — Nouva's closing centered card-on-void: an eyebrow, a big H2, an optional
 * subtitle, and a single primary CTA, wrapped in a 16px-radius Surface panel with a soft
 * accent glow at the top. Used to close both the home page and inner pages.
 */
export function CtaCard({ eyebrow, title, lead, titleId, actions }: CtaCardProps) {
  return (
    <section className="cta-section" aria-labelledby={titleId}>
      <Container>
        <div className="cta-card">
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
