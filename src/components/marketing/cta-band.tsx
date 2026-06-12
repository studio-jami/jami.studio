import type { ReactNode } from "react";
import { Atmosphere } from "@/components/atmosphere/atmosphere";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

type CtaBandProps = {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  actions: CtaAction[];
};

/**
 * Reusable final-CTA band — the Kirimo "We deliver for you" moment rendered as a
 * deep, glowing panel inside the canvas. Used on home and on each project detail.
 */
export function CtaBand({ eyebrow, title, body, actions }: CtaBandProps) {
  return (
    <div className="cta-band">
      <Atmosphere variant="cta" />
      <div className="cta-band-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="cta-band-title">{title}</h2>
        {body ? <p className="cta-band-body">{body}</p> : null}
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
      </div>
    </div>
  );
}
