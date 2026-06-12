import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { AdvantageGrid } from "@/components/marketing/advantage-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { FamilyLattice } from "@/components/marketing/family-lattice";
import { FamilyQuote } from "@/components/marketing/family-quote";
import { Faq } from "@/components/marketing/faq";
import {
  CoordinationLattice,
  FoundationsLattice,
  PostureLattice
} from "@/components/marketing/feature-lattices";
import { Hero } from "@/components/marketing/hero";
import { TrustedMarquee } from "@/components/marketing/trusted-marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * Home — Synk's real divider-segmented spine, reproduced with our content:
 *   Hero(vortex) → Marquee → Features(2×2 + micro-UI) ┃ Features-2(2×2 ×2)
 *   ┃ Expect(3×2 pixel grid) ┃ Quote(pixel hearts) ┃ Family lattice ┃ FAQ
 *   → closing CTA over the radial dotted vortex.
 * A diagonal-hatch Divider band separates every major section.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <TrustedMarquee />

      <Section id="foundations" label="Shared foundations">
        <SectionHeading
          title="Built on governed foundations"
          lead="A governed runtime and trusted interface contracts — the stance every product in the family shares."
        />
        <FoundationsLattice />
      </Section>

      <Divider />

      <Section id="coordination" label="Coordination and knowledge">
        <SectionHeading
          title="Organized, durable, and legible"
          lead="Durable coordination records, temporal knowledge, and generated surfaces keep humans and agents aligned."
        />
        <CoordinationLattice />
        <div className="hatch" data-thin="" role="presentation" aria-hidden="true" />
        <PostureLattice />
      </Section>

      <Divider />

      <Section id="expect" label="What you can expect">
        <SectionHeading
          title="What you can expect from the family"
          lead="Deeper capabilities drawn from each product's own content — from governed runs to open governance."
        />
        <AdvantageGrid />
      </Section>

      <Divider />

      <Section id="positioning" label="Product positioning">
        <SectionHeading
          title="Five products, one posture"
          lead="Each member of the family, positioned in its own words — no invented praise, just the real stance."
        />
        <FamilyQuote />
      </Section>

      <Divider />

      <Section id="family" label="How the family fits together">
        <SectionHeading
          title="How the family plugs together"
          lead="Runtime, interface, coordination, knowledge, and society — five products over four shared foundations."
        />
        <FamilyLattice />
      </Section>

      <Divider />

      <Section id="faq" label="Frequently asked questions">
        <SectionHeading
          title="Frequently asked questions"
          lead="Clear answers on what this hub owns, where the products live, and why everything is AI-readable."
        />
        <Faq />
      </Section>

      <CtaBand
        title="One public hub for the whole family"
        lead={site.home.proof}
        primary={site.home.primaryCta}
      />
    </>
  );
}
