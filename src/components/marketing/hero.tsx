import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import styles from "./hero.module.css";

/**
 * Home hero — the owner-grade moment. Oversized uppercase display lockup (Noir DNA),
 * eyebrow + lead + primary/secondary CTAs, and a quiet index rail of the five
 * projects acting as the "selected work" pre-roll. Atmosphere comes from the
 * token-driven body glow + grain overlay behind it.
 */
export function Hero() {
  const { eyebrow, title, lead, primaryCta, secondaryCta } = site.home;

  return (
    <header className={styles.hero}>
      <Container width="wide">
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>
              {title}
              <span className={styles.reg} aria-hidden="true">
                ®
              </span>
            </h1>
            <p className={styles.lead}>{lead}</p>
            <div className={styles.actions}>
              <Button href={primaryCta.href} variant="primary" size="lg" withArrow>
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <aside className={styles.rail} aria-label="The Studio project family">
            <p className={styles.railLabel}>The family</p>
            <ol className={styles.railList}>
              {projects.map((project, index) => (
                <li key={project.slug} className={styles.railItem}>
                  <span className={styles.railIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.railName}>{project.shortName}</span>
                  <span className={styles.railSummary}>{project.summary}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Container>
      <div className={styles.scrollCue} aria-hidden="true">
        <span>{site.name}</span>
        <span className={styles.scrollDot} />
        <span>scroll</span>
      </div>
    </header>
  );
}
