import type { ReactNode } from "react";
import { Atmosphere } from "@/components/layout/atmosphere";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Shell } from "@/components/ui/section";

export type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

type CtaBandProps = {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  actions: CtaAction[];
  /** Quiet mono link rail rendered under the actions. */
  asideLinks?: { label: string; href: string }[];
};

/** The reusable final conversion moment: statement, actions, atmosphere. */
export function CtaBand({ kicker, title, lead, actions, asideLinks }: CtaBandProps) {
  return (
    <section className="section section--band cta-band" aria-label={kicker}>
      <Atmosphere variant="band" />
      <Shell>
        <Reveal>
          <div className="cta-inner">
            <p className="section-mark">
              <span className="section-kicker">{kicker}</span>
            </p>
            <h2 className="cta-title">{title}</h2>
            {lead ? <p className="cta-lead">{lead}</p> : null}
            <div className="cta-actions">
              {actions.map((action, index) => (
                <ButtonLink
                  key={action.href + action.label}
                  href={action.href}
                  variant={action.variant ?? (index === 0 ? "primary" : "secondary")}
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
            {asideLinks && asideLinks.length > 0 ? (
              <ul className="cta-aside" aria-label="Related links">
                {asideLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
