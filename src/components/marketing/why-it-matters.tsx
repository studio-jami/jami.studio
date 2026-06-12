import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { CountUp } from "@/components/system/count-up";
import { Reveal } from "@/components/system/reveal";

/**
 * Why It Matters — Nouva's staggered/offset stat row. Three charcoal cards float on the
 * void; cards 1 & 3 are pushed down ~48px (the signature offset), each topped by an
 * animated count-up of a REAL number. No fabricated metrics: these are the literal shape
 * of the Studio family (5 public products, 4 shared foundations, 1 shared source).
 */
const stats = [
  {
    value: 5,
    suffix: "",
    label: "Public products",
    body: "Harness, UI Registry, Orchestra, Intercal, and Collectiva — each its own surface, all in one family."
  },
  {
    value: 4,
    suffix: "",
    label: "Shared foundations",
    body: "Governed runtime, trusted UI contracts, durable coordination, and agent-readable knowledge underpin every product."
  },
  {
    value: 1,
    suffix: "",
    label: "Shared source",
    body: "Every route, link, metadata field, sitemap entry, and AI-ingestion file is generated from one source of truth."
  }
];

export function WhyItMatters() {
  return (
    <section id="why-it-matters" className="section" aria-labelledby="why-title">
      <Container>
        <SectionHeading
          eyebrow="Why it matters"
          title={
            <>
              The way agent products ship is changing.{" "}
              <span className="title-soft">Most surfaces are still fragmented.</span>
            </>
          }
          titleId="why-title"
          align="center"
        />

        <div className="stat-row">
          {stats.map((stat, index) => (
            <Reveal as="div" className="stat-card" key={stat.label} delay={index * 80}>
              <div className="stat-figure">
                <CountUp value={stat.value} />
                {stat.suffix && <span className="stat-figure-suffix">{stat.suffix}</span>}
              </div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-body">{stat.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
