import { SectionHeading } from "@/components/ui/section-heading";
import styles from "./capability-band.module.css";

type CapabilityBandProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
  headingId?: string;
};

/** Numbered capability list — the case-study "what it provides" block. */
export function CapabilityBand({ index, eyebrow, title, description, items, headingId }: CapabilityBandProps) {
  return (
    <div aria-labelledby={headingId}>
      <SectionHeading
        index={index}
        eyebrow={eyebrow}
        title={<span id={headingId}>{title}</span>}
        description={description}
      />
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item} className={styles.item} data-reveal style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <p className={styles.text}>{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
