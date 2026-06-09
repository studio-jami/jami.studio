import { CTABand } from "@/components/marketing/cta-band";
import { FAQ } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={site.home.eyebrow}
        title={site.home.title}
        lead={site.home.lead}
        primaryCta={site.home.primaryCta}
        secondaryCta={site.home.secondaryCta}
      />

      {/* 01 — Pillars */}
      <section className="section" aria-labelledby="pillars-heading">
        <div className="section-number">01</div>
        <h2 id="pillars-heading" style={{ marginBottom: "1.25rem" }}>
          What this studio stands for
        </h2>
        <PillarsBand pillars={site.home.pillars} />
      </section>

      {/* 02 — Product family showcase (the centerpiece) */}
      <section className="section" aria-labelledby="family-heading">
        <div className="section-number">02</div>
        <div style={{ maxWidth: "52ch", marginBottom: "1.5rem" }}>
          <h2 id="family-heading">The Studio family</h2>
          <p className="lead" style={{ marginTop: "0.5rem" }}>
            Five distinct surfaces. Shared foundations. Every route, link, and metadata field is generated from a single source of truth.
          </p>
        </div>
        <ShowcaseGrid projects={projects} />
      </section>

      {/* 03 — Proof / capability */}
      <section className="section" aria-labelledby="proof-heading">
        <div className="section-number">03</div>
        <h2 id="proof-heading" style={{ marginBottom: "0.75rem" }}>
          Built in the open
        </h2>
        <p style={{ maxWidth: "62ch", color: "var(--muted-foreground)", marginBottom: "1.5rem" }}>
          {site.home.proof}
        </p>

        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {projects.slice(0, 3).map((p) => (
              <div key={p.slug}>
                <div className="meta" style={{ marginBottom: "0.25rem" }}>{p.shortName}</div>
                <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{p.name}</div>
                <div className="small">{p.positioning}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — FAQ */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="section-number">04</div>
        <h2 id="faq-heading" style={{ marginBottom: "1rem" }}>Questions</h2>
        <FAQ items={site.faqs} />
      </section>

      {/* Final CTA */}
      <section className="section" style={{ paddingBottom: "calc(var(--section) * 0.6)" }}>
        <CTABand
          title="Ready to explore the full family?"
          primary={{ label: "View all projects", href: "/projects" }}
          secondary={{ label: "Read the AI index", href: "/llms.txt" }}
        />
      </section>
    </>
  );
}
