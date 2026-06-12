import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { AIIndexCallout } from "@/components/marketing/ai-index-callout";
import { CtaPanel } from "@/components/marketing/cta-panel";
import { Hero } from "@/components/marketing/hero";
import { ProjectGrid } from "@/components/marketing/project-grid";
import { ProjectSlideshow } from "@/components/marketing/project-slideshow";
import { ProofLine } from "@/components/marketing/proof-line";
import { ProofPointBand } from "@/components/marketing/proof-point-band";
import { ServiceAccordion } from "@/components/marketing/service-accordion";
import { StudioAbout } from "@/components/marketing/studio-about";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { SectionHead } from "@/components/ui/section-head";

/**
 * Home — Kirimo's real 9-section spine on one near-black canvas:
 * Hero → Project Slider → Our Client (honest proof line) → About Us →
 * Our Service (numbered accordion) → Our Project (immersive grid) →
 * Testimonials (real proof points) → CTA → Our News (AI index),
 * closed by the colossal footer Text-Ticker (in the site footer).
 */
export default function HomePage() {
  return (
    <>
      {/* 01 — Hero (the header's hairline opens it) */}
      <Section size="hero" rule={false} aria-label="Introduction">
        <Hero />
      </Section>

      {/* 02 — Project Slider: centerpiece #1, full-bleed photography */}
      <Section bleed rule={false} aria-label="Project slideshow" className="section--slideshow">
        <ProjectSlideshow projects={[...projects]} />
      </Section>

      {/* 03 — Our Client slot → honest proof line + product-name marquee */}
      <Section rule={false} size="tight" aria-label="Source-of-truth proof">
        <ProofLine />
      </Section>

      {/* 04 — About Us */}
      <Section aria-labelledby="about-title">
        <StudioAbout titleId="about-title" />
      </Section>

      {/* 05 — Our Service: the numbered accordion */}
      <Section aria-labelledby="services-title">
        <div className="services">
          <div className="services__head">
            <SectionHead
              eyebrow="What the studio ships"
              title="Four foundations, one shared contract"
              titleId="services-title"
              lead="Each layer of the family owns one job; every layer shares the same governed source of truth."
            />
          </div>
          <ServiceAccordion items={site.home.pillars} cta={site.home.primaryCta} />
        </div>
      </Section>

      {/* 06 — Our Project: centerpiece #2, the immersive grid */}
      <Section aria-labelledby="projects-title">
        <div className="showcase__head">
          <SectionHead
            eyebrow="The project family"
            title="Five projects, one source of truth."
            titleId="projects-title"
            lead="Runtime, interface, coordination, knowledge, and society — the same shared records generate every page, link, and AI surface."
          />
          <Button href={site.home.primaryCta.href} variant="secondary">
            View all projects
          </Button>
        </div>
        <ProjectGrid projects={[...projects]} />
      </Section>

      {/* 07 — Testimonials slot → real design commitments, big-quote treatment */}
      <Section aria-labelledby="proof-title">
        <div className="quotes__head">
          <SectionHead
            eyebrow="Proof, not promises"
            title="Why the boundaries hold"
            titleId="proof-title"
            lead="Commitments distilled from the family's own design records — the closest honest thing to a testimonial."
          />
          <Divider />
        </div>
        <ProofPointBand projects={[...projects]} />
      </Section>

      {/* 08 — CTA: full-bleed slat-texture panel */}
      <Section bleed rule={false} aria-labelledby="cta-title" className="section--cta">
        <CtaPanel titleId="cta-title" />
      </Section>

      {/* 09 — Our News slot → the AI-readable index */}
      <Section aria-labelledby="ai-title">
        <AIIndexCallout titleId="ai-title" />
      </Section>
    </>
  );
}
