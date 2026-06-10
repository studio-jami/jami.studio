import type { Route } from "next";
import type { ReactNode } from "react";
import { ButtonAnchor, ButtonLink } from "@/components/primitives/button";

export type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type CtaBandProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions: CtaLink[];
};

function isInternalPage(href: string) {
  return href.startsWith("/") && !href.includes(".");
}

export function CtaBand({ eyebrow, title, lead, actions }: CtaBandProps) {
  return (
    <div className="cta-band">
      <div className="cta-band__glow" aria-hidden="true" />
      <div className="cta-band__inner">
        {eyebrow ? <p className="cta-band__eyebrow">{eyebrow}</p> : null}
        <h2 className="cta-band__title">{title}</h2>
        {lead ? <p className="cta-band__lead">{lead}</p> : null}
        <div className="cta-band__actions">
          {actions.map((action, index) => {
            const variant = action.variant ?? (index === 0 ? "primary" : "secondary");
            return isInternalPage(action.href) ? (
              <ButtonLink
                key={action.label}
                to={action.href as Route}
                variant={variant}
                size="lg"
                trailingIcon
              >
                {action.label}
              </ButtonLink>
            ) : (
              <ButtonAnchor
                key={action.label}
                href={action.href}
                variant={variant}
                size="lg"
                trailingIcon
              >
                {action.label}
              </ButtonAnchor>
            );
          })}
        </div>
      </div>
    </div>
  );
}
