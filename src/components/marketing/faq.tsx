"use client";

import { useId, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import styles from "./faq.module.css";

/** Editorial accordion Q&A from `site.faqs`. Accessible disclosure, one-open default. */
export function FAQ({ index = "05" }: { index?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section width="default" divided aria-labelledby="faq-heading">
      <div className={styles.layout}>
        <div className={styles.sticky}>
          <SectionHeading
            index={index}
            eyebrow="Source boundaries"
            title={<span id="faq-heading">For human and agent readers</span>}
            description="What this repository owns, where the runtimes live, and why the site ships AI-readable source files."
          />
        </div>
        <ul className={styles.list}>
          {site.faqs.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={faq.question} className={styles.item}>
                <h3 className={styles.questionWrap}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.qNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.qText}>{faq.question}</span>
                    <span className={[styles.icon, isOpen ? styles.iconOpen : ""].filter(Boolean).join(" ")} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={[styles.panel, isOpen ? styles.panelOpen : ""].filter(Boolean).join(" ")}
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
