import { Button } from "@/components/system/button";
import type { ReactNode } from "react";

export type CTABandProps = {
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
};

export function CTABand({ title, primary, secondary, children }: CTABandProps) {
  return (
    <div className="cta-band">
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <div className="actions">
        <Button href={primary.href} variant="primary">
          {primary.label}
        </Button>
        {secondary && (
          <Button href={secondary.href} variant="secondary">
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  );
}
