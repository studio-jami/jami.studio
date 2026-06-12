import type { ReactNode } from "react";
import type { Route } from "next";
import { Container } from "@/components/ui/layout";
import { Badge, ExternalButton, GhostBadge, LinkButton } from "@/components/ui/primitives";
import { CheckCircleIcon } from "@/components/ui/icons";
import { CountUp } from "@/components/system/count-up";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

/**
 * OpenCoreCallout (template Pricing) — keeps the pricing section's *frame*
 * (the airiest slot, three tall cards, a featured middle column, "Features"
 * checklist rows) but replaces invented tiers with the honest open-core story.
 * The big numerals are REAL counts only — 5 products · 4 foundations ·
 * 1 shared source — animated by CountUp when they scroll into view. Every
 * checklist row is real data from the content layer; every CTA resolves
 * through the content/route layer.
 */
type Plan = {
  label: string;
  count: number;
  unit: string;
  blurb: string;
  featured?: boolean;
  cta: ReactNode;
  features: string[];
};

const plans: Plan[] = [
  {
    label: "Products",
    count: 5,
    unit: "surfaces",
    blurb: "Separate implementation surfaces, each marketed here and built in its own repository.",
    cta: (
      <LinkButton href={"/projects" as Route} variant="secondary" className="plan-cta">
        {site.home.primaryCta.label}
      </LinkButton>
    ),
    features: projects.map((project) => project.name)
  },
  {
    label: "Foundations",
    count: 4,
    unit: "shared layers",
    blurb: "The open-core layers every product stands on, built in the open under one organization.",
    featured: true,
    cta: (
      <ExternalButton href={studioLinks.githubOrg} variant="primary" className="plan-cta">
        View on GitHub
      </ExternalButton>
    ),
    features: site.home.pillars.map((pillar) => pillar.title)
  },
  {
    label: "Shared source",
    count: 1,
    unit: "content layer",
    blurb: "One generated source of truth for people and agents — no tiers, no gates, no plans.",
    cta: (
      <LinkButton href={site.home.secondaryCta.href as Route} variant="secondary" className="plan-cta">
        {site.home.secondaryCta.label}
      </LinkButton>
    ),
    features: [
      "Every route and CTA generated from shared data",
      "Metadata, JSON-LD, and sitemap from the same source",
      "AI-readable llms.txt and full source bundle",
      "Links move through metadata, never rewrites"
    ]
  }
];

export function OpenCoreCallout({ id }: { id: string }) {
  return (
    <Container as="div">
      <Reveal className="section-head">
        <GhostBadge>Open core</GhostBadge>
        <h2 id={id}>
          Choose the source <span className="heading-soft">instead of a pricing plan.</span>
        </h2>
        <p className="section-lead">{site.home.proof}</p>
      </Reveal>

      <div className="plan-grid">
        {plans.map((plan, i) => (
          <Reveal
            as="article"
            className={`plan-card${plan.featured ? " plan-card-featured" : ""}`}
            key={plan.label}
            delay={i * 90}
          >
            <div className="plan-head">
              <h3 className="plan-label">{plan.label}</h3>
              {plan.featured ? <Badge tone="accent">Open core</Badge> : null}
            </div>
            <p className="plan-figure">
              <span className="plan-number">
                <CountUp to={plan.count} />
              </span>
              <span className="plan-unit">/{plan.unit}</span>
            </p>
            <p className="plan-blurb">{plan.blurb}</p>
            {plan.cta}
            <p className="plan-divider">
              <span>Included</span>
            </p>
            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckCircleIcon size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
