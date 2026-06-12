import Image from "next/image";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { ButtonLink } from "@/components/primitives/button";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * Benefits — Nouva's asymmetric split: a TALL LEFT PHOTO PANEL (our generated dusk
 * photograph as the full card, caption type + light pill anchored over a dark scrim)
 * beside a 2-column grid of benefit cards, each opened by a circled icon chip. The
 * benefits are honest, cross-family advantages of building over one shared source.
 */
const benefits = [
  {
    title: "No drift between surfaces",
    body: "Routes, links, metadata, and AI files all resolve from one source, so nothing falls out of sync as the family grows.",
    icon: (
      // sync / loop
      <>
        <path d="M4 9a8 8 0 0114-3" />
        <path d="M20 15a8 8 0 01-14 3" />
        <path d="M18 2v4h-4" />
        <path d="M6 22v-4h4" />
      </>
    )
  },
  {
    title: "Provider choice stays yours",
    body: "BYOK engines and model routing live in adapters and configuration — never hard-wired into the product.",
    icon: (
      // key
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12L20 3" />
        <path d="M16 7l3 3" />
      </>
    )
  },
  {
    title: "Agent-readable by default",
    body: "Compact and expanded AI source files ship beside every public route for agents to ingest.",
    icon: (
      // document lines
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M9 11h7M9 15h7" />
      </>
    )
  },
  {
    title: "Clear product boundaries",
    body: "This hub markets the family; runtime implementations stay in their owning repositories and subdomains.",
    icon: (
      // frame corners
      <>
        <path d="M4 8V4h4" />
        <path d="M20 8V4h-4" />
        <path d="M4 16v4h4" />
        <path d="M20 16v4h-4" />
      </>
    )
  },
  {
    title: "Trusted, tokenized UI",
    body: "A shared token vocabulary seeds this very site and keeps agent-rendered interfaces safe.",
    icon: (
      // layers
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
      </>
    )
  },
  {
    title: "Open-core, in the open",
    body: "Every product links to its public repository, docs, and live surface — no gated demos.",
    icon: (
      // branch
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="8" r="2.5" />
        <path d="M6 8.5v7" />
        <path d="M15.7 9.7A8 8 0 018.3 16.2" />
      </>
    )
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
          <Reveal as="aside" className="benefits-photo">
            <div className="photo-fill" aria-hidden="true">
              <Image
                src="/assets/team.png"
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 36vw"
              />
            </div>
            <h3 className="benefits-photo-title">
              The whole family. <span className="title-soft">One coherent surface.</span>
            </h3>
            <ButtonLink href={site.home.primaryCta.href} variant="primary">
              {site.home.primaryCta.label}
            </ButtonLink>
          </Reveal>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <Reveal as="article" className="benefit-card" key={benefit.title} delay={index * 50}>
                <span className="benefit-card-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {benefit.icon}
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
