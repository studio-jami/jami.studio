import { Hero } from "@/components/marketing/hero";
import { ProjectSlider } from "@/components/marketing/project-slider";
import { ProofLine } from "@/components/marketing/proof-line";
import { StudioAbout } from "@/components/marketing/studio-about";
import { ServicePillars } from "@/components/marketing/service-pillars";
import { ProjectGrid } from "@/components/marketing/project-grid";
import { ProofPointBand } from "@/components/marketing/proof-point-band";
import { CtaBand } from "@/components/marketing/cta-band";
import { AIIndexCallout } from "@/components/marketing/ai-index-callout";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/layout/container";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

/**
 * Home — built to Kirimo's real exported home IA, nine sections in template order:
 *   Hero → Project Slider → Our Client → About Us → Our Service → Our Project →
 *   Testimonials → CTA → Our News.
 * Mapped to our content and tokens; two distinct showcase treatments (slider +
 * grid) and the honest substitutions for client logos / testimonials / news.
 */
export default function HomePage() {
  return (
    <>
      {/* 1 · Hero */}
      <Hero />

      {/* 2 · Project Slider — centerpiece #1 */}
      <Section tone="canvas" size="default" aria-labelledby="slider-title" width="wide">
        <div className="section-heading section-heading-split">
          <div className="section-heading-main">
            <Eyebrow index="02">Selected work</Eyebrow>
            <h2 id="slider-title" className="section-title">
              The Studio family, slide by slide.
            </h2>
          </div>
          <div className="section-heading-lead">
            <p>
              Five independent products over shared foundations. Drag, scroll, or use the controls to
              move through the family.
            </p>
          </div>
        </div>
        <ProjectSlider projects={[...projects]} />
      </Section>

      {/* 3 · Our Client — honest proof line, no fabricated logos */}
      <Section tone="panel" size="tight" aria-label="How the site is built">
        <ProofLine />
      </Section>

      {/* 4 · About Us */}
      <Section tone="canvas" aria-labelledby="about-title">
        <StudioAbout />
      </Section>

      {/* 5 · Our Service — numbered service list */}
      <Section tone="panel" aria-labelledby="service-title">
        <ServicePillars />
      </Section>

      {/* 6 · Our Project — immersive grid, centerpiece #2 */}
      <Section tone="canvas" aria-labelledby="gallery-title">
        <ProjectGrid projects={[...projects]} context="home" />
      </Section>

      {/* 7 · Testimonials — distilled real proof points */}
      <Section tone="panel" aria-labelledby="proof-title">
        <ProofPointBand />
      </Section>

      {/* 8 · CTA */}
      <section className="section section-canvas section-default" aria-labelledby="home-cta-title">
        <Container width="wide">
          <CtaBand
            eyebrow="Start here"
            title={<span id="home-cta-title">Explore the family, or read the source.</span>}
            body={site.home.lead}
            actions={[
              { label: site.home.primaryCta.label, href: site.home.primaryCta.href },
              { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href }
            ]}
          />
        </Container>
      </section>

      {/* 9 · Our News — AI-readable index callout, no invented articles */}
      <Section tone="canvas" size="tight" aria-labelledby="ai-callout-title">
        <AIIndexCallout />
      </Section>
    </>
  );
}
