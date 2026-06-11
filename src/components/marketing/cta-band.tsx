import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import styles from "./cta-band.module.css";

export type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  withArrow?: boolean;
};

type CTABandProps = {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  actions: CtaAction[];
};

/** Reusable final-CTA band — the decisive moment before the footer. */
export function CTABand({ index, eyebrow = "Next step", title, description, actions }: CTABandProps) {
  return (
    <Section width="wide" aria-label="Call to action">
      <div className={styles.band} data-reveal>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            {index ? <span className={styles.index}>{index}</span> : null}
            {eyebrow}
          </p>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
          <div className={styles.actions}>
            {actions.map((action) => (
              <Button
                key={action.href}
                href={action.href}
                variant={action.variant ?? "primary"}
                size="lg"
                external={action.external}
                withArrow={action.withArrow}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
