"use client";

import { useId, useState } from "react";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

function FaqItem({
  question,
  answer,
  open,
  onToggle
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className="faq-item" data-open={open}>
      <h3 className="faq-question-heading">
        <button
          type="button"
          id={buttonId}
          className="faq-question"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{question}</span>
          <span className="faq-icon" aria-hidden="true" data-open={open} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-answer"
        hidden={!open}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

/** FAQ — editorial accordion from `site.faqs`. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section className="faq" divided aria-labelledby="faq-title">
      <SectionHeading
        number="07"
        eyebrow="Questions"
        title="What this site is, and what it is not."
        titleId="faq-title"
      />
      <div className="faq-list">
        {site.faqs.map((faq, index) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
          />
        ))}
      </div>
    </Section>
  );
}
