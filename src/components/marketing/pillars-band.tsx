import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import styles from "./pillars-band.module.css";

/** The four home pillars as a numbered "what this studio stands for" statement band. */
export function PillarsBand({ index = "01" }: { index?: string }) {
  return (
    <Section width="wide" divided aria-labelledby="pillars-heading">
      <SectionHeading
        index={index}
        eyebrow="What the studio stands for"
        title={<span id="pillars-heading">One foundation, four guarantees</span>}
        description="Each project is a separate surface, but they share one posture: governed execution, trusted interfaces, durable coordination, and agent-readable knowledge."
      />
      <ul className={styles.grid}>
        {site.home.pillars.map((pillar, i) => (
          <li key={pillar.title} className={styles.card} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.title}>{pillar.title}</h3>
            <p className={styles.body}>{pillar.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
