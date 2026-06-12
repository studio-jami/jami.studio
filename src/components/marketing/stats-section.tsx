import Image from "next/image";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { CountUp } from "@/components/system/count-up";
import { GrainOverlay } from "@/components/system/grain-overlay";

/**
 * Stats — the ONE inverted WHITE section, the single tonal break in the dark run. Light
 * pink-gradient ground + film grain; two of our generated editorial tiles sit beside the
 * statement; below, animated count-up numbers in small bordered chips. Every figure is a
 * count of something REAL in the content contracts — never a fabricated metric:
 *   - 5 products in the family
 *   - 4 shared foundations
 *   - 1 shared source of record
 */
export function StatsSection() {
  const productCount = projects.length;
  const pillarCount = site.home.pillars.length;

  const stats: { value: number; pad?: number; caption: string; note: string }[] = [
    {
      value: productCount,
      pad: 2,
      caption: "Products in the family",
      note: "Each its own implementation surface"
    },
    {
      value: pillarCount,
      pad: 2,
      caption: "Foundations they share",
      note: "Runtime, UI, coordination, knowledge"
    },
    {
      value: 1,
      pad: 2,
      caption: "Shared source of record",
      note: "Routes, metadata, AI files — generated"
    }
  ];

  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <GrainOverlay className="stats-grain" />
      <Container className="stats-inner">
        <div className="stats-top">
          <div className="stats-tiles">
            <figure className="stats-tile stats-tile--a">
              <Image
                src="/assets/inverted-1.png"
                alt="Editorial still life in warm light"
                width={864}
                height={1152}
                sizes="(max-width: 768px) 45vw, 24vw"
              />
            </figure>
            <figure className="stats-tile stats-tile--b">
              <Image
                src="/assets/inverted-2.png"
                alt="Color-gradient editorial abstraction"
                width={864}
                height={1152}
                sizes="(max-width: 768px) 45vw, 18vw"
              />
            </figure>
          </div>

          <div className="stats-statement">
            <h2 id="stats-heading" className="stats-title">
              We combine governed runtime and trusted interfaces into one
              <span className="stats-title-soft"> coherent, agent-native system.</span>
            </h2>
            <p className="stats-proof">{site.home.proof}</p>
          </div>
        </div>

        <dl className="stats-row">
          <div className="stats-note-chip">
            <span>How the family</span>
            <span>holds together</span>
          </div>
          {stats.map((stat) => (
            <div className="stat" key={stat.caption}>
              <dt className="stat-caption">
                <span className="stat-caption-main">{stat.caption}</span>
                <span className="stat-caption-note">{stat.note}</span>
              </dt>
              <dd className="stat-value">
                <span className="stat-slash" aria-hidden="true">
                  /
                </span>
                <CountUp value={stat.value} pad={stat.pad} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
