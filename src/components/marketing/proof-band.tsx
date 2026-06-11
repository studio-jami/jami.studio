import { Section } from "@/components/ui/section";
import styles from "./proof-band.module.css";

export type ProofStat = {
  value: string;
  label: string;
};

type ProofBandProps = {
  index?: string;
  eyebrow?: string;
  statement: string;
  /** Honest, derived figures only — never fabricated metrics. */
  stats?: ProofStat[];
};

/**
 * Earned-credibility band: a single proof statement plus optional derived figures
 * (counts that come straight from the content contract, not invented metrics).
 */
export function ProofBand({ index, eyebrow = "Source posture", statement, stats }: ProofBandProps) {
  return (
    <Section width="wide" divided tone="raised" aria-label="Proof and source posture">
      <div className={styles.band}>
        <div className={styles.lead}>
          {(index || eyebrow) && (
            <p className={styles.eyebrow}>
              {index ? <span className={styles.index}>{index}</span> : null}
              {eyebrow}
            </p>
          )}
          <p className={styles.statement}>{statement}</p>
        </div>
        {stats && stats.length > 0 ? (
          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </Section>
  );
}
