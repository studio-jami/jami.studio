"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * Editorial Q&A accordion from `site.faqs`. Native `<details>`-style disclosure built with
 * buttons + ARIA so it stays keyboard-accessible. Content is in the initial HTML (answers
 * are present, just visually collapsed) so it stays AI-readable and static-first.
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="faq" aria-labelledby="faq-title">
      <SectionHeading
        eyebrow="Source boundaries"
        number="05"
        title="Built for human and agent readers."
        lead="What this repository owns, where the runtimes live, and why the site publishes AI-readable source."
      />
      <ul className="faq-list">
        {site.faqs.map((faq, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <li className={`faq-item${open ? " is-open" : ""}`} key={faq.question}>
              <h3 className="faq-question">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-sign" aria-hidden="true" />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="faq-answer"
                hidden={!open}
              >
                <p>{faq.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
