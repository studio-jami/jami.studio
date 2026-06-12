import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { ButtonLink } from "@/components/primitives/button";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * Benefits — Nouva's asymmetric split: a tall left CTA panel beside a 2-column grid of
 * benefit cards. The benefits are honest, cross-family advantages of building over one
 * shared source. The left panel reuses the `home.proof` line and points at the projects.
 */
const benefits = [
  {
    title: "No drift between surfaces",
    body: "Routes, links, metadata, and AI files all resolve from one source, so nothing falls out of sync as the family grows."
  },
  {
    title: "Provider choice stays yours",
    body: "BYOK engines and model routing live in adapters and configuration — never hard-wired into the product."
  },
  {
    title: "Agent-readable by default",
    body: "Compact and expanded AI source files ship beside every public route for agents to ingest."
  },
  {
    title: "Clear product boundaries",
    body: "This hub markets the family; runtime implementations stay in their owning repositories and subdomains."
  },
  {
    title: "Trusted, tokenized UI",
    body: "A shared token vocabulary seeds this very site and keeps agent-rendered interfaces safe."
  },
  {
    title: "Open-core, in the open",
    body: "Every product links to its public repository, docs, and live surface — no gated demos."
  }
];

export function BenefitsSplit() {
  return (
    <section className="section" aria-labelledby="benefits-title">
      <Container>
        <SectionHeading
          eyebrow="Built across the family"
          title={
            <>
              One shared source,{" "}
              <span className="title-soft">benefits across every product.</span>
            </>
          }
          titleId="benefits-title"
          align="center"
        />

        <div className="benefits-split">
          <Reveal as="aside" className="benefits-cta">
            <p className="stat-label">The whole family</p>
            <h3 className="benefits-cta-title">Five products, one coherent surface.</h3>
            <p className="benefits-cta-body">{site.home.proof}</p>
            <ButtonLink href={site.home.primaryCta.href} variant="accent">
              {site.home.primaryCta.label}
            </ButtonLink>
          </Reveal>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <Reveal as="article" className="benefit-card" key={benefit.title} delay={index * 50}>
                <span className="benefit-card-tick" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h4 className="benefit-card-title">{benefit.title}</h4>
                <p className="benefit-card-body">{benefit.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
