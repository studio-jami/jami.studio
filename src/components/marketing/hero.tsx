import { Button } from "@/components/system/button";
import type { ReactNode } from "react";

export type HeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode; // atmosphere / visual slot
};

export function Hero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  children
}: HeroProps) {
  return (
    <section className="section hero">
      <div className="atmosphere" aria-hidden="true" />
      <div className="hero-copy">
        <p className="meta">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="button-row">
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
