"use client";

import { useState } from "react";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

/**
 * FAQ — Nouva's accordion. The three `site.faqs` render as a single Surface-card
 * accordion on the void. The answer is always present in the DOM (good for crawlers and
 * agents); the accordion only toggles its visibility. The first item starts open.
 */
export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="section" aria-labelledby="faq-title">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              You have questions. <span className="title-soft">We have answers.</span>
            </>
          }
          titleId="faq-title"
          align="center"
        />

        <div className="faq-list">
          {site.faqs.map((faq, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div className="faq-item" key={faq.question}>
                <h3 className="faq-question-heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon" data-open={isOpen} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-answer"
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
